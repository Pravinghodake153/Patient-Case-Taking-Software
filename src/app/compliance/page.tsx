'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  FileCode2,
  HeartHandshake,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Database,
  KeyRound,
  UserCheck,
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FhirViewer } from '@/components/compliance/FhirViewer';

export default function CompliancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>National Healthcare Interoperability & Privacy</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
              ABDM, FHIR® & DPDP Act 2023 Architecture
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              MediKiosk is engineered strictly within the Ayushman Bharat Digital Mission (ABDM) sandbox standards, HL7® FHIR® R4 Indian NRCES profiles, and the Digital Personal Data Protection Act 2023.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ABDM Milestones */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                ABDM Milestones 1, 2 & 3
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>M1:</strong> ABHA creation & Aadhaar/Mobile OTP authentication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>M2:</strong> Health Information Provider (HIP) - pushes pre-consultation summaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>M3:</strong> Health Information User (HIU) - pulls prior prescriptions from locker.</span>
                </li>
              </ul>
            </div>

            {/* DPDP Act 2023 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                DPDP Act 2023 Consent Lifecycle
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Purpose Limitation:</strong> Patient data used strictly for attending OPD doctor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Granular Audio Consent:</strong> Plain-language audio readouts per consent item.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Data Localization:</strong> Zero offshore storage; India-hosted cloud sovereign boundaries.</span>
                </li>
              </ul>
            </div>

            {/* AYUSH Grid & NAMASTE */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                NAMASTE & Ayush Grid Ontology
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Standardized Ayurvedic terminology coded to National AYUSH Morbidity codes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Dual mapping between SNOMED-CT (Allopathy) and NAMASTE (Ayurveda).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Direct interoperability with AHMIS (Ayush Hospital Management Info System).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive FHIR Viewer Section */}
          <div id="fhir" className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Interactive ABDM FHIR R4 Bundle Payload
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exact JSON structure generated by MediKiosk engine and transmitted to the ABDM gateway.
                </p>
              </div>
            </div>

            <FhirViewer />
          </div>

          {/* Bottom CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-teal-700/20">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-display font-bold text-xl">Ready to test the Live Kiosk Flow?</h4>
              <p className="text-xs text-teal-100">
                Experience voice case-taking, OCR prescription digitization, and doctor triage in action.
              </p>
            </div>

            <Link
              href="/kiosk"
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-slate-100 active:scale-95 transition-all shrink-0"
            >
              Launch Patient Kiosk Demo
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
