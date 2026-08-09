import React from 'react';
import { X } from 'lucide-react';
import { Language, GalleryItem } from '../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  lang: Language;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, lang }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 font-bengali">
      <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/50">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full transition-colors border border-white/20"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-video w-full bg-black flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={lang === 'bn' ? item.titleBn : item.titleEn}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4 sm:p-5 bg-gradient-to-t from-slate-950 to-slate-900 text-white">
          <h3 className="text-base sm:text-lg font-bold text-[#D4AF37]">
            {lang === 'bn' ? item.titleBn : item.titleEn}
          </h3>
          {(item.captionBn || item.captionEn) && (
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {lang === 'bn' ? item.captionBn : item.captionEn}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
