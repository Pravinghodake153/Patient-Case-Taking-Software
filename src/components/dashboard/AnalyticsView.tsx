'use client';

import React from 'react';
import {
  Users,
  Clock,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Activity,
  Sparkles,
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

const HOURLY_OPD_DATA = [
  { hour: '08:00 AM', patients: 120, timeSavedMin: 680 },
  { hour: '09:00 AM', patients: 450, timeSavedMin: 2850 },
  { hour: '10:00 AM', patients: 780, timeSavedMin: 4920 },
  { hour: '11:00 AM', patients: 890, timeSavedMin: 5600 },
  { hour: '12:00 PM', patients: 720, timeSavedMin: 4500 },
  { hour: '01:00 PM', patients: 410, timeSavedMin: 2500 },
  { hour: '02:00 PM', patients: 590, timeSavedMin: 3700 },
  { hour: '03:00 PM', patients: 480, timeSavedMin: 3000 },
  { hour: '04:00 PM', patients: 380, timeSavedMin: 2400 },
];

const SPECIALTY_DISTRIBUTION = [
  { name: 'General Medicine', value: 34, color: '#0d9488' },
  { name: 'AYUSH / Ayurveda', value: 28, color: '#b87d46' },
  { name: 'Cardiology (ACS)', value: 16, color: '#dc2626' },
  { name: 'Orthopedics / Amavata', value: 14, color: '#3b82f6' },
  { name: 'Respiratory / ENT', value: 8, color: '#8b5cf6' },
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 space-y-6 select-none">
      {/* Top Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Hospital OPD Load & AI Triage Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time throughput metrics across 12 MediKiosk hardware units in OPD lobby.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            LIVE OPD TELEMETRY
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Intake Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white">
            4,820
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+310% throughput vs paper slips</span>
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Avg Case-Taking Time
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-teal-600 dark:text-teal-400">
            2.8 min
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Reduced from 9.4 min manual history
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Red-Flag Interceptions
            </span>
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-red-600">
            42 Cases
          </p>
          <p className="text-[11px] text-red-700 dark:text-red-400 font-semibold">
            Routed straight to Resuscitation
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ABDM ABHA Link Rate
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-emerald-600">
            94.2%
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            FHIR R4 digital health records
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Volume Chart (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Hourly Patient Inflow & Doctor Consultation Savings
              </h3>
              <p className="text-xs text-slate-400">
                Peak OPD intake hours (09:00 AM – 01:00 PM) with cumulative minutes saved.
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_OPD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  name="Patients Digitized"
                  stroke="#0d9488"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Specialty Distribution Pie Chart (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Clinical Discipline Breakdown
            </h3>
            <p className="text-xs text-slate-400">Ayurveda vs Allopathy OPD share</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPECIALTY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SPECIALTY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {SPECIALTY_DISTRIBUTION.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
