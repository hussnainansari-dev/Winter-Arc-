import React from 'react';
import { X } from 'lucide-react';
import { WinterArcPictureStudio } from './WinterArcPictureStudio';

interface PictureStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  activeBackgroundId: string;
  activeBlendEffect: 'frost' | 'obsidian' | 'vignette' | 'clean';
  onSaveProfilePicture: (imageUri: string, bgId: string, effect: 'frost' | 'obsidian' | 'vignette' | 'clean') => void;
  currentDay: number;
}

export const PictureStudioModal: React.FC<PictureStudioModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  activeBackgroundId,
  activeBlendEffect,
  onSaveProfilePicture,
  currentDay
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="picture-studio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0B1F3A]/75 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl rounded-2xl border border-[rgba(11,31,58,0.15)] bg-[#F8F7F3] p-5 sm:p-8 text-[#111827] shadow-2xl space-y-6 my-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Close Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <button
            onClick={onClose}
            aria-label="Close Picture Studio"
            className="p-2 text-[#0B1F3A]/70 hover:text-[#0B1F3A] bg-[#F1F3F5] hover:bg-[#e6e9ec] border border-[rgba(11,31,58,0.1)] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#174EA6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Unified Studio */}
        <WinterArcPictureStudio
          currentImage={currentImage}
          activeBackgroundId={activeBackgroundId}
          activeBlendEffect={activeBlendEffect}
          onSaveProfilePicture={onSaveProfilePicture}
          currentDay={currentDay}
          isEmbedded={false}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
