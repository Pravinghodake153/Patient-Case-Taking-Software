'use client';

import React from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  ShieldCheck,
  Activity,
  UserCheck,
  ScanLine,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  Mic,
  Languages,
  LayoutDashboard,
  Leaf,
  Layers,
  Hospital,
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-teal-500/15 to-emerald-400/10 blur-[100px] -z-10 rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/90 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Smart India Hackathon • SIH26047 (Ministry of Ayush)</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Transforming High-Volume OPDs with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-700">
                  AI Pre-Consultation Case-Taking
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Indian hospital OPDs see 4,000–10,000 patients daily with only 2–5 minutes of doctor consultation time. MediKiosk enables patients to record their medical history via <strong>voice + touch</strong> and digitizes past prescriptions <em>before</em> entering the consultation room.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/kiosk"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-display font-bold text-base shadow-xl shadow-teal-600/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Launch Patient Kiosk Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 font-display font-bold text-base shadow-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <LayoutDashboard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Physician Workstation Demo</span>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  ABDM & DPDP Act 2023 Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-teal-500" />
                  Bhashini Multilingual Speech (6+ Languages)
                </span>
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-amber-500" />
                  Ayurveda Dashavidha Pariksha Module
                </span>
              </div>
            </div>

            {/* Interactive Kiosk & Dashboard Hero Mockup Graphic */}
            <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="rounded-2xl bg-white dark:bg-slate-950 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                      MediKiosk Unit #01 • OPD Lobby Standalone Station
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                      Queue Delay Saved: ~6.8 Mins/Patient
                    </span>
                  </div>
                </div>

                {/* 3 Step Cards Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/80 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. Voice Symptom Intake</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Adaptive branching question tree (SOCRATES + Prakriti) in patient's mother tongue.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                      <ScanLine className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Medical OCR Scanning</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Instant digitizing of old Rx slips with automatic abnormal biomarker flags.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Doctor Note & Token</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Structured FHIR R4 clinical summary waiting on doctor's screen before entry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE 2-5 MINUTE OPD CONSULTATION CRISIS */}
        <section id="problem" className="py-16 sm:py-24 bg-white dark:bg-slate-900/60 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Real-World Indian OPD Crisis</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
                  10,000 Patients / Day.<br />
                  <span className="text-red-600">Only 2–5 Minutes</span> Per Doctor Consultation.
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  In overcrowded government medical college hospitals and Ayush dispensaries, doctors spend over <strong>70% of consultation time</strong> repeatedly asking basic timeline questions and struggling to read crumpled, faded paper prescriptions.
                </p>
                <div className="space-y-2 pt-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Missed drug-allergy warnings & critical emergency red flags</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Zero structured pre-consultation record in E-Hospital / ABDM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Severe doctor burnout and patient dissatisfaction</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-3xl sm:text-4xl font-display font-black text-red-600">4,000–10k</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Daily OPD Footfall</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Average daily patient volume per tertiary hospital OPD wing in India.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-3xl sm:text-4xl font-display font-black text-amber-600">2.5 Mins</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Average Doctor Window</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Leaving almost zero time for deep clinical examination or patient education.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-3xl sm:text-4xl font-display font-black text-teal-600">7.2 Mins</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Time Saved per Patient</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Intake and OCR completed before the patient enters the consultation room.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-3xl sm:text-4xl font-display font-black text-emerald-600">100%</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">FHIR R4 Interoperable</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Seamless sync with ABDM Health Locker & Ayush Grid electronic health records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE 4 MODULES */}
        <section id="modules" className="py-16 sm:py-24 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                Four Pillars of the MediKiosk Platform
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Engineered specifically for low-literacy, elderly, and multilingual patient populations in Indian hospitals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  1. Conversational History Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Dual-mode voice and touch chips supporting SOCRATES adaptive branching questions in 6+ Indian languages with Bhashini ASR.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                  <ScanLine className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  2. Document OCR Digitization
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Scans physical prescriptions & lab reports, extracts medications and test biomarkers, and automatically flags abnormal values.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  3. AI Structured Summary
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Synthesizes chief complaint, HPI, PMH, drug allergies, and review of systems into an editable physician draft.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  4. ABDM & Consent Integration
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  14-digit ABHA creation & lookup with DPDP Act 2023 granular consent and FHIR R4 clinical bundle dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AYUSH SPECIFIC HIGHLIGHT */}
        <section id="ayush" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-100/80 via-amber-50/50 to-amber-100/60 dark:from-amber-950/40 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-800 shadow-xl space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 font-mono">
                      Ministry of Ayush Special Feature
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                    Integrated Ayurvedic Dashavidha Pariksha (दशविध परीक्षा)
                  </h3>
                </div>

                <Link
                  href="/kiosk"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Ayurveda Mode in Kiosk</span>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200/90 leading-relaxed max-w-3xl">
                Unlike Western EHRs that only collect Allopathic organ checklists, MediKiosk includes a specialized <strong>Ayurvedic constitutional intake engine</strong> mapped to the <strong>NAMASTE portal ontology</strong>. Patients are assessed across:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/80 space-y-1">
                  <strong className="text-amber-900 dark:text-amber-300">Prakriti & Dosha</strong>
                  <p className="text-slate-600 dark:text-slate-300">Vata, Pitta, Kapha constitutional baseline.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/80 space-y-1">
                  <strong className="text-amber-900 dark:text-amber-300">Jatharagni (पाचन)</strong>
                  <p className="text-slate-600 dark:text-slate-300">Sama, Vishama, Tikshna, or Manda Agni.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/80 space-y-1">
                  <strong className="text-amber-900 dark:text-amber-300">Koshtha (कोष्ठ)</strong>
                  <p className="text-slate-600 dark:text-slate-300">Bowel habit tendency: Mrudu, Madhyama, Krura.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/80 space-y-1">
                  <strong className="text-amber-900 dark:text-amber-300">Nidra & Bala (निद्रा)</strong>
                  <p className="text-slate-600 dark:text-slate-300">Sleep architecture and vitality stamina.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
