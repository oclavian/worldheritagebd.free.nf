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
    { id: 'reviews', labelKey: 'navReviews' },
    { id: 'blog', labelKey: 'navBlog' },
    { id: 'contact', labelKey: 'navContact' },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E6DEC8]/60 font-bengali">
      {/* Top Bar for Desktop */}
      <div className="bg-[#0D472B] text-white text-xs py-2 px-4 border-b border-[#D4AF37]/30 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 flex-wrap">
            <a href={`tel:${agencyInfo.hotline}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'হটলাইন:' : 'Hotline:'} <strong className="tracking-wider">{agencyInfo.hotline}</strong></span>
            </a>
            <a href={`mailto:${agencyInfo.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{agencyInfo.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate max-w-xs">{lang === 'bn' ? agencyInfo.addressBn : agencyInfo.addressEn}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[11px] text-emerald-100 bg-emerald-900/50 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'অনুমোদিত ট্রাভেল এজেন্সী' : 'Authorized Agency'}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-emerald-950/80 rounded-full p-0.5 border border-[#D4AF37]/40">
              <button
                onClick={() => onLanguageChange('bn')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                  lang === 'bn' 
                    ? 'bg-[#D4AF37] text-emerald-950 font-bold shadow-sm' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                  lang === 'en' 
                    ? 'bg-[#D4AF37] text-emerald-950 font-bold shadow-sm' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Agency Official Logo */}
          <Logo className="w-12 h-12 sm:w-14 sm:h-14 transform group-hover:scale-105 transition-all" />

          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0D472B] tracking-tight leading-none font-sans">
              {lang === 'bn' ? agencyInfo.nameBn : agencyInfo.nameEn}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#B38712] mt-1 tracking-wide flex items-center gap-1 font-sans">
              <Sparkles className="w-3 h-3 text-[#D4AF37] inline" />
              <span>{lang === 'bn' ? agencyInfo.taglineBn : agencyInfo.taglineEn}</span>
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0D472B] text-white shadow-sm border border-[#D4AF37]/50 font-bold'
                    : 'text-[#1A2E26] hover:text-[#0D472B] hover:bg-emerald-50/80'
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
          <div className="flex lg:hidden items-center bg-emerald-900 rounded-full p-0.5 border border-[#D4AF37]/40 text-xs text-white">
            <button
              onClick={() => onLanguageChange('bn')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                lang === 'bn' ? 'bg-[#D4AF37] text-emerald-950 font-bold' : 'text-emerald-100'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                lang === 'en' ? 'bg-[#D4AF37] text-emerald-950 font-bold' : 'text-emerald-100'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => onOpenBookingModal()}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#0D472B] to-[#053B21] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg border border-[#D4AF37] hover:border-[#D4AF37] transform active:scale-95 transition-all"
          >
            <span>{getTranslation(lang, 'bookNowCTA')}</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#0D472B] hover:bg-emerald-50 lg:hidden focus:outline-none border border-emerald-200"
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
