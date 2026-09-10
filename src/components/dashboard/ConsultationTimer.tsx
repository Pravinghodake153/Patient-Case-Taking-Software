'use client';

import React from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { usePhysician } from '@/context/PhysicianContext';
import { formatTime } from '@/lib/utils';
import { soundEffects } from '@/components/common/SoundEffects';

export const ConsultationTimer: React.FC = () => {
  const { isTimerRunning, timerSeconds, startTimer, pauseTimer, resetTimer, selectedPatient } = usePhysician();

  const handleToggle = () => {
    soundEffects.playTap();
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const handleReset = () => {
    soundEffects.playTap();
    resetTimer();
  };

  const timeSaved = selectedPatient?.timeSavedMinutes || 6.5;

  return (
    <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-medium select-none">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Doctor Consultation:
        </span>
        <span className="font-mono text-sm font-black text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          {formatTime(timerSeconds)}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handleToggle}
          className={`p-1.5 rounded-lg text-white transition-colors ${
            isTimerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
          title={isTimerRunning ? 'Pause Consultation Timer' : 'Start Consultation Timer'}
        >
          {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700 text-[11px] text-teal-700 dark:text-teal-400 font-semibold">
        <Sparkles className="w-3 h-3" />
        <span>MediKiosk Saved ~{timeSaved}m on Case-Taking</span>
      </div>
    </div>
  );
};
