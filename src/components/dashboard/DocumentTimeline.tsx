'use client';

import React from 'react';
import { FileText, AlertTriangle, CheckCircle2, Calendar, Hospital, ShieldCheck } from 'lucide-react';
import { ScannedDocument } from '@/types';

interface DocumentTimelineProps {
  documents: ScannedDocument[];
}

export const DocumentTimeline: React.FC<DocumentTimelineProps> = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        No prior external documents uploaded during kiosk intake.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
          Digitized Document Timeline ({documents.length})
        </h3>
        <span className="text-[10px] text-teal-600 font-mono font-bold">
          ABDM Health Locker Synced
        </span>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold">
                    OCR Match {doc.confidenceScore}%
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {doc.date}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {doc.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Hospital className="w-3 h-3 text-slate-400" />
                  {doc.facility} {doc.doctorName ? `• ${doc.doctorName}` : ''}
                </p>
              </div>
            </div>

            {/* Abnormal Lab Results Highlight */}
            {doc.extractedData.labBiomarkers.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lab Parameters Extracted:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doc.extractedData.labBiomarkers.map((lab, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl border flex items-center justify-between text-xs ${
                        lab.isAbnormal
                          ? 'border-amber-400 dark:border-amber-700 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[140px]">
                            {lab.testName}
                          </span>
                          {lab.isAbnormal && (
                            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">Ref: {lab.referenceRange}</span>
                      </div>
                      <span
                        className={`font-mono font-bold ${
                          lab.isAbnormal ? 'text-amber-700 dark:text-amber-400 text-sm' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {lab.value} {lab.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Medications */}
            {doc.extractedData.medications.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Extracted Past Medications:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {doc.extractedData.medications.map((m, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {m.name} ({m.dosage}) • {m.frequency}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
