import { WeekPlan, PhaseGate, TrapItem, OperatingBlock, HabitStackItem, MilestoneItem, WeeklyScorecard, SpeechRecording, FinovahSpec, FinalAuditData } from '../types/winterArc';
import { buildInitialWeeks, INITIAL_PHASE_GATES, DEVILS_ADVOCATE_TRAPS, INITIAL_BLOCKS, INITIAL_HABITS, INITIAL_MILESTONES } from './roadmapData';

export interface WinterArcState {
  userName: string;
  userEmail: string;
  currentDayIndex: number; // 1 to 90
  customProfileImage?: string;
  activeBackgroundId: string;
  backgroundBlendEffect: 'frost' | 'obsidian' | 'vignette' | 'clean';
  mvdActive: boolean;
  mvdState: {
    technical20m: boolean;
    english10m: boolean;
    reflection5m: boolean;
  };
  todayOneBigOutcome: string;
  weeks: WeekPlan[];
  phaseGates: PhaseGate[];
  operatingBlocks: OperatingBlock[];
  habitStack: HabitStackItem[];
  milestones: MilestoneItem[];
  traps: TrapItem[];
  weeklyScorecards: WeeklyScorecard[];
  speechRecordings: SpeechRecording[];
  finovahSpec: FinovahSpec;
  finalAudit: FinalAuditData;
  pledgedNonNegotiables: boolean;
  activeWeeklyPillarTargets: {
    technicalSessions: number; // target: 4-6
    englishSessions: number; // target: 5-7
    accountingSessions: number; // target: 2-4
    projectSessions: number; // target: 2-4
    learningInPublicPosts: number; // target: 1-3
    weeklyReviews: number; // target: 1
    maintenanceSessions: number; // target: 1
  };
}

export const INITIAL_STATE: WinterArcState = {
  userName: 'Hussnain Ansari',
  userEmail: 'hunainansari221@gmail.com',
  currentDayIndex: 1, // Oct 02, 2026 is Day 1
  customProfileImage: '', // empty defaults to high-def winter portrait asset
  activeBackgroundId: 'brutalist-frost',
  backgroundBlendEffect: 'frost',
  mvdActive: false,
  mvdState: {
    technical20m: false,
    english10m: false,
    reflection5m: false
  },
  todayOneBigOutcome: 'Establish clean workspace, baseline current strengths & gaps, and initialize Day 1 execution.',
  weeks: buildInitialWeeks(),
  phaseGates: INITIAL_PHASE_GATES,
  operatingBlocks: INITIAL_BLOCKS,
  habitStack: INITIAL_HABITS,
  milestones: INITIAL_MILESTONES,
  traps: DEVILS_ADVOCATE_TRAPS,
  weeklyScorecards: [
    {
      id: 'score-w0',
      weekId: 'W0',
      date: '2026-10-04',
      scores: {
        consistency: 2,
        technicalOutput: 2,
        communication: 2,
        accountingBusiness: 1,
        projectBuilding: 2,
        brandingDocumentation: 2,
        focusQuality: 2
      },
      answers: {
        q1_actuallyCompleted: 'Set up Winter Arc 2026 OS, organized GitHub repositories, locked baseline outcomes.',
        q2_evidenceExists: 'Winter Arc OS tracker, initialized repo, 2-minute baseline voice recording.',
        q3_understoodBetter: 'The priority rule: P4 (Technical) is the engine, P3 gives business context, P2 makes it communicable, P5 makes it visible, P1 keeps it alive.',
        q4_doWithoutTutorial: 'Reproducing basic variable transformations & environment setups.',
        q5_communicationImprovement: 'Recorded unscripted 2-minute baseline sample focusing on steady pacing.',
        q6_distractedMost: 'Initial temptation to jump ahead to advanced Power BI dashboards before Python foundations.',
        q7_highestValueActivity: 'Setting up the strict 90-day time blocks and non-negotiables.',
        q8_shouldStop: 'Over-designing documentation before the underlying code exercises exist.',
        q9_shouldContinue: 'The teacher loop: Learn -> Reproduce -> Modify -> Explain.',
        q10_nextWeekMIT: 'Master Python syntax, variables, conditions, and lists without tutorial copy-pasting.'
      }
    }
  ],
  speechRecordings: [
    {
      id: 'speech-sample-0',
      timestamp: '2026-10-02 11:30',
      title: 'Baseline: Where I am now & 90-Day Vision',
      durationSeconds: 124,
      stage: 'S1',
      selfEval: {
        clarity: 4,
        pace: 3,
        fillerWords: 4,
        structure: 4,
        confidence: 4
      },
      oneImprovementNote: 'Consciously reduce "um" fillers by pausing for 1 second instead of rushing into the next sentence.'
    }
  ],
  finovahSpec: {
    v1Concept: 'Student-built finance & analytics exploration platform bridging financial accounting fundamentals with data query engines.',
    coreUsers: 'Finance & accounting students wanting practical business analytics without overwhelming complexity.',
    problemStatement: 'Students study accounting theory and data tools in isolation; FINOVAH unifies real ledger analysis with visual dashboards.',
    architecture: 'V1 Minimal: Clean schema models, analytical calculation engine, simplified ledger visualization, inspectable case study.',
    deliverablesStatus: 'V1 Concept stabilized. Scope frozen. Documentation and case study prioritized for Phase 3.',
    scopeDisciplineNotes: 'No AI chatbots, no payments, no complex multi-tenant auth, no crypto, no unneeded gamification.',
    caseStudyDoc: '# FINOVAH V1 Case Study\n\n### Problem\nAccounting and finance students often memorize ledger mechanics without understanding data modeling or business intelligence pipelines.\n\n### Objective\nBuild a lightweight, clean analytical platform demonstrating practical accounting-to-analytics workflows.'
  },
  finalAudit: {
    q1_canDoNow: '',
    q2_explainHonesty: '',
    q3_businessDataset: '',
    q4_usefulSQL: '',
    q5_usableExcel: '',
    q6_powerBiDashboard: '',
    q7_pythonBeyondTutorials: '',
    q8_communicationNatural: '',
    q9_portfolioReality: '',
    q10_gitHubProof: '',
    q11_finovahCaseStudy: '',
    q12_consistencyTracker: '',
    reflections: {
      biggestCapabilityGain: '',
      biggestWeakness: '',
      habitChangedMost: '',
      stopActivity: '',
      q12027SkillToDeepen: '',
      continueProject: '',
      proudestEvidence: '',
      whatWouldChange: ''
    }
  },
  pledgedNonNegotiables: true,
  activeWeeklyPillarTargets: {
    technicalSessions: 1, // current count for week
    englishSessions: 1,
    accountingSessions: 1,
    projectSessions: 1,
    learningInPublicPosts: 0,
    weeklyReviews: 0,
    maintenanceSessions: 1
  }
};

const STORAGE_KEY = 'winter_arc_2026_os_v1';

export function loadStoredState(): WinterArcState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);

    // Defensive schema checks to guarantee zero null/undefined crashes
    const validatedWeeks = Array.isArray(parsed.weeks) && parsed.weeks.length > 0
      ? parsed.weeks
      : INITIAL_STATE.weeks;

    const validatedBlocks = Array.isArray(parsed.operatingBlocks) && parsed.operatingBlocks.length > 0
      ? parsed.operatingBlocks
      : INITIAL_STATE.operatingBlocks;

    const validatedHabits = Array.isArray(parsed.habitStack) && parsed.habitStack.length > 0
      ? parsed.habitStack
      : INITIAL_STATE.habitStack;

    const validatedMilestones = Array.isArray(parsed.milestones) && parsed.milestones.length > 0
      ? parsed.milestones
      : INITIAL_STATE.milestones;

    const validatedPhaseGates = Array.isArray(parsed.phaseGates) && parsed.phaseGates.length > 0
      ? parsed.phaseGates
      : INITIAL_STATE.phaseGates;

    const validatedTraps = Array.isArray(parsed.traps) && parsed.traps.length > 0
      ? parsed.traps
      : INITIAL_STATE.traps;

    const validatedMvdState = parsed.mvdState && typeof parsed.mvdState === 'object'
      ? { ...INITIAL_STATE.mvdState, ...parsed.mvdState }
      : INITIAL_STATE.mvdState;

    const validatedTargets = parsed.activeWeeklyPillarTargets && typeof parsed.activeWeeklyPillarTargets === 'object'
      ? { ...INITIAL_STATE.activeWeeklyPillarTargets, ...parsed.activeWeeklyPillarTargets }
      : INITIAL_STATE.activeWeeklyPillarTargets;

    const validatedAudit = parsed.finalAudit && typeof parsed.finalAudit === 'object'
      ? {
          ...INITIAL_STATE.finalAudit,
          ...parsed.finalAudit,
          reflections: {
            ...INITIAL_STATE.finalAudit.reflections,
            ...(parsed.finalAudit.reflections || {})
          }
        }
      : INITIAL_STATE.finalAudit;

    return {
      ...INITIAL_STATE,
      ...parsed,
      weeks: validatedWeeks,
      operatingBlocks: validatedBlocks,
      habitStack: validatedHabits,
      milestones: validatedMilestones,
      phaseGates: validatedPhaseGates,
      traps: validatedTraps,
      mvdState: validatedMvdState,
      activeWeeklyPillarTargets: validatedTargets,
      finalAudit: validatedAudit,
    };
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return INITIAL_STATE;
  }
}

export function saveStoredState(state: WinterArcState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}
