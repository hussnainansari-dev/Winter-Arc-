import React from 'react';
import { FinalAuditData } from '../types/winterArc';
import { CheckCircle2, Award, FileSpreadsheet, Download, Send } from 'lucide-react';

interface FinalAuditViewProps {
  auditData: FinalAuditData;
  onUpdateAuditData: (updates: Partial<FinalAuditData>) => void;
  onUpdateReflections: (updates: Partial<FinalAuditData['reflections']>) => void;
  onExportAuditReport: () => void;
}

export const FinalAuditView: React.FC<FinalAuditViewProps> = ({
  auditData,
  onUpdateAuditData,
  onUpdateReflections,
  onExportAuditReport
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              17 — 90-Day Final Audit & 2027 Handoff
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              Final Audit & Evidence Package
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-1">
              "On 30 December, complete this audit without opening your old plan first. Inspect actual evidence: projects, workbooks, queries, recordings, and repositories. Celebrate evidence, not perfection."
            </p>
          </div>

          <button
            onClick={onExportAuditReport}
            className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-950 hover:bg-neutral-200 rounded-lg text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            Export Final Audit Report (JSON)
          </button>
        </div>
      </section>

      {/* 12 Inspectable Capability Questions */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
        <div>
          <h3 className="font-display text-base font-bold text-white">
            12 Objective Evidence Verification Gates
          </h3>
          <p className="text-xs text-neutral-400">
            For each capability below, inspect the physical artifact before recording your assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Q1 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              1. What can I do now that I could not do on 02 Oct?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Projects, exercises, recordings</span>
            <textarea
              rows={2}
              value={auditData.q1_canDoNow}
              onChange={(e) => onUpdateAuditData({ q1_canDoNow: e.target.value })}
              placeholder="e.g. Write Python scripts independently, build Excel models, write multi-table SQL queries..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q2 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              2. Can I explain my technical skills honestly?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Speaking sample without hype</span>
            <textarea
              rows={2}
              value={auditData.q2_explainHonesty}
              onChange={(e) => onUpdateAuditData({ q2_explainHonesty: e.target.value })}
              placeholder="e.g. Can articulate exact limitations and strengths in plain English..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q3 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              3. Can I analyze a business/finance dataset?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Completed case study</span>
            <textarea
              rows={2}
              value={auditData.q3_businessDataset}
              onChange={(e) => onUpdateAuditData({ q3_businessDataset: e.target.value })}
              placeholder="e.g. Analyzed transactions, calculated margins, extracted trends..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q4 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              4. Can I write useful SQL?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Saved query scripts (.sql)</span>
            <textarea
              rows={2}
              value={auditData.q4_usefulSQL}
              onChange={(e) => onUpdateAuditData({ q4_usefulSQL: e.target.value })}
              placeholder="e.g. Joins, aggregations, GROUP BY, subqueries for business metrics..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q5 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              5. Can I build a usable Excel analysis?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Clean workbook (.xlsx)</span>
            <textarea
              rows={2}
              value={auditData.q5_usableExcel}
              onChange={(e) => onUpdateAuditData({ q5_usableExcel: e.target.value })}
              placeholder="e.g. Dynamic formulas, lookup functions, PivotTables, cleaned tables..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q6 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              6. Can I build/explain a Power BI dashboard?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Published report (.pbix)</span>
            <textarea
              rows={2}
              value={auditData.q6_powerBiDashboard}
              onChange={(e) => onUpdateAuditData({ q6_powerBiDashboard: e.target.value })}
              placeholder="e.g. Power Query transformations, model relationships, question-driven visuals..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q7 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              7. Can I use Python beyond copied tutorials?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Public GitHub repository</span>
            <textarea
              rows={2}
              value={auditData.q7_pythonBeyondTutorials}
              onChange={(e) => onUpdateAuditData({ q7_pythonBeyondTutorials: e.target.value })}
              placeholder="e.g. Created custom scripts from blank files, handled errors, structured functions..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q8 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              8. Has my communication become more natural?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Oct vs Dec audio recordings</span>
            <textarea
              rows={2}
              value={auditData.q8_communicationNatural}
              onChange={(e) => onUpdateAuditData({ q8_communicationNatural: e.target.value })}
              placeholder="e.g. Controlled pace, minimal filler words, clear explanations..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q9 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              9. Does my portfolio reflect reality?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Portfolio site audit</span>
            <textarea
              rows={2}
              value={auditData.q9_portfolioReality}
              onChange={(e) => onUpdateAuditData({ q9_portfolioReality: e.target.value })}
              placeholder="e.g. Authentic case studies, real screenshots, no fake claims..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q10 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              10. Does my GitHub show proof?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: Commit history and READMEs</span>
            <textarea
              rows={2}
              value={auditData.q10_gitHubProof}
              onChange={(e) => onUpdateAuditData({ q10_gitHubProof: e.target.value })}
              placeholder="e.g. Clean commit messages, documented setup instructions, inspectable code..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q11 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              11. Does FINOVAH demonstrate building/thinking?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: FINOVAH V1 case study</span>
            <textarea
              rows={2}
              value={auditData.q11_finovahCaseStudy}
              onChange={(e) => onUpdateAuditData({ q11_finovahCaseStudy: e.target.value })}
              placeholder="e.g. Solved student pain point, scoped discipline, documented architecture..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>

          {/* Q12 */}
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
            <label className="font-semibold text-white block">
              12. Did I become more consistent?
            </label>
            <span className="text-[11px] font-mono text-neutral-500 block">Inspect: 90-day tracker completion</span>
            <textarea
              rows={2}
              value={auditData.q12_consistencyTracker}
              onChange={(e) => onUpdateAuditData({ q12_consistencyTracker: e.target.value })}
              placeholder="e.g. Maintained MVD during exams, recovered from missed days immediately..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-neutral-200 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Final Reflection Prompts */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
        <div>
          <h3 className="font-display text-base font-bold text-white">
            Final Qualitative Reflection
          </h3>
          <p className="text-xs text-neutral-400">
            Synthesize the 90-day trajectory to establish the Q1 2027 starting point.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">My biggest capability gain was...</label>
            <input
              type="text"
              value={auditData.reflections.biggestCapabilityGain}
              onChange={(e) => onUpdateReflections({ biggestCapabilityGain: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">My biggest weakness is still...</label>
            <input
              type="text"
              value={auditData.reflections.biggestWeakness}
              onChange={(e) => onUpdateReflections({ biggestWeakness: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">The habit that changed the most was...</label>
            <input
              type="text"
              value={auditData.reflections.habitChangedMost}
              onChange={(e) => onUpdateReflections({ habitChangedMost: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">The activity I should stop doing is...</label>
            <input
              type="text"
              value={auditData.reflections.stopActivity}
              onChange={(e) => onUpdateReflections({ stopActivity: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">The skill I should deepen in Q1 2027 is...</label>
            <input
              type="text"
              value={auditData.reflections.q12027SkillToDeepen}
              onChange={(e) => onUpdateReflections({ q12027SkillToDeepen: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">The project I should continue is...</label>
            <input
              type="text"
              value={auditData.reflections.continueProject}
              onChange={(e) => onUpdateReflections({ continueProject: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">The evidence I am proudest of is...</label>
            <input
              type="text"
              value={auditData.reflections.proudestEvidence}
              onChange={(e) => onUpdateReflections({ proudestEvidence: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">If I repeated these 90 days, I would change...</label>
            <input
              type="text"
              value={auditData.reflections.whatWouldChange}
              onChange={(e) => onUpdateReflections({ whatWouldChange: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-100 focus:outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
