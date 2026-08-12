import React from 'react';
import { X, Phone, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { Language, BookingInquiry } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  prefilledService?: string;
  prefilledPackageTitle?: string;
  onSaveInquiry?: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  prefilledPackageTitle = '',
}) => {
  if (!isOpen) return null;

  const isBn = lang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 font-bengali">
      <div className="bg-[#02180D] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-[#D4AF37]/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0D472B] via-[#053B21] to-[#02180D] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-emerald-950 flex items-center justify-center text-xl font-bold shadow-md shrink-0">
              🕌
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-sans tracking-tight">
                {isBn ? 'সরাসরি যোগাযোগ ও বুকিং তথ্য' : 'Direct Booking & Contact Info'}
              </h3>
              <p className="text-xs text-[#D4AF37] font-semibold">
                {isBn ? 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস' : 'World Heritage Tours & Travels'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-emerald-800/60 text-emerald-100 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-white">
          
          {/* Selected Package Banner (if clicked from a package) */}
          {prefilledPackageTitle && (
            <div className="bg-[#053B21]/90 border border-[#D4AF37]/50 p-3.5 rounded-2xl flex items-start gap-3 shadow-md">
              <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[#D4AF37] block">
                  {isBn ? 'আগ্রহী প্যাকেজ / সেবা:' : 'Selected Package / Service:'}
                </span>
                <span className="text-white font-bold leading-snug">{prefilledPackageTitle}</span>
              </div>
            </div>
          )}

          {/* Main Hotline & Contact Card (4th Image Design) */}
          <div className="bg-gradient-to-br from-[#052917] to-[#02180D] rounded-2xl border border-emerald-800/90 p-5 sm:p-6 shadow-xl relative overflow-hidden">
            
            {/* 24/7 Hotline Section */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-950/50 shrink-0">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <span className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider block">
                  {isBn ? 'হটলাইন সার্বক্ষণিক' : '24/7 Hotline'}
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <a
                    href="tel:01627737741"
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider hover:text-[#D4AF37] transition-colors font-sans"
                  >
                    01627737741
                  </a>
                  <span className="text-xs sm:text-sm font-bold text-[#D4AF37] font-bengali">
                    ({isBn ? 'হোয়াটসঅ্যাপ & ইমো' : 'WhatsApp & Imo'})
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-emerald-800/80 my-4" />

            {/* Alternative Contact */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm leading-relaxed">
                <strong className="text-emerald-300 font-bold">{isBn ? 'বিকল্প যোগাযোগ:' : 'Alt Phone:'}</strong>{' '}
                <a href="tel:01785970008" className="hover:text-[#D4AF37] transition-colors font-bold font-sans underline text-white">
                  01785970008-9
                </a>
                ,{' '}
                <a href="tel:01920825145" className="hover:text-[#D4AF37] transition-colors font-bold font-sans underline text-white">
                  01920825145
                </a>
              </p>
            </div>

            {/* Office Address */}
            <div className="mt-3.5 pt-3 border-t border-emerald-900/60 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                {isBn 
                  ? 'পশ্চিম পান্থপথ জামে-মসজিদের বিপরীত পাশে, ৪৩-আর/৮, ইন্দিরা রোড, ঢাকা-১২১৫, বাংলাদেশ।'
                  : 'Opposite West Panthapath Jame Mosque, 43-R/8, Indira Road, Dhaka-1215, Bangladesh.'
                }
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href="https://wa.me/8801627737741"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-emerald-400/30 active:scale-98"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে মেসেজ দিন' : 'WhatsApp Message'}</span>
            </a>

            <a
              href="tel:01627737741"
              className="bg-gradient-to-r from-[#D4AF37] to-[#B89628] hover:from-[#E5C148] hover:to-[#D4AF37] text-emerald-950 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-yellow-200/40 active:scale-98"
            >
              <Phone className="w-5 h-5 text-emerald-950" />
              <span>{isBn ? 'সরাসরি কল করুন' : 'Call Directly'}</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 py-2.5 rounded-xl text-xs font-bold transition-all border border-emerald-800/60"
          >
            {isBn ? 'পপআপ বন্ধ করুন' : 'Close Window'}
          </button>

        </div>
      </div>
    </div>
  );
};
