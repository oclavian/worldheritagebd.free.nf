import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Globe, Shield, ExternalLink, Code, Sparkles, X, User } from 'lucide-react';
import { Language, PageId, AgencyInfo } from '../types';
import { getTranslation } from '../data/translations';
import { Logo } from './Logo';

interface FooterProps {
  lang: Language;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  agencyInfo: AgencyInfo;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  activePage,
  onNavigate,
  agencyInfo,
}) => {
  const [showDevModal, setShowDevModal] = useState(false);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Secret code trigger handler (Code: 64725)
  useEffect(() => {
    let inputSequence = '';
    const secretCode = '64725';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore inputs typed inside text boxes, textareas, etc.
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (/^\d$/.test(e.key)) {
        inputSequence += e.key;
        if (inputSequence.length > secretCode.length) {
          inputSequence = inputSequence.slice(-secretCode.length);
        }
        if (inputSequence === secretCode) {
          setShowDevModal(true);
          inputSequence = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <footer className="bg-[#052917] text-emerald-100 font-bengali pt-12 pb-8 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Identity Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div>
                <h3 className="text-lg font-extrabold text-white font-sans">
                  {lang === 'bn' ? agencyInfo.nameBn : agencyInfo.nameEn}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] font-sans">
                  {lang === 'bn' ? agencyInfo.taglineBn : agencyInfo.taglineEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed">
              {lang === 'bn' 
                ? 'পবিত্র হজ্ব, উমরাহ্, দেশ-বিদেশের সাশ্রয়ী এয়ার টিকিট ও আকর্ষণীয় ট্যুর প্যাকেজ সেবায় আপনার আমানতদার ও নির্ভরযোগ্য প্রতিষ্ঠান।'
                : 'Your trustworthy partner for holy Hajj, Umrah packages, flight tickets, and unforgettable international travel.'
              }
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/80">
              <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{lang === 'bn' ? 'বাংলাদেশ সরকার অনুমোদিত লাইসেন্সপ্রাপ্ত এজেন্সি' : 'Govt. Licensed & Approved Agency'}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 border-b border-emerald-800/60 pb-2">
              {getTranslation(lang, 'footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'navHome' },
                { id: 'umrah', label: 'navUmrah' },
                { id: 'hajj', label: 'navHajj' },
                { id: 'air-tickets', label: 'navAirTickets' },
                { id: 'tours-visas', label: 'navToursVisas' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id as PageId)}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-emerald-200"
                  >
                    <span className="text-[#D4AF37]">›</span>
                    <span>{getTranslation(lang, item.label as any)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Pages Column */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 border-b border-emerald-800/60 pb-2">
              {getTranslation(lang, 'footerServices')}
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'gallery', label: 'navGallery' },
                { id: 'reviews', label: 'navReviews' },
                { id: 'blog', label: 'navBlog' },
                { id: 'contact', label: 'navContact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id as PageId)}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-emerald-200"
                  >
                    <span className="text-[#D4AF37]">›</span>
                    <span>{getTranslation(lang, item.label as any)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 border-b border-emerald-800/60 pb-2">
              {getTranslation(lang, 'navContact')}
            </h4>
            <ul className="space-y-3 text-xs text-emerald-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <a
                  href={agencyInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group"
                >
                  <span>{lang === 'bn' ? agencyInfo.addressBn : agencyInfo.addressEn}</span>
                  <ExternalLink className="w-3 h-3 text-[#D4AF37] opacity-80 group-hover:opacity-100 shrink-0 inline ml-1" />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${agencyInfo.hotline}`} className="hover:text-[#D4AF37] font-bold text-white tracking-wider">
                  {agencyInfo.hotline}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${agencyInfo.email}`} className="hover:text-[#D4AF37]">
                  {agencyInfo.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 text-xs text-emerald-300/80 text-center sm:text-left">
          <p>{getTranslation(lang, 'copyrightText')}</p>
        </div>
      </div>

      {/* Secret Developer Profile Modal */}
      {showDevModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-b from-[#093C22] to-[#041E11] text-white w-full max-w-md rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setShowDevModal(false)}
              className="absolute top-4 right-4 text-emerald-300 hover:text-white bg-emerald-950/80 p-2 rounded-full border border-emerald-700/60 transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Avatar */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#0D472B] via-emerald-800 to-[#D4AF37] p-1 shadow-xl relative">
                <div className="w-full h-full bg-[#052917] rounded-full flex items-center justify-center text-3xl font-black text-[#D4AF37] border border-[#D4AF37]/40">
                  <User className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-emerald-950 p-1 rounded-full shadow">
                  <Sparkles className="w-4 h-4 fill-emerald-950" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">
                  <Code className="w-3.5 h-3.5" />
                  <span>Lead Web Developer</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-wide font-sans mt-1">
                  Miraj Ahmed
                </h3>
                <p className="text-xs text-emerald-300 font-medium">
                  {lang === 'bn' ? 'ওয়েবসাইট ডেভলপার ও ডিজাইনার' : 'Website Developer & Designer'}
                </p>
              </div>
            </div>

            {/* Content Details */}
            <div className="mt-6 space-y-4 text-center">
              <p className="text-xs text-emerald-200/90 leading-relaxed bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/60">
                {lang === 'bn'
                  ? 'ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস ওয়েবসাইটের অফিসিয়াল ডিজিটাল আর্কিটেক্ট এবং ফ্লাগশিপ ওয়েব ইঞ্জিনিয়ার।'
                  : 'Official Lead Digital Architect & Web Developer for World Heritage Tours & Travels.'
                }
              </p>

              {/* Facebook Button */}
              <a
                href="https://www.facebook.com/mirajmun.fb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg hover:shadow-blue-900/50 transition-all transform hover:-translate-y-0.5 border border-blue-400/30"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{lang === 'bn' ? 'ফেসবুক প্রোফাইল দেখুন' : 'Connect on Facebook'}</span>
                <ExternalLink className="w-4 h-4 shrink-0 opacity-80" />
              </a>
            </div>

            {/* Footer badge */}
            <div className="mt-6 pt-4 border-t border-emerald-800/60 text-center text-[10px] text-emerald-400/70 font-mono tracking-wider">
              AUTHORIZED DIGITAL CREDIT &bull; SECRET UNLOCKED
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

