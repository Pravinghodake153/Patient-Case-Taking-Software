'use client';

import React from 'react';
import { Volume2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useKiosk } from '@/context/KioskContext';
import { SUPPORTED_LANGUAGES } from '@/data/translations';
import { soundEffects } from '@/components/common/SoundEffects';

export const StepLanguage: React.FC = () => {
  const { currentLanguage, setLanguage, speakText, isSpeaking, t } = useLanguage();
  const { nextStep } = useKiosk();

  const handleLanguageSelect = (code: typeof currentLanguage, sampleText: string) => {
    soundEffects.playTap();
    setLanguage(code);
    speakText(sampleText, code);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8 select-none">
      {/* Header text */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Step 1 of 5 • Multilingual Accessibility (Bhashini AI)</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
          {t('welcomeHeading', 'Choose Your Preferred Language')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('welcomeSubheading', 'Select your language for voice and touch interaction. You can speak or tap to answer questions.')}
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;

          return (
            <div
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code, lang.sampleAudioText)}
              className={`kiosk-touch-card relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-teal-500 bg-gradient-to-br from-teal-50/90 to-emerald-50/50 dark:from-teal-950/40 dark:to-slate-900 shadow-xl shadow-teal-600/15 ring-2 ring-teal-400/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{lang.flagEmoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {lang.code}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">
                  {lang.nativeLabel}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang.label} • {lang.subLabel}
                </p>
              </div>

              {/* Audio Listen Button inside Card */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playTap();
                    speakText(lang.sampleAudioText, lang.code);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 bg-teal-50/60 dark:bg-teal-950/60 px-2.5 py-1.5 rounded-lg border border-teal-200/60 dark:border-teal-800/60 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking && isSelected ? 'Playing Audio...' : 'Hear Sample'}</span>
                </button>
                <span className="text-xs font-bold text-slate-400">
                  {isSelected ? 'Selected' : 'Tap to select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue CTA */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={nextStep}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-display font-bold text-base sm:text-lg shadow-xl shadow-teal-600/25 flex items-center justify-center gap-3 transition-all active:scale-95 touch-manipulation"
        >
          <span>{t('tapToContinue', 'Continue with Selected Language')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
