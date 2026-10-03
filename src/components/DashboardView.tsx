import React from 'react';
import { WinterArcState } from '../data/initialState';
import { PHASES } from '../data/roadmapData';
import { CheckCircle2, Circle, AlertCircle, ArrowRight, Sparkles, Flame, Clock, BookOpen, Mic, Database, Camera, Palette } from 'lucide-react';
import defaultPortraitImg from '../assets/images/hussnain_winter_portrait_1790968594204.jpg';
import bgBrutalistImg from '../assets/images/bg_brutalist_frost_1790968605374.jpg';
import bgAlpineImg from '../assets/images/bg_alpine_winter_1790968617391.jpg';

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
    : state.activeBackgroundId === 'brutalist-frost'
    ? bgBrutalistImg
    : null;

  return (
    <div className="space-y-8 pb-12">
      {/* 01 Executive Banner & Identity Section with Unique Background Scrim */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 backdrop-blur-sm group">
        {/* Unique Background Layer */}
        {heroBgSrc && (
          <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
            <img
              src={heroBgSrc}
              alt="Winter Arc Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/70" />
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* User Avatar with interactive click to customize */}
            <div
              onClick={onOpenPictureStudio}
              title="Click to change your picture and unique background"
              className="relative w-18 h-22 sm:w-20 sm:h-26 rounded-xl overflow-hidden border border-neutral-600/70 bg-neutral-900 shrink-0 shadow-lg cursor-pointer group/avatar ring-1 ring-sky-500/20 hover:ring-sky-400 transition-all"
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
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-mono text-center p-1">
                <Camera className="w-4 h-4 mb-0.5 text-sky-400" />
                Change Pic
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400">
                <span>02 OCT 2026</span>
                <span aria-hidden="true">→</span>
                <span>30 DEC 2026</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-400 font-semibold">90-DAY OPERATING SYSTEM</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Hussnain Ansari
                </h1>
                <button
                  onClick={onOpenPictureStudio}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800/50 transition-colors"
                  title="Upload picture or customize unique background"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Picture & Background</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                Accounting & Finance <span className="text-neutral-500">→</span> Business <span className="text-neutral-500">→</span> Data Analytics <span className="text-neutral-500">→</span> Building
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
                <span>Active: <strong className="text-white">Day {currentDayIndex} of 90</strong></span>
                <span aria-hidden="true">·</span>
                <span>Days remaining: <strong className="text-white font-mono tabular-nums">{90 - totalCompletedDays}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Progress: <strong className="text-white font-mono tabular-nums">{completionPercentage}%</strong></span>
              </div>
            </div>
          </div>

          {/* Core Mantra / Standard Box */}
          <div className="flex flex-col justify-center rounded-lg border border-neutral-800 bg-neutral-950/80 p-4 sm:p-5 md:max-w-md">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              The Winter Arc Standard
            </span>
            <p className="font-display text-sm sm:text-base font-bold text-neutral-100 tracking-tight mt-1">
              Learn → Practice → Build → Explain → Document → Improve
            </p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              "Not a motivation challenge. A controlled 90-day experiment designed to create capability and proof."
            </p>
          </div>
        </div>
      </section>

      {/* 18 One-Page Dashboard Quick HUD */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PHASES.map((p) => {
          const isPhaseActive = p.id === activePhase.id;
          return (
            <div
              key={p.id}
              className={`rounded-lg border p-4 transition-all ${
                isPhaseActive
                  ? 'border-neutral-700 bg-neutral-900/90 shadow-sm'
                  : 'border-neutral-800/80 bg-neutral-900/40 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono">{p.startDate.slice(5)} → {p.endDate.slice(5)}</span>
                <span className={`text-[11px] font-mono font-medium ${isPhaseActive ? 'text-amber-400' : 'text-neutral-500'}`}>
                  {isPhaseActive ? 'CURRENT PHASE' : 'SCHEDULED'}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white mt-1">
                {p.name}
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                {p.centralQuestion}
              </p>
              <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                {p.primaryOutcome}
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-800 text-[11px] text-neutral-500">
                Trap to avoid: <span className="text-neutral-400">{p.avoidTrap}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Today's Focus & Action Station */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>{currentTask?.displayDate}</span>
              <span aria-hidden="true">·</span>
              <span>Week {currentTask?.weekId}</span>
              <span aria-hidden="true">·</span>
              <span className="text-sky-400">Pillar: {currentTask?.pillarFocus.join(', ')}</span>
            </div>
            <h2 className="font-display text-xl font-bold text-white mt-1">
              Day {currentDayIndex}: {currentTask?.topic}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCurrentDayCompleted}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTask?.completed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              {currentTask?.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
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
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Execution Directive
              </label>
              <p className="text-sm text-neutral-200 mt-1 leading-relaxed bg-neutral-950/60 p-3.5 rounded-lg border border-neutral-800 font-medium">
                {currentTask?.executionDetail}
              </p>
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
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
                className="w-full mt-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Minimum Viable Day (MVD) Station */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Minimum Viable Day (MVD)
              </span>
              <span className="text-[11px] text-neutral-500">35 min total</span>
            </div>
            <p className="text-xs text-neutral-400">
              When schedule collapses: protect continuity. No zero-recovery spiral.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => toggleMvdItem('technical20m')}
                className={`w-full flex items-center justify-between p-2.5 rounded-md border text-xs text-left transition-colors ${
                  state.mvdState.technical20m
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>20m Technical Practice</span>
                </div>
                {state.mvdState.technical20m ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-neutral-600" />}
              </button>

              <button
                onClick={() => toggleMvdItem('english10m')}
                className={`w-full flex items-center justify-between p-2.5 rounded-md border text-xs text-left transition-colors ${
                  state.mvdState.english10m
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>10m English Speaking</span>
                </div>
                {state.mvdState.english10m ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-neutral-600" />}
              </button>

              <button
                onClick={() => toggleMvdItem('reflection5m')}
                className={`w-full flex items-center justify-between p-2.5 rounded-md border text-xs text-left transition-colors ${
                  state.mvdState.reflection5m
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>5m Reflection + Tomorrow's MIT</span>
                </div>
                {state.mvdState.reflection5m ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-neutral-600" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 90-Day Interactive Matrix */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              90-Day Trajectory Grid
            </h3>
            <p className="text-xs text-neutral-400">
              Click any day to jump to its focus directive, update notes, or verify completion.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-neutral-800 border border-neutral-700" />
              Pending
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
              Active Day
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              Completed
            </span>
          </div>
        </div>

        {/* 90 Days visual matrix */}
        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-18 gap-1.5 pt-2">
          {Array.from({ length: 90 }, (_, i) => {
            const dayNum = i + 1;
            // find task
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
                onClick={() => {
                  onSelectDay(dayNum);
                }}
                title={`Day ${dayNum}: ${dayTaskItem?.displayDate} — ${dayTaskItem?.topic}`}
                className={`relative aspect-square flex items-center justify-center rounded text-[11px] font-mono tabular-nums transition-all ${
                  isCurrent
                    ? 'ring-2 ring-sky-400 bg-sky-500 text-neutral-950 font-bold z-10 scale-105'
                    : isCompleted
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-600/50'
                    : 'bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </section>

      {/* 02 The Winter Arc Pillar Hierarchy */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            02 — The Winter Arc Pillar System
          </span>
          <h3 className="font-display text-lg font-bold text-white mt-1">
            The Priority Rule Engine
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl mt-1">
            "P4 is the main capability engine. P3 gives it business context. P2 makes the capability communicable. P5 makes the evidence visible. P1 keeps the entire system alive."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/60 space-y-1">
            <span className="text-xs font-mono font-semibold text-neutral-400">P1 · System</span>
            <h4 className="text-sm font-semibold text-white">Personal OS</h4>
            <p className="text-xs text-neutral-400">Discipline, time management, reflection, consistency.</p>
            <span className="text-[11px] text-neutral-500 block pt-1">Evidence: Weekly score + reflection</span>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/60 space-y-1">
            <span className="text-xs font-mono font-semibold text-neutral-400">P2 · Speech</span>
            <h4 className="text-sm font-semibold text-white">Communication</h4>
            <p className="text-xs text-neutral-400">Natural English, explanation, structured delivery.</p>
            <span className="text-[11px] text-neutral-500 block pt-1">Evidence: Voice recordings</span>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/60 space-y-1">
            <span className="text-xs font-mono font-semibold text-neutral-400">P3 · Business</span>
            <h4 className="text-sm font-semibold text-white">Accounting / Biz</h4>
            <p className="text-xs text-neutral-400">Degree foundation, financial reasoning, ratios.</p>
            <span className="text-[11px] text-neutral-500 block pt-1">Evidence: Analysis + notes</span>
          </div>

          <div className="p-3.5 rounded-lg border border-sky-900/40 bg-sky-950/20 space-y-1">
            <span className="text-xs font-mono font-semibold text-sky-400">P4 · Engine</span>
            <h4 className="text-sm font-semibold text-white">Technical Analytics</h4>
            <p className="text-xs text-neutral-300">Python, Excel, SQL, Power BI, data modeling.</p>
            <span className="text-[11px] text-sky-400/80 block pt-1">Evidence: Repos + Dashboards</span>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/60 space-y-1">
            <span className="text-xs font-mono font-semibold text-neutral-400">P5 · Proof</span>
            <h4 className="text-sm font-semibold text-white">Building & Brand</h4>
            <p className="text-xs text-neutral-400">Portfolio, GitHub, Learning in Public, FINOVAH.</p>
            <span className="text-[11px] text-neutral-500 block pt-1">Evidence: Published artifacts</span>
          </div>
        </div>
      </section>

      {/* Weekly Targets & Scorecard Bar */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              Weekly Execution Targets
            </h3>
            <p className="text-xs text-neutral-400">
              Targets, not perfection traps. Preserve minimum viable volume during university exam weeks.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('scoreboard')}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors"
          >
            Sunday Review
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">Technical</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.technicalSessions}
              <span className="text-xs font-normal text-neutral-500"> / 4–6</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">English Speaking</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.englishSessions}
              <span className="text-xs font-normal text-neutral-500"> / 5–7</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">Accounting/Biz</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.accountingSessions}
              <span className="text-xs font-normal text-neutral-500"> / 2–4</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">Project/Build</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.projectSessions}
              <span className="text-xs font-normal text-neutral-500"> / 2–4</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">Learning in Public</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.learningInPublicPosts}
              <span className="text-xs font-normal text-neutral-500"> / 1–3</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">Weekly Review</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.weeklyReviews}
              <span className="text-xs font-normal text-neutral-500"> / 1</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
            <span className="text-neutral-400 block text-[11px]">Maintenance</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {state.activeWeeklyPillarTargets.maintenanceSessions}
              <span className="text-xs font-normal text-neutral-500"> / 1</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
