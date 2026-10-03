import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, Download, RotateCcw, X, Shield, Sliders } from 'lucide-react';
import defaultPortraitImg from '../assets/images/hussnain_winter_portrait_1790968594204.jpg';
import bgBrutalistImg from '../assets/images/bg_brutalist_frost_1790968605374.jpg';
import bgAlpineImg from '../assets/images/bg_alpine_winter_1790968617391.jpg';

interface PictureStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  activeBackgroundId: string;
  activeBlendEffect: 'frost' | 'obsidian' | 'vignette' | 'clean';
  onSaveProfilePicture: (imageUri: string, bgId: string, effect: 'frost' | 'obsidian' | 'vignette' | 'clean') => void;
  currentDay: number;
}

export const BACKGROUND_PRESETS = [
  {
    id: 'brutalist-frost',
    name: 'Brutalist Frost Architecture',
    subtitle: 'Cold dark concrete with frosted vertical glass & rim light',
    src: bgBrutalistImg,
    styleClasses: 'from-neutral-950 via-slate-900/80 to-sky-950/40'
  },
  {
    id: 'alpine-dawn',
    name: 'Alpine Winter Dawn',
    subtitle: 'Misty high-altitude snowy mountain peaks in cold dawn',
    src: bgAlpineImg,
    styleClasses: 'from-neutral-950 via-sky-950/70 to-indigo-950/50'
  },
  {
    id: 'deep-obsidian',
    name: 'Deep Obsidian Vault',
    subtitle: 'Monochrome dark granite with subtle cold linear illumination',
    src: '',
    styleClasses: 'bg-gradient-to-b from-neutral-900 via-neutral-950 to-black'
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate Grid',
    subtitle: 'Minimalist tactical dark slate with hairline geometric guides',
    src: '',
    styleClasses: 'bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] bg-neutral-950'
  }
];

export const PictureStudioModal: React.FC<PictureStudioModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  activeBackgroundId,
  activeBlendEffect,
  onSaveProfilePicture,
  currentDay
}) => {
  const [previewImage, setPreviewImage] = useState<string>(currentImage || defaultPortraitImg);
  const [selectedBgId, setSelectedBgId] = useState<string>(activeBackgroundId || 'brutalist-frost');
  const [selectedEffect, setSelectedEffect] = useState<'frost' | 'obsidian' | 'vignette' | 'clean'>(activeBlendEffect || 'frost');
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 4000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefault = () => {
    setPreviewImage(defaultPortraitImg);
    setSelectedBgId('brutalist-frost');
    setSelectedEffect('frost');
  };

  const handleApply = () => {
    onSaveProfilePicture(previewImage, selectedBgId, selectedEffect);
    onClose();
  };

  const selectedBg = BACKGROUND_PRESETS.find(b => b.id === selectedBgId) || BACKGROUND_PRESETS[0];

  // Download high-resolution composite card using Canvas API
  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 900, 1200);

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    const mainImg = new Image();
    mainImg.crossOrigin = 'anonymous';

    const renderComposite = () => {
      // Draw background if present
      if (selectedBg.src) {
        ctx.drawImage(bgImg, 0, 0, 900, 1200);
        // Add dark frost scrim
        ctx.fillStyle = selectedEffect === 'frost' ? 'rgba(10, 15, 25, 0.65)' : 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, 900, 1200);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, 1200);
        grad.addColorStop(0, '#171717');
        grad.addColorStop(0.5, '#0a0a0a');
        grad.addColorStop(1, '#050505');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 900, 1200);
      }

      // Draw portrait in center
      const imgWidth = 700;
      const imgHeight = 933;
      const imgX = (900 - imgWidth) / 2;
      const imgY = 100;

      // Draw subtle shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;

      ctx.save();
      // Rounded rect clip
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgWidth, imgHeight, 24);
      ctx.clip();
      ctx.drawImage(mainImg, imgX, imgY, imgWidth, imgHeight);
      ctx.restore();

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Draw Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgWidth, imgHeight, 24);
      ctx.stroke();

      // Draw Watermark / Details
      if (showWatermark) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('HUSSNAIN ANSARI', 100, 1090);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '600 18px monospace';
        ctx.fillText(`WINTER ARC 2026 · DAY ${currentDay}/90`, 100, 1125);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '16px sans-serif';
        ctx.fillText('Accounting & Finance → Business Analytics → Building', 100, 1155);
      }

      const link = document.createElement('a');
      link.download = `winter_arc_portrait_day_${currentDay}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    if (selectedBg.src) {
      bgImg.onload = () => {
        mainImg.onload = renderComposite;
        mainImg.src = previewImage;
      };
      bgImg.src = selectedBg.src;
    } else {
      mainImg.onload = renderComposite;
      mainImg.src = previewImage;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-neutral-100 shadow-2xl space-y-6 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
              ❄️ Winter Arc Picture Studio
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Upload Your Picture & Choose Unique Background
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Upload your photo, apply an atmospheric Winter Arc architectural backdrop, and set it as your OS identity.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadSuccess && (
          <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Picture uploaded successfully! Preview updated with unique background.
          </div>
        )}

        {/* Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Composite Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2 self-start">
              Live Preview
            </span>

            {/* Composite Container with Unique Background */}
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-xl overflow-hidden border border-neutral-700/80 shadow-2xl flex flex-col justify-end p-4">
              {/* Background Layer */}
              {selectedBg.src ? (
                <img
                  src={selectedBg.src}
                  alt={selectedBg.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 w-full h-full ${selectedBg.styleClasses}`} />
              )}

              {/* Scrim Overlay */}
              <div
                className={`absolute inset-0 ${
                  selectedEffect === 'frost'
                    ? 'bg-neutral-950/60 backdrop-blur-[2px]'
                    : selectedEffect === 'vignette'
                    ? 'bg-radial from-transparent via-black/40 to-black/90'
                    : selectedEffect === 'obsidian'
                    ? 'bg-neutral-950/75'
                    : 'bg-black/30'
                }`}
              />

              {/* Foreground Portrait */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                <div className={`relative w-full h-full rounded-lg overflow-hidden border border-neutral-600/40 shadow-xl ${
                  selectedEffect === 'frost' ? 'ring-1 ring-sky-400/40' : ''
                }`}>
                  <img
                    src={previewImage}
                    alt="Preview Portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultPortraitImg;
                    }}
                  />
                </div>
              </div>

              {/* Optional Watermark Badge */}
              {showWatermark && (
                <div className="relative z-20 mt-2 bg-neutral-950/90 border border-neutral-800 rounded-lg p-2.5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-white font-bold">Hussnain Ansari</span>
                    <span className="text-sky-400 font-bold">Day {currentDay}/90</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block truncate mt-0.5">
                    Winter Arc 2026 · {selectedBg.name}
                  </span>
                </div>
              )}
            </div>

            {/* Quick action buttons below preview */}
            <div className="flex items-center gap-2 mt-4 w-full max-w-xs">
              <button
                onClick={handleDownloadCard}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-semibold text-neutral-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Card
              </button>

              <button
                onClick={handleResetToDefault}
                className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs text-neutral-400 hover:text-white transition-colors"
                title="Reset to official portrait"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Controls & Presets */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Upload Button (Streamlit equivalent) */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-sky-400" />
                  1. Choose Your Picture
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">JPG, PNG, WEBP</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-neutral-700 hover:border-neutral-500 bg-neutral-950/80 rounded-xl p-5 text-center transition-all group"
              >
                <ImageIcon className="w-8 h-8 text-neutral-500 group-hover:text-sky-400 mx-auto transition-colors" />
                <p className="text-xs text-neutral-300 font-semibold mt-2">
                  Click to browse from your device
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Select your portrait picture to preview it here with a unique background.
                </p>
              </div>
            </div>

            {/* 2. Unique Winter Arc Backgrounds */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">
                2. Select Unique Background
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BACKGROUND_PRESETS.map((bg) => {
                  const isSelected = selectedBgId === bg.id;
                  return (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedBgId(bg.id)}
                      className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'border-sky-500 bg-neutral-900 ring-1 ring-sky-500/50'
                          : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{bg.name}</h4>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-tight">
                          {bg.subtitle}
                        </p>
                      </div>

                      {/* Small thumbnail bar */}
                      <div className="mt-3 h-8 w-full rounded border border-neutral-800 overflow-hidden relative">
                        {bg.src ? (
                          <img src={bg.src} alt={bg.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full ${bg.styleClasses}`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Atmospheric Effect Options */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">
                3. Atmospheric Blend Effect
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {(
                  [
                    ['frost', 'Frost Glow'],
                    ['obsidian', 'Obsidian Low-Key'],
                    ['vignette', 'Dark Vignette'],
                    ['clean', 'Clean Minimal']
                  ] as const
                ).map(([effectKey, label]) => (
                  <button
                    key={effectKey}
                    onClick={() => setSelectedEffect(effectKey)}
                    className={`py-2 px-2.5 rounded-lg border text-center font-medium transition-colors ${
                      selectedEffect === effectKey
                        ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-semibold'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Watermark toggle */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Display Winter Arc 2026 Watermark Badge</span>
                <button
                  onClick={() => setShowWatermark(!showWatermark)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                    showWatermark ? 'bg-sky-500' : 'bg-neutral-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      showWatermark ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-neutral-800 pt-5 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-5 py-2 bg-white text-neutral-950 hover:bg-neutral-200 font-bold rounded-lg text-xs transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Set as Active Profile Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
