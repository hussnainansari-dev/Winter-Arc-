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
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(11,31,58,0.08)] bg-[#F8F7F3]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single-element brand wordmark */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className="font-display text-base font-extrabold tracking-tight text-[#0B1F3A] hover:text-[#174EA6] transition-colors whitespace-nowrap focus:outline-none"
        >
          WINTER ARC 2026
        </button>

        {/* Zone 2: 4-7 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium text-[#0B1F3A]/70">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors whitespace-nowrap px-3 py-1.5 rounded-md ${
                  isActive
                    ? 'text-[#174EA6] bg-[#EAF3FF] font-semibold'
                    : 'text-[#0B1F3A]/75 hover:text-[#174EA6] hover:bg-[#F1F3F5]'
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-[#EAF3FF] hover:bg-[#d8e9ff] text-[#174EA6] border border-[#174EA6]/15 transition-all whitespace-nowrap"
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
                ? 'bg-[#EAF3FF] text-[#174EA6] border border-[#174EA6]/40 shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#174EA6]" />
            <span className="hidden sm:inline">MVD</span>
            <span>{mvdActive ? 'Active' : 'Standby'}</span>
          </button>

          {/* Quick Export Button */}
          <button
            onClick={onExportData}
            title="Export OS state to JSON backup"
            className="p-1.5 text-[#0B1F3A] hover:text-[#174EA6] bg-[#F1F3F5] hover:bg-[#e7eaee] border border-[rgba(11,31,58,0.08)] rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Day indicator */}
          <div className="font-mono text-xs tabular-nums text-[#0B1F3A] font-semibold px-2.5 py-1 bg-[#F1F3F5] border border-[rgba(11,31,58,0.08)] rounded-md hidden lg:block">
            Day {currentDay}/90
          </div>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-2.5 py-1 whitespace-nowrap rounded text-xs transition-colors ${
              currentTab === item.id
                ? 'bg-[#EAF3FF] text-[#174EA6] font-semibold'
                : 'text-[#0B1F3A]/70 hover:text-[#0B1F3A] hover:bg-[#F1F3F5]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
