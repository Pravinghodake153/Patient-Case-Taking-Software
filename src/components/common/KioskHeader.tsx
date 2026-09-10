'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, Volume2, VolumeX, AlertTriangle, ArrowLeft, Globe, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useKiosk } from '@/context/KioskContext';
import { soundEffects } from './SoundEffects';

export const KioskHeader: React.FC = () => {
  const { languageOption, setLanguage, currentLanguage, speakText, isSpeaking, stopSpeaking } = useLanguage();
  const { currentStep, prevStep, resetKioskSession } = useKiosk();
  const [soundMuted, setSoundMuted] = React.useState(false);

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    soundEffects.enabled = !next;
    if (next) stopSpeaking();
  };

  const handleVoiceHelp = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(
        currentLanguage === 'hi'
          ? 'मेडीकियोस्क में आपका स्वागत है। स्क्रीन पर दिए गए बटनों को छूकर या अपनी आवाज़ में बोलकर जवाब दें।'
          : 'Welcome to MediKiosk. Please tap any option on the screen or press the microphone to answer with your voice.'
      );
    }
  };

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors select-none">
      {/* Left: Back / Exit */}
      <div className="flex items-center gap-3">
        {currentStep > 0 ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all active:scale-95 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        )}

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">
                Medi<span className="text-teal-600">Kiosk</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-[11px] font-bold">
                Kiosk #01
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              AI-Powered Patient Pre-Consultation Case Taking
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Voice Read aloud button */}
        <button
          onClick={handleVoiceHelp}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            isSpeaking
              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
          }`}
          title="Audio Guidance"
        >
          <Volume2 className="w-4 h-4 text-teal-600" />
          <span className="hidden md:inline">{isSpeaking ? 'Speaking...' : 'Audio Guide'}</span>
        </button>

        {/* Language Indicator */}
        <button
          onClick={() => {
            soundEffects.playTap();
            // Cycle language or go to step 0
            if (currentStep !== 0) {
              setLanguage(currentLanguage === 'en' ? 'hi' : 'en');
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs sm:text-sm font-bold hover:bg-teal-100 transition-colors"
        >
          <Globe className="w-4 h-4 text-teal-600" />
          <span>{languageOption.nativeLabel}</span>
        </button>

        {/* Emergency Call / Help Button */}
        <button
          onClick={() => {
            soundEffects.playRedFlagAlert();
            alert('Emergency OPD Assistant & Nursing Station have been called to Kiosk #01.');
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 text-xs font-bold hover:bg-red-100 transition-colors"
          title="Call Hospital Staff"
        >
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="hidden lg:inline">Help / Staff Alert</span>
        </button>
      </div>
    </header>
  );
};
