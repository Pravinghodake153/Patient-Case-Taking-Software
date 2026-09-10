'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, ShieldCheck, HeartHandshake, FileCode2, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          {/* Col 1 */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Medi<span className="text-teal-600 dark:text-teal-400">Kiosk</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              AI-driven pre-consultation patient intake, voice clinical history, prescription digitization & AYUSH Dashavidha Pariksha system.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-200/60 dark:border-teal-800/60">
              <span>Smart India Hackathon • SIH26047</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform Flows
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/kiosk" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Patient Touch & Voice Kiosk
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Physician Triage Workstation
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  ABDM & FHIR Compliance Viewer
                </Link>
              </li>
              <li>
                <Link href="/patient-app" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Mobile Companion Web App
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Clinical & National Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                ABDM Milestones 1, 2 & 3
              </li>
              <li className="flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-teal-500" />
                HL7® FHIR® R4 Indian Profile
              </li>
              <li className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
                NAMASTE & Ayush Grid Ontology
              </li>
              <li>DPDP Act 2023 Consent Lifecycle</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Government Sponsoring Body
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Ministry of Ayush (Govt. of India)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Problem Statement ID: SIH26047
              </p>
              <p className="text-[10px] text-slate-400">
                Objective: Streamline OPD patient throughput and structured clinical history digitization before doctor consultation.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2024 MediKiosk Project. Designed for Smart India Hackathon.</p>
          <div className="flex items-center gap-4">
            <Link href="/compliance" className="hover:underline">
              Privacy Policy & Consent Framework
            </Link>
            <span>•</span>
            <Link href="/compliance#fhir" className="hover:underline">
              FHIR R4 Schema
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
