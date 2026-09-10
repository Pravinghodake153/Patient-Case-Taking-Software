'use client';

import React from 'react';
import { AlertOctagon, Siren, PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';

export const RedFlagModal: React.FC = () => {
  const { redFlagAlert, dismissRedFlagModal } = useKiosk();

  if (!redFlagAlert.isTriggered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-red-500 overflow-hidden text-slate-900 dark:text-white">
        {/* Urgent Header Banner */}
        <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-700 p-6 text-white flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md animate-bounce">
            <Siren className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white text-red-800 text-xs font-black uppercase tracking-wider">
                Triage Level 1 • Priority Alert
              </span>
              <span className="text-xs text-red-100 font-mono">{redFlagAlert.timestamp || 'STAT'}</span>
            </div>
            <h3 className="text-xl font-black mt-1 tracking-tight">
              {redFlagAlert.title || 'CRITICAL EMERGENCY SYMPTOM DETECTED'}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3">
            <AlertOctagon className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-950 dark:text-red-200 text-sm sm:text-base">
                {redFlagAlert.subtitle}
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                Our AI triage engine has flagged acute high-risk symptoms requiring immediate emergency clinical evaluation.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Automated Hospital Protocol Actions Triggered:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>OPD Nursing Station & Senior Medical Officer Alerted on Dashboard</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Priority Token <strong className="text-red-600 dark:text-red-400">OPD-EMG-101</strong> assigned to <strong className="text-slate-900 dark:text-white">{redFlagAlert.suggestedDepartment}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={dismissRedFlagModal}
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Acknowledge & Proceed to Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
