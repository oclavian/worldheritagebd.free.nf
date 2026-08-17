import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, X, ShieldCheck, Code2, CheckCircle2, ExternalLink, Sparkles, Lock } from 'lucide-react';
import { Language, PageId, AgencyInfo } from '../types';
import { getTranslation } from '../data/translations';
import { Logo } from './Logo';
import { toBengaliDigits } from '../utils/formatters';

interface FooterProps {
  lang: Language;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  agencyInfo: AgencyInfo;
}

// Security Core Obfuscation Engine (AES-XOR Shifting)
const _cKey_ = "WHT_SEC_2026";
const _pLoad_ = {
  kCode: "YXxjbWY=",
  name: "GiEmPjllAjdfVVY=",
  fb: "PzwgLyB/bHBFR0UYMSk3OjEqLDQcU11beCU9LTIvLipcHlRU",
  roleEn: "FCA9OjVlDzpTVBJhMip0HiM1LzZRUUZfOCZ0Gj0iKjFXVUAWcWgQNjQsNz5eEHNENCA9KzYmNw==",
  roleBn: "t+7Ov/X6o/mZENKQxKjzwLPixL+UnBLW8c20+N6l5fDSlozW8eK0+N6l5e3Slo3W8d20+NSl5enSlpoWt+7Tv/Xbo/i/0JSqt+7rv/Xto/mN0JWpt+7qv/X1Y7+UoxLW8em0+eyl5cPSlo3W8de0+e2l5e0S0JSwt+7kv/TIo/mn0JSJt+7Lv/TCo/mn0JW7t+7L",
  bioEn: "GC4yNjAsIjMSfFdXM2gQNjQsNz5eEHNENCA9KzYmN38UEHRDOyR5DCckIDQSZ1dUdwkkLz8sID5GWV1YdwwxKTYpLC9XQhJQODp0CDw3LzsSeFdEPjw1ODZlFzBHQkEWcWgALTIzJjNBHhJyMjs9OD0gJ39FWUZedy0sKyEgLjoSQ1dVIjo9KyppYzxHQ0ZZOmg4PioqNisSVVxRPiYxLH9lIjFWEFZPOSk5NjBlMTpBQF1YJCEiOj0gMCwcbio=",
  bioBn: "t+7Hv/Tao/mM0JSGt+/Zv/X3o/i/0JSXd6jy5rPixL+UgNKQ6KjywLPixL+UrBLW8de0+N6l5fDSl7PW8fi0+N6l5ecS0JSzt+/Zv/Xqo/mM0JSet+/Zv/XkY7+Ur9KR2qjy77Pj/b+UndKR0Kjy7bPj+3/SlqHW8Ne0+NSl5fPSlorW8fa0+dSl5cDSl7XW8fh0v/X9o/mN0JSjt+7rv/XMo/mC0JSXd6jyxbPj/L+UmxLW8du0+Myl5NjSlp4Wt+7Rv/TIo/md0JSIt+7+v/TIo/mA0JSJt+7Bv/TCo/mE0JSed6jy2LPj3b+VvdKQy6jy4LPj67+Uj9KRyKjy4bPj83/SlqEWt+71v/X6o/mu0JSJt+7Lv/X7o/mAENKQ0ajy77Pizr+UpdKQ6KjywLPixL+UpdKR2qjywLPg5w==",
  imgUrl: "PzwgLyB/bHBeWAEYMCc7OD8gNixXQlFZOTwxMSdrIDBfH1YZZh8XDhUrDgsAWwVFEx0sCh0kCyhdZ3hiIjEXOgwwdAdU"
};

const _dec_ = (b64: string): string => {
  try {
    const binaryStr = window.atob(b64);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i) ^ _cKey_.charCodeAt(i % _cKey_.length);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
};

export const Footer: React.FC<FooterProps> = ({
  lang,
  activePage,
  onNavigate,
  agencyInfo,
}) => {
  const [showDevCore, setShowDevCore] = useState(false);

  // Secret keyboard listener
  useEffect(() => {
    let keyBuffer = '';
    const targetTrigger = _dec_(_pLoad_.kCode);

    const handleKeyDown = (e: KeyboardEvent) => {
      const targetEl = e.target as HTMLElement;
      if (
        targetEl &&
        (targetEl.tagName === 'INPUT' ||
          targetEl.tagName === 'TEXTAREA' ||
          targetEl.tagName === 'SELECT' ||
          targetEl.isContentEditable)
      ) {
        return;
      }

      if (/^\d$/.test(e.key)) {
        keyBuffer += e.key;
        if (keyBuffer.length > targetTrigger.length) {
          keyBuffer = keyBuffer.slice(-targetTrigger.length);
        }
        if (keyBuffer === targetTrigger) {
          setShowDevCore(true);
          keyBuffer = '';
        }
      } else if (e.key === 'Escape') {
        setShowDevCore(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#02180D] text-emerald-100 font-bengali pt-14 pb-8 border-t-4 border-[#D4AF37] relative overflow-hidden">
      {/* Background Subtle Halftone Dot Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 halftone-dots opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand & Socials Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-13 h-13 drop-shadow-md" />
              <div>
                <h3 className="text-lg font-extrabold text-white font-sans">
                  {lang === 'bn' ? agencyInfo.nameBn.replace('ট্যুরস', 'ট্যুর্স') : agencyInfo.nameEn}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] font-sans">
                  {lang === 'bn' ? agencyInfo.taglineBn : agencyInfo.taglineEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed">
              {lang === 'bn' 
                ? 'আমরা ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস, বিশ্বস্ততার বন্ধনে গড়ি আপনার সফর। মানবতা ও ধর্মীয় সেবায় আপনাদের পাশে আছি সর্বদা।'
                : 'World Heritage Tours & Travels - Building bonds of trust for your holy pilgrimage and travel.'
              }
            </p>

            {/* Circular Social Icons Bar */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={agencyInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-[#D4AF37] hover:text-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-700/50 shadow-sm"
                title="Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`tel:${agencyInfo.hotline}`}
                className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-[#D4AF37] hover:text-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-700/50 shadow-sm"
                title="Call Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${agencyInfo.email}`}
                className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-[#D4AF37] hover:text-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-700/50 shadow-sm"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={agencyInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-[#D4AF37] hover:text-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-700/50 shadow-sm"
                title="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (4 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 border-b border-emerald-800/60 pb-2">
              {getTranslation(lang, 'footerQuickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { id: 'home', label: 'navHome' },
                { id: 'umrah', label: 'navUmrah' },
                { id: 'hajj', label: 'navHajj' },
                { id: 'air-tickets', label: 'navAirTickets' },
                { id: 'tours-visas', label: 'navToursVisas' },
                { id: 'gallery', label: 'navGallery' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id as PageId)}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-emerald-200"
                  >
                    <span className="text-[#D4AF37] font-bold">›</span>
                    <span>{getTranslation(lang, item.label as any)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotline & Emergency Support Card Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider border-b border-emerald-800/60 pb-2">
              {lang === 'bn' ? 'সাপোর্ট ও যোগাযোগ' : 'Support & Contact'}
            </h4>

            {/* Hotline Emergency Box matching reference style */}
            <div className="bg-[#052917] p-5 rounded-2xl border border-emerald-700/60 shadow-xl space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-900/40 border border-red-400/30">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider block mb-0.5">
                    {lang === 'bn' ? 'হটলাইন সার্বক্ষণিক' : '24/7 Hotline'}
                  </span>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <a
                      href={`tel:${agencyInfo.hotline}`}
                      className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider hover:text-[#D4AF37] transition-colors font-sans"
                    >
                      {lang === 'bn' ? toBengaliDigits(agencyInfo.hotline) : agencyInfo.hotline}
                    </a>
                    <span className="text-sm sm:text-base font-bold text-[#D4AF37] font-bengali">
                      ({lang === 'bn' ? 'হোয়াটসঅ্যাপ & ইমো' : 'WhatsApp & Imo'})
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-800/80 text-sm text-emerald-200/90 flex flex-col gap-1.5 font-sans">
                <p className="text-sm sm:text-base font-medium">
                  <strong className="text-emerald-300 font-bold">{lang === 'bn' ? 'বিকল্প যোগাযোগ:' : 'Alt Phone:'}</strong>{' '}
                  <a href="tel:01785970008" className="hover:text-[#D4AF37] transition-colors font-bold underline">
                    {lang === 'bn' ? toBengaliDigits('01785970008') + '-৯' : '01785970008-9'}
                  </a>
                  ,{' '}
                  <a href="tel:01920825145" className="hover:text-[#D4AF37] transition-colors font-bold underline">
                    {lang === 'bn' ? toBengaliDigits('01920825145') : '01920825145'}
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-emerald-300/90 mt-0.5 leading-relaxed">
                  {lang === 'bn' ? agencyInfo.addressBn : agencyInfo.addressEn}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-emerald-300/80 text-center">
          <p>{getTranslation(lang, 'copyrightText')}</p>
          <button
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-1.5 text-xs text-emerald-300/60 hover:text-[#F3E0A0] transition-colors py-1 px-2.5 rounded-lg border border-emerald-800/50 hover:border-[#D4AF37]/50 bg-emerald-950/40 cursor-pointer"
            title="এডমিন প্যানেলে প্রবেশ করুন"
          >
            <Lock className="w-3 h-3 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}</span>
          </button>
        </div>
      </div>

      {/* Secret Encrypted Developer Core Modal */}
      {showDevCore && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn font-sans">
          <div className="relative w-full max-w-lg overflow-hidden bg-gradient-to-b from-[#0A301E] via-[#051E13] to-[#020F09] border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.4)] text-white p-6 sm:p-8 space-y-6">
            
            {/* Ambient Background Orbs */}
            <div className="absolute -top-24 -left-24 w-52 h-52 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setShowDevCore(false)}
              className="absolute top-4 right-4 p-2 text-emerald-300/80 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 rounded-full transition-all border border-emerald-600/40 shadow-lg hover:scale-110"
              title="Close"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Verified Developer Badge Header */}
            <div className="flex items-center justify-center pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/50 shadow-inner tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>VERIFIED DIGITAL ARCHITECT</span>
              </span>
            </div>

            {/* Developer Avatar & Main Profile */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                {/* Glowing Multi-layer Aura Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] via-emerald-400 to-[#D4AF37] rounded-full blur-md opacity-80 animate-pulse" />
                
                {/* Avatar Portrait */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-[#03170D] flex items-center justify-center">
                  <img
                    src={_dec_(_pLoad_.imgUrl)}
                    alt={_dec_(_pLoad_.name)}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.tried) {
                        target.dataset.tried = '1';
                        target.src = 'https://drive.google.com/uc?export=view&id=1WCQFnMT2k7sDUxUNaHwoWJTuyCe_u7Xf';
                      }
                    }}
                  />
                </div>

                {/* Active Indicator Icon */}
                <div className="absolute bottom-1 right-1 p-2 bg-[#0D472B] text-[#D4AF37] rounded-full border-2 border-[#D4AF37] shadow-xl">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>

              {/* Name & Title */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-sans flex items-center justify-center gap-2">
                  <span>{_dec_(_pLoad_.name)}</span>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20 shrink-0" />
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] font-sans">
                  {lang === 'bn' ? _dec_(_pLoad_.roleBn) : _dec_(_pLoad_.roleEn)}
                </p>
              </div>

              {/* Bio Box */}
              <div className="bg-[#031A0F]/80 p-4 rounded-2xl border border-emerald-700/50 shadow-inner text-left sm:text-center">
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-bengali">
                  {lang === 'bn' ? _dec_(_pLoad_.bioBn) : _dec_(_pLoad_.bioEn)}
                </p>
              </div>

              {/* Skill Tech Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold">
                {['React 18', 'TypeScript', 'Node.js', 'Tailwind CSS', 'AES Encryption'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-emerald-900/60 text-emerald-200 border border-emerald-600/40 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Direct Facebook Action Button */}
              <div className="pt-2">
                <a
                  href={_dec_(_pLoad_.fb)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-xl shadow-blue-900/40 hover:shadow-blue-600/60 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 border border-blue-400/30 text-sm sm:text-base"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>{lang === 'bn' ? 'ফেসবুকে প্রোফাইল দেখুন' : 'Connect on Facebook'}</span>
                  <ExternalLink className="w-4 h-4 opacity-90" />
                </a>
              </div>

              {/* Security Footer Note */}
              <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-center gap-2 text-[10px] text-emerald-400/70 font-mono tracking-wider">
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                <span>AES-XOR ENCRYPTED CORE &bull; SECRET {_dec_(_pLoad_.kCode)} UNLOCKED</span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </div>

            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

