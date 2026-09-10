'use client';

import React from 'react';
import {
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Printer,
  Sparkles,
  Send,
  Heart,
  Activity,
  Flame,
  Pill,
  Leaf,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { usePhysician } from '@/context/PhysicianContext';
import { ConsultationTimer } from './ConsultationTimer';
import { InlineEditableSection } from './InlineEditableSection';
import { DocumentTimeline } from './DocumentTimeline';

export const ClinicalSummaryView: React.FC = () => {
  const { selectedPatient, updateClinicalSummary, approveAndPushToEHR, generatePrescription, notificationMessage } =
    usePhysician();

  if (!selectedPatient) {
    return (
      <div className="flex-1 p-12 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
        <Stethoscope className="w-12 h-12 text-slate-300 dark:text-slate-700" />
        <p className="text-sm font-semibold">Select a patient from the queue to review structured clinical history.</p>
      </div>
    );
  }

  const { patient, summary, redFlagAlert, documents, mode } = selectedPatient;
  const isRed = selectedPatient.triageLevel === 'red' || redFlagAlert?.isTriggered;
  const isAyush = mode === 'ayush' || selectedPatient.triageLevel === 'ayush';

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Toast Notification if active */}
      {notificationMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Patient Top Header Strip */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                isRed
                  ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300'
                  : isAyush
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300'
                  : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300'
              }`}
            >
              {selectedPatient.tokenNumber}
            </span>

            {isRed && (
              <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                <span>Critical Red Flag</span>
              </span>
            )}

            {isAyush && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300">
                AYUSH OPD Intake
              </span>
            )}

            <span className="text-xs text-slate-400 font-mono">ABHA: {patient.abhaId}</span>
          </div>

          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
            {patient.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {patient.age} years • {patient.gender.toUpperCase()} • Phone: {patient.phone} • Intake: {selectedPatient.intakeTime}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ConsultationTimer />
        </div>
      </div>

      {/* AI Disclaimer Alert */}
      <div className="p-3.5 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/80 flex items-center justify-between text-xs text-teal-950 dark:text-teal-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong>AI Pre-Consultation Intake Draft:</strong> Synthesized by MediKiosk Engine (Confidence: {summary.aiConfidenceScore}%). Doctor review and validation required prior to prescription issuance.
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
          Status: {summary.doctorApprovalStatus.toUpperCase()}
        </span>
      </div>

      {/* Red Flag Details if active */}
      {redFlagAlert?.isTriggered && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border-2 border-red-500 text-red-950 dark:text-red-200 space-y-1">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{redFlagAlert.title}</span>
          </div>
          <p className="text-xs">{redFlagAlert.subtitle}</p>
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">
            Action Protocol: {redFlagAlert.protocolAction}
          </p>
        </div>
      )}

      {/* Structured Clinical Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Col 1 */}
        <div className="space-y-4">
          <InlineEditableSection
            title="1. Chief Complaint & Timeline"
            initialContent={summary.chiefComplaint}
            onSave={(val) => updateClinicalSummary({ chiefComplaint: val })}
          />

          <InlineEditableSection
            title="2. History of Presenting Illness (HPI - SOCRATES)"
            initialContent={summary.hpi}
            onSave={(val) => updateClinicalSummary({ hpi: val })}
          />

          {summary.ayushAssessment?.modeActive && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-amber-100/40 dark:from-amber-950/30 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <h3 className="font-display font-bold text-sm text-amber-950 dark:text-amber-200">
                    3. Ayurvedic Dashavidha Pariksha Findings
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                  Prakriti: {summary.ayushAssessment.prakriti.primary}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/60">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Agni (पाचन)</p>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{summary.ayushAssessment.agni}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/60">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Koshtha (कोष्ठ)</p>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{summary.ayushAssessment.koshtha}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/60">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Nidra (निद्रा)</p>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{summary.ayushAssessment.nidra}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/60">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Bala (बल)</p>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{summary.ayushAssessment.bala}</p>
                </div>
              </div>

              <p className="text-xs text-amber-900 dark:text-amber-200/90 italic leading-relaxed">
                {summary.ayushAssessment.notes}
              </p>
            </div>
          )}

          <InlineEditableSection
            title="4. Past Medical & Surgical History"
            initialContent={`Medical: ${summary.pastMedicalHistory.join(', ')}\nSurgical: ${summary.pastSurgicalHistory.join(', ')}`}
            onSave={(val) => updateClinicalSummary({ pastMedicalHistory: [val] })}
          />
        </div>

        {/* Col 2 */}
        <div className="space-y-4">
          <InlineEditableSection
            title="5. Current Medications & Drug Allergies"
            badgeType={summary.allergies.some((a) => !a.includes('NKDA')) ? 'emergency' : 'ai'}
            badgeText={summary.allergies.some((a) => !a.includes('NKDA')) ? 'ALLERGY WARNING' : 'Medication Statement'}
            initialContent={`Medications:\n${summary.medications.map((m) => `• ${m.name} (${m.dosage}) - ${m.frequency} [${m.duration}]`).join('\n') || '• Nil ongoing medications'}\n\nAllergies:\n${summary.allergies.join(', ')}`}
            onSave={(val) => updateClinicalSummary({ allergies: [val] })}
          />

          <InlineEditableSection
            title="6. Personal & Lifestyle History"
            initialContent={`Diet: ${summary.personalHistory.diet}\nSmoking / Tobacco: ${summary.personalHistory.smoking}\nAlcohol: ${summary.personalHistory.alcohol}\nPhysical Activity: ${summary.personalHistory.physicalActivity}\nSleep Pattern: ${summary.personalHistory.sleepPattern}`}
            onSave={() => {}}
          />

          <InlineEditableSection
            title="7. Review of Systems (ROS)"
            initialContent={`CVS: ${summary.reviewOfSystems.cvs}\nRS: ${summary.reviewOfSystems.rs}\nGIT: ${summary.reviewOfSystems.git}\nCNS: ${summary.reviewOfSystems.cns}\nMSK: ${summary.reviewOfSystems.msk}\nGeneral: ${summary.reviewOfSystems.general}`}
            onSave={() => {}}
          />
        </div>
      </div>

      {/* Document Timeline Section */}
      <DocumentTimeline documents={documents} />

      {/* Doctor Action Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Doctor Digital Signature • ABDM HIP/HIU Certified</span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={generatePrescription}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Pill className="w-3.5 h-3.5 text-teal-600" />
            <span>Generate Digital Rx</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Print Case Sheet</span>
          </button>

          <button
            onClick={approveAndPushToEHR}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold shadow-lg shadow-teal-600/20 flex items-center gap-2 active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Push to ABDM EHR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
