'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  PatientIdentification,
  ConsentPreferences,
  SocratesDetails,
  AyushAssessment,
  RedFlagAlert,
  ScannedDocument,
  StructuredClinicalSummary,
  PatientQueueItem,
} from '@/types';
import { CHIEF_COMPLAINT_QUESTION, CLINICAL_QUESTION_DATABASE, ClinicalQuestion, QuestionOption } from '@/data/socratesQuestionTree';
import { AYUSH_PARIKSHA_QUESTIONS } from '@/data/ayushQuestionTree';
import { SAMPLE_SCANNED_DOCUMENTS } from '@/data/mockDocuments';
import { soundEffects } from '@/components/common/SoundEffects';
import { generateToken } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'patient';
  text: string;
  timestamp: string;
  isRedFlagWarning?: boolean;
}

interface KioskContextType {
  // Navigation
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Patient & Consent
  patientInfo: PatientIdentification;
  updatePatientInfo: (info: Partial<PatientIdentification>) => void;
  loadDemoPatient: () => void;
  consent: ConsentPreferences;
  toggleConsent: (key: keyof ConsentPreferences) => void;

  // Mode
  intakeMode: 'allopathy' | 'ayush';
  setIntakeMode: (mode: 'allopathy' | 'ayush') => void;

  // Interview state
  currentQuestion: ClinicalQuestion | null;
  currentAyushIndex: number;
  chatHistory: ChatMessage[];
  selectedOptionsMap: Record<string, string[]>;
  socratesDetails: SocratesDetails;
  ayushAssessment: AyushAssessment;
  redFlagAlert: RedFlagAlert;
  isMicActive: boolean;
  isAiThinking: boolean;
  setMicActive: (active: boolean) => void;
  handleOptionSelect: (questionId: string, option: QuestionOption) => void;
  handleAyushOptionSelect: (questionId: string, optionId: string) => void;
  handleVoiceTextInput: (text: string) => void;
  dismissRedFlagModal: () => void;

  // OCR Scan State
  scannedDocs: ScannedDocument[];
  isScanningDoc: boolean;
  activeScanningDocId: string | null;
  uploadAndScanDoc: (sampleIndex?: number) => void;
  removeScannedDoc: (id: string) => void;

  // Summary & Completion
  generatedSummary: StructuredClinicalSummary | null;
  generatedToken: string;
  assignedRoom: string;
  assignedDoctor: string;
  isGeneratingSummary: boolean;
  completeIntakeSession: () => PatientQueueItem;
  resetKioskSession: () => void;
}

const DEFAULT_PATIENT: PatientIdentification = {
  abhaId: '91-5544-3322-1100',
  abhaAddress: 'anand.sharma@abdm',
  name: 'Anand Sharma',
  age: 52,
  gender: 'male',
  phone: '+91 98201 54321',
  isNewPatient: false,
};

const DEFAULT_CONSENT: ConsentPreferences = {
  clinicalHistory: true,
  ocrPrescription: true,
  ayushDiagnostics: true,
  abdmSync: true,
};

const DEFAULT_AYUSH: AyushAssessment = {
  modeActive: false,
  prakriti: {
    primary: 'Vata-Pitta',
    vataPercentage: 45,
    pittaPercentage: 40,
    kaphaPercentage: 15,
  },
  agni: 'Vishama Agni (Irregular/Vata)',
  koshtha: 'Madhyama (Moderate/Kapha)',
  nidra: 'Alpa (Insomnia/Disturbed)',
  bala: 'Madhyama (Medium)',
  notes: 'Evaluated via MediKiosk Dashavidha Pariksha Module',
};

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export function KioskProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Patient & Consent
  const [patientInfo, setPatientInfo] = useState<PatientIdentification>(DEFAULT_PATIENT);
  const [consent, setConsent] = useState<ConsentPreferences>(DEFAULT_CONSENT);

  // Mode
  const [intakeMode, setIntakeMode] = useState<'allopathy' | 'ayush'>('allopathy');

  // Interview
  const [currentQuestion, setCurrentQuestion] = useState<ClinicalQuestion | null>(CHIEF_COMPLAINT_QUESTION);
  const [currentAyushIndex, setCurrentAyushIndex] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: 'Namaste! I am MediKiosk Clinical AI. What primary health symptom or discomfort is troubling you today?',
      timestamp: 'Just now',
    },
  ]);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, string[]>>({});
  const [socratesDetails, setSocratesDetails] = useState<SocratesDetails>({
    associations: [],
    severityScore: 5,
  });
  const [ayushAssessment, setAyushAssessment] = useState<AyushAssessment>(DEFAULT_AYUSH);
  const [redFlagAlert, setRedFlagAlert] = useState<RedFlagAlert>({
    isTriggered: false,
    severity: 'urgent',
    title: '',
    subtitle: '',
    protocolAction: '',
    suggestedDepartment: '',
  });
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // OCR
  const [scannedDocs, setScannedDocs] = useState<ScannedDocument[]>([SAMPLE_SCANNED_DOCUMENTS[0]]);
  const [isScanningDoc, setIsScanningDoc] = useState<boolean>(false);
  const [activeScanningDocId, setActiveScanningDocId] = useState<string | null>(null);

  // Generated Summary
  const [generatedSummary, setGeneratedSummary] = useState<StructuredClinicalSummary | null>(null);
  const [generatedToken, setGeneratedToken] = useState<string>('OPD-108');
  const [assignedRoom, setAssignedRoom] = useState<string>('Room 04 - General Medicine');
  const [assignedDoctor, setAssignedDoctor] = useState<string>('Dr. Alok Verma, MD');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false);

  const goToStep = (step: number) => {
    soundEffects.playTap();
    setCurrentStep(step);
  };

  const nextStep = () => {
    soundEffects.playTap();
    if (currentStep === 3) {
      triggerSummaryGeneration();
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    soundEffects.playTap();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updatePatientInfo = (info: Partial<PatientIdentification>) => {
    setPatientInfo((prev) => ({ ...prev, ...info }));
  };

  const loadDemoPatient = () => {
    soundEffects.playTap();
    setPatientInfo({
      abhaId: '91-7788-9900-1122',
      abhaAddress: 'meera.patel34@abdm',
      name: 'Meera Patel',
      age: 34,
      gender: 'female',
      phone: '+91 98450 12345',
      isNewPatient: false,
    });
  };

  const toggleConsent = (key: keyof ConsentPreferences) => {
    soundEffects.playTap();
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checkRedFlagCriteria = (option: QuestionOption, currentSocrates: SocratesDetails) => {
    // Severe chest pain + left radiation or crushing
    if (option.isRedFlagTrigger || (currentSocrates.site?.includes('Substernal') && option.id === 'rad_left_arm_jaw')) {
      const alertData: RedFlagAlert = {
        isTriggered: true,
        severity: 'critical',
        title: 'CRITICAL TRIAGE ALERT — Triage Level 1 (Emergency)',
        subtitle: 'Severe Acute Coronary Syndrome (ACS) / Respiratory distress indicators detected.',
        protocolAction: 'Crash Cart & Emergency 12-lead ECG Protocol Stat activated. On-duty Medical Officer alerted.',
        suggestedDepartment: 'Emergency Resuscitation / Room 01',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setRedFlagAlert(alertData);
      soundEffects.playRedFlagAlert();
    }
  };

  const handleOptionSelect = (questionId: string, option: QuestionOption) => {
    soundEffects.playTap();

    // Append to chat history
    const patientMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'patient',
      text: option.label,
      timestamp: 'Just now',
    };

    setChatHistory((prev) => [...prev, patientMessage]);

    // Update selected map
    setSelectedOptionsMap((prev) => ({
      ...prev,
      [questionId]: [option.id],
    }));

    // Update SOCRATES data
    const updatedSocrates = { ...socratesDetails };
    if (questionId === 'q_chief_complaint') {
      // Chief complaint
    } else if (questionId === 'q_chest_site' || questionId === 'q_joint_location' || questionId === 'q_abdomen_location') {
      updatedSocrates.site = option.categoryValue || option.label;
    } else if (questionId === 'q_chest_onset' || questionId === 'q_fever_duration' || questionId === 'q_chronic_duration') {
      updatedSocrates.onset = option.categoryValue || option.label;
    } else if (questionId === 'q_chest_character' || questionId === 'q_fever_pattern' || questionId === 'q_joint_stiffness') {
      updatedSocrates.character = option.categoryValue || option.label;
    } else if (questionId === 'q_chest_radiation') {
      updatedSocrates.radiation = option.categoryValue || option.label;
    } else if (questionId === 'q_chest_associations' || questionId === 'q_fever_cough_type') {
      updatedSocrates.associations = [...(updatedSocrates.associations || []), option.categoryValue || option.label];
    } else if (questionId === 'q_severity_slider') {
      if (option.id.includes('9_10')) updatedSocrates.severityScore = 9;
      else if (option.id.includes('7_8')) updatedSocrates.severityScore = 8;
      else if (option.id.includes('4_6')) updatedSocrates.severityScore = 5;
      else updatedSocrates.severityScore = 2;
    }

    setSocratesDetails(updatedSocrates);
    checkRedFlagCriteria(option, updatedSocrates);

    // AI Thinking & Next Question transition
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);

      let nextQId = option.triggersFollowUp || currentQuestion?.nextDefaultQuestionId;
      if (!nextQId && questionId === 'q_severity_slider') {
        // Concluded interview!
        const aiClosingMsg: ChatMessage = {
          id: `msg-close-${Date.now()}`,
          sender: 'ai',
          text: 'Thank you. Your symptom timeline and clinical history have been recorded accurately. Please proceed to scan any previous prescriptions or lab test reports.',
          timestamp: 'Just now',
        };
        setChatHistory((prev) => [...prev, aiClosingMsg]);
        setCurrentQuestion(null);
        return;
      }

      if (nextQId && CLINICAL_QUESTION_DATABASE[nextQId]) {
        const nextQ = CLINICAL_QUESTION_DATABASE[nextQId];
        setCurrentQuestion(nextQ);
        const aiNextMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: 'ai',
          text: nextQ.titleEn,
          timestamp: 'Just now',
        };
        setChatHistory((prev) => [...prev, aiNextMsg]);
      }
    }, 600);
  };

  const handleAyushOptionSelect = (questionId: string, optionId: string) => {
    soundEffects.playTap();
    const q = AYUSH_PARIKSHA_QUESTIONS[currentAyushIndex];
    if (!q) return;

    const opt = q.options.find((o) => o.id === optionId);
    if (!opt) return;

    // Append to chat
    const patientMsg: ChatMessage = {
      id: `msg-ayu-${Date.now()}`,
      sender: 'patient',
      text: `${q.titleSanskrit}: ${opt.labelEn}`,
      timestamp: 'Just now',
    };
    setChatHistory((prev) => [...prev, patientMsg]);

    // Recalculate Prakriti/Dosha percentages
    setAyushAssessment((prev) => {
      const v = prev.prakriti.vataPercentage + (opt.dosha === 'vata' ? 15 : -5);
      const p = prev.prakriti.pittaPercentage + (opt.dosha === 'pitta' ? 15 : -5);
      const k = prev.prakriti.kaphaPercentage + (opt.dosha === 'kapha' ? 15 : -5);
      const total = Math.max(1, v + p + k);

      let agniVal = prev.agni;
      let koshthaVal = prev.koshtha;
      let nidraVal = prev.nidra;
      let balaVal = prev.bala;

      if (q.dimension === 'agni') {
        if (opt.id === 'opt_vishama_agni') agniVal = 'Vishama Agni (Irregular/Vata)';
        else if (opt.id === 'opt_tikshna_agni') agniVal = 'Tikshna Agni (Hyper/Pitta)';
        else if (opt.id === 'opt_manda_agni') agniVal = 'Manda Agni (Sluggish/Kapha)';
        else agniVal = 'Sama Agni (Balanced)';
      } else if (q.dimension === 'koshtha') {
        if (opt.id === 'opt_krura_koshtha') koshthaVal = 'Krura (Hard/Constipated/Vata)';
        else if (opt.id === 'opt_mrudu_koshtha') koshthaVal = 'Mrudu (Soft/Pitta)';
        else koshthaVal = 'Madhyama (Moderate/Kapha)';
      } else if (q.dimension === 'nidra') {
        if (opt.id === 'opt_alpa_nidra') nidraVal = 'Alpa (Insomnia/Disturbed)';
        else if (opt.id === 'opt_ati_nidra') nidraVal = 'Ati (Excessive/Lethargic)';
        else nidraVal = 'Samyak (Sound)';
      } else if (q.dimension === 'bala') {
        if (opt.id === 'opt_vata_bala') balaVal = 'Avara (Mild/Low)';
        else if (opt.id === 'opt_pitta_bala') balaVal = 'Madhyama (Medium)';
        else balaVal = 'Pravara (Superior)';
      }

      return {
        ...prev,
        modeActive: true,
        prakriti: {
          primary: v > p && v > k ? 'Vata' : p > v && p > k ? 'Pitta' : 'Vata-Pitta',
          vataPercentage: Math.round((v / total) * 100),
          pittaPercentage: Math.round((p / total) * 100),
          kaphaPercentage: Math.round((k / total) * 100),
        },
        agni: agniVal,
        koshtha: koshthaVal,
        nidra: nidraVal,
        bala: balaVal,
      };
    });

    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      if (currentAyushIndex + 1 < AYUSH_PARIKSHA_QUESTIONS.length) {
        setCurrentAyushIndex((prev) => prev + 1);
        const nextQ = AYUSH_PARIKSHA_QUESTIONS[currentAyushIndex + 1];
        setChatHistory((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'ai',
            text: `${nextQ.titleSanskrit} — ${nextQ.titleEn}`,
            timestamp: 'Just now',
          },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            id: `msg-done-${Date.now()}`,
            sender: 'ai',
            text: 'Dashavidha Pariksha completed! Prakriti, Agni, and Koshtha have been mapped for your Ayurvedic doctor.',
            timestamp: 'Just now',
          },
        ]);
      }
    }, 500);
  };

  const handleVoiceTextInput = (text: string) => {
    soundEffects.playTap();
    const patientMsg: ChatMessage = {
      id: `msg-voice-${Date.now()}`,
      sender: 'patient',
      text: text,
      timestamp: 'Just now',
    };
    setChatHistory((prev) => [...prev, patientMsg]);

    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      setChatHistory((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'ai',
          text: `Understood: "${text}". I have mapped this into your clinical history.`,
          timestamp: 'Just now',
        },
      ]);
    }, 700);
  };

  const dismissRedFlagModal = () => {
    soundEffects.playTap();
    setRedFlagAlert((prev) => ({ ...prev, isTriggered: false }));
  };

  const uploadAndScanDoc = (sampleIndex: number = 0) => {
    const docToScan = SAMPLE_SCANNED_DOCUMENTS[sampleIndex] || SAMPLE_SCANNED_DOCUMENTS[0];
    setIsScanningDoc(true);
    setActiveScanningDocId(docToScan.id);

    setTimeout(() => {
      soundEffects.playScanSuccess();
      setIsScanningDoc(false);
      setActiveScanningDocId(null);
      if (!scannedDocs.some((d) => d.id === docToScan.id)) {
        setScannedDocs((prev) => [...prev, docToScan]);
      }
    }, 2200);
  };

  const removeScannedDoc = (id: string) => {
    soundEffects.playTap();
    setScannedDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const triggerSummaryGeneration = () => {
    setIsGeneratingSummary(true);
    const isRed = redFlagAlert.title !== '';
    const isAyush = intakeMode === 'ayush';

    const token = generateToken(isRed ? 'OPD-EMG' : isAyush ? 'OPD-AYU' : 'OPD-MED');
    setGeneratedToken(token);

    if (isRed) {
      setAssignedRoom('Resuscitation / Room 01');
      setAssignedDoctor('Dr. Alok Verma, MD (Emergency)');
    } else if (isAyush) {
      setAssignedRoom('Ayush OPD / Room 08');
      setAssignedDoctor('Vaidya Harishankar Shastri, MD (Ayu)');
    } else {
      setAssignedRoom('Medicine OPD / Room 04');
      setAssignedDoctor('Dr. Meenakshi Sunder, MD');
    }

    setTimeout(() => {
      soundEffects.playSuccess();
      setIsGeneratingSummary(false);

      const summary: StructuredClinicalSummary = {
        chiefComplaint: socratesDetails.site
          ? `${socratesDetails.character || 'Pain'} in ${socratesDetails.site} for ${socratesDetails.onset || 'recent duration'}`
          : 'Clinical consultation intake recorded via MediKiosk',
        hpi: `Patient presents with ${socratesDetails.character || 'discomfort'} at ${socratesDetails.site || 'primary site'}. ${
          socratesDetails.radiation ? `Radiates to ${socratesDetails.radiation}. ` : ''
        }${socratesDetails.associations && socratesDetails.associations.length > 0 ? `Associated symptoms: ${socratesDetails.associations.join(', ')}. ` : ''}Severity rated ${socratesDetails.severityScore || 5}/10 on visual analogue scale.`,
        socratesDetails: socratesDetails,
        ayushAssessment: intakeMode === 'ayush' ? ayushAssessment : undefined,
        pastMedicalHistory: ['Hypertension (reported)', 'Type 2 Diabetes Mellitus (suspect)'],
        pastSurgicalHistory: ['Nil major surgeries'],
        medications: scannedDocs.flatMap((d) => d.extractedData.medications),
        allergies: ['No known drug allergies (NKDA)'],
        familyHistory: ['Father had ischemic heart disease', 'Mother had hypertension'],
        personalHistory: {
          diet: 'Mixed Indian diet, irregular timings',
          smoking: 'Non-smoker',
          alcohol: 'Nil',
          physicalActivity: 'Sedentary',
          sleepPattern: ayushAssessment.nidra || '6 hours / interrupted',
        },
        reviewOfSystems: {
          cvs: isRed ? 'Acute chest discomfort, diaphoresis' : 'Stable hemodynamics',
          rs: 'Bilateral vesicular breath sounds',
          git: 'Normal appetite and digestion',
          cns: 'Conscious, alert, oriented',
          msk: 'No focal motor deficits',
          general: 'Well-oriented, afebrile',
        },
        priorInvestigations: scannedDocs.flatMap((d) => d.extractedData.labBiomarkers),
        aiConfidenceScore: 98.4,
        doctorApprovalStatus: 'draft',
      };

      setGeneratedSummary(summary);
    }, 2400);
  };

  const completeIntakeSession = (): PatientQueueItem => {
    const isRed = redFlagAlert.title !== '';
    const isAyush = intakeMode === 'ayush';

    const queueItem: PatientQueueItem = {
      id: `pat-${Date.now()}`,
      tokenNumber: generatedToken,
      triageLevel: isRed ? 'red' : isAyush ? 'ayush' : 'green',
      patient: patientInfo,
      intakeTime: 'Just now (Kiosk #01)',
      chiefComplaint: generatedSummary?.chiefComplaint || 'OPD Intake Case',
      mode: isAyush ? 'ayush' : 'allopathy',
      redFlagAlert: isRed ? redFlagAlert : undefined,
      summary: generatedSummary || ({} as StructuredClinicalSummary),
      documents: scannedDocs,
      assignedDoctor: assignedDoctor,
      assignedRoom: assignedRoom,
      status: 'waiting',
      timeSavedMinutes: 7.0,
    };

    return queueItem;
  };

  const resetKioskSession = () => {
    soundEffects.playTap();
    setCurrentStep(0);
    setPatientInfo(DEFAULT_PATIENT);
    setConsent(DEFAULT_CONSENT);
    setIntakeMode('allopathy');
    setCurrentQuestion(CHIEF_COMPLAINT_QUESTION);
    setCurrentAyushIndex(0);
    setChatHistory([
      {
        id: 'msg-init-reset',
        sender: 'ai',
        text: 'Namaste! I am MediKiosk Clinical AI. What primary health symptom or discomfort is troubling you today?',
        timestamp: 'Just now',
      },
    ]);
    setSelectedOptionsMap({});
    setSocratesDetails({ associations: [], severityScore: 5 });
    setAyushAssessment(DEFAULT_AYUSH);
    setRedFlagAlert({
      isTriggered: false,
      severity: 'urgent',
      title: '',
      subtitle: '',
      protocolAction: '',
      suggestedDepartment: '',
    });
    setScannedDocs([SAMPLE_SCANNED_DOCUMENTS[0]]);
    setGeneratedSummary(null);
  };

  return (
    <KioskContext.Provider
      value={{
        currentStep,
        goToStep,
        nextStep,
        prevStep,
        patientInfo,
        updatePatientInfo,
        loadDemoPatient,
        consent,
        toggleConsent,
        intakeMode,
        setIntakeMode,
        currentQuestion,
        currentAyushIndex,
        chatHistory,
        selectedOptionsMap,
        socratesDetails,
        ayushAssessment,
        redFlagAlert,
        isMicActive,
        isAiThinking,
        setMicActive: setIsMicActive,
        handleOptionSelect,
        handleAyushOptionSelect,
        handleVoiceTextInput,
        dismissRedFlagModal,
        scannedDocs,
        isScanningDoc,
        activeScanningDocId,
        uploadAndScanDoc,
        removeScannedDoc,
        generatedSummary,
        generatedToken,
        assignedRoom,
        assignedDoctor,
        isGeneratingSummary,
        completeIntakeSession,
        resetKioskSession,
      }}
    >
      {children}
    </KioskContext.Provider>
  );
}

export function useKiosk() {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
}
