export type PhaseId = 'phase-1' | 'phase-2' | 'phase-3';

export type OperatingMode = 'time-block' | 'habit-stack' | 'milestone';

export interface PhaseInfo {
  id: PhaseId;
  name: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  centralQuestion: string;
  primaryOutcome: string;
  avoidTrap: string;
  accentColor: string;
}

export interface DayTask {
  dayIndex: number; // 1 to 90
  dateStr: string; // e.g. "2026-10-02"
  displayDate: string; // e.g. "Fri 02 Oct"
  weekId: string; // e.g. "W0"
  phaseId: PhaseId;
  pillarFocus: string[]; // e.g. ["P1", "P2", "P4", "P5"]
  topic: string;
  executionDetail: string;
  completed: boolean;
  isMVDCompleted?: boolean;
  notes?: string;
  proofLink?: string;
  todayMit?: string;
}

export interface WeekPlan {
  id: string; // "W0", "W1", ... "W13"
  weekNumber: number;
  title: string;
  dateRange: string;
  phaseId: PhaseId;
  outcome: string;
  pillarFocus: string;
  days: DayTask[];
  weeklyGate: string;
}

export interface PhaseGate {
  id: string;
  title: string;
  date: string;
  phaseId: PhaseId;
  requiredEvidence: string;
  status: 'pending' | 'in-progress' | 'passed';
  userNotes: string;
}

export interface OperatingBlock {
  id: string;
  number: number;
  name: string;
  standardTarget: string;
  rule: string;
  completed: boolean;
}

export interface HabitStackItem {
  id: string;
  anchor: string;
  habitAttached: string;
  minimum: string;
  completedToday: boolean;
}

export interface MilestoneItem {
  id: string;
  type: 'Knowledge' | 'Skill' | 'Application' | 'Communication' | 'Proof' | 'Professional';
  question: string;
  exampleEvidence: string;
  userGoal: string;
  proofArtifact: string;
  status: 'unstarted' | 'in-progress' | 'proven';
}

export interface WeeklyScorecard {
  id: string;
  weekId: string;
  date: string;
  scores: {
    consistency: number; // 0, 1, or 2
    technicalOutput: number;
    communication: number;
    accountingBusiness: number;
    projectBuilding: number;
    brandingDocumentation: number;
    focusQuality: number;
  };
  answers: {
    q1_actuallyCompleted: string;
    q2_evidenceExists: string;
    q3_understoodBetter: string;
    q4_doWithoutTutorial: string;
    q5_communicationImprovement: string;
    q6_distractedMost: string;
    q7_highestValueActivity: string;
    q8_shouldStop: string;
    q9_shouldContinue: string;
    q10_nextWeekMIT: string;
  };
}

export interface TrapItem {
  id: string;
  trap: string;
  counterQuestion: string;
  correctiveAction: string;
  isTriggered: boolean;
}

export interface NonNegotiableRule {
  id: number;
  rule: string;
  detail: string;
}

export interface SpeechRecording {
  id: string;
  timestamp: string;
  title: string;
  durationSeconds: number;
  blobUrl?: string;
  stage: 'S1' | 'S2' | 'S3' | 'S4' | 'S5';
  selfEval: {
    clarity: number; // 1-5
    pace: number; // 1-5
    fillerWords: number; // 1-5
    structure: number; // 1-5
    confidence: number; // 1-5
  };
  oneImprovementNote: string;
}

export interface FinovahSpec {
  v1Concept: string;
  coreUsers: string;
  problemStatement: string;
  architecture: string;
  deliverablesStatus: string;
  scopeDisciplineNotes: string;
  caseStudyDoc: string;
}

export interface FinalAuditData {
  q1_canDoNow: string;
  q2_explainHonesty: string;
  q3_businessDataset: string;
  q4_usefulSQL: string;
  q5_usableExcel: string;
  q6_powerBiDashboard: string;
  q7_pythonBeyondTutorials: string;
  q8_communicationNatural: string;
  q9_portfolioReality: string;
  q10_gitHubProof: string;
  q11_finovahCaseStudy: string;
  q12_consistencyTracker: string;
  reflections: {
    biggestCapabilityGain: string;
    biggestWeakness: string;
    habitChangedMost: string;
    stopActivity: string;
    q12027SkillToDeepen: string;
    continueProject: string;
    proudestEvidence: string;
    whatWouldChange: string;
  };
}
