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
    <header className="sticky top-0 z-40 bg-[#052917] text-white shadow-lg border-b border-[#D4AF37]/40 font-bengali">
      {/* Top Bar for Desktop */}
      <div className="bg-[#02180D] text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/80 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 flex-wrap">
            <a href={`tel:${agencyInfo.hotline}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'হটলাইন:' : 'Hotline:'} <strong className="tracking-wider text-white">{agencyInfo.hotline}</strong></span>
            </a>
            <a href={`mailto:${agencyInfo.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{agencyInfo.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate max-w-xs">{lang === 'bn' ? agencyInfo.addressBn : agencyInfo.addressEn}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[11px] text-emerald-200 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'অনুমোদিত ট্রাভেল এজেন্সী' : 'Authorized Agency'}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-emerald-950/90 rounded-full p-0.5 border border-[#D4AF37]/50">
              <button
                onClick={() => onLanguageChange('bn')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                  lang === 'bn' 
                    ? 'bg-[#D4AF37] text-emerald-950 font-bold shadow-sm' 
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                  lang === 'en' 
                    ? 'bg-[#D4AF37] text-emerald-950 font-bold shadow-sm' 
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Agency Official Logo */}
          <Logo className="w-11 h-11 sm:w-13 sm:h-13 transform group-hover:scale-105 transition-all drop-shadow-md" />

          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-none font-sans">
              {lang === 'bn' ? agencyInfo.nameBn : agencyInfo.nameEn}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] mt-1 tracking-wide flex items-center gap-1 font-sans">
              <Sparkles className="w-3 h-3 text-[#D4AF37] inline" />
              <span>{lang === 'bn' ? agencyInfo.taglineBn : agencyInfo.taglineEn}</span>
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#052917] font-bold shadow-md'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {getTranslation(lang, item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Mobile */}
          <div className="flex lg:hidden items-center bg-emerald-950 rounded-full p-0.5 border border-[#D4AF37]/40 text-xs text-white">
            <button
              onClick={() => onLanguageChange('bn')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                lang === 'bn' ? 'bg-[#D4AF37] text-emerald-950 font-bold' : 'text-emerald-200'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                lang === 'en' ? 'bg-[#D4AF37] text-emerald-950 font-bold' : 'text-emerald-200'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => onOpenBookingModal()}
            className="hidden sm:inline-flex items-center gap-2 bg-white text-[#052917] hover:bg-[#D4AF37] hover:text-emerald-950 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all transform active:scale-95 border border-white/40"
          >
            <span>{getTranslation(lang, 'bookNowCTA')}</span>
            <ChevronRight className="w-4 h-4 text-emerald-800 group-hover:text-emerald-950" />
          </button>

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
