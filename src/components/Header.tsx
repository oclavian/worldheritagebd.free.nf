import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  Plane, 
  Compass, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Language, PageId, AgencyInfo } from '../types';
import { getTranslation } from '../data/translations';
import { Logo } from './Logo';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  agencyInfo: AgencyInfo;
  onOpenBookingModal: (service?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  activePage,
  onNavigate,
  agencyInfo,
  onOpenBookingModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; labelKey: keyof typeof import('../data/translations').translations['bn'] }[] = [
    { id: 'home', labelKey: 'navHome' },
    { id: 'umrah', labelKey: 'navUmrah' },
    { id: 'hajj', labelKey: 'navHajj' },
    { id: 'air-tickets', labelKey: 'navAirTickets' },
    { id: 'tours-visas', labelKey: 'navToursVisas' },
    { id: 'gallery', labelKey: 'navGallery' },
    { id: 'blog', labelKey: 'navBlog' },
    { id: 'contact', labelKey: 'navContact' },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 bg-[#052917] text-white shadow-lg border-b border-[#D4AF37]/40 ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
      {/* Main Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
        >
          {/* Agency Official Logo */}
          <Logo className="w-10 h-10 sm:w-12 sm:h-12 transform group-hover:scale-105 transition-all drop-shadow-md" />

          <div>
            <h1 className="text-base sm:text-lg xl:text-xl font-extrabold text-white tracking-tight leading-none font-sans">
              {lang === 'bn' ? agencyInfo.nameBn : agencyInfo.nameEn}
            </h1>
            <p className="text-[11px] sm:text-xs font-semibold text-[#D4AF37] mt-1 tracking-wide flex items-center gap-1 font-sans">
              <Sparkles className="w-3 h-3 text-[#D4AF37] inline shrink-0" />
              <span>{lang === 'bn' ? agencyInfo.taglineBn : agencyInfo.taglineEn}</span>
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#052917] shadow-md'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {getTranslation(lang, item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenBookingModal()}
            className="hidden sm:inline-flex items-center gap-2 bg-white text-[#052917] hover:bg-[#D4AF37] hover:text-emerald-950 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all transform active:scale-95 border border-white/40"
          >
            <span>{getTranslation(lang, 'bookNowCTA')}</span>
            <ChevronRight className="w-4 h-4 text-emerald-800 group-hover:text-emerald-950" />
          </button>

          {/* Language Switcher next to Book Now button */}
          <div className="flex items-center bg-[#02180D] rounded-full p-1 border border-[#D4AF37]/60 text-xs shadow-inner">
            <button
              onClick={() => onLanguageChange('bn')}
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all ${
                lang === 'bn' 
                  ? 'bg-[#D4AF37] text-emerald-950 shadow-sm' 
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all ${
                lang === 'en' 
                  ? 'bg-[#D4AF37] text-emerald-950 shadow-sm' 
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-900/80 lg:hidden focus:outline-none border border-emerald-700/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E6DEC8] shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#0D472B] text-white font-bold shadow-sm'
                      : 'text-[#1A2E26] hover:bg-emerald-50'
                  }`}
                >
                  <span>{getTranslation(lang, item.labelKey)}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full bg-[#0D472B] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md border border-[#D4AF37]"
              >
                <span>{getTranslation(lang, 'bookNowCTA')}</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
                <a href={`tel:${agencyInfo.hotline}`} className="flex items-center gap-2 font-bold text-[#0D472B]">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'bn' ? 'হটলাইন:' : 'Hotline:'} {agencyInfo.hotline}</span>
                </a>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{agencyInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
