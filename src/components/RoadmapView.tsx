import React, { useState } from 'react';
import { WeekPlan, PhaseGate, PhaseId, DayTask } from '../types/winterArc';
import { PHASES } from '../data/roadmapData';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, ShieldCheck, Calendar, Filter, ExternalLink } from 'lucide-react';

interface RoadmapViewProps {
  weeks: WeekPlan[];
  phaseGates: PhaseGate[];
  currentDayIndex: number;
  onToggleDayCompleted: (dayIndex: number) => void;
  onUpdateDayDetails: (dayIndex: number, updates: Partial<DayTask>) => void;
  onUpdatePhaseGate: (id: string, updates: Partial<PhaseGate>) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  weeks,
  phaseGates,
  currentDayIndex,
  onToggleDayCompleted,
  onUpdateDayDetails,
  onUpdatePhaseGate
}) => {
  const [selectedPhase, setSelectedPhase] = useState<PhaseId | 'all'>('all');
  const [expandedWeekId, setExpandedWeekId] = useState<string>('W0');
  const [showGatesDrawer, setShowGatesDrawer] = useState<boolean>(false);
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);

  const filteredWeeks = selectedPhase === 'all'
    ? weeks
    : weeks.filter(w => w.phaseId === selectedPhase);

  const toggleWeekExpand = (weekId: string) => {
    setExpandedWeekId(prev => prev === weekId ? '' : weekId);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Roadmap Header & Phase Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              07 — The 90-Day Weekly Roadmap
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              90-Day Autonomous Flight Plan
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-1">
              "The roadmap is organized by week. Each week has a dominant outcome, pillar priorities, and a day-by-day focus. You do not need to ask for Day 2 or Day 3; this is the map you run independently."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGatesDrawer(!showGatesDrawer)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                showGatesDrawer
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>11 Phase Gates</span>
            </button>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setSelectedPhase('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedPhase === 'all'
                ? 'bg-white text-neutral-950 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            All 14 Weeks (W0–W13)
          </button>

          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPhase === p.id
                  ? 'bg-neutral-800 text-white border border-neutral-600'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Phase Gates Drawer */}
      {showGatesDrawer && (
        <section className="rounded-xl border border-sky-900/50 bg-sky-950/20 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-sky-900/40 pb-3">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Phase Gates & Deliverables (Section 03 & 15)
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                "Do not advance because the calendar changed. Advance because the foundations are usable and proven."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {phaseGates.map((gate) => (
              <div
                key={gate.id}
                className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tabular-nums text-neutral-400">{gate.date}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded capitalize ${
                      gate.status === 'passed'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : gate.status === 'in-progress'
                        ? 'bg-amber-500/20 text-amber-300 font-semibold'
                        : 'bg-neutral-900 text-neutral-500'
                    }`}
                  >
                    {gate.status}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {gate.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {gate.requiredEvidence}
                </p>

                {/* Status changer buttons */}
                <div className="pt-2 border-t border-neutral-800 flex items-center gap-1.5 text-[11px]">
                  {(['pending', 'in-progress', 'passed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdatePhaseGate(gate.id, { status: st })}
                      className={`px-2 py-0.5 rounded capitalize transition-colors ${
                        gate.status === st
                          ? 'bg-neutral-700 text-white font-semibold'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Weeks list */}
      <section className="space-y-4">
        {filteredWeeks.map((week) => {
          const isExpanded = expandedWeekId === week.id;
          const completedCount = week.days.filter(d => d.completed).length;
          const isCurrentWeek = week.days.some(d => d.dayIndex === currentDayIndex);

          return (
            <div
              key={week.id}
              className={`rounded-xl border transition-all ${
                isCurrentWeek
                  ? 'border-sky-500/50 bg-neutral-900/90 shadow-sm'
                  : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
              }`}
            >
              {/* Week Accordion Header */}
              <div
                onClick={() => toggleWeekExpand(week.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <button className="text-neutral-400 hover:text-white mt-0.5 sm:mt-0">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-neutral-300" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-neutral-500" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-400">
                        {week.id}
                      </span>
                      <span className="text-neutral-600">·</span>
                      <span className="font-mono text-xs text-neutral-400">
                        {week.dateRange}
                      </span>
                      {isCurrentWeek && (
                        <>
                          <span className="text-neutral-600">·</span>
                          <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                            CURRENT WEEK
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">
                      {week.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono sm:self-center pl-8 sm:pl-0">
                  <span className="text-neutral-400 hidden md:inline">
                    Pillars: {week.pillarFocus}
                  </span>
                  <span className="text-neutral-400 tabular-nums">
                    {completedCount} / {week.days.length} days
                  </span>
                </div>
              </div>

              {/* Week Expanded Body */}
              {isExpanded && (
                <div className="border-t border-neutral-800 p-5 space-y-5 bg-neutral-950/40">
                  {/* Weekly Outcome Box */}
                  <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                      Weekly Outcome Target
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {week.outcome}
                    </p>
                  </div>

                  {/* Daily Tasks Table */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Daily Execution Schedule
                    </span>

                    <div className="space-y-2">
                      {week.days.map((day) => {
                        const isToday = day.dayIndex === currentDayIndex;
                        const isEditing = editingDayIndex === day.dayIndex;

                        return (
                          <div
                            key={day.dayIndex}
                            className={`p-3 rounded-lg border transition-all ${
                              isToday
                                ? 'border-sky-500/60 bg-sky-950/20'
                                : day.completed
                                ? 'border-emerald-500/30 bg-emerald-500/5'
                                : 'border-neutral-800/80 bg-neutral-950/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <button
                                  onClick={() => onToggleDayCompleted(day.dayIndex)}
                                  className="mt-0.5 text-neutral-500 hover:text-emerald-400 transition-colors shrink-0"
                                >
                                  {day.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-neutral-600" />
                                  )}
                                </button>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-bold text-neutral-300">
                                      {day.displayDate}
                                    </span>
                                    <span className="text-neutral-600">·</span>
                                    <span className="text-xs font-semibold text-white">
                                      {day.topic}
                                    </span>
                                    <span className="text-[11px] font-mono text-neutral-500">
                                      [{day.pillarFocus.join(', ')}]
                                    </span>
                                    {isToday && (
                                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                                        TODAY
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-neutral-300 leading-relaxed">
                                    {day.executionDetail}
                                  </p>

                                  {/* Notes & Proof Artifact view/edit */}
                                  {day.notes && !isEditing && (
                                    <p className="text-xs text-neutral-400 font-mono italic pt-1">
                                      Log: {day.notes}
                                    </p>
                                  )}
                                  {day.proofLink && !isEditing && (
                                    <div className="flex items-center gap-1 text-xs text-sky-400 pt-0.5">
                                      <ExternalLink className="w-3 h-3" />
                                      <span className="truncate max-w-sm">{day.proofLink}</span>
                                    </div>
                                  )}

                                  {isEditing && (
                                    <div className="pt-2 space-y-2">
                                      <input
                                        type="text"
                                        value={day.notes || ''}
                                        onChange={(e) => onUpdateDayDetails(day.dayIndex, { notes: e.target.value })}
                                        placeholder="Add execution note / lesson learned..."
                                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none"
                                      />
                                      <input
                                        type="text"
                                        value={day.proofLink || ''}
                                        onChange={(e) => onUpdateDayDetails(day.dayIndex, { proofLink: e.target.value })}
                                        placeholder="GitHub commit / proof link / recording note..."
                                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none"
                                      />
                                      <button
                                        onClick={() => setEditingDayIndex(null)}
                                        className="px-2.5 py-1 bg-neutral-800 text-white rounded text-xs"
                                      >
                                        Save Log
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="shrink-0 flex items-center gap-2">
                                <button
                                  onClick={() => setEditingDayIndex(isEditing ? null : day.dayIndex)}
                                  className="text-[11px] text-neutral-400 hover:text-neutral-200 font-mono"
                                >
                                  {isEditing ? 'Close' : 'Log Note'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Weekly Gate Callout */}
                  <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      WEEKLY GATE
                    </span>
                    <p className="text-xs text-neutral-200 font-medium">
                      {week.weeklyGate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
