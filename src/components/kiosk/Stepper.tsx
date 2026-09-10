'use client';

import React from 'react';
import { Check, Globe, UserCheck, MessageSquareHeart, ScanLine, FileCheck2 } from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';
import { useLanguage } from '@/context/LanguageContext';

export const Stepper: React.FC = () => {
  const { currentStep, goToStep } = useKiosk();
  const { t } = useLanguage();

  const steps = [
    { index: 0, key: 'step0', defaultLabel: 'Language', icon: Globe },
    { index: 1, key: 'step1', defaultLabel: 'Identify & Consent', icon: UserCheck },
    { index: 2, key: 'step2', defaultLabel: 'Symptom Converse', icon: MessageSquareHeart },
    { index: 3, key: 'step3', defaultLabel: 'Scan Records', icon: ScanLine },
    { index: 4, key: 'step4', defaultLabel: 'Summary & Token', icon: FileCheck2 },
  ];

  return (
    <div className="w-full bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative">
        {/* Continuous Connecting line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
        <div
          className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-teal-600 transition-all duration-500 -z-0"
          style={{ width: `${(currentStep / (steps.length - 1)) * 92}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.index;
          const isCurrent = currentStep === step.index;
          const isAccessible = step.index <= currentStep;

          return (
            <button
              key={step.index}
              onClick={() => isAccessible && goToStep(step.index)}
              disabled={!isAccessible}
              className={`relative z-10 flex flex-col items-center group transition-all ${
                isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                  isCompleted
                    ? 'bg-teal-600 text-white shadow-teal-600/30 ring-4 ring-teal-100 dark:ring-teal-950'
                    : isCurrent
                    ? 'bg-gradient-to-tr from-teal-700 to-emerald-500 text-white ring-4 ring-teal-200 dark:ring-teal-900 scale-110 shadow-lg shadow-teal-600/40'
                    : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-5 h-5" />}
              </div>

              <span
                className={`mt-1.5 text-[11px] sm:text-xs font-bold tracking-tight text-center transition-colors hidden sm:block ${
                  isCurrent
                    ? 'text-teal-700 dark:text-teal-400'
                    : isCompleted
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-400'
                }`}
              >
                {t(step.key, step.defaultLabel)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
