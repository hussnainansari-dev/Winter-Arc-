import React, { useState } from 'react';
import { WeeklyScorecard } from '../types/winterArc';
import { CheckCircle, Plus, Calendar, Save, Award, ChevronDown } from 'lucide-react';

interface ScoreboardViewProps {
  scorecards: WeeklyScorecard[];
  activeTargets: {
    technicalSessions: number;
    englishSessions: number;
    accountingSessions: number;
    projectSessions: number;
    learningInPublicPosts: number;
    weeklyReviews: number;
    maintenanceSessions: number;
  };
  onUpdateActiveTargets: (updater: (prev: any) => any) => void;
  onSaveScorecard: (scorecard: WeeklyScorecard) => void;
}

export const ScoreboardView: React.FC<ScoreboardViewProps> = ({
  scorecards,
  activeTargets,
  onUpdateActiveTargets,
  onSaveScorecard
}) => {
  const [selectedWeek, setSelectedWeek] = useState<string>('W0');
  const [scores, setScores] = useState({
    consistency: 2,
    technicalOutput: 2,
    communication: 2,
    accountingBusiness: 1,
    projectBuilding: 2,
    brandingDocumentation: 2,
    focusQuality: 2
  });

  const [answers, setAnswers] = useState({
    q1_actuallyCompleted: 'Set up Winter Arc 2026 OS, organized folders, baselined Day 1.',
    q2_evidenceExists: 'Winter Arc OS tracker, repository structure, speech baseline audio.',
    q3_understoodBetter: 'How technical analytics feeds directly into business decision making.',
    q4_doWithoutTutorial: 'Reproduce basic variable transformations and environment setup.',
    q5_communicationImprovement: 'Delivered 2-minute unscripted introduction with steady pacing.',
    q6_distractedMost: 'Temptation to browse advanced dashboard showcases prematurely.',
    q7_highestValueActivity: 'Locking down the 90-day trajectory and strict block routine.',
    q8_shouldStop: 'Over-designing documentation before exercises are written.',
    q9_shouldContinue: 'The 8-step teacher method loop.',
    q10_nextWeekMIT: 'Master Python syntax, conditions, and core data structures without copy-pasting.'
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleSaveCurrentReview = () => {
    const card: WeeklyScorecard = {
      id: `score-${selectedWeek.toLowerCase()}-${Date.now()}`,
      weekId: selectedWeek,
      date: new Date().toISOString().slice(0, 10),
      scores,
      answers
    };
    onSaveScorecard(card);
  };

  const incrementTarget = (key: keyof typeof activeTargets) => {
    onUpdateActiveTargets(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  const decrementTarget = (key: keyof typeof activeTargets) => {
    onUpdateActiveTargets(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] - 1)
    }));
  };

  return (
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
            06 & 16 — Scoreboard & Weekly Review Protocol
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A] mt-1">
            Weekly Scoreboard & Audit
          </h1>
          <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
            "Use a weekly score, not a perfection percentage. The scoreboard exists to reveal patterns. Review weekly, not emotionally. Use evidence and scorecards rather than judging the journey from one bad day."
          </p>
        </div>
      </section>

      {/* Interactive Weekly Execution Counter */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-4">
        <h3 className="font-display text-base font-bold text-[#0B1F3A]">
          Active Weekly Session Counters
        </h3>
        <p className="text-xs text-[#111827]/70">
          Track individual sessions completed this week towards target thresholds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Technical */}
          <div className="p-4 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0B1F3A] font-semibold">P4: Technical Deep Work</span>
              <span className="font-mono text-[#111827]/60">Target: 4–6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#2563EB] tabular-nums">
                {activeTargets.technicalSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('technicalSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('technicalSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* English */}
          <div className="p-4 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0B1F3A] font-semibold">P2: English Speaking</span>
              <span className="font-mono text-[#111827]/60">Target: 5–7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#174EA6] tabular-nums">
                {activeTargets.englishSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('englishSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('englishSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Accounting */}
          <div className="p-4 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0B1F3A] font-semibold">P3: Accounting / Biz</span>
              <span className="font-mono text-[#111827]/60">Target: 2–4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#174EA6] tabular-nums">
                {activeTargets.accountingSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('accountingSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('accountingSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="p-4 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0B1F3A] font-semibold">P5: Project / Build</span>
              <span className="font-mono text-[#111827]/60">Target: 2–4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#174EA6] tabular-nums">
                {activeTargets.projectSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('projectSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('projectSessions')}
                  className="w-7 h-7 rounded bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] text-[#0B1F3A] hover:bg-[#e7eaee] flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16 Sunday Review Protocol Worksheet */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(11,31,58,0.08)] pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
              Sunday 20–30 Minute Review Protocol
            </h3>
            <p className="text-xs text-[#111827]/70">
              Answer the 10 standard audit questions and calibrate your 7-area scorecard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] font-mono focus:outline-none focus:border-[#174EA6] font-semibold"
            >
              {Array.from({ length: 14 }, (_, i) => `W${i}`).map((w) => (
                <option key={w} value={w}>Review for {w}</option>
              ))}
            </select>

            <button
              onClick={handleSaveCurrentReview}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#174EA6] hover:bg-[#0F3B82] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <Save className="w-4 h-4" />
              Save Review Log
            </button>
          </div>
        </div>

        {/* 7-Area Scorecard (0–2 scale) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0B1F3A] font-bold">
              Weekly Scorecard (0 = Poor / 1 = Mixed / 2 = Reliable)
            </span>
            <span className="text-xs font-mono text-[#174EA6] font-bold">
              Total Score: {totalScore} / 14
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
            {(
              [
                ['consistency', 'Consistency'],
                ['technicalOutput', 'Tech Output'],
                ['communication', 'Speech/Comm'],
                ['accountingBusiness', 'Accounting/Biz'],
                ['projectBuilding', 'Project/Build'],
                ['brandingDocumentation', 'Brand/Docs'],
                ['focusQuality', 'Focus Quality']
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="p-3 bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] rounded-lg space-y-1.5">
                <span className="text-[11px] text-[#0B1F3A] block truncate font-semibold">{label}</span>
                <div className="flex items-center justify-between">
                  {[0, 1, 2].map((val) => (
                    <button
                      key={val}
                      onClick={() => setScores(prev => ({ ...prev, [key]: val }))}
                      className={`w-7 h-7 rounded text-xs font-mono font-bold transition-colors ${
                        scores[key] === val
                          ? val === 2
                            ? 'bg-[#4F7D62] text-white'
                            : 'bg-[#174EA6] text-white'
                          : 'bg-[#F1F3F5] text-[#111827]/60 hover:text-[#0B1F3A]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Structured Sunday Questions */}
        <div className="space-y-4 pt-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0B1F3A] font-bold block">
            10 Reflection Questions
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              ['q1_actuallyCompleted', '1. What did I actually complete?'],
              ['q2_evidenceExists', '2. What evidence exists?'],
              ['q3_understoodBetter', '3. What did I understand better this week?'],
              ['q4_doWithoutTutorial', '4. What can I now do without a tutorial?'],
              ['q5_communicationImprovement', '5. What communication improvement did I notice?'],
              ['q6_distractedMost', '6. What distracted me most?'],
              ['q7_highestValueActivity', '7. What was my highest-value activity?'],
              ['q8_shouldStop', '8. What should I stop doing?'],
              ['q9_shouldContinue', '9. What should I continue?'],
              ['q10_nextWeekMIT', "10. What is next week's ONE BIG OUTCOME?"]
            ].map(([k, label]) => (
              <div key={k} className="space-y-1">
                <label className="text-[#0B1F3A] font-semibold">{label}</label>
                <textarea
                  rows={2}
                  value={(answers as any)[k]}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [k]: e.target.value }))}
                  className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded p-2.5 text-[#111827] focus:outline-none focus:border-[#174EA6]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Historical Scorecard Log */}
        <div className="border-t border-[rgba(11,31,58,0.08)] pt-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0B1F3A] font-bold block">
            Saved Weekly Reviews ({scorecards.length})
          </span>

          <div className="space-y-2">
            {scorecards.map((sc) => {
              const cardTotal = Object.values(sc.scores).reduce((a, b) => a + b, 0);
              return (
                <div
                  key={sc.id}
                  className="p-3.5 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#174EA6] font-bold">{sc.weekId} Review</span>
                      <span className="text-[#111827]/40">·</span>
                      <span className="text-[#111827]/70 font-mono">{sc.date}</span>
                    </div>
                    <span className="font-mono text-[#4F7D62] font-bold">
                      Score: {cardTotal} / 14
                    </span>
                  </div>

                  <p className="text-[#111827]">
                    <strong className="text-[#0B1F3A] font-semibold">Next week MIT: </strong>
                    {sc.answers.q10_nextWeekMIT}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
