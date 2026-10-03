import React, { useState } from 'react';
import { WinterArcState } from '../data/initialState';
import { PHASES } from '../data/roadmapData';
import { CheckCircle2, Circle, ArrowRight, Clock, BookOpen, Mic, Database, Camera, Palette, Moon, Brain, Dumbbell, Sparkles, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import defaultPortraitImg from '../assets/images/hussnain_winter_portrait_1790968594204.jpg';
import bgBrutalistImg from '../assets/images/bg_brutalist_frost_1790968605374.jpg';
import bgAlpineImg from '../assets/images/bg_alpine_winter_1790968617391.jpg';
import bgObsidianImg from '../assets/images/bg_obsidian_studio_1791020510747.jpg';
import { WinterArcPictureStudio } from './WinterArcPictureStudio';

interface DashboardViewProps {
  state: WinterArcState;
  onUpdateState: (updater: (prev: WinterArcState) => WinterArcState) => void;
  onNavigateTab: (tab: string) => void;
  onSelectDay: (dayIndex: number) => void;
  onOpenPictureStudio: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onUpdateState,
  onNavigateTab,
  onSelectDay,
  onOpenPictureStudio
}) => {
  const [isStudioExpanded, setIsStudioExpanded] = useState<boolean>(false);
  const currentDayIndex = state.currentDayIndex;
  
  // Find current day task across all weeks
  let currentTask = state.weeks[0]?.days[0];
  for (const w of state.weeks) {
    const found = w.days.find(d => d.dayIndex === currentDayIndex);
    if (found) {
      currentTask = found;
      break;
    }
  }

  // Calculate overall stats
  let totalCompletedDays = 0;
  state.weeks.forEach(w => {
    w.days.forEach(d => {
      if (d.completed) totalCompletedDays++;
    });
  });

  const completionPercentage = Math.round((totalCompletedDays / 90) * 100);
  const activePhase = PHASES.find(p => p.id === currentTask?.phaseId) || PHASES[0];

  const toggleCurrentDayCompleted = () => {
    onUpdateState(prev => {
      const nextWeeks = prev.weeks.map(w => ({
        ...w,
        days: w.days.map(d => {
          if (d.dayIndex === currentDayIndex) {
            return { ...d, completed: !d.completed };
          }
          return d;
        })
      }));
      return { ...prev, weeks: nextWeeks };
    });
  };

  const toggleMvdItem = (key: 'technical20m' | 'english10m' | 'reflection5m') => {
    onUpdateState(prev => {
      const nextMvdState = {
        ...prev.mvdState,
        [key]: !prev.mvdState[key]
      };
      return { ...prev, mvdState: nextMvdState };
    });
  };

  const activePhoto = state.customProfileImage || defaultPortraitImg;

  // Background image source for hero scrim
  const heroBgSrc = state.activeBackgroundId === 'alpine-dawn'
    ? bgAlpineImg
    : state.activeBackgroundId === 'obsidian-monolith'
    ? bgObsidianImg
    : state.activeBackgroundId === 'brutalist-frost'
    ? bgBrutalistImg
    : null;

  const handleInlineSavePicture = (
    imageUri: string,
    bgId: string,
    effect: 'frost' | 'obsidian' | 'vignette' | 'clean'
  ) => {
    onUpdateState(prev => ({
      ...prev,
      customProfileImage: imageUri,
      activeBackgroundId: bgId,
      backgroundBlendEffect: effect
    }));
  };

  return (
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* 01 Intentional Deep Navy Hero Banner (Section 25: Dark section allowed for major identity statement) */}
      <section className="relative overflow-hidden rounded-xl border border-[#0B1F3A]/20 bg-[#0B1F3A] p-6 sm:p-8 shadow-sm group">
        {/* Subtle backdrop overlay */}
        {heroBgSrc && (
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src={heroBgSrc}
              alt="Winter Arc Atmosphere"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/70" />
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* User Portrait with quick studio trigger */}
            <div
              onClick={() => setIsStudioExpanded(!isStudioExpanded)}
              title="Click to toggle Picture & Background Studio"
              className="relative w-18 h-22 sm:w-20 sm:h-26 rounded-lg overflow-hidden border border-white/20 bg-[#111827] shrink-0 shadow-md cursor-pointer group/avatar hover:border-[#EAF3FF] transition-all"
            >
              <img
                src={activePhoto}
                alt="Hussnain Ansari"
                className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultPortraitImg;
                }}
              />
              <div className="absolute inset-0 bg-[#0B1F3A]/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-[#F8F7F3] text-[10px] font-mono text-center p-1">
                <Camera className="w-4 h-4 mb-0.5 text-[#EAF3FF]" />
                Change Pic
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#EAF3FF]/80">
                <span>02 OCT 2026</span>
                <span aria-hidden="true">→</span>
                <span>30 DEC 2026</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#EAF3FF] font-semibold">90-DAY OPERATING SYSTEM</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8F7F3]">
                  Hussnain Ansari
                </h1>
                <button
                  onClick={() => setIsStudioExpanded(!isStudioExpanded)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-[#EAF3FF] bg-[#174EA6]/60 hover:bg-[#174EA6] border border-[#EAF3FF]/20 transition-colors"
                  title="Upload picture or customize unique background"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>{isStudioExpanded ? 'Close Studio' : 'Picture & Background Studio'}</span>
                  {isStudioExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#F8F7F3]/80 font-medium">
                Accounting & Finance <span className="text-[#EAF3FF]/40">→</span> Business <span className="text-[#EAF3FF]/40">→</span> Data Analytics <span className="text-[#EAF3FF]/40">→</span> Building
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#EAF3FF]/80">
                <span>Active: <strong className="text-white">Day {currentDayIndex} of 90</strong></span>
                <span aria-hidden="true">·</span>
                <span>Days remaining: <strong className="text-white font-mono tabular-nums">{90 - totalCompletedDays}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Progress: <strong className="text-[#EAF3FF] font-mono tabular-nums font-bold">{completionPercentage}%</strong></span>
              </div>
            </div>
          </div>

          {/* Core Mantra / Standard Box */}
          <div className="flex flex-col justify-center rounded-lg border border-white/10 bg-[#0B1F3A]/80 p-4 sm:p-5 md:max-w-md">
            <span className="text-[11px] font-mono tracking-widest text-[#EAF3FF]/70 uppercase">
              The Winter Arc Standard
            </span>
            <p className="font-display text-sm sm:text-base font-bold text-[#F8F7F3] tracking-tight mt-1">
              Learn → Practice → Build → Explain → Document → Improve
            </p>
            <p className="text-xs text-[#EAF3FF]/80 mt-1 leading-relaxed">
              "Not a motivation challenge. A controlled 90-day experiment designed to create capability and proof."
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Streamlit-Style Picture & Background Studio (when toggled or accessible) */}
      {isStudioExpanded && (
        <section className="rounded-xl border border-[#174EA6]/30 bg-[#F8F7F3] p-6 shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-[rgba(11,31,58,0.08)] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono uppercase tracking-widest text-[#174EA6] font-bold">
                ❄️ Interactive Picture Studio
              </span>
            </div>
            <button
              onClick={() => setIsStudioExpanded(false)}
              className="text-xs text-[#111827]/60 hover:text-[#0B1F3A] font-mono px-2 py-1 bg-[#F1F3F5] rounded border border-[rgba(11,31,58,0.08)]"
            >
              Hide Studio ▲
            </button>
          </div>

          <WinterArcPictureStudio
            currentImage={state.customProfileImage}
            activeBackgroundId={state.activeBackgroundId}
            activeBlendEffect={state.backgroundBlendEffect}
            onSaveProfilePicture={handleInlineSavePicture}
            currentDay={state.currentDayIndex}
            isEmbedded={true}
            onClose={() => setIsStudioExpanded(false)}
          />
        </section>
      )}

      {/* 90-Day Progress Bar (Section 15: Progress fill #2563EB, background #EAF3FF) */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#0B1F3A] font-bold uppercase tracking-wider text-xs">
              Overall 90-Day Trajectory
            </span>
            <span className="text-[#111827]/50 font-mono">·</span>
            <span className="font-mono text-[#111827]/70 font-medium">Day {currentDayIndex} of 90</span>
          </div>
          <span className="font-mono text-sm font-bold text-[#2563EB] tabular-nums">
            {totalCompletedDays} / 90 Days ({completionPercentage}%)
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2.5 rounded-full bg-[#EAF3FF] overflow-hidden border border-[rgba(11,31,58,0.06)]">
          <div
            className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(2, completionPercentage)}%` }}
          />
        </div>
      </section>

      {/* Three Phase Cards (Section 14 & 16: #F1F3F5 surfaces, #0B1F3A headings, #174EA6 active) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PHASES.map((p) => {
          const isPhaseActive = p.id === activePhase.id;
          return (
            <div
              key={p.id}
              className={`rounded-lg border p-4 transition-all ${
                isPhaseActive
                  ? 'border-[#174EA6]/30 bg-[#EAF3FF]/70 shadow-xs'
                  : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#111827]/60">{p.startDate.slice(5)} → {p.endDate.slice(5)}</span>
                <span className={`text-[11px] font-mono font-bold ${isPhaseActive ? 'text-[#174EA6]' : 'text-[#111827]/50'}`}>
                  {isPhaseActive ? 'CURRENT PHASE' : 'SCHEDULED'}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1F3A] mt-1.5">
                {p.name}
              </h3>
              <p className="text-xs text-[#174EA6] font-medium mt-0.5">
                {p.centralQuestion}
              </p>
              <p className="text-xs text-[#111827]/80 mt-2 line-clamp-2 leading-relaxed">
                {p.primaryOutcome}
              </p>
              <div className="mt-3 pt-2 border-t border-[rgba(11,31,58,0.08)] text-[11px] text-[#111827]/60">
                Trap to avoid: <span className="text-[#0B1F3A] font-medium">{p.avoidTrap}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Today's Focus & Action Station */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[rgba(11,31,58,0.08)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#111827]/60">
              <span className="font-semibold text-[#0B1F3A]">{currentTask?.displayDate}</span>
              <span aria-hidden="true">·</span>
              <span>Week {currentTask?.weekId}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#174EA6] font-semibold">Pillar: {currentTask?.pillarFocus.join(', ')}</span>
            </div>
            <h2 className="font-display text-xl font-bold text-[#0B1F3A] mt-1">
              Day {currentDayIndex}: {currentTask?.topic}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCurrentDayCompleted}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTask?.completed
                  ? 'bg-[#4F7D62] text-white shadow-xs'
                  : 'bg-[#174EA6] text-white hover:bg-[#0F3B82]'
              }`}
            >
              {currentTask?.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Day Completed
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark Day as Completed
                </>
              )}
            </button>

            <button
              onClick={() => onNavigateTab('operating-systems')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#174EA6] bg-[#EAF3FF] hover:bg-[#d8e9ff] border border-[#174EA6]/20 rounded-lg transition-colors"
            >
              Launch Focus Mode
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Task Details and Execution Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-5">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block font-semibold">
                Execution Directive
              </label>
              <p className="text-sm text-[#111827] mt-1 leading-relaxed bg-[#F8F7F3] p-3.5 rounded-lg border border-[rgba(11,31,58,0.08)] font-medium">
                {currentTask?.executionDetail}
              </p>
            </div>

            <div>
              <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block font-semibold">
                Today's One Big Outcome (OBO)
              </label>
              <input
                type="text"
                value={state.todayOneBigOutcome}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdateState(prev => ({ ...prev, todayOneBigOutcome: val }));
                }}
                placeholder="Write in 1 sentence your One Big Outcome for today..."
                className="w-full mt-1 bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#111827]/40 focus:outline-none focus:border-[#174EA6] transition-colors"
              />
            </div>
          </div>

          {/* Minimum Viable Day (MVD) Station */}
          <div className="rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#174EA6] font-bold">
                Minimum Viable Day (MVD)
              </span>
              <span className="text-[11px] text-[#111827]/60 font-mono">35 min total</span>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              When schedule collapses: protect continuity. No zero-recovery spiral.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => toggleMvdItem('technical20m')}
                className={`w-full flex items-center justify-between p-2.5 rounded-md border text-xs text-left transition-colors ${
                  state.mvdState.technical20m
                    ? 'border-[#4F7D62]/40 bg-[#4F7D62]/10 text-[#4F7D62] font-semibold'
                    : 'border-[rgba(11,31,58,0.08)] hover:border-[#174EA6]/30 bg-[#F1F3F5] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span>20m Technical Practice</span>
                </div>
                {state.mvdState.technical20m ? <CheckCircle2 className="w-4 h-4 text-[#4F7D62]" /> : <Circle className="w-4 h-4 text-[#111827]/40" />}
              </button>

              <button
                onClick={() => toggleMvdItem('english10m')}
                className={`w-full flex items-center justify-between p-2.5 rounded-md border text-xs text-left transition-colors ${
                  state.mvdState.english10m
                    ? 'border-[#4F7D62]/40 bg-[#4F7D62]/10 text-[#4F7D62] font-semibold'
                    : 'border-[rgba(11,31,58,0.08)] hover:border-[#174EA6]/30 bg-[#F1F3F5] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-[#174EA6] shrink-0" />
                  <span>10m English Speaking</span>
                </div>
                {state.mvdState.english10m ? <CheckCircle2 className="w-4 h-4 text-[#4F7D62]" /> : <Circle className="w-4 h-4 text-[#111827]/40" />}
              </button>

              <button
                onClick={() => toggleMvdItem('reflection5m')}
                className={`w-full flex items-center justify-between p-2.5 rounded-md border text-xs text-left transition-colors ${
                  state.mvdState.reflection5m
                    ? 'border-[#4F7D62]/40 bg-[#4F7D62]/10 text-[#4F7D62] font-semibold'
                    : 'border-[rgba(11,31,58,0.08)] hover:border-[#174EA6]/30 bg-[#F1F3F5] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#0B1F3A] shrink-0" />
                  <span>5m Reflection + Tomorrow's MIT</span>
                </div>
                {state.mvdState.reflection5m ? <CheckCircle2 className="w-4 h-4 text-[#4F7D62]" /> : <Circle className="w-4 h-4 text-[#111827]/40" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 90-Day Interactive Matrix (Section 15: #F1F3F5 neutral cells, #2563EB active, #4F7D62 completed) */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              90-Day Trajectory Grid
            </h3>
            <p className="text-xs text-[#111827]/70">
              Click any day to jump to its focus directive, update notes, or verify completion.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#111827]/60">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#F8F7F3] border border-[rgba(11,31,58,0.15)]" />
              Pending
            </span>
            <span className="flex items-center gap-1.5 text-[#174EA6] font-semibold">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#174EA6]" />
              Active Day
            </span>
            <span className="flex items-center gap-1.5 text-[#4F7D62] font-semibold">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#4F7D62]" />
              Completed
            </span>
          </div>
        </div>

        {/* 90 Days visual matrix */}
        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-18 gap-1.5 pt-2">
          {Array.from({ length: 90 }, (_, i) => {
            const dayNum = i + 1;
            let dayTaskItem: any = null;
            for (const w of state.weeks) {
              const f = w.days.find(d => d.dayIndex === dayNum);
              if (f) {
                dayTaskItem = f;
                break;
              }
            }

            const isCurrent = dayNum === currentDayIndex;
            const isCompleted = dayTaskItem?.completed;

            return (
              <button
                key={dayNum}
                onClick={() => onSelectDay(dayNum)}
                title={`Day ${dayNum}: ${dayTaskItem?.displayDate} — ${dayTaskItem?.topic}`}
                className={`relative aspect-square flex items-center justify-center rounded text-[11px] font-mono tabular-nums transition-all ${
                  isCurrent
                    ? 'ring-2 ring-[#2563EB] bg-[#174EA6] text-white font-bold z-10 scale-105 shadow-xs'
                    : isCompleted
                    ? 'bg-[#4F7D62] text-white hover:bg-[#3E654E]'
                    : 'bg-[#F8F7F3] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A]/70 hover:border-[#174EA6] hover:text-[#0B1F3A]'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </section>

      {/* Unified Winter Arc Growth Dimensions (Section 01, 13: Islamic, Mental, Physical, Learning, Habits, Reflection) */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
            01 & 13 — Unified Growth Architecture
          </span>
          <h3 className="font-display text-lg font-bold text-[#0B1F3A] mt-1">
            Six Interconnected Dimensions of One Operating System
          </h3>
          <p className="text-xs text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
            "The entire Winter Arc ecosystem inherits one visual identity. There is no separate color palette for Islamic, Mental, Physical, or Learning. These are different modules of the same operating system."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {/* 1. Islamic Growth */}
          <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#174EA6]" />
              <h4 className="text-sm font-bold text-[#0B1F3A]">Islamic Growth</h4>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Fajr & 5 daily prayers consistency, Quran reflection, moral grounding, and inner stillness before God.
            </p>
            <span className="text-[11px] font-mono text-[#174EA6] block pt-1">Standard: Spiritual clarity & daily accountability</span>
          </div>

          {/* 2. Mental Strength */}
          <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#174EA6]" />
              <h4 className="text-sm font-bold text-[#0B1F3A]">Mental Strength</h4>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Cognitive composure, zero-scroll rule, attention control during deep work blocks, and emotional stability.
            </p>
            <span className="text-[11px] font-mono text-[#174EA6] block pt-1">Standard: Undistracted attention & calm focus</span>
          </div>

          {/* 3. Physical Strength */}
          <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#174EA6]" />
              <h4 className="text-sm font-bold text-[#0B1F3A]">Physical Strength</h4>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Disciplined movement, strength training, 7–8 hours sleep hygiene, clean hydration, and physical energy.
            </p>
            <span className="text-[11px] font-mono text-[#174EA6] block pt-1">Standard: Sustained bodily vitality & recovery</span>
          </div>

          {/* 4. Learning & Analytics */}
          <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#174EA6]" />
              <h4 className="text-sm font-bold text-[#0B1F3A]">Learning & Analytics</h4>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Accounting & Finance fundamentals into Python, SQL, Excel, and Power BI. Active reproduction over passive video watching.
            </p>
            <span className="text-[11px] font-mono text-[#174EA6] block pt-1">Standard: Inspectable projects & GitHub commits</span>
          </div>

          {/* 5. Discipline & Habits */}
          <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#174EA6]" />
              <h4 className="text-sm font-bold text-[#0B1F3A]">Discipline & Habits</h4>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Protected 6-block time framework, anchored habit stack, and Minimum Viable Day (MVD) continuity.
            </p>
            <span className="text-[11px] font-mono text-[#174EA6] block pt-1">Standard: 0.1% daily forward motion</span>
          </div>

          {/* 6. Reflection & Purpose */}
          <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#174EA6]" />
              <h4 className="text-sm font-bold text-[#0B1F3A]">Reflection & Purpose</h4>
            </div>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Nightly 3-line reflection journal, weekly Sunday 10-question audit, and honest self-assessment without hype.
            </p>
            <span className="text-[11px] font-mono text-[#174EA6] block pt-1">Standard: Weekly scorecard & calibrated direction</span>
          </div>
        </div>
      </section>

      {/* Weekly Targets & Scorecard Bar */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              Weekly Execution Targets
            </h3>
            <p className="text-xs text-[#111827]/70">
              Targets, not perfection traps. Preserve minimum viable volume during university exam weeks.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('scoreboard')}
            className="text-xs text-[#174EA6] hover:text-[#0B1F3A] font-semibold flex items-center gap-1 transition-colors"
          >
            Sunday Review
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">Technical</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.technicalSessions}
              <span className="text-xs font-normal text-[#111827]/50"> / 4–6</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">English Speaking</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.englishSessions}
              <span className="text-xs font-normal text-[#111827]/50"> / 5–7</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">Accounting/Biz</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.accountingSessions}
              <span className="text-xs font-normal text-[#111827]/50"> / 2–4</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">Project/Build</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.projectSessions}
              <span className="text-xs font-normal text-[#111827]/50"> / 2–4</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">Learning in Public</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.learningInPublicPosts}
              <span className="text-xs font-normal text-[#111827]/50"> / 1–3</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">Weekly Review</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.weeklyReviews}
              <span className="text-xs font-normal text-[#111827]/50"> / 1</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-center">
            <span className="text-[#111827]/60 block text-[11px]">Maintenance</span>
            <span className="font-mono text-base font-bold text-[#0B1F3A] tabular-nums">
              {state.activeWeeklyPillarTargets.maintenanceSessions}
              <span className="text-xs font-normal text-[#111827]/50"> / 1</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
