import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Winter Arc ErrorBoundary caught a runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('winter_arc_2026_os_v1');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F7F3] text-[#111827] flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white border border-[#0B1F3A]/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex items-center gap-3 border-b border-[#0B1F3A]/8 pb-4">
              <div className="p-2.5 rounded-xl bg-[#EAF3FF] text-[#174EA6]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
                  System Diagnostic
                </span>
                <h1 className="font-display text-xl font-bold text-[#0B1F3A]">
                  Winter Arc OS Recovery
                </h1>
              </div>
            </div>

            <p className="text-xs text-[#111827]/75 leading-relaxed">
              A component encountered an unexpected error during execution. The system prevented a blank page. You can reload the application or reset stored state to restore baseline operation.
            </p>

            {this.state.error && (
              <div className="p-3 bg-[#F1F3F5] rounded-lg border border-[#0B1F3A]/5 font-mono text-[11px] text-[#0B1F3A] break-all max-h-32 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#174EA6] hover:bg-[#0F3B82] text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Application
              </button>

              <button
                onClick={this.handleResetCache}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A] border border-[#0B1F3A]/10 rounded-lg text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset State Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
