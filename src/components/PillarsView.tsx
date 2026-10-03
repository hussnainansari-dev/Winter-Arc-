import React, { useState, useRef, useEffect } from 'react';
import { SpeechRecording, FinovahSpec } from '../types/winterArc';
import { Mic, Square, Play, Pause, Save, CheckCircle2, Circle, AlertCircle, FileText, Sparkles, Sliders, Volume2, HelpCircle } from 'lucide-react';

interface PillarsViewProps {
  speechRecordings: SpeechRecording[];
  onAddSpeechRecording: (recording: SpeechRecording) => void;
  finovahSpec: FinovahSpec;
  onUpdateFinovahSpec: (updates: Partial<FinovahSpec>) => void;
}

export const PillarsView: React.FC<PillarsViewProps> = ({
  speechRecordings,
  onAddSpeechRecording,
  finovahSpec,
  onUpdateFinovahSpec
}) => {
  const [activeTab, setActiveTab] = useState<'communication' | 'teacher-method' | 'finovah' | 'templates'>('communication');

  // Speech Practice Studio State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [speechTitle, setSpeechTitle] = useState<string>('Explain Python Dictionary concept to non-technical person');
  const [selectedStage, setSelectedStage] = useState<'S1' | 'S2' | 'S3' | 'S4' | 'S5'>('S1');
  const [evalScores, setEvalScores] = useState({
    clarity: 4,
    pace: 4,
    fillerWords: 3,
    structure: 4,
    confidence: 4
  });
  const [improvementNote, setImprovementNote] = useState<string>('Pace was good; remember to pause for 1 second instead of saying "like" or "um".');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);
        // Stop all audio tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied or unsupported:', err);
      // Fallback timer simulation for testing environments
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecording(false);
  };

  const handleSaveDrill = () => {
    const now = new Date();
    const dateStr = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newDrill: SpeechRecording = {
      id: `speech-${Date.now()}`,
      timestamp: dateStr,
      title: speechTitle,
      durationSeconds: recordingSeconds > 0 ? recordingSeconds : 120,
      blobUrl: audioBlobUrl || undefined,
      stage: selectedStage,
      selfEval: evalScores,
      oneImprovementNote: improvementNote
    };

    onAddSpeechRecording(newDrill);
    setAudioBlobUrl(null);
    setRecordingSeconds(0);
  };

  // Teacher Method 8-Step State
  const [teacherConcept, setTeacherConcept] = useState('Python Dictionary Comprehension for Financial Ratios');
  const [loopAnswers, setLoopAnswers] = useState({
    context: 'Allows mapping company balance sheet items to calculate debt-to-equity and current ratios in one line.',
    understand: 'A dictionary comprehension iterates over key-value pairs and constructs a new transformed dictionary.',
    reproduce: 'Rebuilt {k: v / total for k, v in balance.items()} without looking at documentation.',
    modify: 'Added conditional filtering: {k: round(v, 2) for k, v in balance.items() if v > 0}.',
    apply: 'Applied on a 10-line trial balance test dataset.',
    explain: 'Explained aloud: "It takes an existing collection of financial metrics and computes normalized weights in one clean dictionary."',
    prove: 'Committed to repository: fin_ratios_comp.py with sample output assert tests.',
    reflect: 'Initial syntax error: forgot .items() method call on dictionary iteration.'
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            Curriculum & Practice Modules
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Pillars Execution Studio
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-1">
            "The long-term edge is not Python alone or accounting alone. It is the intersection: understanding business and finance, working with data, communicating findings, and building useful things."
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'communication'
                ? 'bg-white text-neutral-950 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            P2: Speech Practice Studio
          </button>

          <button
            onClick={() => setActiveTab('teacher-method')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'teacher-method'
                ? 'bg-white text-neutral-950 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            P4/P3: Teacher Method (8-Step Loop)
          </button>

          <button
            onClick={() => setActiveTab('finovah')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'finovah'
                ? 'bg-white text-neutral-950 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            P5: FINOVAH V1 & Case Study
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'templates'
                ? 'bg-white text-neutral-950 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Daily Pillar Operating Templates
          </button>
        </div>
      </section>

      {/* TAB 1: COMMUNICATION & SPEECH STUDIO */}
      {activeTab === 'communication' && (
        <section className="space-y-6">
          {/* Rules and Progression */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 space-y-2">
              <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
                Month 1 (October) Target
              </span>
              <h4 className="text-sm font-semibold text-white">
                Speak Naturally for 2–5 Minutes
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Speak without a full script. Use 3–5 bullet points. Focus on reducing filler words and establishing regular cadence.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 space-y-2">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                Month 2 (November) Target
              </span>
              <h4 className="text-sm font-semibold text-white">
                5–10 Min Structured Explanations
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Context → Idea → Example → Business Implication. Answer follow-up manager questions calmly.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                Month 3 (December) Target
              </span>
              <h4 className="text-sm font-semibold text-white">
                Professional Project Presentation
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Present your analytics case study to a stranger. Stand by findings, methodology, and limitations with zero hype.
              </p>
            </div>
          </div>

          {/* Interactive Speech Recording Studio */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Mic className="w-5 h-5 text-sky-400" />
                  P2 English Speaking Drill Recorder
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Record 2–5 minutes aloud. No full scripts. Speak from 3–5 bullets only.
                </p>
              </div>

              {/* Stage selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-neutral-500 mr-1">Progression Stage:</span>
                {(['S1', 'S2', 'S3', 'S4', 'S5'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedStage === stage
                        ? 'bg-sky-500 text-neutral-950 font-bold'
                        : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Drill Details Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Drill Topic / Prompt
                </label>
                <input
                  type="text"
                  value={speechTitle}
                  onChange={(e) => setSpeechTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Stage Definition
                </label>
                <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300">
                  {selectedStage === 'S1' && 'S1: 2-minute explanation from 3–5 bullet points.'}
                  {selectedStage === 'S2' && 'S2: 3-minute explanation with one concrete practical example.'}
                  {selectedStage === 'S3' && 'S3: 5-minute explanation (Context → Idea → Example → Conclusion).'}
                  {selectedStage === 'S4' && 'S4: 5–10 minute presentation using minimal visual notes.'}
                  {selectedStage === 'S5' && 'S5: Answer an unexpected follow-up question without notes.'}
                </div>
              </div>
            </div>

            {/* Recorder Controls & Timer */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col items-center justify-center space-y-4 text-center">
              <div className="font-mono text-4xl font-extrabold text-white tabular-nums tracking-widest">
                {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:
                {String(recordingSeconds % 60).padStart(2, '0')}
              </div>

              {isRecording ? (
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                    Recording Live Audio...
                  </span>
                </div>
              ) : (
                <span className="text-xs text-neutral-500 font-mono">
                  Microphone standby. Speak clearly into microphone.
                </span>
              )}

              <div className="flex items-center gap-3 pt-2">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors"
                  >
                    <Mic className="w-4 h-4 text-neutral-900" />
                    Start Speech Drill
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    Stop Recording
                  </button>
                )}
              </div>

              {/* Audio Playback if recorded */}
              {audioBlobUrl && (
                <div className="pt-3 w-full max-w-md">
                  <audio controls src={audioBlobUrl} className="w-full h-8" />
                </div>
              )}
            </div>

            {/* Rubric Evaluation Form */}
            <div className="border-t border-neutral-800 pt-5 space-y-4">
              <h4 className="font-display text-sm font-bold text-white">
                Self-Evaluation Rubric (1–5 Scale)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                {(['clarity', 'pace', 'fillerWords', 'structure', 'confidence'] as const).map((key) => (
                  <div key={key} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1">
                    <span className="text-neutral-400 capitalize block text-[11px] font-mono">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <select
                      value={evalScores[key]}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none"
                    >
                      <option value={1}>1 - Weak</option>
                      <option value={2}>2 - Struggling</option>
                      <option value={3}>3 - Acceptable</option>
                      <option value={4}>4 - Good</option>
                      <option value={5}>5 - Excellent</option>
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  One Concrete Improvement (Non-Negotiable)
                </label>
                <input
                  type="text"
                  value={improvementNote}
                  onChange={(e) => setImprovementNote(e.target.value)}
                  placeholder="Record one concrete observation: clarity, pace, filler words, or structure..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveDrill}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Log Drill to Evidence Record
                </button>
              </div>
            </div>

            {/* Historical Recordings Log */}
            <div className="border-t border-neutral-800 pt-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Recorded Speech Samples ({speechRecordings.length})
              </span>

              <div className="space-y-2">
                {speechRecordings.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/70 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sky-400 font-bold">{rec.stage}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="font-semibold text-white">{rec.title}</span>
                        <span className="text-neutral-500 font-mono text-[11px]">({rec.durationSeconds}s)</span>
                      </div>
                      <p className="text-neutral-400 italic">
                        Improvement noted: "{rec.oneImprovementNote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-[11px] font-mono text-neutral-500">
                        {rec.timestamp}
                      </div>
                      {rec.blobUrl && (
                        <audio controls src={rec.blobUrl} className="h-6 w-36" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: TEACHER METHOD (8-STEP LEARNING LOOP) */}
      {activeTab === 'teacher-method' && (
        <section className="space-y-6">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
            <h3 className="font-display text-base font-bold text-white">
              09 — Teacher Method: How You Learn Each Skill
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              "Use the same learning loop across Python, Excel, SQL, Power BI, accounting, and business analysis. The mastery test: If you only recognize it, you have exposure. If you can reproduce it, you have a skill. If you can apply it to a new problem, you have usable capability. If you can explain why it works and when not to use it, you are developing understanding."
            </p>
          </div>

          {/* Interactive 8-Step Planner */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-5">
            <div>
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Target Concept / Topic
              </label>
              <input
                type="text"
                value={teacherConcept}
                onChange={(e) => setTeacherConcept(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm font-semibold text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Step 1: Context */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">1. CONTEXT</span>
                  <span className="text-[11px] text-neutral-500">What problem does this concept solve?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.context}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, context: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 2: Understand */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">2. UNDERSTAND</span>
                  <span className="text-[11px] text-neutral-500">Describe the core idea in 1-2 lines</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.understand}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, understand: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 3: Reproduce */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">3. REPRODUCE</span>
                  <span className="text-[11px] text-neutral-500">Recreated without tutorial assistance?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.reproduce}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, reproduce: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 4: Modify */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">4. MODIFY</span>
                  <span className="text-[11px] text-neutral-500">Changed inputs, assumptions, requirements?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.modify}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, modify: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 5: Apply */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">5. APPLY</span>
                  <span className="text-[11px] text-neutral-500">Applied to small finance/business dataset?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.apply}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, apply: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 6: Explain */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">6. EXPLAIN</span>
                  <span className="text-[11px] text-neutral-500">Explained aloud in plain English?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.explain}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 7: Prove */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">7. PROVE</span>
                  <span className="text-[11px] text-neutral-500">Inspectable code/commit/workbook saved?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.prove}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, prove: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Step 8: Reflect */}
              <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400 font-bold">8. REFLECT</span>
                  <span className="text-[11px] text-neutral-500">What confused you? What became clear?</span>
                </div>
                <textarea
                  rows={2}
                  value={loopAnswers.reflect}
                  onChange={(e) => setLoopAnswers(prev => ({ ...prev, reflect: e.target.value }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: FINOVAH V1 & PERSONAL BRAND */}
      {activeTab === 'finovah' && (
        <section className="space-y-6">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
            <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
              13 — FINOVAH Track & Scope Discipline
            </span>
            <h3 className="font-display text-base font-bold text-white mt-1">
              Student-Built Finance Platform Architecture
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              "FINOVAH is treated as a serious student-built project, not as a distraction from the analytics journey. Scope discipline: V1 first. Do not add AI chat, payments, social, complex auth, ads, crypto, or gamification merely because they sound impressive."
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  V1 Core Concept
                </label>
                <input
                  type="text"
                  value={finovahSpec.v1Concept}
                  onChange={(e) => onUpdateFinovahSpec({ v1Concept: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Target Users
                  </label>
                  <input
                    type="text"
                    value={finovahSpec.coreUsers}
                    onChange={(e) => onUpdateFinovahSpec({ coreUsers: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Deliverables Status
                  </label>
                  <input
                    type="text"
                    value={finovahSpec.deliverablesStatus}
                    onChange={(e) => onUpdateFinovahSpec({ deliverablesStatus: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={finovahSpec.problemStatement}
                  onChange={(e) => onUpdateFinovahSpec({ problemStatement: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  V1 Case Study Document (Draft / Notes)
                </label>
                <textarea
                  rows={6}
                  value={finovahSpec.caseStudyDoc}
                  onChange={(e) => onUpdateFinovahSpec({ caseStudyDoc: e.target.value })}
                  className="w-full font-mono bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-200 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 12 Personal Branding Quality Filter */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
              12 — Learning in Public Content Quality Filter
            </span>
            <p className="text-xs text-neutral-400">
              Before posting anything on LinkedIn or GitHub, verify all 6 conditions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                1. Did I actually do the work?
              </div>
              <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                2. Did I learn something specific?
              </div>
              <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                3. Can I show proof?
              </div>
              <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                4. Did my understanding change?
              </div>
              <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                5. Would another learner gain value?
              </div>
              <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                6. Am I claiming more than evidence supports?
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: DAILY PILLAR OPERATING TEMPLATES */}
      {activeTab === 'templates' && (
        <section className="space-y-6">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
            <h3 className="font-display text-base font-bold text-white">
              08 — Day-by-Day Pillar Operating Templates
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              "The weekly roadmap tells you WHAT to work on; these templates tell you HOW to run the day."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950/70 space-y-2">
              <h4 className="font-display text-sm font-bold text-sky-400">
                Technical Day (P4)
              </h4>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                <li>5 min: define one technical outcome.</li>
                <li>15–25 min: learn/review only what is necessary.</li>
                <li>35–60 min: reproduce from memory.</li>
                <li>20–40 min: modify/apply to a new example.</li>
                <li>5–10 min: explain aloud.</li>
                <li>5 min: capture proof/error log.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950/70 space-y-2">
              <h4 className="font-display text-sm font-bold text-amber-400">
                Communication Day (P2)
              </h4>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                <li>5 min: choose one topic.</li>
                <li>5 min: create 3–5 bullet points, not a script.</li>
                <li>2–5 min: speak without reading.</li>
                <li>Listen back once.</li>
                <li>Record one improvement: clarity, pace, filler words, structure, or confidence.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950/70 space-y-2">
              <h4 className="font-display text-sm font-bold text-purple-400">
                Accounting / Business Day (P3)
              </h4>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                <li>Learn one accounting/business concept.</li>
                <li>Connect it to a real business decision.</li>
                <li>Create one concrete financial example.</li>
                <li>Explain it in plain English.</li>
                <li>Write one question you still cannot answer.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950/70 space-y-2">
              <h4 className="font-display text-sm font-bold text-emerald-400">
                Project Day (P5 / P4)
              </h4>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                <li>Define the artifact before opening tools.</li>
                <li>Build for the majority of the session.</li>
                <li>Test/check edge cases and assumptions.</li>
                <li>Save/commit/document to GitHub.</li>
                <li>Write the next smallest action.</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
