import React from 'react';
import { TrapItem, NonNegotiableRule } from '../types/winterArc';
import { NON_NEGOTIABLE_RULES } from '../data/roadmapData';
import { AlertTriangle, CheckCircle2, Circle, ShieldCheck, Flame, HelpCircle } from 'lucide-react';

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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            05 & 14 — Rules & Devil's Advocate Layer
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            System Integrity & Trap Defense
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-1">
            "These are the traps most likely to make the challenge look productive while weakening its actual outcome. Counter them with brutal honesty and immediate corrective actions."
          </p>
        </div>
      </section>

      {/* 05 The 10 Non-Negotiable Rules */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              05 — Ten Non-Negotiable Operational Rules
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              The foundational contract governing all 90 days.
            </p>
          </div>

          <button
            onClick={onTogglePledge}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              pledged
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white text-neutral-950 hover:bg-neutral-200'
            }`}
          >
            {pledged ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
              className="p-3.5 rounded-lg border border-neutral-800/80 bg-neutral-950/70 space-y-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sky-400">#{rule.id}</span>
                <h4 className="font-semibold text-white">{rule.rule}</h4>
              </div>
              <p className="text-neutral-400 leading-relaxed pl-5">
                {rule.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 14 Devil's Advocate Interactive Diagnostic */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              14 — The Trap Detector & Self-Audit
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Are you slipping into false productivity? Click any trap you feel creeping in to view its remedy.
            </p>
          </div>

          <div className="text-xs font-mono">
            <span className="text-neutral-500">Traps active today: </span>
            <span className={`font-bold tabular-nums ${triggeredTrapsCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
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
                  ? 'border-amber-500/50 bg-amber-500/10'
                  : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-display text-sm font-bold ${item.isTriggered ? 'text-amber-300' : 'text-white'}`}>
                      {item.trap}
                    </span>
                    {item.isTriggered && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
                        Active Alert
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800/80">
                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                        Brutal Counter-Question
                      </span>
                      <p className="text-neutral-200 font-medium">
                        "{item.counterQuestion}"
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800/80">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                        Mandatory Corrective Action
                      </span>
                      <p className="text-neutral-200 font-medium">
                        {item.correctiveAction}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleTrap(item.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold shrink-0 transition-colors ${
                    item.isTriggered
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
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
