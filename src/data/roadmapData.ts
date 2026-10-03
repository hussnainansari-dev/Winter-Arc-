import { WeekPlan, PhaseInfo, PhaseGate, TrapItem, NonNegotiableRule, OperatingBlock, HabitStackItem, MilestoneItem } from '../types/winterArc';

export const PHASES: PhaseInfo[] = [
  {
    id: 'phase-1',
    name: 'PHASE 1 — BUILD',
    subTitle: 'Reliable habits + Python foundation + communication routine + stable digital identity',
    startDate: '2026-10-02',
    endDate: '2026-10-31',
    centralQuestion: 'Can I build the engine?',
    primaryOutcome: 'Reliable habits + Python foundation + communication routine + stable digital identity',
    avoidTrap: 'Constant redesign / too many tools',
    accentColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — LEVEL UP',
    subTitle: 'Excel/SQL/Power BI foundations + business analysis thinking + project execution',
    startDate: '2026-11-01',
    endDate: '2026-11-30',
    centralQuestion: 'Can I use the skills?',
    primaryOutcome: 'Excel/SQL/Power BI foundations + business analysis thinking + project execution',
    avoidTrap: 'Advanced topics before foundations',
    accentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — FINISH',
    subTitle: 'Finished analytics case study + portfolio/GitHub proof + FINOVAH documentation + 90-day review',
    startDate: '2026-12-01',
    endDate: '2026-12-30',
    centralQuestion: 'Can I prove it?',
    primaryOutcome: 'Finished analytics case study + portfolio/GitHub proof + FINOVAH documentation + 90-day review',
    avoidTrap: 'Starting new major technologies',
    accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  }
];

export const INITIAL_PHASE_GATES: PhaseGate[] = [
  {
    id: 'gate-0',
    title: 'Baseline Locked',
    date: '2026-10-04',
    phaseId: 'phase-1',
    requiredEvidence: 'Starting assessment + speaking sample + environment/system ready',
    status: 'in-progress',
    userNotes: 'Launch day established. Initial environment and 90-day targets locked.'
  },
  {
    id: 'gate-1',
    title: 'Python Core Checkpoint',
    date: '2026-10-18',
    phaseId: 'phase-1',
    requiredEvidence: 'Exercises + explanations without tutorial copy-pasting',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-2',
    title: 'BUILD Gate',
    date: '2026-10-31',
    phaseId: 'phase-1',
    requiredEvidence: 'Python mini-project + October review + usable foundations',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-3',
    title: 'Excel / Business Checkpoint',
    date: '2026-11-15',
    phaseId: 'phase-2',
    requiredEvidence: 'Analysis workbook + 5-minute explanation of findings',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-4',
    title: 'SQL Checkpoint',
    date: '2026-11-22',
    phaseId: 'phase-2',
    requiredEvidence: 'Business question → query practice set written with intent',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-5',
    title: 'LEVEL-UP Gate',
    date: '2026-11-30',
    phaseId: 'phase-2',
    requiredEvidence: 'Basic Excel + SQL + Power BI workflow demonstrated on business data',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-6',
    title: 'Analytics Project Scope Locked',
    date: '2026-12-06',
    phaseId: 'phase-3',
    requiredEvidence: 'Problem + dataset + questions + deliverables frozen (no creep)',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-7',
    title: 'Core Analysis Complete',
    date: '2026-12-13',
    phaseId: 'phase-3',
    requiredEvidence: 'Clean data + SQL layer + Excel/Python + dashboard progress',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-8',
    title: 'Professionalization Gate',
    date: '2026-12-20',
    phaseId: 'phase-3',
    requiredEvidence: 'Case study + GitHub README + 5–10 min recorded presentation',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-9',
    title: 'Brand / FINOVAH Integration',
    date: '2026-12-27',
    phaseId: 'phase-3',
    requiredEvidence: 'Portfolio updated + FINOVAH documentation + verified working links',
    status: 'pending',
    userNotes: ''
  },
  {
    id: 'gate-10',
    title: '90-Day Finish & 2027 Handoff',
    date: '2026-12-30',
    phaseId: 'phase-3',
    requiredEvidence: 'Evidence audit + 90-day final audit + Q1 2027 handoff writeup',
    status: 'pending',
    userNotes: ''
  }
];

export const NON_NEGOTIABLE_RULES: NonNegotiableRule[] = [
  {
    id: 1,
    rule: 'One primary technical theme at a time',
    detail: 'You can review older skills, but do not make every technology a primary subject simultaneously.'
  },
  {
    id: 2,
    rule: 'Output beats passive input',
    detail: 'For each learning session, create an exercise, note, explanation, commit, or artifact.'
  },
  {
    id: 3,
    rule: 'Tutorial dependence must decrease',
    detail: 'Follow the loop: Learn → close source → reproduce → modify → explain.'
  },
  {
    id: 4,
    rule: 'Branding follows proof',
    detail: 'Do not redesign the portfolio for hours when the underlying work is missing.'
  },
  {
    id: 5,
    rule: 'No fake expertise',
    detail: 'Use learner language honestly. Show what you know, what you built, and what you are still learning.'
  },
  {
    id: 6,
    rule: 'No zero recovery spiral',
    detail: 'Missing a day does not justify missing the next day. Resume at the next scheduled block.'
  },
  {
    id: 7,
    rule: 'Protect university/internship responsibilities',
    detail: 'The Winter Arc is an additional operating system, not a replacement for your degree or professional commitments.'
  },
  {
    id: 8,
    rule: 'Finish before expanding',
    detail: 'A half-finished collection of technologies is less useful than a completed, documented project.'
  },
  {
    id: 9,
    rule: 'Review weekly, not emotionally',
    detail: 'Use evidence and scorecards rather than judging the whole journey from one bad day.'
  },
  {
    id: 10,
    rule: '0.1% means forward motion',
    detail: 'One meaningful improvement is enough on a hard day; the system compounds over 90 days.'
  }
];

export const DEVILS_ADVOCATE_TRAPS: TrapItem[] = [
  {
    id: 'trap-1',
    trap: 'Roadmap addiction',
    counterQuestion: 'Am I planning because I am avoiding execution?',
    correctiveAction: "Return to today's artifact immediately.",
    isTriggered: false
  },
  {
    id: 'trap-2',
    trap: 'Tutorial addiction',
    counterQuestion: 'Can I reproduce it without the tutorial?',
    correctiveAction: 'Close the source and rebuild from memory.',
    isTriggered: false
  },
  {
    id: 'trap-3',
    trap: 'Tool collecting',
    counterQuestion: 'Why do I need another tool right now?',
    correctiveAction: 'Finish the current stack before adding anything new.',
    isTriggered: false
  },
  {
    id: 'trap-4',
    trap: 'Portfolio perfectionism',
    counterQuestion: 'Is this improving evidence or decoration?',
    correctiveAction: 'Prioritize functionality and inspectable proof.',
    isTriggered: false
  },
  {
    id: 'trap-5',
    trap: 'Content before capability',
    counterQuestion: 'What work is this post documenting?',
    correctiveAction: 'Do the work first; documentation follows reality.',
    isTriggered: false
  },
  {
    id: 'trap-6',
    trap: 'Certificate chasing',
    counterQuestion: 'What capability will this certificate prove?',
    correctiveAction: 'Prefer applied code and business evidence.',
    isTriggered: false
  },
  {
    id: 'trap-7',
    trap: 'Scope creep',
    counterQuestion: 'Does this feature serve the current milestone?',
    correctiveAction: 'Cut it ruthlessly unless it is essential for V1.',
    isTriggered: false
  },
  {
    id: 'trap-8',
    trap: 'All-or-nothing thinking',
    counterQuestion: 'What is the smallest useful action today?',
    correctiveAction: 'Activate the Minimum Viable Day (20m + 10m + 5m).',
    isTriggered: false
  },
  {
    id: 'trap-9',
    trap: 'Comparison',
    counterQuestion: 'What evidence of my own progress exists?',
    correctiveAction: 'Compare strictly against your own October 2 baseline.',
    isTriggered: false
  },
  {
    id: 'trap-10',
    trap: 'Constant restarting',
    counterQuestion: 'Did I actually need a new plan?',
    correctiveAction: 'Continue the existing system unless evidence demands change.',
    isTriggered: false
  }
];

export const INITIAL_BLOCKS: OperatingBlock[] = [
  {
    id: 'block-1',
    number: 1,
    name: 'Mental warm-up',
    standardTarget: '20–30 min',
    rule: 'Plan the day, review priorities, no social scrolling.',
    completed: false
  },
  {
    id: 'block-2',
    number: 2,
    name: 'Deep Technical',
    standardTarget: '60–120 min',
    rule: 'One technical topic only. Phone away. Produce an artifact.',
    completed: false
  },
  {
    id: 'block-3',
    number: 3,
    name: 'Communication',
    standardTarget: '20–30 min',
    rule: 'English speaking, explanation, pronunciation, or presentation.',
    completed: false
  },
  {
    id: 'block-4',
    number: 4,
    name: 'Degree / Business',
    standardTarget: '30–60 min',
    rule: 'Accounting/business knowledge; connect theory to practical decisions.',
    completed: false
  },
  {
    id: 'block-5',
    number: 5,
    name: 'Build / Proof',
    standardTarget: '45–90 min',
    rule: 'Project, GitHub, portfolio, FINOVAH, or content based on actual work.',
    completed: false
  },
  {
    id: 'block-6',
    number: 6,
    name: 'Shutdown',
    standardTarget: '10–15 min',
    rule: "Log evidence, score the day, select tomorrow's MIT.",
    completed: false
  }
];

export const INITIAL_HABITS: HabitStackItem[] = [
  {
    id: 'habit-1',
    anchor: 'After starting the day',
    habitAttached: "Write today's One Big Outcome",
    minimum: '1 sentence',
    completedToday: false
  },
  {
    id: 'habit-2',
    anchor: 'Before technical study',
    habitAttached: 'Open only the required tools/files',
    minimum: '2 min clean prep',
    completedToday: false
  },
  {
    id: 'habit-3',
    anchor: 'After learning a concept',
    habitAttached: 'Close the tutorial and reproduce it from memory',
    minimum: '1 exercise',
    completedToday: false
  },
  {
    id: 'habit-4',
    anchor: 'After technical practice',
    habitAttached: 'Explain the concept aloud in plain English',
    minimum: '2–5 min',
    completedToday: false
  },
  {
    id: 'habit-5',
    anchor: 'After building',
    habitAttached: 'Capture proof',
    minimum: '1 screenshot / commit / note',
    completedToday: false
  },
  {
    id: 'habit-6',
    anchor: 'Before sleep',
    habitAttached: 'Evening Reflection',
    minimum: '3 lines',
    completedToday: false
  }
];

export const INITIAL_MILESTONES: MilestoneItem[] = [
  {
    id: 'ms-1',
    type: 'Knowledge',
    question: 'Do I understand it?',
    exampleEvidence: 'Explain without notes',
    userGoal: 'Explain Python data structures & basic loops clearly without checking documentation',
    proofArtifact: 'Voice recording or conceptual note in plain English',
    status: 'in-progress'
  },
  {
    id: 'ms-2',
    type: 'Skill',
    question: 'Can I do it?',
    exampleEvidence: 'Solve/build without copying',
    userGoal: 'Write Python functions and data transformation logic from blank file',
    proofArtifact: 'GitHub commit of standalone exercise',
    status: 'unstarted'
  },
  {
    id: 'ms-3',
    type: 'Application',
    question: 'Can I use it on a problem?',
    exampleEvidence: 'Dataset analysis',
    userGoal: 'Analyze a real finance/accounting transaction ledger with Excel formulas & SQL',
    proofArtifact: 'Clean Excel workbook with summary table & ratio calculations',
    status: 'unstarted'
  },
  {
    id: 'ms-4',
    type: 'Communication',
    question: 'Can I explain it?',
    exampleEvidence: '2–5 minute recording',
    userGoal: 'Deliver a structured 5-minute presentation explaining findings to non-technical manager',
    proofArtifact: 'Audio/Video recording in English adhering to S3 progression',
    status: 'unstarted'
  },
  {
    id: 'ms-5',
    type: 'Proof',
    question: 'Can someone inspect it?',
    exampleEvidence: 'GitHub/portfolio artifact',
    userGoal: 'Publish clean GitHub repository with descriptive README, setup guide, and findings',
    proofArtifact: 'Live public GitHub URL with readable documentation',
    status: 'unstarted'
  },
  {
    id: 'ms-6',
    type: 'Professional',
    question: 'Can I present it cleanly?',
    exampleEvidence: 'Case study / project page',
    userGoal: 'Complete FINOVAH V1 case study & Analytics Project portfolio breakdown',
    proofArtifact: 'Formatted case study document ready for recruiters/industry',
    status: 'unstarted'
  }
];

export const RAW_WEEKS: Omit<WeekPlan, 'days'>[] = [
  {
    id: 'W0',
    weekNumber: 0,
    title: 'Launch & Baseline',
    dateRange: '02–04 Oct',
    phaseId: 'phase-1',
    outcome: 'Baseline the current system and start clean.',
    pillarFocus: 'P1 + P2 + P4 + P5',
    weeklyGate: 'You know where you are starting and what evidence you will produce.'
  },
  {
    id: 'W1',
    weekNumber: 1,
    title: 'Python Foundations',
    dateRange: '05–11 Oct',
    phaseId: 'phase-1',
    outcome: 'Rebuild Python fundamentals through active practice.',
    pillarFocus: 'P4 + P2 + P1',
    weeklyGate: 'You can write basic Python without following a tutorial line-by-line.'
  },
  {
    id: 'W2',
    weekNumber: 2,
    title: 'Python Core Structures',
    dateRange: '12–18 Oct',
    phaseId: 'phase-1',
    outcome: 'Move from syntax to structured data and repetition.',
    pillarFocus: 'P4 + P2',
    weeklyGate: 'You can select and use basic Python data structures intentionally.'
  },
  {
    id: 'W3',
    weekNumber: 3,
    title: 'Functions & Problem Solving',
    dateRange: '19–25 Oct',
    phaseId: 'phase-1',
    outcome: 'Learn to organize logic into reusable pieces.',
    pillarFocus: 'P4 + P1 + P2',
    weeklyGate: 'You can break a small problem into functions and debug basic errors.'
  },
  {
    id: 'W4',
    weekNumber: 4,
    title: 'Python Mini Project + October Consolidation',
    dateRange: '26 Oct–01 Nov',
    phaseId: 'phase-1',
    outcome: 'Convert October learning into one finished small artifact.',
    pillarFocus: 'P4 + P3 + P5',
    weeklyGate: 'One small project exists as inspectable proof.'
  },
  {
    id: 'W5',
    weekNumber: 5,
    title: 'Excel Foundations',
    dateRange: '02–08 Nov',
    phaseId: 'phase-2',
    outcome: 'Use spreadsheets for structured business/finance analysis.',
    pillarFocus: 'P4 + P3',
    weeklyGate: 'You can use Excel to transform raw rows into useful analysis.'
  },
  {
    id: 'W6',
    weekNumber: 6,
    title: 'Excel Analysis + Accounting Application',
    dateRange: '09–15 Nov',
    phaseId: 'phase-2',
    outcome: 'Connect accounting/business concepts to spreadsheet analysis.',
    pillarFocus: 'P3 + P4 + P2',
    weeklyGate: 'You can connect spreadsheet output to a business/accounting question.'
  },
  {
    id: 'W7',
    weekNumber: 7,
    title: 'SQL Foundations',
    dateRange: '16–22 Nov',
    phaseId: 'phase-2',
    outcome: 'Learn to query structured data with intent.',
    pillarFocus: 'P4 + P3',
    weeklyGate: 'You can translate a simple business question into a SQL query.'
  },
  {
    id: 'W8',
    weekNumber: 8,
    title: 'SQL + Power BI Foundations',
    dateRange: '23–29 Nov',
    phaseId: 'phase-2',
    outcome: 'Understand the analytics pipeline from data to dashboard.',
    pillarFocus: 'P4 + P2',
    weeklyGate: 'You understand how SQL/data preparation connects to visualization.'
  },
  {
    id: 'W9',
    weekNumber: 9,
    title: 'Analytics Project Definition',
    dateRange: '30 Nov–06 Dec',
    phaseId: 'phase-3',
    outcome: 'Lock one substantial project and stop scope creep.',
    pillarFocus: 'P3 + P4 + P5',
    weeklyGate: 'Project scope is frozen: problem, dataset, questions, deliverables.'
  },
  {
    id: 'W10',
    weekNumber: 10,
    title: 'Analyze & Build',
    dateRange: '07–13 Dec',
    phaseId: 'phase-3',
    outcome: 'Produce the core analysis.',
    pillarFocus: 'P4 + P3',
    weeklyGate: 'Core analysis is complete and internally consistent.'
  },
  {
    id: 'W11',
    weekNumber: 11,
    title: 'Communicate & Professionalize',
    dateRange: '14–20 Dec',
    phaseId: 'phase-3',
    outcome: 'Turn analysis into a professional case study.',
    pillarFocus: 'P2 + P5 + P4',
    weeklyGate: 'A stranger can understand the project without you narrating every step.'
  },
  {
    id: 'W12',
    weekNumber: 12,
    title: 'FINOVAH + Brand Integration',
    dateRange: '21–27 Dec',
    phaseId: 'phase-3',
    outcome: 'Document the broader builder identity without expanding scope unnecessarily.',
    pillarFocus: 'P5 + P3 + P2',
    weeklyGate: 'Your portfolio, GitHub, Learning in Public, analytics project, and FINOVAH tell one coherent story.'
  },
  {
    id: 'W13',
    weekNumber: 13,
    title: 'Finish, Audit & 2027 Handoff',
    dateRange: '28–30 Dec',
    phaseId: 'phase-3',
    outcome: 'Close the 90-day cycle and create the next starting point.',
    pillarFocus: 'ALL PILLARS',
    weeklyGate: '90-day evidence package is complete and the next quarter has a clear starting point.'
  }
];

// Raw daily template map for building the 90 individual days
export const DAYS_CONFIG = [
  // W0
  { dayIndex: 1, dateStr: '2026-10-02', displayDate: 'Fri 02 Oct', weekId: 'W0', phaseId: 'phase-1' as const, pillarFocus: ['P1', 'P5'], topic: 'Baseline', executionDetail: 'Write current strengths/gaps; define 90-day outcomes; clean study environment.' },
  { dayIndex: 2, dateStr: '2026-10-03', displayDate: 'Sat 03 Oct', weekId: 'W0', phaseId: 'phase-1' as const, pillarFocus: ['P1', 'P5'], topic: 'Identity + system', executionDetail: 'Set trackers; organize learning folders/GitHub; define current technical level.' },
  { dayIndex: 3, dateStr: '2026-10-04', displayDate: 'Sun 04 Oct', weekId: 'W0', phaseId: 'phase-1' as const, pillarFocus: ['P1', 'P2'], topic: 'Reset', executionDetail: "Review baseline; prepare Week 1; record a 2-minute 'where I am now' speaking sample." },

  // W1
  { dayIndex: 4, dateStr: '2026-10-05', displayDate: 'Mon 05 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Syntax + variables', executionDetail: 'Reproduce examples; create your own variable exercises.' },
  { dayIndex: 5, dateStr: '2026-10-06', displayDate: 'Tue 06 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Types + input/output', executionDetail: 'Practice type conversion and user input.' },
  { dayIndex: 6, dateStr: '2026-10-07', displayDate: 'Wed 07 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Operators + expressions', executionDetail: 'Solve small calculations; explain operator behavior.' },
  { dayIndex: 7, dateStr: '2026-10-08', displayDate: 'Thu 08 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Conditions', executionDetail: 'Build decision-based mini exercises.' },
  { dayIndex: 8, dateStr: '2026-10-09', displayDate: 'Fri 09 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Practice day', executionDetail: 'No new tutorial unless necessary; solve mixed exercises.' },
  { dayIndex: 9, dateStr: '2026-10-10', displayDate: 'Sat 10 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P2', 'P5'], topic: 'Explain + document', executionDetail: 'Teach one concept aloud; update Learning in Public notes.' },
  { dayIndex: 10, dateStr: '2026-10-11', displayDate: 'Sun 11 Oct', weekId: 'W1', phaseId: 'phase-1' as const, pillarFocus: ['P1'], topic: 'Review', executionDetail: 'Error log + weekly review + next-week preparation.' },

  // W2
  { dayIndex: 11, dateStr: '2026-10-12', displayDate: 'Mon 12 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Lists', executionDetail: 'Create, access, update, loop through lists.' },
  { dayIndex: 12, dateStr: '2026-10-13', displayDate: 'Tue 13 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Tuples + sets', executionDetail: 'Understand why different structures exist.' },
  { dayIndex: 13, dateStr: '2026-10-14', displayDate: 'Wed 14 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P4', 'P3'], topic: 'Dictionaries', executionDetail: 'Model simple business/accounting information.' },
  { dayIndex: 14, dateStr: '2026-10-15', displayDate: 'Thu 15 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Loops', executionDetail: 'Use for/while for repeated tasks.' },
  { dayIndex: 15, dateStr: '2026-10-16', displayDate: 'Fri 16 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Mixed problems', executionDetail: 'Solve without copying.' },
  { dayIndex: 16, dateStr: '2026-10-17', displayDate: 'Sat 17 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P2', 'P4'], topic: 'Explain + build', executionDetail: 'Create a tiny data-handling exercise.' },
  { dayIndex: 17, dateStr: '2026-10-18', displayDate: 'Sun 18 Oct', weekId: 'W2', phaseId: 'phase-1' as const, pillarFocus: ['P1'], topic: 'Review', executionDetail: 'Refactor one exercise and document mistakes.' },

  // W3
  { dayIndex: 18, dateStr: '2026-10-19', displayDate: 'Mon 19 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Functions', executionDetail: 'Parameters, return values, reuse.' },
  { dayIndex: 19, dateStr: '2026-10-20', displayDate: 'Tue 20 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Problem decomposition', executionDetail: 'Break a task into smaller functions.' },
  { dayIndex: 20, dateStr: '2026-10-21', displayDate: 'Wed 21 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Errors + debugging', executionDetail: 'Read error messages instead of guessing.' },
  { dayIndex: 21, dateStr: '2026-10-22', displayDate: 'Thu 22 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Modules/files', executionDetail: 'Understand basic organization.' },
  { dayIndex: 22, dateStr: '2026-10-23', displayDate: 'Fri 23 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Challenge day', executionDetail: 'Solve a small practical problem independently.' },
  { dayIndex: 23, dateStr: '2026-10-24', displayDate: 'Sat 24 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P2'], topic: 'Teach it', executionDetail: 'Explain functions/debugging in plain English.' },
  { dayIndex: 24, dateStr: '2026-10-25', displayDate: 'Sun 25 Oct', weekId: 'W3', phaseId: 'phase-1' as const, pillarFocus: ['P1'], topic: 'Review', executionDetail: 'Identify the three most repeated errors and fix them.' },

  // W4
  { dayIndex: 25, dateStr: '2026-10-26', displayDate: 'Mon 26 Oct', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P4', 'P3'], topic: 'Project question', executionDetail: 'Choose one small finance/business problem.' },
  { dayIndex: 26, dateStr: '2026-10-27', displayDate: 'Tue 27 Oct', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Build v1', executionDetail: 'Implement core logic.' },
  { dayIndex: 27, dateStr: '2026-10-28', displayDate: 'Wed 28 Oct', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Test + fix', executionDetail: 'Use edge cases and clean the code.' },
  { dayIndex: 28, dateStr: '2026-10-29', displayDate: 'Thu 29 Oct', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P4'], topic: 'Improve', executionDetail: 'Refactor names, structure, comments.' },
  { dayIndex: 29, dateStr: '2026-10-30', displayDate: 'Fri 30 Oct', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P4', 'P5'], topic: 'Document', executionDetail: 'README/notes: problem, approach, learning.' },
  { dayIndex: 30, dateStr: '2026-10-31', displayDate: 'Sat 31 Oct', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P5'], topic: 'Publish proof', executionDetail: 'GitHub/portfolio or Learning-in-Public evidence.' },
  { dayIndex: 31, dateStr: '2026-11-01', displayDate: 'Sun 01 Nov', weekId: 'W4', phaseId: 'phase-1' as const, pillarFocus: ['P1'], topic: 'October review', executionDetail: 'Score October; identify gaps before Excel/SQL/Power BI.' },

  // W5
  { dayIndex: 32, dateStr: '2026-11-02', displayDate: 'Mon 02 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Data structure', executionDetail: 'Tables, clean layout, sorting/filtering.' },
  { dayIndex: 33, dateStr: '2026-11-03', displayDate: 'Tue 03 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Core formulas', executionDetail: 'Arithmetic, logical functions, references.' },
  { dayIndex: 34, dateStr: '2026-11-04', displayDate: 'Wed 04 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Lookups', executionDetail: 'Understand lookup logic through practical examples.' },
  { dayIndex: 35, dateStr: '2026-11-05', displayDate: 'Thu 05 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Cleaning', executionDetail: 'Duplicates, blanks, formats, consistency.' },
  { dayIndex: 36, dateStr: '2026-11-06', displayDate: 'Fri 06 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P4', 'P3'], topic: 'Analysis', executionDetail: 'Summaries and basic business questions.' },
  { dayIndex: 37, dateStr: '2026-11-07', displayDate: 'Sat 07 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P4', 'P3'], topic: 'Mini workbook', executionDetail: 'Create a small finance/business analysis sheet.' },
  { dayIndex: 38, dateStr: '2026-11-08', displayDate: 'Sun 08 Nov', weekId: 'W5', phaseId: 'phase-2' as const, pillarFocus: ['P2', 'P1'], topic: 'Review', executionDetail: 'Explain what the workbook tells you.' },

  // W6
  { dayIndex: 39, dateStr: '2026-11-09', displayDate: 'Mon 09 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P3'], topic: 'Accounting lens', executionDetail: 'Revenue, cost, profit, cash, simple ratios.' },
  { dayIndex: 40, dateStr: '2026-11-10', displayDate: 'Tue 10 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'PivotTables', executionDetail: 'Summarize data by category/time.' },
  { dayIndex: 41, dateStr: '2026-11-11', displayDate: 'Wed 11 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Charts', executionDetail: 'Choose visuals that answer questions.' },
  { dayIndex: 42, dateStr: '2026-11-12', displayDate: 'Thu 12 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P3', 'P4'], topic: 'Financial analysis', executionDetail: 'Compare periods/categories; identify patterns.' },
  { dayIndex: 43, dateStr: '2026-11-13', displayDate: 'Fri 13 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P3'], topic: 'Business questions', executionDetail: 'Write 5 questions a manager might ask.' },
  { dayIndex: 44, dateStr: '2026-11-14', displayDate: 'Sat 14 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P2'], topic: 'Explain findings', executionDetail: 'Present your workbook for 5 minutes.' },
  { dayIndex: 45, dateStr: '2026-11-15', displayDate: 'Sun 15 Nov', weekId: 'W6', phaseId: 'phase-2' as const, pillarFocus: ['P1'], topic: 'Review', executionDetail: 'Clean workbook + record lessons.' },

  // W7
  { dayIndex: 46, dateStr: '2026-11-16', displayDate: 'Mon 16 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'SELECT', executionDetail: 'Retrieve specific fields.' },
  { dayIndex: 47, dateStr: '2026-11-17', displayDate: 'Tue 17 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'WHERE', executionDetail: 'Filter to answer targeted questions.' },
  { dayIndex: 48, dateStr: '2026-11-18', displayDate: 'Wed 18 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'ORDER BY + LIMIT', executionDetail: 'Sort and inspect results.' },
  { dayIndex: 49, dateStr: '2026-11-19', displayDate: 'Thu 19 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Aggregations', executionDetail: 'COUNT, SUM, AVG, MIN, MAX.' },
  { dayIndex: 50, dateStr: '2026-11-20', displayDate: 'Fri 20 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'GROUP BY + HAVING', executionDetail: 'Summarize and filter groups.' },
  { dayIndex: 51, dateStr: '2026-11-21', displayDate: 'Sat 21 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P4', 'P3'], topic: 'Business query practice', executionDetail: 'Write questions first, then queries.' },
  { dayIndex: 52, dateStr: '2026-11-22', displayDate: 'Sun 22 Nov', weekId: 'W7', phaseId: 'phase-2' as const, pillarFocus: ['P2', 'P1'], topic: 'Review', executionDetail: 'Explain each query in plain English.' },

  // W8
  { dayIndex: 53, dateStr: '2026-11-23', displayDate: 'Mon 23 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'SQL joins', executionDetail: 'Understand relationships and combine tables.' },
  { dayIndex: 54, dateStr: '2026-11-24', displayDate: 'Tue 24 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'SQL practice', executionDetail: 'Mixed query set using a business dataset.' },
  { dayIndex: 55, dateStr: '2026-11-25', displayDate: 'Wed 25 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Power BI orientation', executionDetail: 'Import data and understand the workspace.' },
  { dayIndex: 56, dateStr: '2026-11-26', displayDate: 'Thu 26 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Power Query basics', executionDetail: 'Clean and transform data.' },
  { dayIndex: 57, dateStr: '2026-11-27', displayDate: 'Fri 27 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'Relationships', executionDetail: 'Understand model structure.' },
  { dayIndex: 58, dateStr: '2026-11-28', displayDate: 'Sat 28 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P4'], topic: 'First dashboard', executionDetail: 'Create a simple question-driven dashboard.' },
  { dayIndex: 59, dateStr: '2026-11-29', displayDate: 'Sun 29 Nov', weekId: 'W8', phaseId: 'phase-2' as const, pillarFocus: ['P2', 'P1'], topic: 'Review', executionDetail: 'Explain the full pipeline: raw data → insight.' },

  // W9
  { dayIndex: 60, dateStr: '2026-11-30', displayDate: 'Mon 30 Nov', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P3', 'P4'], topic: 'Problem definition', executionDetail: 'Choose a finance/business dataset and decision question.' },
  { dayIndex: 61, dateStr: '2026-12-01', displayDate: 'Tue 01 Dec', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Data audit', executionDetail: 'Fields, quality issues, assumptions.' },
  { dayIndex: 62, dateStr: '2026-12-02', displayDate: 'Wed 02 Dec', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Analysis plan', executionDetail: 'Questions, metrics, required tools.' },
  { dayIndex: 63, dateStr: '2026-12-03', displayDate: 'Thu 03 Dec', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Build pipeline', executionDetail: 'Clean/prepare data.' },
  { dayIndex: 64, dateStr: '2026-12-04', displayDate: 'Fri 04 Dec', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'First findings', executionDetail: 'Identify patterns and anomalies.' },
  { dayIndex: 65, dateStr: '2026-12-05', displayDate: 'Sat 05 Dec', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'Project documentation', executionDetail: 'Create structure for README/case study.' },
  { dayIndex: 66, dateStr: '2026-12-06', displayDate: 'Sun 06 Dec', weekId: 'W9', phaseId: 'phase-3' as const, pillarFocus: ['P1'], topic: 'Scope gate', executionDetail: 'Remove unnecessary features.' },

  // W10
  { dayIndex: 67, dateStr: '2026-12-07', displayDate: 'Mon 07 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Data cleaning', executionDetail: 'Finish reproducible cleaning steps.' },
  { dayIndex: 68, dateStr: '2026-12-08', displayDate: 'Tue 08 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Exploration', executionDetail: 'Descriptive analysis and patterns.' },
  { dayIndex: 69, dateStr: '2026-12-09', displayDate: 'Wed 09 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'SQL layer', executionDetail: 'Answer key questions through queries.' },
  { dayIndex: 70, dateStr: '2026-12-10', displayDate: 'Thu 10 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Excel/Python layer', executionDetail: 'Use the right tool where it adds value.' },
  { dayIndex: 71, dateStr: '2026-12-11', displayDate: 'Fri 11 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Power BI layer', executionDetail: 'Build dashboard structure.' },
  { dayIndex: 72, dateStr: '2026-12-12', displayDate: 'Sat 12 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P4', 'P3'], topic: 'Insight writing', executionDetail: 'Turn numbers into clear findings.' },
  { dayIndex: 73, dateStr: '2026-12-13', displayDate: 'Sun 13 Dec', weekId: 'W10', phaseId: 'phase-3' as const, pillarFocus: ['P1'], topic: 'Quality check', executionDetail: 'Check calculations, labels, assumptions.' },

  // W11
  { dayIndex: 74, dateStr: '2026-12-14', displayDate: 'Mon 14 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P2'], topic: 'Storyline', executionDetail: 'Problem → method → findings → implications.' },
  { dayIndex: 75, dateStr: '2026-12-15', displayDate: 'Tue 15 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P4'], topic: 'Dashboard polish', executionDetail: 'Remove clutter; improve readability.' },
  { dayIndex: 76, dateStr: '2026-12-16', displayDate: 'Wed 16 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'GitHub', executionDetail: 'README, structure, reproducibility notes.' },
  { dayIndex: 77, dateStr: '2026-12-17', displayDate: 'Thu 17 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'Portfolio case study', executionDetail: 'Write the project page.' },
  { dayIndex: 78, dateStr: '2026-12-18', displayDate: 'Fri 18 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P2'], topic: 'Presentation', executionDetail: 'Record 5–10 minute explanation.' },
  { dayIndex: 79, dateStr: '2026-12-19', displayDate: 'Sat 19 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P2', 'P5'], topic: 'Peer/self review', executionDetail: 'Critique clarity, accuracy, and claims.' },
  { dayIndex: 80, dateStr: '2026-12-20', displayDate: 'Sun 20 Dec', weekId: 'W11', phaseId: 'phase-3' as const, pillarFocus: ['P1'], topic: 'Revision', executionDetail: 'Fix the highest-impact issues.' },

  // W12
  { dayIndex: 81, dateStr: '2026-12-21', displayDate: 'Mon 21 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'FINOVAH V1 review', executionDetail: 'Problem, users, architecture, current state.' },
  { dayIndex: 82, dateStr: '2026-12-22', displayDate: 'Tue 22 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'FINOVAH documentation', executionDetail: 'Record decisions and lessons.' },
  { dayIndex: 83, dateStr: '2026-12-23', displayDate: 'Wed 23 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'Portfolio integration', executionDetail: 'Add project/learning evidence.' },
  { dayIndex: 84, dateStr: '2026-12-24', displayDate: 'Thu 24 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'GitHub/links', executionDetail: 'Clean profiles and working links.' },
  { dayIndex: 85, dateStr: '2026-12-25', displayDate: 'Fri 25 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P5'], topic: 'Learning in Public', executionDetail: 'Create a reflective end-of-year learning post.' },
  { dayIndex: 86, dateStr: '2026-12-26', displayDate: 'Sat 26 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P2'], topic: 'Communication review', executionDetail: 'Compare early vs current speaking samples.' },
  { dayIndex: 87, dateStr: '2026-12-27', displayDate: 'Sun 27 Dec', weekId: 'W12', phaseId: 'phase-3' as const, pillarFocus: ['P1'], topic: 'Final polish', executionDetail: 'Fix only high-value issues.' },

  // W13
  { dayIndex: 88, dateStr: '2026-12-28', displayDate: 'Mon 28 Dec', weekId: 'W13', phaseId: 'phase-3' as const, pillarFocus: ['P1', 'P5'], topic: 'Evidence audit', executionDetail: 'Collect links, projects, notes, recordings, metrics.' },
  { dayIndex: 89, dateStr: '2026-12-29', displayDate: 'Tue 29 Dec', weekId: 'W13', phaseId: 'phase-3' as const, pillarFocus: ['P1'], topic: '90-day review', executionDetail: 'What changed? What remains weak? What should stop?' },
  { dayIndex: 90, dateStr: '2026-12-30', displayDate: 'Wed 30 Dec', weekId: 'W13', phaseId: 'phase-3' as const, pillarFocus: ['P1', 'P5'], topic: 'Handoff', executionDetail: 'Write 2027 Q1 priorities; archive Winter Arc; celebrate evidence, not perfection.' }
];

export function buildInitialWeeks(): WeekPlan[] {
  return RAW_WEEKS.map(rawWeek => {
    const days = DAYS_CONFIG.filter(d => d.weekId === rawWeek.id).map(d => ({
      ...d,
      completed: d.dayIndex === 1, // Day 1 baseline completed on launch
      isMVDCompleted: false,
      notes: d.dayIndex === 1 ? 'Winter Arc officially initiated. System baseline established.' : '',
      proofLink: '',
      todayMit: d.dayIndex === 1 ? 'Establish study environment and baseline metrics' : ''
    }));
    return {
      ...rawWeek,
      days
    };
  });
}
