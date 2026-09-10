'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, LanguageOption } from '@/types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '@/data/translations';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  languageOption: LanguageOption;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  speakText: (text: string, langOverride?: LanguageCode) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const languageOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[currentLanguage];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = TRANSLATIONS['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text: string, langOverride?: LanguageCode) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const targetLang = langOverride || currentLanguage;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set appropriate BCP-47 language tag
    const langMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      gu: 'gu-IN',
      bn: 'bn-IN',
    };
    utterance.lang = langMap[targetLang] || 'en-IN';
    utterance.rate = 0.92; // Slightly slower, reassuring pacing for hospital kiosk
    utterance.pitch = 1.0;

    // Pick Indian accented voice if available in browser
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) => v.lang.startsWith(utterance.lang) || (targetLang === 'en' && v.lang.includes('IN'))
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Pre-load voices on client
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languageOption,
        setLanguage: setCurrentLanguage,
        t,
        speakText,
        isSpeaking,
        stopSpeaking,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
