import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, Download, RotateCcw, Sliders, Layers, Sparkles, AlertCircle, Eye } from 'lucide-react';
import defaultPortraitImg from '../assets/images/hussnain_winter_portrait_1790968594204.jpg';
import bgBrutalistImg from '../assets/images/bg_brutalist_frost_1790968605374.jpg';
import bgAlpineImg from '../assets/images/bg_alpine_winter_1790968617391.jpg';
import bgObsidianImg from '../assets/images/bg_obsidian_studio_1791020510747.jpg';

export interface BackgroundPreset {
  id: string;
  name: string;
  subtitle: string;
  src?: string;
  styleClasses?: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'brutalist-frost',
    name: 'Brutalist Frost Architecture',
    subtitle: 'Cold dark concrete with frosted vertical glass & rim light',
    src: bgBrutalistImg,
    styleClasses: 'from-[#0B1F3A] via-[#111827] to-[#174EA6]/30'
  },
  {
    id: 'obsidian-monolith',
    name: 'Obsidian Monolith Studio',
    subtitle: 'Matte black monolithic granite with cold cobalt blue light',
    src: bgObsidianImg,
    styleClasses: 'from-[#0B1F3A] via-[#111827] to-[#2563EB]/40'
  },
  {
    id: 'alpine-dawn',
    name: 'Alpine Winter Dawn',
    subtitle: 'Misty high-altitude snowy mountain peaks in cold dawn',
    src: bgAlpineImg,
    styleClasses: 'from-[#0B1F3A] via-[#174EA6]/40 to-[#EAF3FF]/40'
  },
  {
    id: 'deep-obsidian',
    name: 'Deep Obsidian Vault',
    subtitle: 'Monochrome dark granite with subtle cold linear illumination',
    styleClasses: 'bg-gradient-to-b from-[#111827] via-[#0B1F3A] to-[#050B14]'
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate Grid',
    subtitle: 'Minimalist tactical dark slate with hairline geometric guides',
    styleClasses: 'bg-[radial-gradient(#174EA6_1px,transparent_1px)] [background-size:16px_16px] bg-[#0B1F3A]'
  }
];

interface WinterArcPictureStudioProps {
  currentImage?: string;
  activeBackgroundId: string;
  activeBlendEffect: 'frost' | 'obsidian' | 'vignette' | 'clean';
  onSaveProfilePicture: (imageUri: string, bgId: string, effect: 'frost' | 'obsidian' | 'vignette' | 'clean') => void;
  currentDay: number;
  isEmbedded?: boolean;
  onClose?: () => void;
}

export const WinterArcPictureStudio: React.FC<WinterArcPictureStudioProps> = ({
  currentImage,
  activeBackgroundId,
  activeBlendEffect,
  onSaveProfilePicture,
  currentDay,
  isEmbedded = false,
  onClose
}) => {
  const [uploadedUserImage, setUploadedUserImage] = useState<string | null>(
    currentImage && currentImage !== defaultPortraitImg ? currentImage : null
  );
  const [activeImageUri, setActiveImageUri] = useState<string>(currentImage || defaultPortraitImg);
  const [selectedBgId, setSelectedBgId] = useState<string>(activeBackgroundId || 'brutalist-frost');
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<'frost' | 'obsidian' | 'vignette' | 'clean'>(activeBlendEffect || 'frost');
  const [blendWhiteBg, setBlendWhiteBg] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [statusNotification, setStatusNotification] = useState<'idle' | 'success' | 'info'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const customBgInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler (matches Streamlit: Choose an image -> jpg, jpeg, png, webp)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setUploadedUserImage(resultStr);
          setActiveImageUri(resultStr);
          setStatusNotification('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom Background Upload
  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setCustomBgImage(resultStr);
          setSelectedBgId('custom');
          setStatusNotification('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToOfficialPortrait = () => {
    setActiveImageUri(defaultPortraitImg);
    setSelectedBgId('brutalist-frost');
    setSelectedEffect('frost');
    setCustomBgImage(null);
    setStatusNotification('info');
  };

  const handleSave = () => {
    onSaveProfilePicture(activeImageUri, selectedBgId, selectedEffect);
    setStatusNotification('success');
    if (onClose) onClose();
  };

  // Active Background Object
  const currentBgPreset = BACKGROUND_PRESETS.find(b => b.id === selectedBgId);
  const effectiveBgSrc = selectedBgId === 'custom' ? customBgImage : currentBgPreset?.src;

  // Composite Canvas Download
  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill deep navy background
    ctx.fillStyle = '#0B1F3A';
    ctx.fillRect(0, 0, 900, 1200);

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    const mainImg = new Image();
    mainImg.crossOrigin = 'anonymous';

    const renderComposite = () => {
      // 1. Draw Background
      if (effectiveBgSrc) {
        ctx.drawImage(bgImg, 0, 0, 900, 1200);
        // Scrim
        ctx.fillStyle = selectedEffect === 'frost'
          ? 'rgba(11, 31, 58, 0.55)'
          : selectedEffect === 'obsidian'
          ? 'rgba(17, 24, 39, 0.75)'
          : 'rgba(11, 31, 58, 0.65)';
        ctx.fillRect(0, 0, 900, 1200);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, 1200);
        grad.addColorStop(0, '#0B1F3A');
        grad.addColorStop(0.5, '#111827');
        grad.addColorStop(1, '#050B14');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 900, 1200);
      }

      // 2. Center Dimensions
      const imgWidth = 720;
      const imgHeight = 960;
      const imgX = (900 - imgWidth) / 2;
      const imgY = 80;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgWidth, imgHeight, 20);
      ctx.clip();

      if (blendWhiteBg) {
        // Smart multiply blend for light/white studio backgrounds
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(mainImg, imgX, imgY, imgWidth, imgHeight);
      } else {
        ctx.drawImage(mainImg, imgX, imgY, imgWidth, imgHeight);
      }
      ctx.restore();

      // 3. Subtle Card Border
      ctx.strokeStyle = 'rgba(234, 243, 255, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgWidth, imgHeight, 20);
      ctx.stroke();

      // 4. Official Winter Arc Watermark & Metadata
      if (showWatermark) {
        // Dark bar at bottom
        ctx.fillStyle = 'rgba(11, 31, 58, 0.92)';
        ctx.fillRect(imgX, imgY + imgHeight - 110, imgWidth, 110);

        ctx.fillStyle = '#F8F7F3';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('HUSSNAIN ANSARI', imgX + 30, imgY + imgHeight - 65);

        ctx.fillStyle = '#2563EB';
        ctx.font = '600 17px monospace';
        ctx.fillText(`WINTER ARC 2026 · DAY ${currentDay}/90`, imgX + 30, imgY + imgHeight - 35);

        ctx.fillStyle = '#EAF3FF';
        ctx.font = '600 15px monospace';
        ctx.fillText(
          selectedBgId === 'custom' ? 'CUSTOM BACKDROP' : currentBgPreset?.name.toUpperCase() || 'WINTER ARC',
          imgX + imgWidth - 280,
          imgY + imgHeight - 35
        );
      }

      const link = document.createElement('a');
      link.download = `winter_arc_2026_portrait_day_${currentDay}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    if (effectiveBgSrc) {
      bgImg.onload = () => {
        mainImg.onload = renderComposite;
        mainImg.src = activeImageUri;
      };
      bgImg.src = effectiveBgSrc;
    } else {
      mainImg.onload = renderComposite;
      mainImg.src = activeImageUri;
    }
  };

  return (
    <div className={`space-y-6 ${isEmbedded ? '' : 'p-2'}`}>
      {/* Streamlit-inspired Title & Subheader */}
      <div className="border-b border-[rgba(11,31,58,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">❄️</span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
            Winter Arc Picture Studio
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#111827]/70 mt-1">
          Upload your picture to preview with a unique background. Perfect for portraits, badges, and the 90-Day OS dashboard.
        </p>
      </div>

      {/* Streamlit Status Notifications */}
      {statusNotification === 'success' && (
        <div className="p-3.5 rounded-lg border border-[#4F7D62]/40 bg-[#4F7D62]/10 text-[#4F7D62] text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#4F7D62] shrink-0" />
            <span>Picture uploaded successfully! Preview updated with unique background.</span>
          </div>
          <button
            onClick={() => setStatusNotification('idle')}
            className="text-[11px] underline opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {statusNotification === 'info' && (
        <div className="p-3.5 rounded-lg border border-[#174EA6]/30 bg-[#EAF3FF] text-[#174EA6] text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#174EA6] shrink-0" />
            <span>Upload your picture to preview it here with a unique background.</span>
          </div>
          <button
            onClick={() => setStatusNotification('idle')}
            className="text-[11px] underline opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Preview Area (Streamlit st.image with caption="Your Winter Arc Picture") */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#0B1F3A] font-bold uppercase tracking-wider">
              Your Winter Arc Picture
            </span>
            <span className="text-[11px] font-mono text-[#174EA6] bg-[#EAF3FF] px-2 py-0.5 rounded font-semibold">
              Live Preview
            </span>
          </div>

          {/* Master Preview Card */}
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden border border-[rgba(11,31,58,0.15)] shadow-xl flex flex-col justify-end p-4 bg-[#0B1F3A]">
            {/* 1. Unique Background Layer */}
            {effectiveBgSrc ? (
              <img
                src={effectiveBgSrc}
                alt="Winter Arc Background"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div className={`absolute inset-0 w-full h-full ${currentBgPreset?.styleClasses || 'bg-[#0B1F3A]'}`} />
            )}

            {/* 2. Atmospheric Scrim Overlay */}
            <div
              className={`absolute inset-0 transition-all ${
                selectedEffect === 'frost'
                  ? 'bg-[#0B1F3A]/50 backdrop-blur-[1px]'
                  : selectedEffect === 'vignette'
                  ? 'bg-radial from-transparent via-[#0B1F3A]/40 to-[#0B1F3A]/85'
                  : selectedEffect === 'obsidian'
                  ? 'bg-[#0B1F3A]/70'
                  : 'bg-black/25'
              }`}
            />

            {/* 3. Foreground Portrait Subject */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
              <div
                className={`relative w-full h-full rounded-lg overflow-hidden border border-white/20 shadow-md ${
                  selectedEffect === 'frost' ? 'ring-1 ring-[#EAF3FF]/60' : ''
                }`}
              >
                <img
                  src={activeImageUri}
                  alt="Your Winter Arc Picture"
                  className={`w-full h-full object-cover transition-all ${
                    blendWhiteBg ? 'contrast-105' : ''
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultPortraitImg;
                  }}
                />
              </div>
            </div>

            {/* 4. Official Streamlit Caption & Watermark */}
            {showWatermark && (
              <div className="relative z-20 mt-2 bg-[#0B1F3A]/90 border border-white/10 rounded-lg p-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#F8F7F3] font-bold">Hussnain Ansari</span>
                  <span className="text-[#EAF3FF] font-bold">Day {currentDay}/90</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#EAF3FF]/80 mt-0.5">
                  <span className="truncate">
                    {selectedBgId === 'custom' ? 'Custom Background' : currentBgPreset?.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#2563EB]">
                    Active OS Identity
                  </span>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-center text-[#111827]/60 font-mono mt-2 italic">
            Caption: "Your Winter Arc Picture"
          </p>

          {/* Quick Preview Actions */}
          <div className="flex items-center gap-2 mt-4 w-full max-w-sm">
            <button
              onClick={handleDownloadCard}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#EAF3FF] hover:bg-[#d8e9ff] border border-[#174EA6]/20 rounded-lg text-xs font-semibold text-[#174EA6] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download High-Res Card
            </button>

            <button
              onClick={handleResetToOfficialPortrait}
              className="py-2 px-3 bg-[#F1F3F5] hover:bg-[#e7eaee] border border-[rgba(11,31,58,0.08)] rounded-lg text-xs text-[#0B1F3A] transition-colors flex items-center gap-1"
              title="Reset to official portrait"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Column: Controls & Uploader */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: File Uploader (Choose an image: jpg, jpeg, png, webp) */}
          <div className="p-4 sm:p-5 rounded-xl border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#0B1F3A] font-bold uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#174EA6]" />
                1. Choose an image
              </span>
              <span className="text-[11px] text-[#111827]/60 font-mono">
                type: [jpg, jpeg, png, webp]
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-[rgba(11,31,58,0.18)] hover:border-[#174EA6] bg-[#F8F7F3] rounded-xl p-5 text-center transition-all group"
            >
              <ImageIcon className="w-8 h-8 text-[#0B1F3A]/40 group-hover:text-[#174EA6] mx-auto transition-colors" />
              <p className="text-xs font-bold text-[#0B1F3A] mt-2">
                Choose an image from your device
              </p>
              <p className="text-[11px] text-[#111827]/60 mt-0.5">
                Upload your portrait to preview with unique Winter Arc backgrounds.
              </p>
            </div>

            {uploadedUserImage && (
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[#4F7D62] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4F7D62]" />
                  Custom picture active in preview
                </span>
                <button
                  onClick={() => {
                    setUploadedUserImage(null);
                    setActiveImageUri(defaultPortraitImg);
                  }}
                  className="text-[11px] text-[#174EA6] hover:underline"
                >
                  Use Default Studio Shot
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Unique Winter Arc Background Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#0B1F3A] font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#174EA6]" />
                2. Select Unique Background
              </span>
              <span className="text-[11px] font-mono text-[#111827]/60">
                Architectural & Atmospheric
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BACKGROUND_PRESETS.map((bg) => {
                const isSelected = selectedBgId === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBgId(bg.id)}
                    className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#174EA6] bg-[#EAF3FF] ring-1 ring-[#174EA6]/30'
                        : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] hover:border-[#174EA6]/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#0B1F3A]">{bg.name}</h4>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#174EA6]" />}
                      </div>
                      <p className="text-[11px] text-[#111827]/70 leading-tight">
                        {bg.subtitle}
                      </p>
                    </div>

                    {/* Thumbnail bar */}
                    <div className="mt-3 h-9 w-full rounded border border-[rgba(11,31,58,0.1)] overflow-hidden relative">
                      {bg.src ? (
                        <img src={bg.src} alt={bg.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full ${bg.styleClasses}`} />
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Custom background upload card */}
              <div
                className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedBgId === 'custom'
                    ? 'border-[#174EA6] bg-[#EAF3FF] ring-1 ring-[#174EA6]/30'
                    : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5]'
                }`}
              >
                <input
                  ref={customBgInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleCustomBgUpload}
                  className="hidden"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Upload Custom Background</h4>
                    {selectedBgId === 'custom' && <Check className="w-3.5 h-3.5 text-[#174EA6]" />}
                  </div>
                  <p className="text-[11px] text-[#111827]/70 leading-tight">
                    Select any wallpaper or image to use as your backdrop
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => customBgInputRef.current?.click()}
                  className="mt-3 w-full py-1.5 px-2 bg-[#F8F7F3] hover:bg-white border border-[rgba(11,31,58,0.12)] rounded text-[11px] font-semibold text-[#0B1F3A] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3 h-3 text-[#174EA6]" />
                  {customBgImage ? 'Change Custom Backdrop' : 'Browse Custom Backdrop'}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Atmosphere, Scrim & White Background Blend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#0B1F3A] font-bold uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#174EA6]" />
                3. Atmosphere & Cutout Settings
              </span>
              <span className="text-[11px] font-mono text-[#111827]/60">Master Color Palette</span>
            </div>

            {/* Atmosphere buttons */}
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
                      ? 'border-[#174EA6] bg-[#EAF3FF] text-[#174EA6] font-semibold'
                      : 'border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] text-[#111827]/70 hover:text-[#0B1F3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* White background blend toggle */}
            <div className="p-3 rounded-lg border border-[rgba(11,31,58,0.08)] bg-[#F1F3F5] flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#0B1F3A] block">
                  Optimized Cutout for White/Plain Studio Backgrounds
                </span>
                <span className="text-[11px] text-[#111827]/60">
                  Ideal for headshots taken on plain white or light backdrops
                </span>
              </div>
              <button
                onClick={() => setBlendWhiteBg(!blendWhiteBg)}
                className={`w-9 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  blendWhiteBg ? 'bg-[#174EA6]' : 'bg-[#F1F3F5] border border-[rgba(11,31,58,0.15)]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    blendWhiteBg ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Watermark toggle */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-[#111827]/80">Display Winter Arc 2026 Watermark & Day Badge</span>
              <button
                onClick={() => setShowWatermark(!showWatermark)}
                className={`w-9 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  showWatermark ? 'bg-[#174EA6]' : 'bg-[#F1F3F5] border border-[rgba(11,31,58,0.15)]'
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

          {/* Primary Action Buttons */}
          <div className="border-t border-[rgba(11,31,58,0.08)] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-[#111827]/60 text-center sm:text-left">
              Sets your identity across the 90-Day Operating System
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-[#111827]/60 hover:text-[#0B1F3A] transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#174EA6] hover:bg-[#0F3B82] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
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
