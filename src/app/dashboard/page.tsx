'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Moon,
  Sun,
  ArrowLeft,
  UserCheck,
  Hospital,
  ChevronDown,
  Bell,
} from 'lucide-react';
import { PatientQueueList } from '@/components/dashboard/PatientQueueList';
import { ClinicalSummaryView } from '@/components/dashboard/ClinicalSummaryView';
import { AnalyticsView } from '@/components/dashboard/AnalyticsView';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { usePhysician } from '@/context/PhysicianContext';

export default function PhysicianDashboardPage() {
  const [activeTab, setActiveTab] = useState<'workstation' | 'analytics'>('workstation');
  const { patients } = usePhysician();

  const redCount = patients.filter((p) => p.triageLevel === 'red' || p.redFlagAlert?.isTriggered).length;

  return (
    <div className="h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors">
      {/* Top Clinical Navigation Bar */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
        {/* Left: Brand & Doctor Profile */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-base tracking-tight text-slate-900 dark:text-white">
                  Medi<span className="text-teal-600 dark:text-teal-400">Kiosk</span> Doctor Portal
                </h1>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  EHR Workstation
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Dr. Alok Verma, MD / Vaidya H. Shastri • OPD Room 04 & 08
              </p>
            </div>
          </div>
        </div>

        {/* Center: Workstation vs Analytics Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('workstation')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'workstation'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Clinical Workstation</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>OPD Analytics</span>
          </button>
        </div>

        {/* Right Controls: Theme Toggle & Quick Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/kiosk"
            className="hidden md:flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 hover:bg-teal-100"
          >
            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Open Patient Kiosk</span>
          </Link>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'workstation' ? (
          <>
            {/* Sidebar Queue (320px - 380px) */}
            <aside className="w-80 sm:w-96 shrink-0 h-full">
              <PatientQueueList />
            </aside>

            {/* Main Clinical Summary View */}
            <main className="flex-1 h-full overflow-hidden">
              <ClinicalSummaryView />
            </main>
          </>
        ) : (
          <main className="flex-1 h-full overflow-hidden">
            <AnalyticsView />
          </main>
        )}
      </div>
    </div>
  );
}
