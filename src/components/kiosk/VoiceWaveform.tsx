'use client';

import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceWaveformProps {
  isListening: boolean;
  isProcessing?: boolean;
  onToggle: () => void;
  statusText?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isListening,
  isProcessing = false,
  onToggle,
  statusText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Ripple Rings when listening */}
        {isListening && (
          <>
            <span className="absolute w-24 h-24 rounded-full bg-teal-500/20 animate-ping opacity-75 pointer-events-none" />
            <span className="absolute w-20 h-20 rounded-full bg-teal-400/30 animate-pulse pointer-events-none" />
          </>
        )}

        {/* Main Mic Action Button */}
        <button
          onClick={onToggle}
          disabled={isProcessing}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          className={`relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform active:scale-95 touch-manipulation ${
            isProcessing
              ? 'bg-amber-500 text-white shadow-amber-500/30 cursor-wait'
              : isListening
              ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-red-500/40 scale-105 ring-4 ring-red-200 dark:ring-red-950'
              : 'bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-teal-600/30 hover:shadow-teal-600/50 hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : isListening ? (
            <Mic className="w-8 h-8 animate-pulse" />
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Dynamic Animated Waveform Bars */}
      {isListening && (
        <div className="flex items-center gap-1 mt-4 h-6 px-4 py-1 bg-teal-50 dark:bg-teal-950/60 rounded-full border border-teal-200 dark:border-teal-800 shadow-sm">
          {[0.6, 1.2, 0.4, 0.9, 1.4, 0.8, 1.1, 0.5, 1.3, 0.7].map((heightScale, i) => (
            <span
              key={i}
              className="w-1 bg-teal-600 dark:text-teal-400 rounded-full animate-wave"
              style={{
                height: `${heightScale * 14}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            />
          ))}
        </div>
      )}

      {/* Status Label */}
      <p className="mt-2 text-xs sm:text-sm font-semibold text-center text-slate-600 dark:text-slate-300">
        {statusText ||
          (isProcessing
            ? 'Processing voice input...'
            : isListening
            ? 'Listening... Speak clearly in your language'
            : 'Tap mic to speak your answer')}
      </p>
    </div>
  );
};
