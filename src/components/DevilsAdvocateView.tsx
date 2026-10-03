import React from 'react';
import { TrapItem, NonNegotiableRule } from '../types/winterArc';
import { NON_NEGOTIABLE_RULES } from '../data/roadmapData';
import { AlertCircle, CheckCircle2, Circle, ShieldCheck, Flame, HelpCircle } from 'lucide-react';

interface DevilsAdvocateViewProps {
  traps: TrapItem[];
  pledged: boolean;
  onTogglePledge: () => void;
  onToggleTrap: (trapId: string) => void;
}

export const DevilsAdvocateView: React.FC<DevilsAdvocateViewProps> = ({
  traps,
  pledged,
  onTogglePledge,
  onToggleTrap
}) => {
  const triggeredTrapsCount = traps.filter(t => t.isTriggered).length;

  return (
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
            05 & 14 — Rules & Devil's Advocate Layer
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A] mt-1">
            System Integrity & Trap Defense
          </h1>
          <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
            "These are the traps most likely to make the challenge look productive while weakening its actual outcome. Counter them with brutal honesty and immediate corrective actions."
          </p>
        </div>
      </section>

      {/* 05 The 10 Non-Negotiable Rules */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(11,31,58,0.08)] pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#174EA6]" />
              05 — Ten Non-Negotiable Operational Rules
            </h3>
            <p className="text-xs text-[#111827]/70 mt-0.5">
              The foundational contract governing all 90 days.
            </p>
          </div>

          <button
            onClick={onTogglePledge}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              pledged
                ? 'bg-[#4F7D62] text-white shadow-xs'
                : 'bg-[#174EA6] hover:bg-[#0F3B82] text-white'
            }`}
          >
            {pledged ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                Pledged to Honor Rules
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                Sign Daily Integrity Pledge
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NON_NEGOTIABLE_RULES.map((rule) => (
            <div
              key={rule.id}
              className="p-3.5 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#174EA6]">#{rule.id}</span>
                <h4 className="font-semibold text-[#0B1F3A]">{rule.rule}</h4>
              </div>
              <p className="text-[#111827]/80 leading-relaxed pl-5">
                {rule.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 14 Devil's Advocate Interactive Diagnostic */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(11,31,58,0.08)] pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#174EA6]" />
              14 — The Trap Detector & Self-Audit
            </h3>
            <p className="text-xs text-[#111827]/70 mt-0.5">
              Are you slipping into false productivity? Click any trap you feel creeping in to view its remedy.
            </p>
          </div>

          <div className="text-xs font-mono">
            <span className="text-[#111827]/60">Traps active today: </span>
            <span className={`font-bold tabular-nums ${triggeredTrapsCount > 0 ? 'text-[#174EA6]' : 'text-[#4F7D62]'}`}>
              {triggeredTrapsCount} of {traps.length}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {traps.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-4 transition-all text-xs ${
                item.isTriggered
                  ? 'border-[#174EA6]/40 bg-[#EAF3FF]'
                  : 'border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] hover:border-[#174EA6]/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-display text-sm font-bold ${item.isTriggered ? 'text-[#174EA6]' : 'text-[#0B1F3A]'}`}>
                      {item.trap}
                    </span>
                    {item.isTriggered && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#174EA6] text-white font-semibold uppercase">
                        Active Alert
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.08)]">
                      <span className="text-[11px] font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                        Brutal Counter-Question
                      </span>
                      <p className="text-[#111827] font-medium leading-relaxed">
                        "{item.counterQuestion}"
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.08)]">
                      <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider block mb-1 font-semibold">
                        Mandatory Corrective Action
                      </span>
                      <p className="text-[#111827] font-medium leading-relaxed">
                        {item.correctiveAction}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleTrap(item.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold shrink-0 transition-colors ${
                    item.isTriggered
                      ? 'bg-[#4F7D62] text-white'
                      : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
                  }`}
                >
                  {item.isTriggered ? 'Remedy Applied' : 'Flag Trap'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
