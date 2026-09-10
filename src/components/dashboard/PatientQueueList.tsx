'use client';

import React from 'react';
import {
  Users,
  Search,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Filter,
  ShieldAlert,
} from 'lucide-react';
import { usePhysician } from '@/context/PhysicianContext';
import { PatientQueueItem } from '@/types';

export const PatientQueueList: React.FC = () => {
  const {
    patients,
    selectedPatient,
    selectPatient,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  } = usePhysician();

  const filteredPatients = patients.filter((p) => {
    // Search
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.patient.name.toLowerCase().includes(q) ||
      p.tokenNumber.toLowerCase().includes(q) ||
      p.chiefComplaint.toLowerCase().includes(q) ||
      p.patient.abhaId.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // Filter
    if (filterStatus === 'red') return p.triageLevel === 'red' || p.redFlagAlert?.isTriggered;
    if (filterStatus === 'ayush') return p.mode === 'ayush' || p.triageLevel === 'ayush';
    if (filterStatus === 'waiting') return p.status === 'waiting';
    if (filterStatus === 'completed') return p.status === 'completed';
    return true;
  });

  const redCount = patients.filter((p) => p.triageLevel === 'red' || p.redFlagAlert?.isTriggered).length;
  const ayushCount = patients.filter((p) => p.mode === 'ayush' || p.triageLevel === 'ayush').length;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 select-none">
      {/* Search & Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              OPD Patient Queue ({patients.length})
            </h2>
          </div>
          {redCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 animate-pulse">
              <ShieldAlert className="w-3 h-3 text-red-600" />
              <span>{redCount} Critical</span>
            </span>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search token, name, ABHA or symptom..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
              filterStatus === 'all'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'
            }`}
          >
            All ({patients.length})
          </button>
          <button
            onClick={() => setFilterStatus('red')}
            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 flex items-center gap-1 ${
              filterStatus === 'red'
                ? 'bg-red-600 text-white font-bold'
                : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 hover:bg-red-100'
            }`}
          >
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>Red Flag ({redCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus('ayush')}
            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
              filterStatus === 'ayush'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            AYUSH ({ayushCount})
          </button>
          <button
            onClick={() => setFilterStatus('waiting')}
            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
              filterStatus === 'waiting'
                ? 'bg-teal-600 text-white font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'
            }`}
          >
            Waiting
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No patients match search or filter criteria.
          </div>
        ) : (
          filteredPatients.map((p) => {
            const isSelected = selectedPatient?.id === p.id;
            const isRed = p.triageLevel === 'red' || p.redFlagAlert?.isTriggered;
            const isAyush = p.mode === 'ayush' || p.triageLevel === 'ayush';

            return (
              <div
                key={p.id}
                onClick={() => selectPatient(p.id)}
                className={`p-4 cursor-pointer transition-all flex items-start justify-between relative ${
                  isSelected
                    ? 'bg-teal-50/70 dark:bg-slate-800/90 border-l-4 border-l-teal-600'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isRed
                          ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300'
                          : isAyush
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p.tokenNumber}
                    </span>

                    {isRed && (
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400 animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Triage 1</span>
                      </span>
                    )}

                    {isAyush && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                        AYUSH OPD
                      </span>
                    )}

                    <span className="text-[10px] text-slate-400 ml-auto">{p.intakeTime}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {p.patient.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {p.patient.age}y / {p.patient.gender} • ABHA: {p.patient.abhaId}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
                    {p.chiefComplaint}
                  </p>

                  <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-400">
                    <span>⏱ Intake: {p.timeSavedMinutes}m saved</span>
                    <span>•</span>
                    <span className={p.status === 'completed' ? 'text-emerald-500 font-bold' : ''}>
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 self-center transition-transform ${
                    isSelected ? 'text-teal-600 translate-x-0.5' : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
