import React from 'react';
import { ShieldAlert, Download, RefreshCw } from 'lucide-react';

interface TopNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  mvdActive: boolean;
  onToggleMvd: () => void;
  currentDay: number;
  onExportData: () => void;
  onResetData: () => void;
  onOpenPictureStudio: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  mvdActive,
  onToggleMvd,
  currentDay,
  onExportData,
  onResetData,
  onOpenPictureStudio
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'operating-systems', label: '3 Operating Modes' },
    { id: 'roadmap', label: '90-Day Roadmap' },
    { id: 'pillars', label: 'Pillars & Practice' },
    { id: 'scoreboard', label: 'Scoreboard & Review' },
    { id: 'traps', label: 'Rules & Traps' },
    { id: 'audit', label: 'Final Audit' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single-element brand wordmark */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className="font-display text-base font-extrabold tracking-tight text-white hover:text-neutral-200 transition-colors whitespace-nowrap focus:outline-none"
        >
          WINTER ARC 2026
        </button>

        {/* Zone 2: 4-7 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-neutral-400">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-white border-b-2 border-white font-semibold'
                    : 'hover:text-neutral-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Picture Studio Button */}
          <button
            onClick={onOpenPictureStudio}
            title="Upload picture and choose unique Winter Arc background"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-neutral-900 hover:bg-neutral-800 text-sky-300 border border-neutral-800 hover:border-neutral-700 transition-all whitespace-nowrap"
          >
            <span>❄️</span>
            <span className="hidden sm:inline">Picture Studio</span>
          </button>

          {/* MVD Mode Toggle Button */}
          <button
            onClick={onToggleMvd}
            title="Minimum Viable Day mode (20m Tech + 10m English + 5m Reflection) when university/internship or emergencies collapse the schedule"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              mvdActive
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">MVD</span>
            <span>{mvdActive ? 'Active' : 'Standby'}</span>
          </button>

          {/* Quick Export Button */}
          <button
            onClick={onExportData}
            title="Export OS state to JSON backup"
            className="p-1.5 text-neutral-400 hover:text-neutral-100 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Day indicator */}
          <div className="font-mono text-xs tabular-nums text-neutral-400 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-md hidden lg:block">
            Day {currentDay}/90
          </div>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-neutral-800/60 bg-neutral-950/80 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-2.5 py-1 whitespace-nowrap rounded text-xs transition-colors ${
              currentTab === item.id
                ? 'bg-neutral-800 text-white font-medium'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
