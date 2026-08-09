import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Plane, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Clock, 
  Users, 
  Star, 
  Compass, 
  ArrowRight,
  Phone,
  Building2
} from 'lucide-react';
import { Language, PageId, UmrahPackage, HajjPackage, Review, BlogPost, AgencyInfo } from '../types';
import { getTranslation } from '../data/translations';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  umrahPackages: UmrahPackage[];
  hajjPackage: HajjPackage;
  reviews: Review[];
  blogPosts: BlogPost[];
  agencyInfo: AgencyInfo;
  onOpenBookingModal: (service?: string, packageTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  umrahPackages,
  hajjPackage,
  reviews,
  blogPosts,
  agencyInfo,
  onOpenBookingModal,
}) => {
  return (
    <div className="space-y-16 font-bengali pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#052917] text-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b-4 border-[#D4AF37]">
        {/* Subtle Background Overlay Image */}
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1920&q=80')` }}
        ></div>

        {/* Islamic Subtle Star Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-15 islamic-pattern-dark"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F3E0A0] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{getTranslation(lang, 'tagline')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {getTranslation(lang, 'heroHeading')}
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                {getTranslation(lang, 'heroSubheading')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onNavigate('umrah')}
                  className="bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 px-6 py-3 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <span>🕋 {getTranslation(lang, 'heroCtaUmrah')}</span>
                </button>

                <button
                  onClick={() => onNavigate('hajj')}
                  className="bg-emerald-900/90 hover:bg-emerald-800 text-white border border-[#D4AF37]/60 px-6 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center gap-2"
                >
                  <span>🕋 {getTranslation(lang, 'heroCtaHajj')}</span>
                </button>

                <button
                  onClick={() => onNavigate('air-tickets')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Plane className="w-4 h-4 text-[#D4AF37]" />
                  <span>{getTranslation(lang, 'heroCtaTickets')}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-emerald-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'bn' ? 'শতভাগ শরীয়তসম্মত পরিচালনা' : '100% Shariah Compliant'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'bn' ? 'অভিজ্ঞ মোয়াল্লেম গাইড' : 'Experienced Moallem'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'bn' ? '২৪/৭ সার্বক্ষণিক সার্ভিস' : '24/7 Dedicated Support'}</span>
                </div>
              </div>

            </div>

            {/* Right Card: Hajj 2027 Special Highlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border-2 border-[#D4AF37] relative space-y-4">
                
                <div className="absolute -top-3 right-6 bg-[#D4AF37] text-emerald-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {lang === 'bn' ? 'বিশেষ ঘোষণা' : 'Special Highlight'}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#0D472B] tracking-wider uppercase block">
                    World Heritage Tours & Travels
                  </span>
                  <h3 className="text-2xl font-bold text-[#0D472B]">
                    {getTranslation(lang, 'hajjSpecialTitle')}
                  </h3>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
                  <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
                    {getTranslation(lang, 'hajjAnnouncement')}
                  </p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xs text-slate-600 font-bold">{getTranslation(lang, 'regFeeLabel')}</span>
                    <span className="text-xl font-extrabold text-[#0D472B]">{getTranslation(lang, 'regFeeAmount')}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span>{lang === 'bn' ? 'দীর্ঘ ৪০ দিন ও সংক্ষিপ্ত ১৫-২০ দিনের প্যাকেজ' : '40 Days & Short 15-20 Days Hajj Packages'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span>{lang === 'bn' ? 'মিনা ও আরাফাতে উন্নত এসি তাঁবু ও সার্ভিস' : 'AC Tents in Mina & Arafat'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span>{lang === 'bn' ? 'অভিজ্ঞ আলেম ও মোয়াল্লেম দ্বারা পরিচালিত' : 'Guided by Scholars & Experienced Moallem'}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingModal('Hajj', '২০২৭ সালের পবিত্র হজ্ব প্রাক-নিবন্ধন')}
                  className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#D4AF37]"
                >
                  <span>{getTranslation(lang, 'registerNowCTA')}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH & INQUIRY BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-5 border border-[#E6DEC8] grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {getTranslation(lang, 'selectService')}
            </label>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#0D472B]">
              <option>{lang === 'bn' ? '🕋 উমরাহ্ প্যাকেজ' : '🕋 Umrah Package'}</option>
              <option>{lang === 'bn' ? '🕋 হজ্ব প্যাকেজ ২০২৭' : '🕋 Hajj 2027'}</option>
              <option>{lang === 'bn' ? '✈ এয়ার টিকিট' : '✈ Air Ticket'}</option>
              <option>{lang === 'bn' ? '🌍 ট্যুর ও ভিসা' : '🌍 Tour & Visa'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {getTranslation(lang, 'travelers')}
            </label>
            <input 
              type="number" 
              defaultValue={1} 
              min={1} 
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {getTranslation(lang, 'preferredDate')}
            </label>
            <input 
              type="date" 
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]" 
            />
          </div>

          <div>
            <button
              onClick={() => onOpenBookingModal('General Inquiry', 'হোমপেজ দ্রুত ইনকোয়ারি')}
              className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all border border-[#D4AF37] flex items-center justify-center gap-1.5"
            >
              <span>{getTranslation(lang, 'submitInquiry')}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. INTRODUCTION & TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E6DEC8] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-emerald-50 text-[#0D472B] border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Our Agency'}
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B] font-sans">
              {getTranslation(lang, 'introTitle')}
            </h2>

            <p className="text-sm font-semibold text-[#B38712]">
              {getTranslation(lang, 'introSubtitle')}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {getTranslation(lang, 'introText')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{lang === 'bn' ? 'সরাসরি সরকারি নিয়ম মেনে পরিচালনা' : 'Govt Policy Compliant'}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{lang === 'bn' ? 'হারামের নিকটবর্তী হোটেল সুনিশ্চিত' : 'Near-Haram Hotels Guaranteed'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80"
                alt="Madinah Prophet Mosque"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#0D472B] text-white p-4 rounded-xl border border-[#D4AF37] shadow-md max-w-xs">
              <p className="text-xs font-bold leading-tight">
                {lang === 'bn' ? 'ঢাকা পান্থপথ প্রধান কার্যালয়ে আমাদের সরাসরি টিম পরামর্শ দিতে প্রস্তুত।' : 'Our Dhaka Panthapath main team is ready for face-to-face consultation.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-extrabold text-[#B38712] uppercase tracking-wider block">
            World Heritage Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
            {lang === 'bn' ? 'আমাদের প্রধান সেবাসমূহ' : 'Our Major Services'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'bn' 
              ? 'ধর্মীয় সফরের অনন্য বিশ্বস্ততার পাশাপাশি দেশ-বিদেশের ভ্রমণ ও এয়ার টিকেট সেবা।'
              : 'Reliable religious pilgrimage along with domestic & international tours and flight bookings.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Umrah */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6DEC8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl border border-emerald-200">
                🕋
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navUmrah')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'শরীয়তসম্মত ও সুশৃঙ্খল উমরাহ্ সফরের জন্য বিভিন্ন ক্যাটাগরির প্যাকেজ।'
                  : 'Shariah-compliant and disciplined Umrah packages for pilgrims.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('umrah')}
              className="mt-5 w-full bg-[#FAF8F5] hover:bg-[#0D472B] text-[#0D472B] hover:text-white py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Hajj */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6DEC8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl border border-emerald-200">
                🕌
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navHajj')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? '২০২৭ সালের পবিত্র হজ্ব্বসহ দীর্ঘ ও সংক্ষিপ্ত মেয়াদী প্যাকেজ।'
                  : 'Long & short duration Holy Hajj 2027 packages.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('hajj')}
              className="mt-5 w-full bg-[#FAF8F5] hover:bg-[#0D472B] text-[#0D472B] hover:text-white py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Air Tickets */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6DEC8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl border border-emerald-200">
                ✈
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navAirTickets')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'অভ্যন্তরীণ ও আন্তর্জাতিক বিভিন্ন রুটের এয়ার টিকিট সেবা।'
                  : 'Domestic & International flight bookings at best rates.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('air-tickets')}
              className="mt-5 w-full bg-[#FAF8F5] hover:bg-[#0D472B] text-[#0D472B] hover:text-white py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Tours & Visas */}
          <div className="bg-white rounded-2xl p-5 border border-[#E6DEC8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl border border-emerald-200">
                🌍
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navToursVisas')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'দেশ-বিদেশের আকর্ষনীয় Tour এবং Visa প্রসেসিং সার্ভিস।'
                  : 'Domestic & International tour packages and visa processing.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('tours-visas')}
              className="mt-5 w-full bg-[#FAF8F5] hover:bg-[#0D472B] text-[#0D472B] hover:text-white py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. FEATURED UMRAH PACKAGES SHOWCASE */}
      <section className="bg-emerald-950/5 py-12 border-y border-[#E6DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
                Featured Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
                {lang === 'bn' ? 'চলতি উমরাহ্ প্যাকেজসমূহ' : 'Active Umrah Packages'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('umrah')}
              className="text-xs font-bold text-[#0D472B] hover:text-[#053B21] flex items-center gap-1 underline underline-offset-4"
            >
              <span>{lang === 'bn' ? 'সকল প্যাকেজ দেখুন' : 'View All Packages'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {umrahPackages.slice(0, 3).map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 bg-slate-100">
                    <img 
                      src={pkg.image} 
                      alt={lang === 'bn' ? pkg.titleBn : pkg.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {pkg.badgeBn && (
                      <span className="absolute top-3 right-3 bg-[#D4AF37] text-emerald-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                        {lang === 'bn' ? pkg.badgeBn : pkg.badgeEn}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-[#0D472B] line-clamp-2">
                      {lang === 'bn' ? pkg.titleBn : pkg.titleEn}
                    </h3>

                    <div className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-100">
                      <p><strong>{getTranslation(lang, 'makkahHotel')}:</strong> {lang === 'bn' ? pkg.makkahHotelBn : pkg.makkahHotelEn}</p>
                      <p><strong>{getTranslation(lang, 'madinahHotel')}:</strong> {lang === 'bn' ? pkg.madinahHotelBn : pkg.madinahHotelEn}</p>
                      <p><strong>{getTranslation(lang, 'food')}:</strong> {lang === 'bn' ? pkg.foodBn : pkg.foodEn}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-3">
                  <div className="flex items-baseline justify-between pt-3">
                    <span className="text-xs text-slate-500 font-semibold">{getTranslation(lang, 'perPerson')}</span>
                    <span className="text-xl font-extrabold text-[#0D472B]">
                      ৳{pkg.priceBDT.toLocaleString()} {getTranslation(lang, 'priceBDTLabel')}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal('Umrah', lang === 'bn' ? pkg.titleBn : pkg.titleEn)}
                    className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-[#D4AF37]"
                  >
                    {getTranslation(lang, 'bookPackage')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR FEATURES (আমাদের বৈশিষ্ট্য) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#0D472B] to-[#053B21] text-white rounded-2xl p-6 sm:p-10 shadow-xl border-2 border-[#D4AF37]">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-sans">
              {getTranslation(lang, 'featuresTitle')}
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              getTranslation(lang, 'f1'),
              getTranslation(lang, 'f2'),
              getTranslation(lang, 'f3'),
              getTranslation(lang, 'f4'),
              getTranslation(lang, 'f5'),
              getTranslation(lang, 'f6'),
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/15 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PACKAGE INCLUDES CHECKLIST (প্যাকেজে যা যা থাকছে) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
            {getTranslation(lang, 'includesTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'bn' ? 'আমাদের প্রতিটি উমরাহ্ প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ' : 'Facilities included in our standard Umrah packages'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {[
            getTranslation(lang, 'inc1'),
            getTranslation(lang, 'inc2'),
            getTranslation(lang, 'inc3'),
            getTranslation(lang, 'inc4'),
            getTranslation(lang, 'inc5'),
            getTranslation(lang, 'inc6'),
            getTranslation(lang, 'inc7'),
            getTranslation(lang, 'inc8'),
            getTranslation(lang, 'inc9'),
            getTranslation(lang, 'inc10'),
          ].map((inc, index) => (
            <div key={index} className="bg-white p-3.5 rounded-xl border border-[#E6DEC8] flex items-center gap-3 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 font-bold text-xs">
                ✓
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-800">{inc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CLIENT REVIEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              Client Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
              {getTranslation(lang, 'reviewsTitle')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('reviews')}
            className="text-xs font-bold text-[#0D472B] hover:text-[#053B21] flex items-center gap-1 underline underline-offset-4"
          >
            <span>{lang === 'bn' ? 'সকল রিভিউ দেখুন' : 'View All Reviews'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className="bg-white rounded-2xl p-5 border border-[#E6DEC8] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "{lang === 'bn' ? rev.commentBn : rev.commentEn}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-sm font-bold text-[#0D472B]">
                  {lang === 'bn' ? rev.nameBn : rev.nameEn}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {lang === 'bn' ? rev.serviceBn : rev.serviceEn} • {lang === 'bn' ? rev.locationBn : rev.locationEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TRAVEL BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              Latest Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
              {getTranslation(lang, 'blogTitle')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-[#0D472B] hover:text-[#053B21] flex items-center gap-1 underline underline-offset-4"
          >
            <span>{lang === 'bn' ? 'ব্লগ পড়ুন' : 'Read All Posts'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-16/9 bg-slate-100">
                  <img
                    src={post.image}
                    alt={lang === 'bn' ? post.titleBn : post.titleEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold bg-emerald-50 text-[#0D472B] px-2 py-0.5 rounded-md border border-emerald-200">
                    {lang === 'bn' ? post.categoryBn : post.categoryEn}
                  </span>
                  <h3 className="text-sm font-bold text-[#0D472B] line-clamp-2">
                    {lang === 'bn' ? post.titleBn : post.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {lang === 'bn' ? post.summaryBn : post.summaryEn}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-xs font-bold text-[#0D472B] hover:underline pt-2 block"
                >
                  {getTranslation(lang, 'readMore')} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BOTTOM DIRECT CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#052917] text-white rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-sans">
              {lang === 'bn' ? 'যেকোনো জিজ্ঞাসায় এখনই আমাদের সাথে কল করুন' : 'Call Us Directly for Any Flight or Package Query'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              {lang === 'bn' ? 'আমাদের প্রধান অফিস: পশ্চিম পান্থপথ জামে-মসজিদের বিপরীত পাশে, ঢাকা' : 'Panthapath Main Office, Dhaka-1215'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${agencyInfo.hotline}`}
              className="bg-[#D4AF37] text-emerald-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#C59B27] transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{agencyInfo.hotline}</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="bg-emerald-900 border border-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-emerald-800 transition-all"
            >
              {getTranslation(lang, 'contactCTA')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
