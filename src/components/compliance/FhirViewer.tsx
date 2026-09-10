'use client';

import React, { useState } from 'react';
import { Copy, Check, Code2, ShieldCheck, FileCheck, Layers } from 'lucide-react';
import { SAMPLE_FHIR_BUNDLE } from '@/data/fhirSchemas';

export const FhirViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'bundle' | 'composition' | 'condition' | 'observation'>('bundle');

  const getActiveJson = () => {
    if (activeTab === 'bundle') return SAMPLE_FHIR_BUNDLE;
    if (activeTab === 'composition') return SAMPLE_FHIR_BUNDLE.entry[0].resource;
    if (activeTab === 'condition') return SAMPLE_FHIR_BUNDLE.entry[1].resource;
    if (activeTab === 'observation') return SAMPLE_FHIR_BUNDLE.entry[2].resource;
    return SAMPLE_FHIR_BUNDLE;
  };

  const jsonString = JSON.stringify(getActiveJson(), null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 overflow-hidden shadow-2xl">
      {/* Code Header Bar */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-400" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              FHIR® R4 Indian Profile Schema Viewer
            </h4>
            <p className="text-[11px] text-slate-400">
              MIME: application/fhir+json • ABDM NRCES Validated
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-resource Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeTab === 'bundle' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bundle
            </button>
            <button
              onClick={() => setActiveTab('composition')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeTab === 'composition' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Composition
            </button>
            <button
              onClick={() => setActiveTab('condition')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeTab === 'condition' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Condition
            </button>
            <button
              onClick={() => setActiveTab('observation')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeTab === 'observation' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Observation (Prakriti)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>
        </div>
      </div>

      {/* Code Body */}
      <pre className="p-4 sm:p-6 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed max-h-[480px]">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};
