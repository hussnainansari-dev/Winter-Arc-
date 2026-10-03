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
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* Roadmap Header & Phase Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
              07 — The 90-Day Weekly Roadmap
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A] mt-1">
              90-Day Autonomous Flight Plan
            </h1>
            <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
              "The roadmap is organized by week. Each week has a dominant outcome, pillar priorities, and a day-by-day focus. You do not need to ask for Day 2 or Day 3; this is the map you run independently."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGatesDrawer(!showGatesDrawer)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                showGatesDrawer
                  ? 'bg-[#174EA6] text-white shadow-xs'
                  : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#174EA6] ${showGatesDrawer ? 'text-white' : ''}" />
              <span>11 Phase Gates</span>
            </button>
          </div>
        </div>

        {/* Phase Filter Tabs (Section 16: No rainbow phases, unified blue/neutral hierarchy) */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setSelectedPhase('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedPhase === 'all'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            All 14 Weeks (W0–W13)
          </button>

          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPhase === p.id
                  ? 'bg-[#174EA6] text-white shadow-xs'
                  : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Phase Gates Drawer (Section 03 & 15: Neutral surface #F1F3F5, Deep Navy, Subtle Green completion) */}
      {showGatesDrawer && (
        <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[rgba(11,31,58,0.08)] pb-3">
            <div>
              <h3 className="font-display text-base font-bold text-[#0B1F3A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#174EA6]" />
                Phase Gates & Deliverables (Section 03 & 15)
              </h3>
              <p className="text-xs text-[#111827]/70 mt-0.5">
                "Do not advance because the calendar changed. Advance because the foundations are usable and proven."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {phaseGates.map((gate) => (
              <div
                key={gate.id}
                className="p-3.5 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tabular-nums text-[#111827]/60 font-semibold">{gate.date}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded capitalize font-semibold ${
                      gate.status === 'passed'
                        ? 'bg-[#4F7D62]/10 text-[#4F7D62]'
                        : gate.status === 'in-progress'
                        ? 'bg-[#EAF3FF] text-[#174EA6]'
                        : 'bg-[#F1F3F5] text-[#111827]/50'
                    }`}
                  >
                    {gate.status}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#0B1F3A]">
                  {gate.title}
                </h4>
                <p className="text-xs text-[#111827]/80 leading-relaxed">
                  {gate.requiredEvidence}
                </p>

                {/* Status changer buttons */}
                <div className="pt-2 border-t border-[rgba(11,31,58,0.08)] flex items-center gap-1.5 text-[11px]">
                  {(['pending', 'in-progress', 'passed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdatePhaseGate(gate.id, { status: st })}
                      className={`px-2 py-0.5 rounded capitalize transition-colors font-medium ${
                        gate.status === st
                          ? st === 'passed'
                            ? 'bg-[#4F7D62] text-white font-semibold'
                            : st === 'in-progress'
                            ? 'bg-[#174EA6] text-white font-semibold'
                            : 'bg-[#0B1F3A] text-white font-semibold'
                          : 'text-[#111827]/60 hover:text-[#0B1F3A]'
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
                  ? 'border-[#174EA6]/30 bg-[#EAF3FF]/40 shadow-xs'
                  : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] hover:border-[#174EA6]/20'
              }`}
            >
              {/* Week Accordion Header */}
              <div
                onClick={() => toggleWeekExpand(week.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <button className="text-[#0B1F3A]/60 hover:text-[#0B1F3A] mt-0.5 sm:mt-0">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-[#0B1F3A]" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[#0B1F3A]/50" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#174EA6]">
                        {week.id}
                      </span>
                      <span className="text-[#111827]/30">·</span>
                      <span className="font-mono text-xs text-[#111827]/70 font-semibold">
                        {week.dateRange}
                      </span>
                      {isCurrentWeek && (
                        <>
                          <span className="text-[#111827]/30">·</span>
                          <span className="text-[11px] font-mono font-bold text-[#174EA6] bg-[#EAF3FF] px-2 py-0.5 rounded border border-[#174EA6]/20 uppercase">
                            CURRENT WEEK
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#0B1F3A]">
                      {week.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono sm:self-center pl-8 sm:pl-0">
                  <span className="text-[#111827]/70 hidden md:inline">
                    Pillars: {week.pillarFocus}
                  </span>
                  <span className="text-[#0B1F3A] font-semibold tabular-nums bg-[#F8F7F3] px-2.5 py-1 rounded border border-[rgba(11,31,58,0.08)]">
                    {completedCount} / {week.days.length} days
                  </span>
                </div>
              </div>

              {/* Week Expanded Body */}
              {isExpanded && (
                <div className="border-t border-[rgba(11,31,58,0.08)] p-5 space-y-5 bg-[#F8F7F3]/70">
                  {/* Weekly Outcome Box */}
                  <div className="p-3.5 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#174EA6] font-bold block mb-0.5">
                      Weekly Outcome Target
                    </span>
                    <p className="text-sm font-semibold text-[#0B1F3A]">
                      {week.outcome}
                    </p>
                  </div>

                  {/* Daily Tasks Table */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0B1F3A] font-semibold block">
                      Daily Execution Schedule
                    </span>

                    <div className="space-y-2">
                      {week.days.map((day) => {
                        const isToday = day.dayIndex === currentDayIndex;
                        const isEditing = editingDayIndex === day.dayIndex;

                        return (
                          <div
                            key={day.dayIndex}
                            className={`p-3.5 rounded-lg border transition-all ${
                              isToday
                                ? 'border-[#174EA6]/50 bg-[#EAF3FF]'
                                : day.completed
                                ? 'border-[#4F7D62]/40 bg-[#4F7D62]/5'
                                : 'border-[rgba(11,31,58,0.08)] bg-[#F8F7F3]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <button
                                  onClick={() => onToggleDayCompleted(day.dayIndex)}
                                  className="mt-0.5 text-[#111827]/40 hover:text-[#4F7D62] transition-colors shrink-0"
                                >
                                  {day.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#4F7D62]" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-[#111827]/30" />
                                  )}
                                </button>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-bold text-[#0B1F3A]">
                                      {day.displayDate}
                                    </span>
                                    <span className="text-[#111827]/30">·</span>
                                    <span className="text-xs font-bold text-[#0B1F3A]">
                                      {day.topic}
                                    </span>
                                    <span className="text-[11px] font-mono text-[#174EA6]">
                                      [{day.pillarFocus.join(', ')}]
                                    </span>
                                    {isToday && (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#174EA6] text-white font-bold">
                                        TODAY
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-[#111827] leading-relaxed">
                                    {day.executionDetail}
                                  </p>

                                  {/* Notes & Proof Artifact view/edit */}
                                  {day.notes && !isEditing && (
                                    <p className="text-xs text-[#111827]/70 font-mono italic pt-1">
                                      Log: {day.notes}
                                    </p>
                                  )}
                                  {day.proofLink && !isEditing && (
                                    <div className="flex items-center gap-1 text-xs text-[#174EA6] pt-0.5">
                                      <ExternalLink className="w-3 h-3" />
                                      <span className="truncate max-w-sm font-mono">{day.proofLink}</span>
                                    </div>
                                  )}

                                  {isEditing && (
                                    <div className="pt-2 space-y-2">
                                      <input
                                        type="text"
                                        value={day.notes || ''}
                                        onChange={(e) => onUpdateDayDetails(day.dayIndex, { notes: e.target.value })}
                                        placeholder="Add execution note / lesson learned..."
                                        className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.15)] rounded px-2.5 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                                      />
                                      <input
                                        type="text"
                                        value={day.proofLink || ''}
                                        onChange={(e) => onUpdateDayDetails(day.dayIndex, { proofLink: e.target.value })}
                                        placeholder="GitHub commit / proof link / recording note..."
                                        className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.15)] rounded px-2.5 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                                      />
                                      <button
                                        onClick={() => setEditingDayIndex(null)}
                                        className="px-3 py-1 bg-[#174EA6] hover:bg-[#0F3B82] text-white rounded text-xs font-semibold"
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
                                  className="text-[11px] text-[#174EA6] hover:underline font-mono font-medium"
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
                  <div className="p-4 rounded-lg border border-[#174EA6]/30 bg-[#EAF3FF] space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#174EA6] font-bold block">
                      WEEKLY GATE
                    </span>
                    <p className="text-xs text-[#0B1F3A] font-semibold">
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
