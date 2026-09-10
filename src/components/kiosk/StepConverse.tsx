'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sparkles,
  Volume2,
  ArrowRight,
  Flame,
  Activity,
  HeartPulse,
  Thermometer,
  Droplet,
  Send,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Stethoscope,
} from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';
import { useLanguage } from '@/context/LanguageContext';
import { VoiceWaveform } from './VoiceWaveform';
import { RedFlagModal } from './RedFlagModal';
import { AYUSH_PARIKSHA_QUESTIONS } from '@/data/ayushQuestionTree';
import { soundEffects } from '@/components/common/SoundEffects';
import { voiceRecognition } from '@/lib/speechHelper';

export const StepConverse: React.FC = () => {
  const {
    intakeMode,
    setIntakeMode,
    currentQuestion,
    currentAyushIndex,
    chatHistory,
    selectedOptionsMap,
    socratesDetails,
    ayushAssessment,
    redFlagAlert,
    handleOptionSelect,
    handleAyushOptionSelect,
    handleVoiceTextInput,
    nextStep,
  } = useKiosk();

  const { currentLanguage, speakText, t } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [interimSpeechText, setInterimSpeechText] = useState('');
  const [customTypedInput, setCustomTypedInput] = useState('');
  const [severitySliderValue, setSeveritySliderValue] = useState(socratesDetails.severityScore || 5);
  const stopListeningRef = useRef<(() => void) | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const toggleMic = () => {
    if (isListening) {
      soundEffects.playListenStop();
      stopListeningRef.current?.();
      setIsListening(false);
      if (interimSpeechText.trim()) {
        handleVoiceTextInput(interimSpeechText);
        setInterimSpeechText('');
      }
    } else {
      soundEffects.playListenStart();
      setIsListening(true);
      setInterimSpeechText('');
      stopListeningRef.current = voiceRecognition.listen(
        currentLanguage,
        (interim) => setInterimSpeechText(interim),
        (final) => {
          handleVoiceTextInput(final);
          setInterimSpeechText('');
          setIsListening(false);
        },
        (err) => {
          console.warn('Speech error/cancelled:', err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTypedInput.trim()) return;
    handleVoiceTextInput(customTypedInput);
    setCustomTypedInput('');
  };

  const handleSeveritySubmit = () => {
    soundEffects.playTap();
    const severityOption = {
      id: `sev_${severitySliderValue}`,
      label: `Pain Severity: ${severitySliderValue} / 10`,
      labelHi: `दर्द की तीव्रता: ${severitySliderValue} / 10`,
      categoryValue: `${severitySliderValue}/10 severity`,
    };
    handleOptionSelect('q_severity_slider', severityOption);
  };

  const activeAyushQuestion = AYUSH_PARIKSHA_QUESTIONS[currentAyushIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-6 select-none">
      {/* Red Flag Critical Modal if triggered */}
      <RedFlagModal />

      {/* Mode Switcher Bar (Allopathy vs AYUSH) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Case-Taking Engine:
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {intakeMode === 'allopathy' ? 'SOCRATES Symptom Tree' : 'Dashavidha Pariksha (दशविध परीक्षा)'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => {
              soundEffects.playTap();
              setIntakeMode('allopathy');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              intakeMode === 'allopathy'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Allopathy Mode</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playTap();
              setIntakeMode('ayush');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              intakeMode === 'ayush'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-amber-300" />
            <span>Ayush / Ayurveda Mode</span>
          </button>
        </div>
      </div>

      {/* Red Flag Alert Banner if detected */}
      {redFlagAlert.title && (
        <div className="p-4 rounded-2xl bg-red-600 text-white flex items-center justify-between shadow-lg shadow-red-600/30 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-white shrink-0" />
            <div>
              <p className="font-bold text-sm">{redFlagAlert.title}</p>
              <p className="text-xs text-red-100">{redFlagAlert.subtitle}</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold bg-white text-red-700 px-2.5 py-1 rounded-lg">
            CRASH CART NOTIFIED
          </span>
        </div>
      )}

      {/* Main Conversation & Questioning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Chat Stream (5 cols) */}
        <div className="lg:col-span-5 h-[420px] sm:h-[480px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                MediKiosk Clinical Conversation Stream
              </span>
            </div>
            <button
              onClick={() => {
                const lastAi = [...chatHistory].reverse().find((m) => m.sender === 'ai');
                if (lastAi) speakText(lastAi.text, currentLanguage);
              }}
              className="text-slate-400 hover:text-teal-600 p-1 rounded-lg"
              title="Read last message"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'ai'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm border border-slate-200/60 dark:border-slate-700/60'
                      : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-tr-sm shadow-teal-600/20'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 px-1 mt-0.5">
                  {msg.sender === 'ai' ? 'AI Assistant' : 'You'} • {msg.timestamp}
                </span>
              </div>
            ))}

            {isListening && interimSpeechText && (
              <div className="flex flex-col items-end animate-pulse">
                <div className="max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 border border-teal-300">
                  <p>{interimSpeechText} ...</p>
                </div>
                <span className="text-[10px] text-teal-600 px-1 mt-0.5">Listening live speech...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick custom text entry at bottom of chat */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/30"
          >
            <input
              type="text"
              value={customTypedInput}
              onChange={(e) => setCustomTypedInput(e.target.value)}
              placeholder="Type symptom details if preferred..."
              className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!customTypedInput.trim()}
              className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Col: Active Question & Large Tap Response Chips (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* ALLOPATHY MODE ACTIVE QUESTION */}
          {intakeMode === 'allopathy' && currentQuestion && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-500/40 dark:border-teal-500/30 shadow-lg shadow-teal-500/5 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200">
                    Clinical Question • {currentQuestion.category.toUpperCase()}
                  </span>
                  <button
                    onClick={() =>
                      speakText(
                        currentLanguage === 'hi' ? currentQuestion.titleHi : currentQuestion.titleEn,
                        currentLanguage
                      )
                    }
                    className="flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-200/60 dark:border-teal-800/60 hover:bg-teal-100"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
                  {currentLanguage === 'hi' ? currentQuestion.titleHi : currentQuestion.titleEn}
                </h3>
              </div>

              {/* Slider for Severity Question */}
              {currentQuestion.sliderConfig ? (
                <div className="space-y-6 pt-2">
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span>{currentQuestion.sliderConfig.minLabel}</span>
                      <span className="text-xl font-display font-black text-teal-600 dark:text-teal-400">
                        {severitySliderValue} / 10
                      </span>
                      <span>{currentQuestion.sliderConfig.maxLabel}</span>
                    </div>

                    <input
                      type="range"
                      min={currentQuestion.sliderConfig.min}
                      max={currentQuestion.sliderConfig.max}
                      step={currentQuestion.sliderConfig.step}
                      value={severitySliderValue}
                      onChange={(e) => setSeveritySliderValue(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>

                  <button
                    onClick={handleSeveritySubmit}
                    className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    Confirm Severity ({severitySliderValue}/10) & Continue
                  </button>
                </div>
              ) : (
                /* Multiple Choice Tappable Response Chips */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(currentQuestion.id, opt)}
                      className="kiosk-touch-card p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-400 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-teal-50/50 dark:hover:bg-teal-950/40 text-left transition-all group flex flex-col justify-between min-h-[90px] touch-manipulation"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                          {currentLanguage === 'hi' ? opt.labelHi : opt.label}
                        </p>
                        {currentLanguage !== 'hi' && opt.labelHi && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">{opt.labelHi}</p>
                        )}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                        <span>Tap to answer</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AYUSH MODE ACTIVE QUESTION */}
          {intakeMode === 'ayush' && activeAyushQuestion && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500/40 dark:border-amber-500/30 shadow-lg shadow-amber-500/5 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200">
                    दशविध परीक्षा • {activeAyushQuestion.titleSanskrit}
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    Question {currentAyushIndex + 1} of {AYUSH_PARIKSHA_QUESTIONS.length}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
                  {activeAyushQuestion.titleSanskrit} — {activeAyushQuestion.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {currentLanguage === 'hi' ? activeAyushQuestion.descriptionHi : activeAyushQuestion.descriptionEn}
                </p>
              </div>

              {/* Ayush Options */}
              <div className="space-y-3 pt-1">
                {activeAyushQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAyushOptionSelect(activeAyushQuestion.id, opt.id)}
                    className="kiosk-touch-card w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 text-left transition-all group flex items-center justify-between touch-manipulation"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-mono">
                          {opt.labelSanskrit}
                        </span>
                        <span className="text-xs uppercase font-bold text-slate-400">
                          Dosha: {opt.dosha.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {currentLanguage === 'hi' ? opt.labelHi : opt.labelEn}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>

              {/* Dosha Breakdown Gauge */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Calculated Prakriti:</span>
                <span className="text-amber-700 dark:text-amber-400">
                  Vata: {ayushAssessment.prakriti.vataPercentage}% | Pitta: {ayushAssessment.prakriti.pittaPercentage}% | Kapha: {ayushAssessment.prakriti.kaphaPercentage}%
                </span>
              </div>
            </div>
          )}

          {/* Voice Mic Widget Container */}
          <div className="p-4 rounded-3xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <VoiceWaveform
              isListening={isListening}
              onToggle={toggleMic}
              statusText={isListening ? 'Listening live in ' + currentLanguage.toUpperCase() + '... Speak your symptoms' : 'Or speak anytime using the microphone button'}
            />
          </div>

          {/* Next Step CTA */}
          <div className="flex justify-end pt-2">
            <button
              onClick={nextStep}
              className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all active:scale-95 touch-manipulation"
            >
              <span>Done with Questions • Scan Prescriptions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
