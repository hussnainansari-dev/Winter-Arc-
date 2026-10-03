import React, { useState, useEffect } from 'react';
import { WinterArcState, loadStoredState, saveStoredState, INITIAL_STATE } from './data/initialState';
import { TopNav } from './components/TopNav';
import { DashboardView } from './components/DashboardView';
import { OperatingSystemsView } from './components/OperatingSystemsView';
import { RoadmapView } from './components/RoadmapView';
import { PillarsView } from './components/PillarsView';
import { ScoreboardView } from './components/ScoreboardView';
import { DevilsAdvocateView } from './components/DevilsAdvocateView';
import { FinalAuditView } from './components/FinalAuditView';
import { PictureStudioModal } from './components/PictureStudioModal';

export default function App() {
  const [state, setState] = useState<WinterArcState>(() => loadStoredState());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isPictureStudioOpen, setIsPictureStudioOpen] = useState<boolean>(false);

  // Auto-save to LocalStorage whenever state updates
  useEffect(() => {
    saveStoredState(state);
  }, [state]);

  const handleUpdateState = (updater: (prev: WinterArcState) => WinterArcState) => {
    setState(updater);
  };

  const handleToggleMvd = () => {
    setState(prev => ({ ...prev, mvdActive: !prev.mvdActive }));
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `winter_arc_2026_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    if (window.confirm('Reset Winter Arc data to default Day 1 initial state?')) {
      setState(INITIAL_STATE);
    }
  };

  const handleSelectDay = (dayIndex: number) => {
    setState(prev => ({ ...prev, currentDayIndex: dayIndex }));
  };

  const handleSaveProfilePicture = (
    imageUri: string,
    bgId: string,
    effect: 'frost' | 'obsidian' | 'vignette' | 'clean'
  ) => {
    setState(prev => ({
      ...prev,
      customProfileImage: imageUri,
      activeBackgroundId: bgId,
      backgroundBlendEffect: effect
    }));
  };

  // Operating blocks toggle
  const handleToggleBlock = (blockId: string) => {
    setState(prev => ({
      ...prev,
      operatingBlocks: prev.operatingBlocks.map(b =>
        b.id === blockId ? { ...b, completed: !b.completed } : b
      )
    }));
  };

  // Habit toggle
  const handleToggleHabit = (habitId: string) => {
    setState(prev => ({
      ...prev,
      habitStack: prev.habitStack.map(h =>
        h.id === habitId ? { ...h, completedToday: !h.completedToday } : h
      )
    }));
  };

  // Milestone update
  const handleUpdateMilestone = (id: string, updates: any) => {
    setState(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === id ? { ...m, ...updates } : m
      )
    }));
  };

  // Daily task toggle in roadmap
  const handleToggleDayCompleted = (dayIndex: number) => {
    setState(prev => ({
      ...prev,
      weeks: prev.weeks.map(w => ({
        ...w,
        days: w.days.map(d =>
          d.dayIndex === dayIndex ? { ...d, completed: !d.completed } : d
        )
      }))
    }));
  };

  // Daily task details update
  const handleUpdateDayDetails = (dayIndex: number, updates: any) => {
    setState(prev => ({
      ...prev,
      weeks: prev.weeks.map(w => ({
        ...w,
        days: w.days.map(d =>
          d.dayIndex === dayIndex ? { ...d, ...updates } : d
        )
      }))
    }));
  };

  // Phase gate update
  const handleUpdatePhaseGate = (gateId: string, updates: any) => {
    setState(prev => ({
      ...prev,
      phaseGates: prev.phaseGates.map(g =>
        g.id === gateId ? { ...g, ...updates } : g
      )
    }));
  };

  // Speech recording add
  const handleAddSpeechRecording = (recording: any) => {
    setState(prev => ({
      ...prev,
      speechRecordings: [recording, ...prev.speechRecordings],
      activeWeeklyPillarTargets: {
        ...prev.activeWeeklyPillarTargets,
        englishSessions: prev.activeWeeklyPillarTargets.englishSessions + 1
      }
    }));
  };

  // FINOVAH spec update
  const handleUpdateFinovahSpec = (updates: any) => {
    setState(prev => ({
      ...prev,
      finovahSpec: { ...prev.finovahSpec, ...updates }
    }));
  };

  // Scorecard save
  const handleSaveScorecard = (scorecard: any) => {
    setState(prev => ({
      ...prev,
      weeklyScorecards: [scorecard, ...prev.weeklyScorecards.filter(s => s.weekId !== scorecard.weekId)],
      activeWeeklyPillarTargets: {
        ...prev.activeWeeklyPillarTargets,
        weeklyReviews: prev.activeWeeklyPillarTargets.weeklyReviews + 1
      }
    }));
  };

  // Pledge toggle
  const handleTogglePledge = () => {
    setState(prev => ({ ...prev, pledgedNonNegotiables: !prev.pledgedNonNegotiables }));
  };

  // Trap toggle
  const handleToggleTrap = (trapId: string) => {
    setState(prev => ({
      ...prev,
      traps: prev.traps.map(t =>
        t.id === trapId ? { ...t, isTriggered: !t.isTriggered } : t
      )
    }));
  };

  // Final Audit updates
  const handleUpdateAuditData = (updates: any) => {
    setState(prev => ({
      ...prev,
      finalAudit: { ...prev.finalAudit, ...updates }
    }));
  };

  const handleUpdateReflections = (updates: any) => {
    setState(prev => ({
      ...prev,
      finalAudit: {
        ...prev.finalAudit,
        reflections: { ...prev.finalAudit.reflections, ...updates }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* 3-Zone Top Navigation Bar */}
      <TopNav
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        mvdActive={state.mvdActive}
        onToggleMvd={handleToggleMvd}
        currentDay={state.currentDayIndex}
        onExportData={handleExportData}
        onResetData={handleResetData}
        onOpenPictureStudio={() => setIsPictureStudioOpen(true)}
      />

      {/* Main Content Container (Baseline width 1200px-1440px) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            state={state}
            onUpdateState={handleUpdateState}
            onNavigateTab={setActiveTab}
            onSelectDay={handleSelectDay}
            onOpenPictureStudio={() => setIsPictureStudioOpen(true)}
          />
        )}

        {activeTab === 'operating-systems' && (
          <OperatingSystemsView
            blocks={state.operatingBlocks}
            habitStack={state.habitStack}
            milestones={state.milestones}
            onToggleBlock={handleToggleBlock}
            onToggleHabit={handleToggleHabit}
            onUpdateMilestone={handleUpdateMilestone}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            weeks={state.weeks}
            phaseGates={state.phaseGates}
            currentDayIndex={state.currentDayIndex}
            onToggleDayCompleted={handleToggleDayCompleted}
            onUpdateDayDetails={handleUpdateDayDetails}
            onUpdatePhaseGate={handleUpdatePhaseGate}
          />
        )}

        {activeTab === 'pillars' && (
          <PillarsView
            speechRecordings={state.speechRecordings}
            onAddSpeechRecording={handleAddSpeechRecording}
            finovahSpec={state.finovahSpec}
            onUpdateFinovahSpec={handleUpdateFinovahSpec}
          />
        )}

        {activeTab === 'scoreboard' && (
          <ScoreboardView
            scorecards={state.weeklyScorecards}
            activeTargets={state.activeWeeklyPillarTargets}
            onUpdateActiveTargets={(updater) => setState(prev => ({
              ...prev,
              activeWeeklyPillarTargets: updater(prev.activeWeeklyPillarTargets)
            }))}
            onSaveScorecard={handleSaveScorecard}
          />
        )}

        {activeTab === 'traps' && (
          <DevilsAdvocateView
            traps={state.traps}
            pledged={state.pledgedNonNegotiables}
            onTogglePledge={handleTogglePledge}
            onToggleTrap={handleToggleTrap}
          />
        )}

        {activeTab === 'audit' && (
          <FinalAuditView
            auditData={state.finalAudit}
            onUpdateAuditData={handleUpdateAuditData}
            onUpdateReflections={handleUpdateReflections}
            onExportAuditReport={handleExportData}
          />
        )}
      </main>

      {/* Clean quiet footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-neutral-400 font-semibold">WINTER ARC 2026</span>
            <span>·</span>
            <span>Hussnain Ansari</span>
            <span>·</span>
            <span>02 Oct 2026 → 30 Dec 2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>Learn · Practice · Build · Explain · Document · Improve</span>
            <button
              onClick={handleResetData}
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </footer>

      {/* Picture & Background Studio Modal */}
      <PictureStudioModal
        isOpen={isPictureStudioOpen}
        onClose={() => setIsPictureStudioOpen(false)}
        currentImage={state.customProfileImage}
        activeBackgroundId={state.activeBackgroundId}
        activeBlendEffect={state.backgroundBlendEffect}
        onSaveProfilePicture={handleSaveProfilePicture}
        currentDay={state.currentDayIndex}
      />
    </div>
  );
}
