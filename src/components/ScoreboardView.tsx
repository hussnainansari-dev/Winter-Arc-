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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            06 & 16 — Scoreboard & Weekly Review Protocol
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Weekly Scoreboard & Audit
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-1">
            "Use a weekly score, not a perfection percentage. The scoreboard exists to reveal patterns. Review weekly, not emotionally. Use evidence and scorecards rather than judging the journey from one bad day."
          </p>
        </div>
      </section>

      {/* Interactive Weekly Execution Counter */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
        <h3 className="font-display text-base font-bold text-white">
          Active Weekly Session Counters
        </h3>
        <p className="text-xs text-neutral-400">
          Track individual sessions completed this week towards target thresholds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Technical */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">P4: Technical Deep Work</span>
              <span className="font-mono text-neutral-500">Target: 4–6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-sky-400 tabular-nums">
                {activeTargets.technicalSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('technicalSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('technicalSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* English */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">P2: English Speaking</span>
              <span className="font-mono text-neutral-500">Target: 5–7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                {activeTargets.englishSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('englishSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('englishSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Accounting */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">P3: Accounting / Biz</span>
              <span className="font-mono text-neutral-500">Target: 2–4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-purple-400 tabular-nums">
                {activeTargets.accountingSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('accountingSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('accountingSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">P5: Project / Build</span>
              <span className="font-mono text-neutral-500">Target: 2–4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                {activeTargets.projectSessions}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrementTarget('projectSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => incrementTarget('projectSessions')}
                  className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16 Sunday Review Protocol Worksheet */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Sunday 20–30 Minute Review Protocol
            </h3>
            <p className="text-xs text-neutral-400">
              Answer the 10 standard audit questions and calibrate your 7-area scorecard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
            >
              {Array.from({ length: 14 }, (_, i) => `W${i}`).map((w) => (
                <option key={w} value={w}>Review for {w}</option>
              ))}
            </select>

            <button
              onClick={handleSaveCurrentReview}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-neutral-950 hover:bg-neutral-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Review Log
            </button>
          </div>
        </div>

        {/* 7-Area Scorecard (0–2 scale) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Weekly Scorecard (0 = Poor / 1 = Mixed / 2 = Reliable)
            </span>
            <span className="text-xs font-mono text-sky-400 font-bold">
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
              <div key={key} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1.5">
                <span className="text-[11px] text-neutral-400 block truncate">{label}</span>
                <div className="flex items-center justify-between">
                  {[0, 1, 2].map((val) => (
                    <button
                      key={val}
                      onClick={() => setScores(prev => ({ ...prev, [key]: val }))}
                      className={`w-7 h-7 rounded text-xs font-mono font-bold transition-colors ${
                        scores[key] === val
                          ? 'bg-sky-500 text-neutral-950'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
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
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
            10 Reflection Questions
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">1. What did I actually complete?</label>
              <textarea
                rows={2}
                value={answers.q1_actuallyCompleted}
                onChange={(e) => setAnswers(prev => ({ ...prev, q1_actuallyCompleted: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">2. What evidence exists?</label>
              <textarea
                rows={2}
                value={answers.q2_evidenceExists}
                onChange={(e) => setAnswers(prev => ({ ...prev, q2_evidenceExists: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">3. What did I understand better this week?</label>
              <textarea
                rows={2}
                value={answers.q3_understoodBetter}
                onChange={(e) => setAnswers(prev => ({ ...prev, q3_understoodBetter: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">4. What can I now do without a tutorial?</label>
              <textarea
                rows={2}
                value={answers.q4_doWithoutTutorial}
                onChange={(e) => setAnswers(prev => ({ ...prev, q4_doWithoutTutorial: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">5. What communication improvement did I notice?</label>
              <textarea
                rows={2}
                value={answers.q5_communicationImprovement}
                onChange={(e) => setAnswers(prev => ({ ...prev, q5_communicationImprovement: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">6. What distracted me most?</label>
              <textarea
                rows={2}
                value={answers.q6_distractedMost}
                onChange={(e) => setAnswers(prev => ({ ...prev, q6_distractedMost: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">7. What was my highest-value activity?</label>
              <textarea
                rows={2}
                value={answers.q7_highestValueActivity}
                onChange={(e) => setAnswers(prev => ({ ...prev, q7_highestValueActivity: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">8. What should I stop doing?</label>
              <textarea
                rows={2}
                value={answers.q8_shouldStop}
                onChange={(e) => setAnswers(prev => ({ ...prev, q8_shouldStop: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">9. What should I continue?</label>
              <textarea
                rows={2}
                value={answers.q9_shouldContinue}
                onChange={(e) => setAnswers(prev => ({ ...prev, q9_shouldContinue: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">10. What is next week's ONE BIG OUTCOME?</label>
              <textarea
                rows={2}
                value={answers.q10_nextWeekMIT}
                onChange={(e) => setAnswers(prev => ({ ...prev, q10_nextWeekMIT: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Historical Scorecard Log */}
        <div className="border-t border-neutral-800 pt-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
            Saved Weekly Reviews ({scorecards.length})
          </span>

          <div className="space-y-2">
            {scorecards.map((sc) => {
              const cardTotal = Object.values(sc.scores).reduce((a, b) => a + b, 0);
              return (
                <div
                  key={sc.id}
                  className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sky-400 font-bold">{sc.weekId} Review</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-400 font-mono">{sc.date}</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">
                      Score: {cardTotal} / 14
                    </span>
                  </div>

                  <p className="text-neutral-300">
                    <strong className="text-neutral-400 font-normal">Next week MIT: </strong>
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
