'use client';

import React from 'react';
import { UserCheck, ShieldCheck, QrCode, Sparkles, Volume2, ArrowRight, CheckCircle2, UserPlus, Info } from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/components/common/SoundEffects';

export const StepIdentify: React.FC = () => {
  const { patientInfo, updatePatientInfo, loadDemoPatient, consent, toggleConsent, nextStep } = useKiosk();
  const { t, speakText, currentLanguage } = useLanguage();

  const handleAbhaFormat = (val: string) => {
    // Format digits as XX-XXXX-XXXX-XXXX
    const cleaned = val.replace(/\D/g, '').slice(0, 14);
    let formatted = cleaned;
    if (cleaned.length > 2 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    } else if (cleaned.length > 6 && cleaned.length <= 10) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length > 10) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}-${cleaned.slice(10)}`;
    }
    updatePatientInfo({ abhaId: formatted });
  };

  const handleAudioConsentRead = (text: string) => {
    soundEffects.playTap();
    speakText(text, currentLanguage);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8 select-none">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Step 2 of 5 • Identification & Consent</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {t('abhaTitle', 'Patient Identification & ABHA Account')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {t('abhaSubtitle', 'Enter your 14-digit ABHA ID or load a quick demo profile to proceed with case taking.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: ABHA Entry & Demographics (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                ABHA Number / Address
              </label>
              <button
                onClick={loadDemoPatient}
                className="flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Sample Patient</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={patientInfo.abhaId}
                onChange={(e) => handleAbhaFormat(e.target.value)}
                placeholder="e.g. 91-5544-3322-1100"
                className="w-full text-lg sm:text-xl font-mono font-bold tracking-wider px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Demographics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={patientInfo.name}
                  onChange={(e) => updatePatientInfo({ name: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Age</label>
                <input
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => updatePatientInfo({ age: Number(e.target.value) })}
                  className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Gender</label>
                <select
                  value={patientInfo.gender}
                  onChange={(e) => updatePatientInfo({ gender: e.target.value as 'male' | 'female' | 'other' })}
                  className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="male">Male (पुरुष)</option>
                  <option value="female">Female (महिला)</option>
                  <option value="other">Other (अन्य)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ABHA Info Box */}
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-950 dark:text-teal-200 space-y-1">
              <p className="font-bold">What is ABHA (Ayushman Bharat Health Account)?</p>
              <p className="text-teal-800 dark:text-teal-300 leading-relaxed">
                ABHA is your 14-digit digital health ID under the National Health Authority (NHA). It allows seamless sharing of lab reports and prescriptions between Indian hospitals and Ayush clinics.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Consent Toggles with Audio Readout (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              {t('consentHeading', 'Patient Consent (DPDP Act 2023)')}
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('consentDesc', 'Your medical information is strictly encrypted. You have granular control over what is digitized.')}
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                key: 'clinicalHistory' as const,
                title: t('consentItem1', 'Voice AI Clinical Case Taking'),
                audio: 'I agree to use AI voice interview to record my symptom history.',
              },
              {
                key: 'ocrPrescription' as const,
                title: t('consentItem2', 'Prescription & Report OCR Digitization'),
                audio: 'I consent to scan and extract medical reports and prescriptions.',
              },
              {
                key: 'ayushDiagnostics' as const,
                title: t('consentItem3', 'Ayurvedic Prakriti & Agni Assessment'),
                audio: 'I agree to evaluate Ayurvedic constitutional parameters.',
              },
              {
                key: 'abdmSync' as const,
                title: t('consentItem4', 'Link with ABHA Health Locker'),
                audio: 'I consent to sync this summary to my national ABHA health account.',
              },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => toggleConsent(item.key)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  consent[item.key]
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-70'
                }`}
              >
                <div className="flex items-center gap-2.5 pr-2">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      consent[item.key] ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {consent[item.key] && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {item.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAudioConsentRead(item.audio);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  title="Listen to this consent term"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue CTA */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={nextStep}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-display font-bold text-base sm:text-lg shadow-xl shadow-teal-600/25 flex items-center justify-center gap-3 transition-all active:scale-95 touch-manipulation"
        >
          <span>Start Conversational Case-Taking</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
