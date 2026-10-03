import React, { useState, useRef, useEffect } from 'react';
import { SpeechRecording, FinovahSpec } from '../types/winterArc';
import { Mic, Square, Play, Pause, Save, CheckCircle2, Circle, AlertCircle, FileText, Sparkles, Sliders, Volume2, HelpCircle, Compass, Brain, Dumbbell, BookOpen, Clock, HeartHandshake } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'communication' | 'teacher-method' | 'growth-dimensions' | 'finovah' | 'templates'>('communication');

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
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access simulated:', err);
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
    <div className="space-y-8 pb-12 text-[#111827]">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#174EA6] uppercase font-bold">
            Curriculum & Practice Modules
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A] mt-1">
            Pillars Execution Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed max-w-3xl mt-1">
            "The long-term edge is not Python alone or accounting alone. It is the intersection: understanding business and finance, working with data, communicating findings, and building useful things."
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'communication'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            P2: Speech Practice Studio
          </button>

          <button
            onClick={() => setActiveTab('teacher-method')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'teacher-method'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            P4/P3: Teacher Method (8-Step Loop)
          </button>

          <button
            onClick={() => setActiveTab('growth-dimensions')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'growth-dimensions'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            Growth Architecture (Islamic / Mental / Physical)
          </button>

          <button
            onClick={() => setActiveTab('finovah')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'finovah'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            P5: FINOVAH V1 & Case Study
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'templates'
                ? 'bg-[#174EA6] text-white shadow-xs'
                : 'bg-[#F1F3F5] hover:bg-[#e7eaee] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.08)]'
            }`}
          >
            Daily Operating Templates
          </button>
        </div>
      </section>

      {/* TAB 1: COMMUNICATION & SPEECH STUDIO */}
      {activeTab === 'communication' && (
        <section className="space-y-6">
          {/* Rules and Progression */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider block font-bold">
                Month 1 (October) Target
              </span>
              <h4 className="text-sm font-semibold text-[#0B1F3A]">
                Speak Naturally for 2–5 Minutes
              </h4>
              <p className="text-xs text-[#111827]/80 leading-relaxed">
                Speak without a full script. Use 3–5 bullet points. Focus on reducing filler words and establishing regular cadence.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider block font-bold">
                Month 2 (November) Target
              </span>
              <h4 className="text-sm font-semibold text-[#0B1F3A]">
                5–10 Min Structured Explanations
              </h4>
              <p className="text-xs text-[#111827]/80 leading-relaxed">
                Context → Idea → Example → Business Implication. Answer follow-up manager questions calmly.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider block font-bold">
                Month 3 (December) Target
              </span>
              <h4 className="text-sm font-semibold text-[#0B1F3A]">
                Professional Project Presentation
              </h4>
              <p className="text-xs text-[#111827]/80 leading-relaxed">
                Present your analytics case study to a stranger. Stand by findings, methodology, and limitations with zero hype.
              </p>
            </div>
          </div>

          {/* Interactive Speech Recording Studio */}
          <div className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(11,31,58,0.08)] pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                  <Mic className="w-5 h-5 text-[#174EA6]" />
                  P2 English Speaking Drill Recorder
                </h3>
                <p className="text-xs text-[#111827]/70 mt-0.5">
                  Record 2–5 minutes aloud. No full scripts. Speak from 3–5 bullets only.
                </p>
              </div>

              {/* Stage selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-[#111827]/60 mr-1">Progression Stage:</span>
                {(['S1', 'S2', 'S3', 'S4', 'S5'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedStage === stage
                        ? 'bg-[#174EA6] text-white font-bold'
                        : 'bg-[#F8F7F3] text-[#0B1F3A]/70 hover:text-[#0B1F3A] border border-[rgba(11,31,58,0.1)]'
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
                <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                  Drill Topic / Prompt
                </label>
                <input
                  type="text"
                  value={speechTitle}
                  onChange={(e) => setSpeechTitle(e.target.value)}
                  className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                  Stage Definition
                </label>
                <div className="p-2.5 bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] rounded-lg text-xs text-[#111827]/80">
                  {selectedStage === 'S1' && 'S1: 2-minute explanation from 3–5 bullet points.'}
                  {selectedStage === 'S2' && 'S2: 3-minute explanation with one concrete practical example.'}
                  {selectedStage === 'S3' && 'S3: 5-minute explanation (Context → Idea → Example → Conclusion).'}
                  {selectedStage === 'S4' && 'S4: 5–10 minute presentation using minimal visual notes.'}
                  {selectedStage === 'S5' && 'S5: Answer an unexpected follow-up question without notes.'}
                </div>
              </div>
            </div>

            {/* Recorder Controls & Timer */}
            <div className="p-6 bg-[#0B1F3A] border border-[#0B1F3A] rounded-xl flex flex-col items-center justify-center space-y-4 text-center shadow-xs">
              <div className="font-mono text-4xl font-extrabold text-[#F8F7F3] tabular-nums tracking-widest">
                {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:
                {String(recordingSeconds % 60).padStart(2, '0')}
              </div>

              {isRecording ? (
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAF3FF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                  </span>
                  <span className="text-xs font-mono text-[#EAF3FF] font-bold uppercase tracking-wider">
                    Recording Live Audio...
                  </span>
                </div>
              ) : (
                <span className="text-xs text-[#EAF3FF]/70 font-mono">
                  Microphone standby. Speak clearly into microphone.
                </span>
              )}

              <div className="flex items-center gap-3 pt-2">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#174EA6] hover:bg-[#0F3B82] text-white transition-colors shadow-xs"
                  >
                    <Mic className="w-4 h-4 text-white" />
                    Start Speech Drill
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#4F7D62] hover:bg-[#3E654E] text-white transition-colors"
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
            <div className="border-t border-[rgba(11,31,58,0.08)] pt-5 space-y-4">
              <h4 className="font-display text-sm font-bold text-[#0B1F3A]">
                Self-Evaluation Rubric (1–5 Scale)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                {(['clarity', 'pace', 'fillerWords', 'structure', 'confidence'] as const).map((key) => (
                  <div key={key} className="p-3 bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] rounded-lg space-y-1">
                    <span className="text-[#0B1F3A] capitalize block text-[11px] font-mono font-semibold">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <select
                      value={evalScores[key]}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="w-full bg-[#F1F3F5] border border-[rgba(11,31,58,0.12)] rounded px-2 py-1 text-[#0B1F3A] font-mono text-xs focus:outline-none"
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
                <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                  One Concrete Improvement (Non-Negotiable)
                </label>
                <input
                  type="text"
                  value={improvementNote}
                  onChange={(e) => setImprovementNote(e.target.value)}
                  placeholder="Record one concrete observation: clarity, pace, filler words, or structure..."
                  className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveDrill}
                  className="flex items-center gap-2 px-4 py-2 bg-[#174EA6] hover:bg-[#0F3B82] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  Log Drill to Evidence Record
                </button>
              </div>
            </div>

            {/* Historical Recordings Log */}
            <div className="border-t border-[rgba(11,31,58,0.08)] pt-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0B1F3A] font-bold block">
                Recorded Speech Samples ({speechRecordings.length})
              </span>

              <div className="space-y-2">
                {speechRecordings.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#174EA6] font-bold">{rec.stage}</span>
                        <span className="text-[#111827]/30">·</span>
                        <span className="font-semibold text-[#0B1F3A]">{rec.title}</span>
                        <span className="text-[#111827]/50 font-mono text-[11px]">({rec.durationSeconds}s)</span>
                      </div>
                      <p className="text-[#111827]/70 italic">
                        Improvement noted: "{rec.oneImprovementNote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-[11px] font-mono text-[#111827]/50">
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
          <div className="p-4 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5]">
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              09 — Teacher Method: How You Learn Each Skill
            </h3>
            <p className="text-xs text-[#111827]/80 mt-1 leading-relaxed">
              "Use the same learning loop across Python, Excel, SQL, Power BI, accounting, and business analysis. The mastery test: If you only recognize it, you have exposure. If you can reproduce it, you have a skill. If you can apply it to a new problem, you have usable capability. If you can explain why it works and when not to use it, you are developing understanding."
            </p>
          </div>

          {/* Interactive 8-Step Planner */}
          <div className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-5">
            <div>
              <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                Target Concept / Topic
              </label>
              <input
                type="text"
                value={teacherConcept}
                onChange={(e) => setTeacherConcept(e.target.value)}
                className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-3 text-sm font-semibold text-[#0B1F3A] focus:outline-none focus:border-[#174EA6]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {[
                { key: 'context', step: '1. CONTEXT', prompt: 'What problem does this concept solve?' },
                { key: 'understand', step: '2. UNDERSTAND', prompt: 'Describe the core idea in 1-2 lines' },
                { key: 'reproduce', step: '3. REPRODUCE', prompt: 'Recreated without tutorial assistance?' },
                { key: 'modify', step: '4. MODIFY', prompt: 'Changed inputs, assumptions, requirements?' },
                { key: 'apply', step: '5. APPLY', prompt: 'Applied to small finance/business dataset?' },
                { key: 'explain', step: '6. EXPLAIN', prompt: 'Explained aloud in plain English?' },
                { key: 'prove', step: '7. PROVE', prompt: 'Inspectable code/commit/workbook saved?' },
                { key: 'reflect', step: '8. REFLECT', prompt: 'What confused you? What became clear?' }
              ].map(({ key, step, prompt }) => (
                <div key={key} className="p-3.5 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F8F7F3] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#174EA6] font-bold">{step}</span>
                    <span className="text-[11px] text-[#111827]/60 font-medium">{prompt}</span>
                  </div>
                  <textarea
                    rows={2}
                    value={(loopAnswers as any)[key]}
                    onChange={(e) => setLoopAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-[#F1F3F5] border border-[rgba(11,31,58,0.08)] rounded p-2 text-[#111827] focus:outline-none focus:border-[#174EA6]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: GROWTH ARCHITECTURE (Islamic, Mental, Physical, Learning, Habits, Reflection) */}
      {activeTab === 'growth-dimensions' && (
        <section className="space-y-6">
          <div className="p-5 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-1">
            <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider font-bold block">
              Section 13 — Module Consistency Standard
            </span>
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              Disciplined Growth Protocols Across All Facets
            </h3>
            <p className="text-xs text-[#111827]/80 leading-relaxed">
              "There is no separate color palette for Islamic, Mental, or Physical. They are different dimensions of the same Winter Arc operating system. The interface remains calm, respectful, academic, and structured."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Islamic Growth */}
            <div className="p-5 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2.5">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#174EA6]" />
                <h4 className="font-display text-sm font-bold text-[#0B1F3A]">
                  Islamic Growth & Spiritual Anchors
                </h4>
              </div>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside leading-relaxed">
                <li><strong className="text-[#0B1F3A]">Fajr On Time:</strong> The foundational non-negotiable anchor before daylight.</li>
                <li><strong className="text-[#0B1F3A]">5 Daily Prayers:</strong> Scheduled pauses to realign intention and remove haste.</li>
                <li><strong className="text-[#0B1F3A]">Daily Quran:</strong> 15–20 minutes with translation and tafsir reflection.</li>
                <li><strong className="text-[#0B1F3A]">Morning/Evening Adhkar:</strong> Protective mindfulness and humility.</li>
              </ul>
              <div className="p-3 bg-[#F8F7F3] rounded-lg border border-[rgba(11,31,58,0.08)] text-[11px] text-[#0B1F3A]">
                Rule: Keep spiritual practice sincere and clean. Zero ostentation.
              </div>
            </div>

            {/* Mental Strength */}
            <div className="p-5 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2.5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#174EA6]" />
                <h4 className="font-display text-sm font-bold text-[#0B1F3A]">
                  Mental Strength & Cognitive Composure
                </h4>
              </div>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside leading-relaxed">
                <li><strong className="text-[#0B1F3A]">Zero-Scroll Protocol:</strong> No social feeds before 12:00 PM and after 9:30 PM.</li>
                <li><strong className="text-[#0B1F3A]">Deep Work Monotasking:</strong> 60–90 min single-topic focus with phone locked away.</li>
                <li><strong className="text-[#0B1F3A]">Composure Under Strain:</strong> Pause 2 seconds before answering unexpected questions.</li>
                <li><strong className="text-[#0B1F3A]">Cognitive Journaling:</strong> Document negative spirals rather than acting on them.</li>
              </ul>
              <div className="p-3 bg-[#F8F7F3] rounded-lg border border-[rgba(11,31,58,0.08)] text-[11px] text-[#0B1F3A]">
                Rule: Attention is your highest-value asset. Treat distraction as theft.
              </div>
            </div>

            {/* Physical Strength */}
            <div className="p-5 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2.5">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#174EA6]" />
                <h4 className="font-display text-sm font-bold text-[#0B1F3A]">
                  Physical Strength & Energy Management
                </h4>
              </div>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside leading-relaxed">
                <li><strong className="text-[#0B1F3A]">Structured Movement:</strong> 4–5 weekly resistance/strength or conditioning sessions.</li>
                <li><strong className="text-[#0B1F3A]">Sleep Hygiene:</strong> 7–8 hours consistent sleep window; dark, cool environment.</li>
                <li><strong className="text-[#0B1F3A]">Hydration:</strong> 2.5–3 liters water daily; no energy drink crutches.</li>
                <li><strong className="text-[#0B1F3A]">Clean Nutrition:</strong> Whole foods fuel; avoid heavy meals before deep technical work.</li>
              </ul>
              <div className="p-3 bg-[#F8F7F3] rounded-lg border border-[rgba(11,31,58,0.08)] text-[11px] text-[#0B1F3A]">
                Rule: Physical vitality supports mental capability. Do not compromise health.
              </div>
            </div>

            {/* Discipline & Habits */}
            <div className="p-5 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#174EA6]" />
                <h4 className="font-display text-sm font-bold text-[#0B1F3A]">
                  Discipline, Habits & Daily Continuity
                </h4>
              </div>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside leading-relaxed">
                <li><strong className="text-[#0B1F3A]">Minimum Viable Day:</strong> 20m Tech + 10m English + 5m Reflection when busy.</li>
                <li><strong className="text-[#0B1F3A]">No Zero-Recovery Spiral:</strong> Missing a day never justifies missing the next.</li>
                <li><strong className="text-[#0B1F3A]">One Big Outcome:</strong> Define the critical daily objective in 1 single sentence.</li>
                <li><strong className="text-[#0B1F3A]">Evidence Over Hype:</strong> Document what you actually produced, not what you intended.</li>
              </ul>
              <div className="p-3 bg-[#F8F7F3] rounded-lg border border-[rgba(11,31,58,0.08)] text-[11px] text-[#0B1F3A]">
                Standard: "0.1% means forward motion. The system compounds over 90 days."
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: FINOVAH V1 & PERSONAL BRAND */}
      {activeTab === 'finovah' && (
        <section className="space-y-6">
          <div className="p-4 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5]">
            <span className="text-[11px] font-mono text-[#174EA6] uppercase tracking-wider block font-bold">
              13 — FINOVAH Track & Scope Discipline
            </span>
            <h3 className="font-display text-base font-bold text-[#0B1F3A] mt-1">
              Student-Built Finance Platform Architecture
            </h3>
            <p className="text-xs text-[#111827]/80 mt-1 leading-relaxed">
              "FINOVAH is treated as a serious student-built project, not as a distraction from the analytics journey. Scope discipline: V1 first. Do not add AI chat, payments, social, complex auth, ads, crypto, or gamification merely because they sound impressive."
            </p>
          </div>

          <div className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-6 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                  V1 Core Concept
                </label>
                <input
                  type="text"
                  value={finovahSpec.v1Concept}
                  onChange={(e) => onUpdateFinovahSpec({ v1Concept: e.target.value })}
                  className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                    Target Users
                  </label>
                  <input
                    type="text"
                    value={finovahSpec.coreUsers}
                    onChange={(e) => onUpdateFinovahSpec({ coreUsers: e.target.value })}
                    className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                    Deliverables Status
                  </label>
                  <input
                    type="text"
                    value={finovahSpec.deliverablesStatus}
                    onChange={(e) => onUpdateFinovahSpec({ deliverablesStatus: e.target.value })}
                    className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={finovahSpec.problemStatement}
                  onChange={(e) => onUpdateFinovahSpec({ problemStatement: e.target.value })}
                  className="w-full bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#0B1F3A] uppercase tracking-wider block mb-1 font-semibold">
                  V1 Case Study Document (Draft / Notes)
                </label>
                <textarea
                  rows={6}
                  value={finovahSpec.caseStudyDoc}
                  onChange={(e) => onUpdateFinovahSpec({ caseStudyDoc: e.target.value })}
                  className="w-full font-mono bg-[#F8F7F3] border border-[rgba(11,31,58,0.12)] rounded-lg p-3 text-xs text-[#111827] focus:outline-none focus:border-[#174EA6] leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 12 Personal Branding Quality Filter */}
          <div className="rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] p-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#174EA6] font-bold block">
              12 — Learning in Public Content Quality Filter
            </span>
            <p className="text-xs text-[#111827]/70">
              Before posting anything on LinkedIn or GitHub, verify all 6 conditions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs">
              {[
                '1. Did I actually do the work?',
                '2. Did I learn something specific?',
                '3. Can I show proof?',
                '4. Did my understanding change?',
                '5. Would another learner gain value?',
                '6. Am I claiming more than evidence supports?'
              ].map((q, idx) => (
                <div key={idx} className="p-3 rounded bg-[#F8F7F3] border border-[rgba(11,31,58,0.08)] text-[#0B1F3A] font-medium">
                  {q}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: DAILY PILLAR OPERATING TEMPLATES */}
      {activeTab === 'templates' && (
        <section className="space-y-6">
          <div className="p-4 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5]">
            <h3 className="font-display text-base font-bold text-[#0B1F3A]">
              08 — Day-by-Day Pillar Operating Templates
            </h3>
            <p className="text-xs text-[#111827]/80 mt-1">
              "The weekly roadmap tells you WHAT to work on; these templates tell you HOW to run the day."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <h4 className="font-display text-sm font-bold text-[#174EA6]">
                Technical Day (P4)
              </h4>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside">
                <li>5 min: define one technical outcome.</li>
                <li>15–25 min: learn/review only what is necessary.</li>
                <li>35–60 min: reproduce from memory.</li>
                <li>20–40 min: modify/apply to a new example.</li>
                <li>5–10 min: explain aloud.</li>
                <li>5 min: capture proof/error log.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <h4 className="font-display text-sm font-bold text-[#174EA6]">
                Communication Day (P2)
              </h4>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside">
                <li>5 min: choose one topic.</li>
                <li>5 min: create 3–5 bullet points, not a script.</li>
                <li>2–5 min: speak without reading.</li>
                <li>Listen back once.</li>
                <li>Record one improvement: clarity, pace, filler words, structure, or confidence.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <h4 className="font-display text-sm font-bold text-[#174EA6]">
                Accounting / Business Day (P3)
              </h4>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside">
                <li>Learn one accounting/business concept.</li>
                <li>Connect it to a real business decision.</li>
                <li>Create one concrete financial example.</li>
                <li>Explain it in plain English.</li>
                <li>Write one question you still cannot answer.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-2">
              <h4 className="font-display text-sm font-bold text-[#174EA6]">
                Project Day (P5 / P4)
              </h4>
              <ul className="space-y-1.5 text-[#111827]/80 list-disc list-inside">
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
