'use client';

import React, { useState } from 'react';
import {
  ScanLine,
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';
import { useLanguage } from '@/context/LanguageContext';
import { SAMPLE_SCANNED_DOCUMENTS } from '@/data/mockDocuments';
import { soundEffects } from '@/components/common/SoundEffects';

export const StepScan: React.FC = () => {
  const { scannedDocs, isScanningDoc, activeScanningDocId, uploadAndScanDoc, removeScannedDoc, nextStep } = useKiosk();
  const { t } = useLanguage();
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);

  const handleScanSample = (index: number) => {
    soundEffects.playTap();
    setSelectedSampleIndex(index);
    uploadAndScanDoc(index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-8 select-none">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs font-bold">
          <ScanLine className="w-3.5 h-3.5 text-teal-600" />
          <span>Step 4 of 5 • Optical Document Digitization (Medical OCR)</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {t('scanTitle', 'Scan Old Prescriptions & Lab Reports')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {t('scanSubtitle', 'Place physical paper on the scanner glass or select a sample medical record below to digitize before your consultation.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Upload & Sample Preset Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Scanner Dropzone Card */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-teal-400/60 dark:border-teal-500/40 text-center space-y-4 shadow-sm overflow-hidden">
            {/* Animated Laser Scanning Beam */}
            {isScanningDoc && (
              <div className="absolute inset-0 bg-teal-500/10 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-4">
                <div className="absolute top-0 left-0 right-0 h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] animate-scanner" />
                <div className="bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl shadow-xl border border-teal-300 dark:border-teal-700 flex flex-col items-center gap-2">
                  <Zap className="w-8 h-8 text-teal-600 animate-bounce" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Medical OCR Neural Parsing in progress...
                  </p>
                  <p className="text-[10px] text-teal-600 font-mono">
                    Extracting RxNorm & SNOMED Biomarkers
                  </p>
                </div>
              </div>
            )}

            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 dark:bg-teal-950/80 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Camera className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Place Document on Kiosk Scanner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supports handwritten prescriptions, OPD slips, and pathology lab prints.
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-1">
              <button
                onClick={() => handleScanSample(0)}
                disabled={isScanningDoc}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>Simulate Kiosk Scan</span>
              </button>
            </div>
          </div>

          {/* Preset Sample Records */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Demo Test Documents:
            </h4>

            <div className="space-y-2">
              {SAMPLE_SCANNED_DOCUMENTS.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => handleScanSample(idx)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    scannedDocs.some((d) => d.id === doc.id)
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-teal-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {doc.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {doc.facility} • {doc.date}
                    </p>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                    {scannedDocs.some((d) => d.id === doc.id) ? 'Loaded' : 'Scan'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Extracted Structured Data Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {scannedDocs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                No documents scanned yet.
              </p>
              <p className="text-xs text-slate-400">
                Scan your previous reports on the left to extract medications and test results automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {scannedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  {/* Doc Card Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 font-mono">
                          OCR Score: {doc.confidenceScore}%
                        </span>
                        <span className="text-xs text-slate-400">• {doc.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {doc.facility} {doc.doctorName ? `(${doc.doctorName})` : ''}
                      </p>
                    </div>

                    <button
                      onClick={() => removeScannedDoc(doc.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Remove this document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Extracted Diagnoses */}
                  {doc.extractedData.diagnoses.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Extracted Clinical Diagnoses:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.extractedData.diagnoses.map((diag, i) => (
                          <span
                            key={i}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                          >
                            {diag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extracted Medications */}
                  {doc.extractedData.medications.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Extracted Medications & Dosages:
                      </p>
                      <div className="space-y-1.5">
                        {doc.extractedData.medications.map((med, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{med.name}</p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {med.dosage} • {med.frequency}
                              </p>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                              {med.confidence}% Match
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extracted Lab Biomarkers with ABNORMAL HIGHLIGHT */}
                  {doc.extractedData.labBiomarkers.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Extracted Lab Biomarkers & Automatic Anomaly Flags:
                      </p>
                      <div className="space-y-2">
                        {doc.extractedData.labBiomarkers.map((lab, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                              lab.isAbnormal
                                ? 'border-amber-400 dark:border-amber-600 bg-amber-50/60 dark:bg-amber-950/30'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {lab.testName}
                                </span>
                                {lab.isAbnormal && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-white flex items-center gap-1 animate-pulse">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Abnormal ({lab.severity?.toUpperCase()})</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                Ref Range: {lab.referenceRange}
                              </p>
                            </div>

                            <div className="text-right">
                              <span
                                className={`text-base font-display font-black ${
                                  lab.isAbnormal
                                    ? 'text-amber-700 dark:text-amber-400'
                                    : 'text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {lab.value} {lab.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Continue CTA */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={nextStep}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-display font-bold text-base shadow-xl shadow-teal-600/25 flex items-center gap-3 transition-all active:scale-95 touch-manipulation"
            >
              <span>Generate Structured Clinical Summary</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
