import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Language, AgencyInfo } from '../types';

interface FloatingActionsProps {
  lang: Language;
  agencyInfo: AgencyInfo;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ lang, agencyInfo }) => {
  const whatsappUrl = `https://wa.me/${agencyInfo.whatsappNumber}?text=${encodeURIComponent(
    lang === 'bn' 
      ? 'আসসালামু আলাইকুম, ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস এর সেবা সম্পর্কে জানতে চাই।'
      : 'Assalamu Alaikum, I would like to inquire about World Heritage Tours & Travels packages.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 font-bengali">
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white group"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          {lang === 'bn' ? 'হোয়াটসঅ্যাপে মেসেজ দিন' : 'Chat on WhatsApp'}
        </span>
      </a>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${agencyInfo.hotline}`}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-[#0D472B] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-[#D4AF37] group"
        title="Call Hotline"
        aria-label="Call Hotline"
      >
        <Phone className="w-5 h-5 text-[#D4AF37]" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          {lang === 'bn' ? `কল করুন: ${agencyInfo.hotline}` : `Call: ${agencyInfo.hotline}`}
        </span>
      </a>
    </div>
  );
};
