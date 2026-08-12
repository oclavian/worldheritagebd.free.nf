import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Star, 
  ArrowRight,
  Phone,
  Building2,
  MapPin,
  HeartHandshake,
  Headphones,
  Plane
} from 'lucide-react';
import { Language, PageId, UmrahPackage, HajjPackage, BlogPost, AgencyInfo } from '../types';
import { getTranslation } from '../data/translations';
import { PackageCard } from '../components/PackageCard';
import { PackageDetailView } from '../components/PackageDetailView';
import { adaptUmrahPackage, adaptHajjPackage, StandardPackageItem } from '../utils/packageAdapter';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  umrahPackages: UmrahPackage[];
  hajjPackage: HajjPackage;
  blogPosts: BlogPost[];
  agencyInfo: AgencyInfo;
  onOpenBookingModal: (service?: string, packageTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  umrahPackages,
  hajjPackage,
  blogPosts,
  agencyInfo,
  onOpenBookingModal,
}) => {
  const [activeTab, setActiveTab] = useState<'umrah' | 'hajj' | 'air' | 'tour'>('umrah');
  const [packageCategory, setPackageCategory] = useState<'all' | 'umrah' | 'hajj'>('all');
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<StandardPackageItem | null>(null);

  // If a package detail is selected, render full page view
  if (selectedDetailPackage) {
    return (
      <PackageDetailView
        lang={lang}
        pkg={selectedDetailPackage}
        onBack={() => setSelectedDetailPackage(null)}
        onBookNow={(service, packageTitle) => onOpenBookingModal(service, packageTitle)}
      />
    );
  }

  return (
    <div className="space-y-12 font-bengali pb-12">
      
      {/* 1. LUXURY HERO SECTION WITH INTERACTIVE SEARCH & STATS */}
      <section className="relative bg-[#03180D] text-white pt-8 sm:pt-12 pb-24 lg:pt-14 lg:pb-32 overflow-hidden border-b-4 border-[#D4AF37]">
        {/* Immersive Photography Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1920&q=80')` }}
        />

        {/* Golden Radial Glow and Halftone Pattern Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 halftone-dots opacity-20 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Top Announcement Tagline Pill */}
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/60 px-4 py-1.5 rounded-full text-xs font-bold text-[#F3E0A0] shadow-md mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'অনুমোদিত ও বিশ্বস্ত হজ্ব, উমরাহ্ এবং এয়ার টিকিট এজেন্সী' : 'Authorized Hajj, Umrah & Air Ticket Agency'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-sans">
                {lang === 'bn' ? (
                  <>
                    পবিত্র <span className="text-[#D4AF37]">উমরাহ্, হজ্ব</span> ও ফ্লাইট টিকিটে সর্বোচ্চ বিশ্বস্ততা
                  </>
                ) : (
                  <>
                    Your Trusted Partner for <span className="text-[#D4AF37]">Holy Umrah, Hajj</span> & Flights
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
                {lang === 'bn' 
                  ? 'ঢাকা পান্থপথ প্রধান কার্যালয় থেকে সরাসরি বাংলাদেশ সরকার ও সৌদি ধর্ম মন্ত্রণালয়ের নিয়ম মেনে স্বচ্ছতার সাথে পরিচালিত।'
                  : 'Operating directly from Panthapath main office with 100% Shariah compliance and government licensing.'
                }
              </p>

              {/* Quick Stat Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                  <span className="text-xl sm:text-2xl font-black text-[#D4AF37] block font-sans">
                    {lang === 'bn' ? '১৫,০০০+' : '15,000+'}
                  </span>
                  <span className="text-[11px] text-emerald-200">{lang === 'bn' ? 'সফল হাজী সেবা' : 'Pilgrims Served'}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                  <span className="text-xl sm:text-2xl font-black text-[#D4AF37] block font-sans">
                    {lang === 'bn' ? '১০+ বছর' : '10+ Years'}
                  </span>
                  <span className="text-[11px] text-emerald-200">{lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                  <span className="text-xl sm:text-2xl font-black text-[#D4AF37] block font-sans">
                    {lang === 'bn' ? '১০০%' : '100%'}
                  </span>
                  <span className="text-[11px] text-emerald-200">{lang === 'bn' ? 'শরীয়তসম্মত' : 'Shariah Compliant'}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                  <span className="text-xl sm:text-2xl font-black text-[#D4AF37] block font-sans">
                    {lang === 'bn' ? '২৪/৭' : '24/7'}
                  </span>
                  <span className="text-[11px] text-emerald-200">{lang === 'bn' ? 'হটলাইন সাপোর্ট' : 'Hotline Support'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onNavigate('umrah')}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B38712] hover:from-[#C59B27] hover:to-[#A2760E] text-emerald-950 px-6 py-3 rounded-full font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <span>🕋 {lang === 'bn' ? 'উমরাহ্ প্যাকেজসমূহ' : 'Umrah Packages'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('hajj')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-[#D4AF37]/60 px-6 py-3 rounded-full font-extrabold text-sm backdrop-blur-md shadow-md transition-all flex items-center gap-2"
                >
                  <span>🕌 {lang === 'bn' ? 'পবিত্র হজ্ব ২০২৭' : 'Holy Hajj 2027'}</span>
                </button>
              </div>

            </div>

            {/* Right Column - 2027 Holy Hajj Package Announcement Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#022212]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/60 shadow-2xl relative space-y-5">
              
              {/* Special Announcement Badge */}
              <div>
                <span className="inline-block bg-[#D4AF37] text-emerald-950 font-black text-xs px-4 py-1.5 rounded-full shadow-md tracking-wide">
                  {lang === 'bn' ? 'বিশেষ ঘোষণা' : 'Special Announcement'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug font-sans tracking-tight">
                {lang === 'bn' ? '২০২৭ সালের পবিত্র হজ্ব প্যাকেজ' : '2027 Holy Hajj Package'}
              </h2>

              {/* Inner Highlight Box */}
              <div className="border border-emerald-500/40 bg-emerald-900/40 p-4 sm:p-5 rounded-2xl space-y-2">
                <p className="text-sm sm:text-base font-bold text-[#F3E0A0] leading-snug">
                  {lang === 'bn' ? '২০২৭ সালের পবিত্র হজ্ব প্যাকেজের বুকিং চলছে।' : 'Booking is ongoing for the 2027 Holy Hajj Package.'}
                </p>
                <p className="text-sm sm:text-base font-bold text-white">
                  {lang === 'bn' ? 'রেজিস্ট্রেশন ফি: ' : 'Registration Fee: '}
                  <span className="text-[#D4AF37] text-lg sm:text-xl font-black block sm:inline mt-1 sm:mt-0">
                    {lang === 'bn' ? 'মাত্র ৩০,০০০ টাকা' : 'Only 30,000 BDT'}
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                {lang === 'bn' 
                  ? 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস এর তত্ত্বাবধানে সরকারি নিয়ম মেনে ২০২৭ সালের হজ্ব রেজিস্ট্রেশন শুরু হয়েছে। অভিজ্ঞতা, নির্ভরযোগ্যতা ও সুনামের সাথে পবিত্র হজ্ব পালন করতে আজই আপনার আসন নিশ্চিত করুন।'
                  : 'Hajj registration for 2027 has started under World Heritage Tours & Travels following government regulations. Confirm your seat today to perform holy Hajj with experience, reliability, and trust.'
                }
              </p>

              {/* CTA Registration Button */}
              <button
                onClick={() => onOpenBookingModal('Hajj 2027', lang === 'bn' ? '২০২৭ সালের পবিত্র হজ্ব প্যাকেজ' : '2027 Holy Hajj Package Registration')}
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-7 py-3.5 rounded-2xl text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all group"
              >
                <span>🕋 {lang === 'bn' ? 'এখনই রেজিস্ট্রেশন করতে যোগাযোগ করুন' : 'Contact to Register Now'}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

          </div>
        </div>

        {/* Organic Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg 
            className="relative block w-full h-12 sm:h-20 lg:h-24 text-[#FAF8F5]"
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,80 L1200,120 L0,120 Z" 
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* 2. IMPORTANT AGENCY INFORMATION (একটু জেনে নিন...) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-2">
        <div className="text-center mb-5">
          <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block font-sans">
            Important Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
            {lang === 'bn' ? 'একটু জেনে নিন...' : 'Key Information for Pilgrims'}
          </h2>
        </div>

        <div className="relative bg-gradient-to-br from-rose-50/80 via-[#FAF4EC] to-emerald-50/80 p-6 sm:p-10 rounded-3xl border border-rose-200/80 shadow-md overflow-hidden text-slate-800 space-y-4">
          
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-medium">
            {lang === 'bn' ? (
              <>
                যাঁরা পবিত্র উমরাহ্ ও হজ্ব পালন করতে চান, আমরা সরাসরি বাংলাদেশ সরকার ও সৌদি আরব ধর্ম মন্ত্রণালয়ের নিয়ম মেনে স্বচ্ছতার সাথে সেবা প্রদান করি। বিশেষত ঢাকা, কুমিল্লা, সিলেট ও চট্টগ্রামসহ সারা দেশের সম্মানিত হাজীদের এয়ার টিকিট, ভিসা প্রসেসিং এবং হারামের নিকটবর্তী থ্রি-স্টার / ফাইভ-স্টার হোটেল সুবিধা নিশ্চিত করা হয়।
              </>
            ) : (
              <>
                For pilgrims intending to perform Holy Umrah or Hajj, we strictly adhere to the guidelines of the Ministry of Religious Affairs Bangladesh and Saudi Arabia. We ensure seamless air tickets, visa processing, and guaranteed 3-star/5-star hotels near Haram.
              </>
            )}
          </p>

          <div className="bg-white/90 p-4.5 rounded-2xl border border-rose-200/60 space-y-2 text-xs font-semibold text-slate-800 shadow-2xs">
            <p className="font-bold text-[#0D472B] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'গুরত্বপূর্ণ যে বিষয়গুলো খেয়াল রাখবেন:' : 'Key Prerequisites:'}</span>
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-1">
              <li>{lang === 'bn' ? 'পাসপোর্টের মেয়াদ ন্যূনতম ৬ মাস অবশিষ্ট থাকতে হবে।' : 'Passport must have at least 6 months validity.'}</li>
              <li>{lang === 'bn' ? 'অভিজ্ঞ মোয়াল্লেম দ্বারা উমরাহের তাওয়াফ ও সাঈ হাতে-কলমে প্রশিক্ষণ দেওয়া হয়।' : 'Hands-on Tawaf and Sa’i training provided by experienced Moallem.'}</li>
              <li>{lang === 'bn' ? 'মক্কা ও মদিনায় ৩ বেলা দেশীয় সুস্বাদু খাবার অন্তর্ভুক্ত প্যাকেজের ব্যবস্থা রয়েছে।' : 'Delicious 3-time Bengali meals included in standard packages.'}</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 opacity-70">
              <div className="w-4 h-4 rotate-45 border-2 border-rose-400 bg-rose-200/50" />
              <div className="w-4 h-4 rotate-45 border-2 border-[#D4AF37] bg-amber-200/50 -ml-1.5" />
              <div className="w-4 h-4 rotate-45 border-2 border-emerald-500 bg-emerald-200/50 -ml-1.5" />
            </div>

            <button
              onClick={() => onNavigate('umrah')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold px-7 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <span>{lang === 'bn' ? 'বিস্তারিত জানতে ক্লিক করুন' : 'Click to Read Details'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="hidden sm:block w-10" />
          </div>

        </div>
      </section>

      {/* 3. MAJOR SERVICES (৪ টি প্রধান সার্ভিস) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-extrabold text-[#B38712] uppercase tracking-wider block font-sans">
            Our Core Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
            {lang === 'bn' ? 'আমাদের প্রধান সেবাসমূহ' : 'Our Major Services'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service Card 1: Umrah */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-200 shadow-2xs group-hover:bg-[#0D472B] group-hover:text-white transition-colors">
                🕋
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navUmrah')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'শরীয়তসম্মত ও সুশৃঙ্খল উমরাহ্ সফরের জন্য বিভিন্ন ক্যাটাগরির বাজেট ও প্রিমিয়াম প্যাকেজ।'
                  : 'Shariah-compliant and disciplined Umrah packages for pilgrims.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('umrah')}
              className="mt-6 w-full bg-[#FAF8F5] group-hover:bg-[#0D472B] text-[#0D472B] group-hover:text-white py-2.5 rounded-full text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Service Card 2: Hajj */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-200 shadow-2xs group-hover:bg-[#0D472B] group-hover:text-white transition-colors">
                🕌
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navHajj')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? '২০২৭ সালের পবিত্র হজ্ব্বসহ দীর্ঘ ৪০ দিন ও সংক্ষিপ্ত মেয়াদী প্যাকেজ সুবিধা।'
                  : 'Long & short duration Holy Hajj 2027 packages.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('hajj')}
              className="mt-6 w-full bg-[#FAF8F5] group-hover:bg-[#0D472B] text-[#0D472B] group-hover:text-white py-2.5 rounded-full text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Service Card 3: Air Tickets */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-200 shadow-2xs group-hover:bg-[#0D472B] group-hover:text-white transition-colors">
                ✈
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navAirTickets')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'সৌদিয়া, বিমান বাংলাদেশসহ দেশী-বিদেশী সকল এয়ারলাইন্সের টিকিট বুকিং।'
                  : 'Domestic & International flight bookings at best rates.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('air-tickets')}
              className="mt-6 w-full bg-[#FAF8F5] group-hover:bg-[#0D472B] text-[#0D472B] group-hover:text-white py-2.5 rounded-full text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Service Card 4: Tours & Visas */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-200 shadow-2xs group-hover:bg-[#0D472B] group-hover:text-white transition-colors">
                🌍
              </div>
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'navToursVisas')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'থাইল্যান্ড, মালয়েশিয়া, দুবাই ও তুরস্ক ট্যুর প্যাকেজ এবং দ্রুত ই-ভিসা।'
                  : 'International tour packages and fast e-visa processing.'
                }
              </p>
            </div>
            <button
              onClick={() => onNavigate('tours-visas')}
              className="mt-6 w-full bg-[#FAF8F5] group-hover:bg-[#0D472B] text-[#0D472B] group-hover:text-white py-2.5 rounded-full text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>{getTranslation(lang, 'viewDetails')}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. FEATURED UMRAH & HAJJ PACKAGES SHOWCASE */}
      <section className="bg-emerald-950/5 py-12 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block font-sans">
                Featured Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
                {lang === 'bn' ? 'আমাদের বিশেষ আকর্ষণীয় প্যাকেজসমূহ' : 'Featured Umrah & Hajj Packages'}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-slate-200 shadow-2xs text-xs font-bold">
              <button
                onClick={() => setPackageCategory('all')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  packageCategory === 'all' ? 'bg-[#0D472B] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'bn' ? 'সব' : 'All'}
              </button>
              <button
                onClick={() => setPackageCategory('umrah')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  packageCategory === 'umrah' ? 'bg-[#0D472B] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'bn' ? 'উমরাহ্' : 'Umrah'}
              </button>
              <button
                onClick={() => setPackageCategory('hajj')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  packageCategory === 'hajj' ? 'bg-[#0D472B] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'bn' ? 'হজ্ব' : 'Hajj'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {umrahPackages.slice(0, 3).map((pkg) => {
              const adapted = adaptUmrahPackage(pkg);
              return (
                <PackageCard
                  key={pkg.id}
                  lang={lang}
                  pkg={adapted}
                  onViewDetails={(item) => setSelectedDetailPackage(item)}
                />
              );
            })}
          </div>

          <div className="text-center pt-8">
            <button
              onClick={() => onNavigate('umrah')}
              className="inline-flex items-center gap-2 bg-white text-[#0D472B] border-2 border-[#0D472B] hover:bg-[#0D472B] hover:text-white px-8 py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>{lang === 'bn' ? 'সকল প্যাকেজ একসাথে দেখুন' : 'Explore All Travel Packages'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. ACCORDION FAQ & GUIDES ("আরও দেখুন") */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-slate-100 via-emerald-50/80 to-slate-100 px-6 py-4 border-b border-slate-200">
            <h3 className="text-base font-black text-[#0D472B]">
              {lang === 'bn' ? 'আরও দেখুন & প্রয়োজনীয় নির্দেশিকা' : 'Explore More Guides & Instructions'}
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                titleBn: 'ইতিহাস ও এজেন্সী পরিচিতি (Agency Background & History)',
                titleEn: 'Agency History & Background',
                contentBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস বিগত দীর্ঘ সময় ধরে সততা ও বিশ্বস্ততার সাথে বাংলাদেশ থেকে উমরাহ্, হজ্ব ও আন্তর্জাতিক ফ্লাইট সেবা প্রদান করে আসছে। আমাদের প্রধান লক্ষ্য হাজীদের সর্বোচ্চ খেদমত প্রদান করা।',
                contentEn: 'World Heritage Tours & Travels has been faithfully serving pilgrims and travelers from Bangladesh with top-rated flight and pilgrimage packages.'
              },
              {
                titleBn: 'মেডিকেল ও ভ্রমণ নির্দেশিকা (Medical & Travel Rules)',
                titleEn: 'Medical & Travel Guidelines',
                contentBn: 'পবিত্র ভূমি মক্কা ও মদিনায় ভ্রমণের পূর্বে প্রয়োজনীয় স্বাস্থ্য পরীক্ষা, ম্যানিনজাইটিস টিকাদান এবং ট্রাভেল ইন্স্যুরেন্স সংক্রান্ত নির্দেশনাবলী আমাদের অফিস থেকে সার্বক্ষণিক প্রদান করা হয়।',
                contentEn: 'Health checkups, mandatory vaccinations, and travel insurance guidelines are thoroughly managed by our experienced team.'
              },
              {
                titleBn: 'ভ্রমণ নির্দেশিকা ও ভিসা নীতি (Travel Guides & Visas)',
                titleEn: 'Travel Guides & Visa Policies',
                contentBn: 'সৌদি উমরাহ ভিসা, দুবাই ই-ভিসা, থাইল্যান্ড ট্যুরিস্ট ভিসা এবং এয়ার টিকিট বুকিংয়ের সঠিক ও সময়োপযোগী তথ্য জানতে আমাদের পান্থপথ অফিসে যোগাযোগ করুন।',
                contentEn: 'Contact our Panthapath office for Saudi Umrah E-visa, Dubai E-visa, and tourist visa processing.'
              }
            ].map((item, idx) => {
              const isOpen = openAccordion === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <span className="text-sm font-bold text-slate-800">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90 text-[#0D472B]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-emerald-50/30 border-t border-emerald-100/50">
                      {lang === 'bn' ? item.contentBn : item.contentEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. OUR DISTINCTIVE FEATURES (আমাদের বৈশিষ্ঠ্য) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#0D472B] via-[#083620] to-[#03180D] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-sans">
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
              <div key={idx} className="bg-white/10 backdrop-blur-md p-4.5 rounded-2xl border border-white/15 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GOVERNMENT ACCREDITATIONS & LICENSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block font-sans">
              Govt. Approved & Licensed Agency
            </span>
            <h3 className="text-xl font-black text-[#0D472B]">
              {lang === 'bn' ? 'আমাদের সরকারি স্বীকৃতি ও আইএটিএ সদস্যপদ' : 'Our Government Approvals & Licenses'}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
              <ShieldCheck className="w-8 h-8 text-[#0D472B] mx-auto" />
              <p className="text-xs font-bold text-[#0D472B]">{lang === 'bn' ? 'বাংলাদেশ ধর্ম মন্ত্রণালয়' : 'Ministry of Religious Affairs'}</p>
              <p className="text-[11px] text-slate-600 font-sans font-semibold">Approved Hajj Agency</p>
            </div>

            <div className="p-4.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
              <Award className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <p className="text-xs font-bold text-amber-900">{lang === 'bn' ? 'সৌদি উমরাহ্ মন্ত্রণালয়' : 'Saudi Ministry of Hajj & Umrah'}</p>
              <p className="text-[11px] text-slate-600 font-sans font-semibold">Registered Saudi Partner</p>
            </div>

            <div className="p-4.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
              <Building2 className="w-8 h-8 text-[#0D472B] mx-auto" />
              <p className="text-xs font-bold text-[#0D472B]">{lang === 'bn' ? 'সিভিল এভিয়েশন কর্তৃপক্ষ' : 'Civil Aviation Authority (CAAB)'}</p>
              <p className="text-[11px] text-slate-600 font-sans font-semibold">Licensed Ticket Agent</p>
            </div>

            <div className="p-4.5 rounded-2xl bg-rose-50/80 border border-rose-200/80 space-y-1">
              <Plane className="w-8 h-8 text-rose-700 mx-auto" />
              <p className="text-xs font-bold text-rose-950">{lang === 'bn' ? 'আইএটিএ মেম্বার' : 'IATA Member'}</p>
              <p className="text-[11px] text-slate-600 font-sans font-semibold">Global Airline Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DIRECT CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#052917] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-sans">
              {lang === 'bn' ? 'যেকোনো জিজ্ঞাসায় সরাসরি আমাদের হটলাইনে যোগাযোগ করুন' : 'Call Us Directly for Any Flight or Package Query'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              {lang === 'bn' ? 'প্রধান অফিস: পশ্চিম পান্থপথ জামে-মসজিদের বিপরীত পাশে, ঢাকা-১২১৫' : 'Panthapath Main Office, Dhaka-1215'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${agencyInfo.hotline}`}
              className="bg-[#D4AF37] text-emerald-950 px-6 py-3 rounded-full font-extrabold text-sm shadow-md hover:bg-[#C59B27] transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{agencyInfo.hotline}</span>
              <span className="text-xs font-semibold text-emerald-900/90 font-bengali">
                ({lang === 'bn' ? 'হোয়াটসঅ্যাপ & ইমো' : 'WhatsApp & Imo'})
              </span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="bg-emerald-900 border border-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-emerald-800 transition-all"
            >
              {getTranslation(lang, 'contactCTA')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
