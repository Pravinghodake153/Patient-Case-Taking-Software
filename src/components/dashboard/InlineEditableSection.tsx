'use client';

import React, { useState } from 'react';
import { Edit2, Check, X, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { soundEffects } from '@/components/common/SoundEffects';

interface InlineEditableSectionProps {
  title: string;
  subtitle?: string;
  initialContent: string;
  onSave: (newContent: string) => void;
  badgeText?: string;
  badgeType?: 'ai' | 'ayush' | 'emergency';
}

export const InlineEditableSection: React.FC<InlineEditableSectionProps> = ({
  title,
  subtitle,
  initialContent,
  onSave,
  badgeText = 'AI Draft • Review & Validate',
  badgeType = 'ai',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    soundEffects.playTap();
    onSave(content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    soundEffects.playTap();
    setContent(initialContent);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              {title}
            </h3>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                badgeType === 'ayush'
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  : badgeType === 'emergency'
                  ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                  : 'bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>{badgeText}</span>
            </span>
          </div>
          {subtitle && <p className="text-[11px] text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            title="Edit clinical section"
          >
            <Edit2 className="w-3 h-3" />
            <span>Amend</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1.5 rounded-lg shadow-sm transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full text-xs sm:text-sm font-sans p-3 rounded-xl border-2 border-teal-500/60 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 leading-relaxed"
        />
      ) : (
        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-normal">
          {content}
        </div>
      )}
    </div>
  );
};
