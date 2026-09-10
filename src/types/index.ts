export type LanguageCode = 'en' | 'hi' | 'ta' | 'mr' | 'gu' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  subLabel: string;
  flagEmoji: string;
  sampleAudioText: string;
}

export interface PatientIdentification {
  abhaId: string;
  abhaAddress: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  avatarUrl?: string;
  isNewPatient?: boolean;
}

export interface ConsentPreferences {
  clinicalHistory: boolean;
  ocrPrescription: boolean;
  ayushDiagnostics: boolean;
  abdmSync: boolean;
}

export interface SocratesDetails {
  site?: string;
  onset?: string;
  character?: string;
  radiation?: string;
  associations?: string[];
  timeCourse?: string;
  exacerbatingRelieving?: string;
  severityScore?: number; // 1 to 10
}

export interface AyushAssessment {
  modeActive: boolean;
  prakriti: {
    primary:
      | 'Vata'
      | 'Pitta'
      | 'Kapha'
      | 'Vata-Pitta'
      | 'Pitta-Vata'
      | 'Pitta-Kapha'
      | 'Kapha-Pitta'
      | 'Vata-Kapha'
      | 'Kapha-Vata'
      | 'Tridosha';
    vataPercentage: number;
    pittaPercentage: number;
    kaphaPercentage: number;
  };
  agni: 'Sama Agni (Balanced)' | 'Vishama Agni (Irregular/Vata)' | 'Tikshna Agni (Hyper/Pitta)' | 'Manda Agni (Sluggish/Kapha)';
  koshtha: 'Mrudu (Soft/Pitta)' | 'Madhyama (Moderate/Kapha)' | 'Krura (Hard/Constipated/Vata)';
  nidra: 'Samyak (Sound)' | 'Alpa (Insomnia/Disturbed)' | 'Ati (Excessive/Lethargic)';
  bala: 'Pravara (Superior)' | 'Madhyama (Medium)' | 'Avara (Mild/Low)';
  notes?: string;
}

export interface RedFlagAlert {
  isTriggered: boolean;
  severity: 'critical' | 'urgent';
  title: string;
  subtitle: string;
  protocolAction: string;
  suggestedDepartment: string;
  timestamp?: string;
}

export interface ScannedMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  confidence: number;
}

export interface ScannedBiomarker {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
  severity?: 'normal' | 'high' | 'low' | 'critical';
}

export interface ScannedDocument {
  id: string;
  title: string;
  type: 'prescription' | 'lab_report' | 'ayurveda_rx' | 'discharge_summary';
  date: string;
  facility: string;
  doctorName?: string;
  confidenceScore: number;
  rawTextPreview?: string;
  extractedData: {
    diagnoses: string[];
    medications: ScannedMedication[];
    labBiomarkers: ScannedBiomarker[];
    ayushFormulations?: string[];
    specialInstructions?: string[];
  };
}

export interface StructuredClinicalSummary {
  chiefComplaint: string;
  hpi: string;
  socratesDetails: SocratesDetails;
  ayushAssessment?: AyushAssessment;
  pastMedicalHistory: string[];
  pastSurgicalHistory: string[];
  medications: ScannedMedication[];
  allergies: string[];
  familyHistory: string[];
  personalHistory: {
    diet: string;
    smoking: string;
    alcohol: string;
    physicalActivity: string;
    sleepPattern: string;
  };
  reviewOfSystems: {
    cvs: string;
    rs: string;
    git: string;
    cns: string;
    msk: string;
    general: string;
  };
  priorInvestigations: ScannedBiomarker[];
  aiConfidenceScore: number;
  doctorApprovalStatus: 'draft' | 'reviewed' | 'approved' | 'modified';
  doctorNotes?: string;
}

export interface PatientQueueItem {
  id: string;
  tokenNumber: string;
  triageLevel: 'red' | 'yellow' | 'green' | 'ayush';
  patient: PatientIdentification;
  intakeTime: string;
  chiefComplaint: string;
  mode: 'allopathy' | 'ayush' | 'integrated';
  redFlagAlert?: RedFlagAlert;
  summary: StructuredClinicalSummary;
  documents: ScannedDocument[];
  assignedDoctor: string;
  assignedRoom: string;
  status: 'waiting' | 'in_consultation' | 'completed';
  consultationDurationSeconds?: number;
  timeSavedMinutes: number;
}
