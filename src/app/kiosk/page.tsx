'use client';

import React from 'react';
import { KioskHeader } from '@/components/common/KioskHeader';
import { Stepper } from '@/components/kiosk/Stepper';
import { StepLanguage } from '@/components/kiosk/StepLanguage';
import { StepIdentify } from '@/components/kiosk/StepIdentify';
import { StepConverse } from '@/components/kiosk/StepConverse';
import { StepScan } from '@/components/kiosk/StepScan';
import { StepSummary } from '@/components/kiosk/StepSummary';
import { useKiosk } from '@/context/KioskContext';

export default function KioskPage() {
  const { currentStep } = useKiosk();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Kiosk Minimal Accessible Header */}
      <KioskHeader />

      {/* Progress Stepper */}
      <Stepper />

      {/* Main Kiosk Step Content with Soft Fade Transition */}
      <main className="flex-1 overflow-y-auto pb-12">
        {currentStep === 0 && <StepLanguage />}
        {currentStep === 1 && <StepIdentify />}
        {currentStep === 2 && <StepConverse />}
        {currentStep === 3 && <StepScan />}
        {currentStep === 4 && <StepSummary />}
      </main>
    </div>
  );
}
