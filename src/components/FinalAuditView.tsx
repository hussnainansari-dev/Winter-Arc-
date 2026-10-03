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
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
              17 — 90-Day Final Audit & 2027 Handoff
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A] mt-1">
              Final Audit & Evidence Package
            </h1>
            <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
              "On 30 December, complete this audit without opening your old plan first. Inspect actual evidence: projects, workbooks, queries, recordings, and repositories. Celebrate evidence, not perfection."
            </p>
          </div>

          <button
            onClick={onExportAuditReport}
            className="flex items-center gap-2 px-4 py-2 bg-[#174EA6] hover:bg-[#0F3B82] text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto shadow-xs"
          >
            <Download className="w-4 h-4" />
            Export Final Audit Report (JSON)
          </button>
        </div>
      </section>

      {/* 12 Inspectable Capability Questions */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-6">
        <div>
          <h3 className="font-display text-base font-bold text-[#0B1F3A]">
            12 Objective Evidence Verification Gates
          </h3>
          <p className="text-xs text-[#111827]/70">
            For each capability below, inspect the physical artifact before recording your assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            {
              key: 'q1_canDoNow',
              title: '1. What can I do now that I could not do on 02 Oct?',
              inspect: 'Inspect: Projects, exercises, recordings',
              placeholder: 'e.g. Write Python scripts independently, build Excel models, write multi-table SQL queries...'
            },
            {
              key: 'q2_explainHonesty',
              title: '2. Can I explain my technical skills honestly?',
              inspect: 'Inspect: Speaking sample without hype',
              placeholder: 'e.g. Can articulate exact limitations and strengths in plain English...'
            },
            {
              key: 'q3_businessDataset',
              title: '3. Can I analyze a business/finance dataset?',
              inspect: 'Inspect: Completed case study',
              placeholder: 'e.g. Analyzed transactions, calculated margins, extracted trends...'
            },
            {
              key: 'q4_usefulSQL',
              title: '4. Can I write useful SQL?',
              inspect: 'Inspect: Saved query scripts (.sql)',
              placeholder: 'e.g. Joins, aggregations, GROUP BY, subqueries for business metrics...'
            },
            {
              key: 'q5_usableExcel',
              title: '5. Can I build a usable Excel analysis?',
              inspect: 'Inspect: Clean workbook (.xlsx)',
              placeholder: 'e.g. Dynamic formulas, lookup functions, PivotTables, cleaned tables...'
            },
            {
              key: 'q6_powerBiDashboard',
              title: '6. Can I build/explain a Power BI dashboard?',
              inspect: 'Inspect: Published report (.pbix)',
              placeholder: 'e.g. Power Query transformations, model relationships, question-driven visuals...'
            },
            {
              key: 'q7_pythonBeyondTutorials',
              title: '7. Can I use Python beyond copied tutorials?',
              inspect: 'Inspect: Public GitHub repository',
              placeholder: 'e.g. Created custom scripts from blank files, handled errors, structured functions...'
            },
            {
              key: 'q8_communicationNatural',
              title: '8. Has my communication become more natural?',
              inspect: 'Inspect: Oct vs Dec audio recordings',
              placeholder: 'e.g. Controlled pace, minimal filler words, clear explanations...'
            },
            {
              key: 'q9_portfolioReality',
              title: '9. Does my portfolio reflect reality?',
              inspect: 'Inspect: Portfolio site audit',
              placeholder: 'e.g. Authentic case studies, real screenshots, no fake claims...'
            },
            {
              key: 'q10_gitHubProof',
              title: '10. Does my GitHub show proof?',
              inspect: 'Inspect: Commit history and READMEs',
              placeholder: 'e.g. Clean commit messages, documented setup instructions, inspectable code...'
            },
            {
              key: 'q11_finovahCaseStudy',
              title: '11. Does FINOVAH demonstrate building/thinking?',
              inspect: 'Inspect: FINOVAH V1 case study',
              placeholder: 'e.g. Solved student pain point, scoped discipline, documented architecture...'
            },
            {
              key: 'q12_consistencyTracker',
              title: '12. Did I become more consistent?',
              inspect: 'Inspect: 90-day tracker completion',
              placeholder: 'e.g. Maintained MVD during exams, recovered from missed days immediately...'
            }
          ].map(({ key, title, inspect, placeholder }) => (
            <div key={key} className="p-4 rounded-lg bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] space-y-1.5">
              <label className="font-semibold text-[#0B1F3A] block">
                {title}
              </label>
              <span className="text-[11px] font-mono text-[#174EA6] block font-medium">{inspect}</span>
              <textarea
                rows={2}
                value={(auditData as any)[key]}
                onChange={(e) => onUpdateAuditData({ [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-[#F1F3F5] border border-[rgba(11,31,58,0.1)] rounded p-2 text-[#111827] focus:outline-none focus:border-[#174EA6]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Final Reflection Prompts */}
      <section className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-6">
        <div>
          <h3 className="font-display text-base font-bold text-[#0B1F3A]">
            Final Qualitative Reflection
          </h3>
          <p className="text-xs text-[#111827]/70">
            Synthesize the 90-day trajectory to establish the Q1 2027 starting point.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { key: 'biggestCapabilityGain', label: 'My biggest capability gain was...' },
            { key: 'biggestWeakness', label: 'My biggest weakness is still...' },
            { key: 'habitChangedMost', label: 'The habit that changed the most was...' },
            { key: 'stopActivity', label: 'The activity I should stop doing is...' },
            { key: 'q12027SkillToDeepen', label: 'The skill I should deepen in Q1 2027 is...' },
            { key: 'continueProject', label: 'The project I should continue is...' },
            { key: 'proudestEvidence', label: 'The evidence I am proudest of is...' },
            { key: 'whatWouldChange', label: 'If I repeated these 90 days, I would change...' }
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <label className="text-[#0B1F3A] font-semibold">{label}</label>
              <input
                type="text"
                value={(auditData.reflections as any)[key]}
                onChange={(e) => onUpdateReflections({ [key]: e.target.value })}
                className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded p-2.5 text-[#111827] focus:outline-none focus:border-[#174EA6]"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
