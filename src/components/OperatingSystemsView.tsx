import React, { useState, useEffect, useRef } from 'react';
import { OperatingMode, OperatingBlock, HabitStackItem, MilestoneItem } from '../types/winterArc';
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Clock, CheckSquare, Target, Volume2, Shield } from 'lucide-react';

interface OperatingSystemsViewProps {
  blocks: OperatingBlock[];
  habitStack: HabitStackItem[];
  milestones: MilestoneItem[];
  onToggleBlock: (id: string) => void;
  onToggleHabit: (id: string) => void;
  onUpdateMilestone: (id: string, updates: Partial<MilestoneItem>) => void;
}

export const OperatingSystemsView: React.FC<OperatingSystemsViewProps> = ({
  blocks,
  habitStack,
  milestones,
  onToggleBlock,
  onToggleHabit,
  onUpdateMilestone
}) => {
  const [activeMode, setActiveMode] = useState<OperatingMode>('time-block');

  // Focus Timer State
  const [timerDurationMinutes, setTimerDurationMinutes] = useState<number>(60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeBlockName, setActiveBlockName] = useState<string>('Block 2 — Deep Technical');
  const [artifactNote, setArtifactNote] = useState<string>('');
  const [loggedArtifacts, setLoggedArtifacts] = useState<Array<{ id: string; time: string; block: string; note: string }>>([
    {
      id: 'art-0',
      time: '11:15',
      block: 'Block 1 — Mental warm-up',
      note: 'Mapped Day 1 baseline gaps and set 90-day targets.'
    }
  ]);

  const timerRef = useRef<any>(null);

  // Play browser Web Audio synthesizer chime on timer completion
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.warn('Audio chime unavailable', e);
    }
  };

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const setTimerPreset = (minutes: number, blockName: string) => {
    setIsTimerRunning(false);
    setTimerDurationMinutes(minutes);
    setSecondsRemaining(minutes * 60);
    setActiveBlockName(blockName);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(timerDurationMinutes * 60);
  };

  const handleLogArtifact = () => {
    if (!artifactNote.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLoggedArtifacts((prev) => [
      {
        id: String(Date.now()),
        time: timeStr,
        block: activeBlockName,
        note: artifactNote.trim()
      },
      ...prev
    ]);
    setArtifactNote('');
  };

  const minutesDisplay = Math.floor(secondsRemaining / 60);
  const secondsDisplay = secondsRemaining % 60;
  const timeFormatted = `${String(minutesDisplay).padStart(2, '0')}:${String(secondsDisplay).padStart(2, '0')}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Header and Mode Selector */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            04 — Three Operating Systems
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Choose Your Execution Engine
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-1">
            "They are not competing systems; they solve different problems. Use Time-Block when the day is under your control, Habit-Stack when flexibility is needed, and Milestones to avoid false productivity."
          </p>
        </div>

        {/* Clean Segmented Mode Selector */}
        <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
          <button
            onClick={() => setActiveMode('time-block')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeMode === 'time-block'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            A. TIME-BLOCK (Strict Schedule)
          </button>
          <button
            onClick={() => setActiveMode('habit-stack')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeMode === 'habit-stack'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            B. HABIT-STACK (Flexible Checklist)
          </button>
          <button
            onClick={() => setActiveMode('milestone')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeMode === 'milestone'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            C. MILESTONE (Goal-Focused)
          </button>
        </div>
      </section>

      {/* MODE A: TIME BLOCK */}
      {activeMode === 'time-block' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: 6 Strict Blocks List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    The 6 Protected Work Blocks
                  </h3>
                  <p className="text-xs text-neutral-400">
                    "Strict means the block has a protected purpose, not that every day has unlimited hours."
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`rounded-lg border p-4 transition-all ${
                      block.completed
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-sky-400">
                            Block {block.number}
                          </span>
                          <span className="text-neutral-500 font-mono text-xs">·</span>
                          <h4 className="text-sm font-semibold text-white">
                            {block.name}
                          </h4>
                          <span className="font-mono text-xs tabular-nums text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                            {block.standardTarget}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300">
                          {block.rule}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quick load into Focus Timer button */}
                        <button
                          onClick={() => {
                            const minutes = block.number === 2 ? 90 : block.number === 5 ? 60 : 30;
                            setTimerPreset(minutes, `Block ${block.number} — ${block.name}`);
                          }}
                          title="Load this block into the focus timer"
                          className="px-2 py-1 text-[11px] font-mono font-medium text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded transition-colors"
                        >
                          Load Timer
                        </button>

                        <button
                          onClick={() => onToggleBlock(block.id)}
                          className="p-1 text-neutral-400 hover:text-emerald-400 transition-colors"
                        >
                          {block.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-neutral-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Deep Work Focus Timer & Artifact Logger */}
            <div className="space-y-4">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <h3 className="font-display text-sm font-bold text-white">
                      Protected Focus Timer
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 truncate max-w-[130px]">
                    {activeBlockName}
                  </span>
                </div>

                {/* Big Digital Display */}
                <div className="flex flex-col items-center justify-center p-6 bg-neutral-950 border border-neutral-800 rounded-lg text-center">
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-widest tabular-nums">
                    {timeFormatted}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase mt-2 tracking-wider">
                    {isTimerRunning ? 'Session In Progress' : 'Ready / Paused'}
                  </span>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isTimerRunning
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-white text-neutral-950 hover:bg-neutral-200'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        Start Block
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="p-2.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Presets */}
                <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-mono">
                  <button
                    onClick={() => setTimerPreset(25, 'Pomodoro Sprint')}
                    className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                  >
                    25m
                  </button>
                  <button
                    onClick={() => setTimerPreset(45, 'Build / Proof Block')}
                    className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                  >
                    45m
                  </button>
                  <button
                    onClick={() => setTimerPreset(60, 'Deep Technical 60m')}
                    className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                  >
                    60m
                  </button>
                  <button
                    onClick={() => setTimerPreset(90, 'Deep Technical 90m')}
                    className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                  >
                    90m
                  </button>
                </div>

                {/* Mandatory Artifact Logger */}
                <div className="border-t border-neutral-800 pt-4 space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Produce an Artifact (Non-Negotiable)
                  </label>
                  <p className="text-[11px] text-neutral-500">
                    "Output beats passive input. What exercise, commit, or note did you generate?"
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={artifactNote}
                      onChange={(e) => setArtifactNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogArtifact();
                      }}
                      placeholder="e.g. Created dict_practice.py with 3 ledger models"
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600"
                    />
                    <button
                      onClick={handleLogArtifact}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-xs font-medium transition-colors"
                    >
                      Log
                    </button>
                  </div>
                </div>
              </div>

              {/* Logged Artifacts feed */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Today's Recorded Artifacts ({loggedArtifacts.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {loggedArtifacts.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded bg-neutral-950 border border-neutral-800/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>{item.block}</span>
                        <span>{item.time}</span>
                      </div>
                      <p className="text-neutral-200 font-medium">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODE B: HABIT STACK */}
      {activeMode === 'habit-stack' && (
        <section className="space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              B. Habit-Stack — Flexible Checklist
            </h3>
            <p className="text-xs text-neutral-400">
              When schedule predictability is low, chain essential behaviors to existing anchors. Minimum actions ensure momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habitStack.map((habit) => (
              <div
                key={habit.id}
                className={`rounded-lg border p-4 transition-all ${
                  habit.completedToday
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
                      Anchor: {habit.anchor}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {habit.habitAttached}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <span>Minimum required:</span>
                      <strong className="text-neutral-200 font-mono">{habit.minimum}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleHabit(habit.id)}
                    className="p-1 text-neutral-400 hover:text-emerald-400 transition-colors shrink-0"
                  >
                    {habit.completedToday ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-600" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
            <span className="text-xs font-mono font-semibold text-neutral-300 block mb-1">
              Habit-Stack Rule
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Never break the chain on the <strong>Minimum</strong>. If you cannot study for 2 hours, open the file for 2 minutes and reproduce 1 calculation. Continuity compounds.
            </p>
          </div>
        </section>
      )}

      {/* MODE C: MILESTONE */}
      {activeMode === 'milestone' && (
        <section className="space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              C. Milestone — Goal-Focused Matrix
            </h3>
            <p className="text-xs text-neutral-400">
              "Milestones prevent the common trap of being 'busy' without moving forward. Test capability against proof."
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((ms) => (
              <div
                key={ms.id}
                className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase bg-sky-950/50 border border-sky-800/40 px-2 py-0.5 rounded">
                      {ms.type}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {ms.question}
                    </h4>
                  </div>

                  {/* Status selector */}
                  <div className="flex items-center gap-1.5">
                    {(['unstarted', 'in-progress', 'proven'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => onUpdateMilestone(ms.id, { status: st })}
                        className={`px-2.5 py-1 text-xs font-mono rounded capitalize transition-colors ${
                          ms.status === st
                            ? st === 'proven'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                              : st === 'in-progress'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                              : 'bg-neutral-800 text-white font-semibold'
                            : 'text-neutral-500 hover:text-neutral-300 bg-neutral-950'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 block mb-1 font-mono uppercase text-[11px]">
                      Required Standard / Example Evidence
                    </span>
                    <p className="text-neutral-300 bg-neutral-950 p-2.5 rounded border border-neutral-800/60 font-medium">
                      {ms.exampleEvidence}
                    </p>
                  </div>

                  <div>
                    <span className="text-neutral-500 block mb-1 font-mono uppercase text-[11px]">
                      Hussnain's Target Proof Artifact
                    </span>
                    <input
                      type="text"
                      value={ms.proofArtifact}
                      onChange={(e) => onUpdateMilestone(ms.id, { proofArtifact: e.target.value })}
                      placeholder="e.g. GitHub link, recorded voice file, spreadsheet URL"
                      className="w-full bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
