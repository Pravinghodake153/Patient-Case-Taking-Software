'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { usePhysician } from '@/context/PhysicianContext';

export const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = usePhysician();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
      title={darkMode ? 'Switch to Light Clinical Mode' : 'Switch to Dark High-Efficiency Mode'}
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </button>
  );
};
