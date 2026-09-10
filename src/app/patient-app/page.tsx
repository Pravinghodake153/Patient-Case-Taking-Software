'use client';

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Stethoscope,
  Clock,
  MapPin,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Download,
  CheckCircle2,
  Sparkles,
  Leaf,
} from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';

export default function PatientMobileAppPage() {
  const { patientInfo, generatedToken, assignedRoom, assignedDoctor, generatedSummary, intakeMode, ayushAssessment } =
    useKiosk();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 transition-colors select-none">
      {/* Mobile Screen Container */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-5 text-white space-y-3">
          <div className="flex items-center justify-between">
            <Link
              href="/kiosk"
              className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono bg-white/20 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MediKiosk Companion</span>
            </div>
            <button
              onClick={() => alert('Summary link copied to clipboard for WhatsApp / SMS.')}
              className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-teal-100 font-bold">Your Live OPD Token</p>
            <p className="text-4xl font-mono font-black tracking-tight">{generatedToken || 'OPD-108'}</p>
            <p className="text-xs text-teal-100">{patientInfo.name} • ABHA: {patientInfo.abhaId}</p>
          </div>
        </div>

        {/* Status Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(100vh-220px)]">
          {/* Live Queue Box */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Live Waitlist Status</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">2 Patients Ahead</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
              ~ 6 Mins
            </span>
          </div>

          {/* Assigned Room & Doctor */}
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Consultation Room</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{assignedRoom || 'Room 04 - General Medicine'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Attending Doctor</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{assignedDoctor || 'Dr. Alok Verma, MD'}</p>
              </div>
            </div>
          </div>

          {/* Recorded Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Recorded Case Summary</span>
              </span>
              <span className="text-[10px] text-teal-600 font-bold">ABDM Synced</span>
            </div>

            <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 leading-relaxed">
              <p>
                <strong>Complaint:</strong> {generatedSummary?.chiefComplaint || 'Pre-consultation clinical history recorded.'}
              </p>
              {intakeMode === 'ayush' && ayushAssessment.modeActive && (
                <p className="text-amber-700 dark:text-amber-400 font-medium">
                  <strong>Prakriti:</strong> {ayushAssessment.prakriti.primary} • Agni: {ayushAssessment.agni}
                </p>
              )}
            </div>

            <button
              onClick={() => alert('Downloading official encrypted ABDM FHIR PDF case sheet.')}
              className="w-full mt-2 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Case Sheet PDF</span>
            </button>
          </div>

          {/* ABDM Security Footer */}
          <div className="text-center space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="flex items-center justify-center gap-1 font-semibold text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secured under Ayushman Bharat Digital Mission</span>
            </p>
            <p>Smart India Hackathon • SIH26047 (Ministry of Ayush)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
