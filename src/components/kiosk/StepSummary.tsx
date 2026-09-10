'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  QrCode,
  Clock,
  MapPin,
  UserCheck,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Printer,
  Smartphone,
  RotateCcw,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';
import { usePhysician } from '@/context/PhysicianContext';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

export const StepSummary: React.FC = () => {
  const {
    patientInfo,
    generatedSummary,
    generatedToken,
    assignedRoom,
    assignedDoctor,
    isGeneratingSummary,
    completeIntakeSession,
    resetKioskSession,
    intakeMode,
    ayushAssessment,
  } = useKiosk();

  const { addNewKioskPatient } = usePhysician();
  const { t } = useLanguage();

  React.useEffect(() => {
    if (!isGeneratingSummary) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti is optional
      }
    }
  }, [isGeneratingSummary]);

  const handleFinishAndPush = () => {
    const queueItem = completeIntakeSession();
    addNewKioskPatient(queueItem);
  };

  if (isGeneratingSummary) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-6 select-none">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-teal-200 dark:border-teal-900 border-t-teal-600 animate-spin" />
          <Sparkles className="w-8 h-8 text-teal-600 absolute inset-0 m-auto animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">
            {t('summaryGenerating', 'Synthesizing Clinical Case Sheet...')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Mapping SOCRATES symptom tree, extracted lab biomarkers & AYUSH Dashavidha Pariksha into ABDM FHIR R4 schema.
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 animate-shimmer w-full" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Voice & OCR Intake</span>
            <span>FHIR Structuring</span>
            <span>Physician Queue Sync</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8 select-none">
      {/* Success Notification Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl shadow-teal-700/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
              Intake Completed Successfully
            </span>
            <h2 className="font-display font-black text-2xl tracking-tight mt-0.5">
              {t('tokenGenerated', 'Your OPD Token Number is Ready')}
            </h2>
            <p className="text-xs text-emerald-100">
              Your clinical history has been transmitted directly to your doctor's workstation.
            </p>
          </div>
        </div>

        <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl shadow-md text-center shrink-0">
          <p className="text-[10px] uppercase font-bold text-slate-400">Token Number</p>
          <p className="text-2xl sm:text-3xl font-mono font-black text-teal-700">{generatedToken}</p>
        </div>
      </div>

      {/* OPD Routing & Queue Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">{t('assignedRoom', 'Room')}</span>
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">{assignedRoom}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Ground Floor • West Wing</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <Stethoscope className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">{t('assignedDoctor', 'Physician')}</span>
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">{assignedDoctor}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Consultation Status: Active</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">{t('waitEstimate', 'Wait Time')}</span>
          </div>
          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">~ 6 Minutes</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">2 Patients Ahead in Queue</p>
        </div>
      </div>

      {/* Generated Clinical Summary Preview Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Generated Pre-Consultation Summary (Patient Copy)
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 font-bold">
            ABDM ABHA Linked: {patientInfo.abhaId}
          </span>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div>
            <strong className="text-slate-900 dark:text-white">Chief Complaint: </strong>
            {generatedSummary?.chiefComplaint}
          </div>

          <div>
            <strong className="text-slate-900 dark:text-white">History of Present Illness (HPI): </strong>
            {generatedSummary?.hpi}
          </div>

          {intakeMode === 'ayush' && ayushAssessment.modeActive && (
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 space-y-1">
              <strong className="text-amber-900 dark:text-amber-300">Ayurvedic Dashavidha Pariksha Findings:</strong>
              <p>
                Primary Prakriti: <strong>{ayushAssessment.prakriti.primary}</strong> (Vata {ayushAssessment.prakriti.vataPercentage}%, Pitta {ayushAssessment.prakriti.pittaPercentage}%, Kapha {ayushAssessment.prakriti.kaphaPercentage}%) • Agni: {ayushAssessment.agni} • Koshtha: {ayushAssessment.koshtha} • Nidra: {ayushAssessment.nidra}
              </p>
            </div>
          )}

          {generatedSummary?.medications && generatedSummary.medications.length > 0 && (
            <div>
              <strong className="text-slate-900 dark:text-white">Extracted Current Medications: </strong>
              {generatedSummary.medications.map((m) => `${m.name} (${m.dosage})`).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Companion / QR & Actions */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <QrCode className="w-12 h-12 text-slate-800 dark:text-slate-200" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-teal-600" />
              <span>Track OPD Token on your Smartphone</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Scan with your phone camera to view live queue position or open the mobile companion app.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/patient-app"
            onClick={handleFinishAndPush}
            className="px-4 py-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-bold hover:bg-teal-100 flex items-center gap-1.5 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open Mobile View</span>
          </Link>

          <Link
            href="/dashboard"
            onClick={handleFinishAndPush}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-teal-400" />
            <span>Go to Doctor Portal</span>
          </Link>

          <button
            onClick={() => {
              handleFinishAndPush();
              resetKioskSession();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Finish & Next Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};
