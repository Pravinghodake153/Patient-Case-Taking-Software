'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, ShieldCheck, Activity, UserCheck, LayoutDashboard, Sparkles, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '@/data/translations';

export const Navbar: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Medi<span className="text-teal-600 dark:text-teal-400">Kiosk</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                SIH26047
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Ministry of Ayush • AI Case Taking Platform
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#problem" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            The OPD Crisis
          </Link>
          <Link href="/#modules" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Core Modules
          </Link>
          <Link href="/#ayush" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            AYUSH Mode
          </Link>
          <Link href="/compliance" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ABDM & DPDP
          </Link>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="uppercase font-semibold">{currentLanguage}</span>
            </button>
            <div className="absolute right-0 mt-1 w-40 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 hidden group-hover:block z-50">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-teal-50 dark:hover:bg-slate-700 ${
                    currentLanguage === lang.code ? 'font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{lang.nativeLabel}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kiosk Mode CTA */}
          <Link
            href="/kiosk"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg transition-all active:scale-95"
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Patient Kiosk</span>
            <span className="sm:hidden">Kiosk</span>
          </Link>

          {/* Doctor Dashboard CTA */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <LayoutDashboard className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">Doctor Portal</span>
            <span className="sm:hidden">Doctor</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
