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
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* Header and Mode Selector */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
            04 — Three Operating Systems
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A] mt-1">
            Choose Your Execution Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
            "They are not competing systems; they solve different problems. Use Time-Block when the day is under your control, Habit-Stack when flexibility is needed, and Milestones to avoid false productivity."
          </p>
        </div>

        {/* Clean Segmented Mode Selector */}
        <div className="inline-flex p-1 bg-[#F1F3F5] border border-[rgba(11,31,58,0.08)] rounded-lg">
          <button
            onClick={() => setActiveMode('time-block')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeMode === 'time-block'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'text-[#0B1F3A]/70 hover:text-[#0B1F3A]'
            }`}
          >
            A. TIME-BLOCK (Strict Schedule)
          </button>
          <button
            onClick={() => setActiveMode('habit-stack')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeMode === 'habit-stack'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'text-[#0B1F3A]/70 hover:text-[#0B1F3A]'
            }`}
          >
            B. HABIT-STACK (Flexible Checklist)
          </button>
          <button
            onClick={() => setActiveMode('milestone')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeMode === 'milestone'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'text-[#0B1F3A]/70 hover:text-[#0B1F3A]'
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
              <div>
                <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                  The 6 Protected Work Blocks
                </h3>
                <p className="text-xs text-[#111827]/70">
                  "Strict means the block has a protected purpose, not that every day has unlimited hours."
                </p>
              </div>

              <div className="space-y-3">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`rounded-lg border p-4 transition-all ${
                      block.completed
                        ? 'border-[#4F7D62]/40 bg-[#4F7D62]/5'
                        : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] hover:border-[#174EA6]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#174EA6]">
                            Block {block.number}
                          </span>
                          <span className="text-[#111827]/40 font-mono text-xs">·</span>
                          <h4 className="text-sm font-semibold text-[#0B1F3A]">
                            {block.name}
                          </h4>
                          <span className="font-mono text-xs tabular-nums text-[#174EA6] bg-[#EAF3FF] px-2 py-0.5 rounded border border-[#174EA6]/15 font-semibold">
                            {block.standardTarget}
                          </span>
                        </div>
                        <p className="text-xs text-[#111827]/80 leading-relaxed">
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
                          className="px-2.5 py-1 text-[11px] font-mono font-semibold text-[#174EA6] hover:bg-[#d8e9ff] bg-[#EAF3FF] border border-[#174EA6]/15 rounded transition-colors"
                        >
                          Load Timer
                        </button>

                        <button
                          onClick={() => onToggleBlock(block.id)}
                          className="p-1 text-[#111827]/40 hover:text-[#4F7D62] transition-colors"
                        >
                          {block.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#4F7D62]" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#111827]/30" />
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
              <div className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#174EA6]" />
                    <h3 className="font-display text-sm font-bold text-[#0B1F3A]">
                      Protected Focus Timer
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#111827]/60 truncate max-w-[130px] font-medium">
                    {activeBlockName}
                  </span>
                </div>

                {/* Big Digital Display (Deep Navy Box with Off-White Tabular Digits) */}
                <div className="flex flex-col items-center justify-center p-6 bg-[#0B1F3A] border border-[#0B1F3A] rounded-lg text-center shadow-xs">
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#F8F7F3] tracking-widest tabular-nums">
                    {timeFormatted}
                  </span>
                  <span className="text-[11px] font-mono text-[#EAF3FF]/80 uppercase mt-2 tracking-wider font-semibold">
                    {isTimerRunning ? 'Session In Progress' : 'Ready / Paused'}
                  </span>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isTimerRunning
                        ? 'bg-[#EAF3FF] text-[#174EA6] border border-[#174EA6]/30'
                        : 'bg-[#174EA6] text-white hover:bg-[#0F3B82] shadow-xs'
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
                    className="p-2.5 rounded-lg text-[#0B1F3A] hover:bg-[#e7eaee] bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Presets */}
                <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-mono">
                  <button
                    onClick={() => setTimerPreset(25, 'Pomodoro Sprint')}
                    className="px-2.5 py-1 rounded bg-[#F8F7F3] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#EAF3FF] hover:text-[#174EA6]"
                  >
                    25m
                  </button>
                  <button
                    onClick={() => setTimerPreset(45, 'Build / Proof Block')}
                    className="px-2.5 py-1 rounded bg-[#F8F7F3] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#EAF3FF] hover:text-[#174EA6]"
                  >
                    45m
                  </button>
                  <button
                    onClick={() => setTimerPreset(60, 'Deep Technical 60m')}
                    className="px-2.5 py-1 rounded bg-[#F8F7F3] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#EAF3FF] hover:text-[#174EA6]"
                  >
                    60m
                  </button>
                  <button
                    onClick={() => setTimerPreset(90, 'Deep Technical 90m')}
                    className="px-2.5 py-1 rounded bg-[#F8F7F3] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#EAF3FF] hover:text-[#174EA6]"
                  >
                    90m
                  </button>
                </div>

                {/* Mandatory Artifact Logger */}
                <div className="border-t border-[rgba(11,31,58,0.08)] pt-4 space-y-2">
                  <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block font-semibold">
                    Produce an Artifact (Non-Negotiable)
                  </label>
                  <p className="text-[11px] text-[#111827]/70">
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
                      className="flex-1 bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-md px-3 py-1.5 text-xs text-[#111827] placeholder:text-[#111827]/40 focus:outline-none focus:border-[#174EA6]"
                    />
                    <button
                      onClick={handleLogArtifact}
                      className="px-3.5 py-1.5 bg-[#174EA6] hover:bg-[#0F3B82] text-white rounded-md text-xs font-semibold transition-colors shadow-xs"
                    >
                      Log
                    </button>
                  </div>
                </div>
              </div>

              {/* Logged Artifacts feed */}
              <div className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-4 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#0B1F3A] font-bold block">
                  Today's Recorded Artifacts ({loggedArtifacts.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {loggedArtifacts.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#111827]/60">
                        <span className="font-semibold text-[#174EA6]">{item.block}</span>
                        <span>{item.time}</span>
                      </div>
                      <p className="text-[#111827] font-medium">{item.note}</p>
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
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              B. Habit-Stack — Flexible Checklist
            </h3>
            <p className="text-xs text-[#111827]/70">
              When schedule predictability is low, chain essential behaviors to existing anchors. Minimum actions ensure momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habitStack.map((habit) => (
              <div
                key={habit.id}
                className={`rounded-lg border p-4 transition-all ${
                  habit.completedToday
                    ? 'border-[#4F7D62]/40 bg-[#4F7D62]/5'
                    : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] hover:border-[#174EA6]/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider block font-bold">
                      Anchor: {habit.anchor}
                    </span>
                    <h4 className="text-sm font-semibold text-[#0B1F3A]">
                      {habit.habitAttached}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#111827]/70">
                      <span>Minimum required:</span>
                      <strong className="text-[#0B1F3A] font-mono bg-[#EAF3FF] px-2 py-0.5 rounded border border-[#174EA6]/15 font-semibold">
                        {habit.minimum}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleHabit(habit.id)}
                    className="p-1 text-[#111827]/40 hover:text-[#4F7D62] transition-colors shrink-0"
                  >
                    {habit.completedToday ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4F7D62]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#111827]/30" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-4">
            <span className="text-xs font-mono font-bold text-[#0B1F3A] block mb-1">
              Habit-Stack Rule
            </span>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              Never break the chain on the <strong>Minimum</strong>. If you cannot study for 2 hours, open the file for 2 minutes and reproduce 1 calculation. Continuity compounds.
            </p>
          </div>
        </section>
      )}

      {/* MODE C: MILESTONE */}
      {activeMode === 'milestone' && (
        <section className="space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              C. Milestone — Goal-Focused Matrix
            </h3>
            <p className="text-xs text-[#111827]/70">
              "Milestones prevent the common trap of being 'busy' without moving forward. Test capability against proof."
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((ms) => (
              <div
                key={ms.id}
                className="rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(11,31,58,0.08)] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#174EA6] uppercase bg-[#EAF3FF] border border-[#174EA6]/20 px-2.5 py-0.5 rounded">
                      {ms.type}
                    </span>
                    <h4 className="text-sm font-semibold text-[#0B1F3A]">
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
                              ? 'bg-[#4F7D62] text-white font-semibold'
                              : st === 'in-progress'
                              ? 'bg-[#2563EB] text-white font-semibold'
                              : 'bg-[#0B1F3A] text-white font-semibold'
                            : 'text-[#111827]/60 hover:text-[#0B1F3A] bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#111827]/60 block mb-1 font-mono uppercase text-[11px] font-semibold">
                      Required Standard / Example Evidence
                    </span>
                    <p className="text-[#111827] bg-[#F8F7F3] p-2.5 rounded border border-[rgba(11,31,58,0.08)] font-medium">
                      {ms.exampleEvidence}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#111827]/60 block mb-1 font-mono uppercase text-[11px] font-semibold">
                      Hussnain's Target Proof Artifact
                    </span>
                    <input
                      type="text"
                      value={ms.proofArtifact}
                      onChange={(e) => onUpdateMilestone(ms.id, { proofArtifact: e.target.value })}
                      placeholder="e.g. GitHub link, recorded voice file, spreadsheet URL"
                      className="w-full bg-[#F8F7F3] p-2.5 rounded border border-[rgba(11,31,58,0.12)] text-[#111827] placeholder:text-[#111827]/40 focus:outline-none focus:border-[#174EA6]"
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
