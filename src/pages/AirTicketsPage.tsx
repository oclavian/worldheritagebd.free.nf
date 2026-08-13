import React from 'react';
import {
  Plane,
  Globe,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Building,
  PhoneCall,
  MessageSquare,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
  ExternalLink,
  Zap,
  ArrowRight,
  Headphones,
  Check,
  Award
} from 'lucide-react';
import { Language } from '../types';
import { partnerAirlines } from '../content/air-tickets';

interface AirTicketsPageProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const AirTicketsPage: React.FC<AirTicketsPageProps> = ({
  lang,
  onOpenBookingModal,
}) => {
  const isBn = lang === 'bn';

  // Extended airlines list for futuristic partner grid
  const allAirlines = [
    ...partnerAirlines,
    { name: 'Singapore Airlines', code: 'SQ', logo: '🇸🇬' },
    { name: 'Etihad Airways', code: 'EY', logo: '🇦🇪' },
    { name: 'Gulf Air', code: 'GF', logo: '🇧🇭' },
    { name: 'Oman Air', code: 'WY', logo: '🇴🇲' },
    { name: 'Thai Airways', code: 'TG', logo: '🇹🇭' },
    { name: 'Turkish Airlines', code: 'TK', logo: '🇹🇷' },
  ];

  // Popular routes showcase
  const popularRoutes = [
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'জেদ্দা' : 'Jeddah', toCode: 'JED', type: isBn ? 'আন্তর্জাতিক' : 'International', flag: '🇸🇦', popular: true },
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'মদিনা' : 'Madinah', toCode: 'MED', type: isBn ? 'আন্তর্জাতিক' : 'International', flag: '🇸🇦', popular: true },
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'দুবাই' : 'Dubai', toCode: 'DXB', type: isBn ? 'আন্তর্জাতিক' : 'International', flag: '🇦🇪', popular: true },
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'লন্ডন' : 'London', toCode: 'LHR', type: isBn ? 'আন্তর্জাতিক' : 'International', flag: '🇬🇧', popular: false },
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'কক্সবাজার' : "Cox's Bazar", toCode: 'CXB', type: isBn ? 'অভ্যন্তরীণ' : 'Domestic', flag: '🇧🇩', popular: true },
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'সিলেট' : 'Sylhet', toCode: 'ZYL', type: isBn ? 'অভ্যন্তরীণ' : 'Domestic', flag: '🇧🇩', popular: false },
    { from: isBn ? 'ঢাকা' : 'Dhaka', fromCode: 'DAC', to: isBn ? 'চট্টগ্রাম' : 'Chittagong', toCode: 'CGP', type: isBn ? 'অভ্যন্তরীণ' : 'Domestic', flag: '🇧🇩', popular: false },
    { from: isBn ? 'চট্টগ্রাম' : 'Chittagong', fromCode: 'CGP', to: isBn ? 'জেদ্দা' : 'Jeddah', toCode: 'JED', type: isBn ? 'আন্তর্জাতিক' : 'International', flag: '🇸🇦', popular: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-14 font-bengali">
      
      {/* FUTURISTIC HERO BANNER */}
      <div className="relative bg-gradient-to-br from-[#021f11] via-[#04331d] to-[#01140b] text-white rounded-3xl p-6 sm:p-12 border-2 border-[#D4AF37]/80 shadow-2xl overflow-hidden">
        
        {/* Futuristic Ambient Glows & Grid overlay */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Futuristic Floating Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-emerald-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
              <span>{isBn ? 'গ্লোবাল ও ডমেস্টিক ফ্লাইট সার্ভিস' : 'Global & Domestic Flight Service'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-emerald-900/90 text-emerald-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-700/80 backdrop-blur-md">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isBn ? 'আন্তর্জাতিক ও অভ্যন্তরীণ সকল রুট' : 'All World & Domestic Routes'}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans tracking-tight">
            {isBn ? (
              <>
                দেশ-বিদেশের <span className="text-[#D4AF37] underline decoration-[#D4AF37]/50 underline-offset-8">সকল রুটের</span> যেকোনো এয়ার টিকিট এখন ঘরে বসেই!
              </>
            ) : (
              <>
                Book Flight Tickets for <span className="text-[#D4AF37]">All World & Domestic</span> Routes Instantly!
              </>
            )}
          </h1>

          {/* Core Service Announcement Box */}
          <div className="bg-emerald-950/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-[#D4AF37]/60 space-y-2 shadow-inner">
            <p className="text-base sm:text-xl font-extrabold text-[#F3E0A0] leading-snug">
              {isBn
                ? '🌍 আমরা পুরো World (বিশ্বের সকল আন্তর্জাতিক গন্তব্য) ও বাংলাদেশের অভ্যন্তরীণ (Domestic) সকল এয়ারলাইন্সের টিকিট বিশ্বস্ততার সাথে কেটে থাকি।'
                : '🌍 We issue confirmed flight tickets for all International destinations worldwide and all Domestic airlines in Bangladesh with complete reliability.'
              }
            </p>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {isBn
                ? 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস-এর মাধ্যমে কোনো অতিরিক্ত বাড়তি চার্জ ছাড়া আপনার পছন্দের তারিখে যেকোনো এয়ারলাইন্সের টিকিট সর্বনিম্ন মূল্যে বুকিং কনফার্ম করুন।'
                : 'Confirm flight tickets at guaranteed best prices for any airline on your preferred date without hidden fees through World Heritage Tours & Travels.'
              }
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{isBn ? '১৯০+ দেশ' : '190+ Countries'}</p>
                <p className="text-[10px] text-emerald-300">{isBn ? 'ইন্টারন্যাশনাল' : 'International'}</p>
              </div>
            </div>

            <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{isBn ? 'সকল বিমানবন্দর' : 'All Airports'}</p>
                <p className="text-[10px] text-emerald-300">{isBn ? 'BD অভ্যন্তরীণ' : 'Domestic BD'}</p>
              </div>
            </div>

            <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{isBn ? 'তাত্ক্ষণিক ইস্যু' : 'Instant Issue'}</p>
                <p className="text-[10px] text-emerald-300">{isBn ? 'ডিজিটাল ই-টিকিট' : 'E-Ticket Copy'}</p>
              </div>
            </div>

            <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{isBn ? 'সর্বনিম্ন মূল্য' : 'Best Price'}</p>
                <p className="text-[10px] text-emerald-300">{isBn ? 'গ্যারান্টিড সেবা' : 'Guaranteed'}</p>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenBookingModal('Air Ticket', isBn ? 'এয়ার টিকিট ইনকোয়ারি ও বুকিং' : 'Air Ticket Inquiry & Booking')}
              className="bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-8 py-4 rounded-2xl text-sm sm:text-base shadow-xl flex items-center gap-2.5 transform active:scale-95 transition-all group"
            >
              <Plane className="w-5 h-5 text-emerald-950" />
              <span>{isBn ? 'টিকিট বুক করতে সরাসরি যোগাযোগ করুন' : 'Contact for Instant Booking'}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/8801627737741"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold px-6 py-4 rounded-2xl text-sm border border-[#D4AF37]/50 flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>{isBn ? 'হোয়াটসঅ্যাপ হেল্পডেস্ক' : 'WhatsApp Desk'}</span>
            </a>
          </div>

        </div>
      </div>

      {/* FUTURISTIC POPULAR ROUTE SHOWCASE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase block">
              {isBn ? 'পপুলার ফ্লাইট রুটসমূহ' : 'Popular Flight Routes'}
            </span>
            <h2 className="text-2xl font-black text-[#0D472B] font-sans">
              {isBn ? 'জনপ্রিয় অভ্যন্তরীণ ও আন্তর্জাতিক গন্তব্য' : 'Top Domestic & International Destinations'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            {isBn ? 'উপরে উল্লিখিত রুট ছাড়াও পৃথিবীর যেকোনো দেশের ফ্লাইটের টিকিট আমরা তাত্ক্ষণিক কাটতে পারি।' : 'Besides these popular routes, we issue flight tickets to any global destination.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularRoutes.map((route, idx) => (
            <div
              key={idx}
              onClick={() => onOpenBookingModal('Air Ticket', `${route.from} → ${route.to} (${route.type})`)}
              className="group bg-gradient-to-br from-white to-emerald-50/50 hover:from-emerald-900 hover:to-emerald-950 hover:text-white p-4 rounded-2xl border-2 border-emerald-100 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-800 group-hover:text-[#D4AF37] bg-emerald-100 group-hover:bg-emerald-800/60 px-2.5 py-0.5 rounded-full transition-colors">
                  {route.type}
                </span>
                <span className="text-lg">{route.flag}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-base font-black text-slate-800 group-hover:text-white">{route.from}</p>
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-300">{route.fromCode}</p>
                </div>

                <div className="flex flex-col items-center px-2">
                  <Plane className="w-5 h-5 text-[#D4AF37] transform group-hover:translate-x-1 transition-transform" />
                  <div className="w-12 h-0.5 bg-emerald-200 group-hover:bg-[#D4AF37] mt-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-black text-slate-800 group-hover:text-white">{route.to}</p>
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-300">{route.toCode}</p>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-[#0D472B] group-hover:text-[#F3E0A0]">
                <span>{isBn ? 'ইনকোয়ারি পাঠান' : 'Send Inquiry'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OUR PROMISES & FEATURES */}
      <div className="bg-gradient-to-br from-[#021f11] via-[#0D472B] to-[#04331d] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/60 text-white space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="relative z-10 border-b border-emerald-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{isBn ? 'আমাদের প্রতিশ্রুতি' : 'Our Commitment'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            {isBn ? 'কেন ওয়ার্ল্ড হেরিটেজ থেকে টিকিট কাটবেন?' : 'Why Choose World Heritage for Flights?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'বিশ্বব্যাপী গ্লোবাল কভারেজ' : 'Worldwide Global Coverage'}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isBn
                ? 'আন্তর্জাতিক ও দেশের ভেতরের সকল এয়ারলাইন্সের বুকিং সিস্টেম আমাদের সাথে সরাসরি সংযুক্ত।'
                : 'Direct GDS access to all international and domestic airlines worldwide.'
              }
            </p>
          </div>

          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'সর্বনিম্ন মূল্য ও স্বচ্ছতা' : 'Best Fare & Transparency'}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isBn
                ? 'কোনো হিডেন বা গোপন চার্জ ছাড়াই এয়ারলাইন্সের অফিশিয়াল সর্বনিম্ন ফেয়ার সুবিধা পাবেন।'
                : 'Get official airline lowest fares without any hidden extra charges.'
              }
            </p>
          </div>

          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? '২৪/৭ সাপোর্ট ও রি-ইস্যু' : '24/7 Support & Re-issue'}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isBn
                ? 'ইমার্জেন্সি ডেট চেঞ্জ, ফ্লাইট বাতিল বা রিফান্ডের যেকোনো প্রয়োজনে নিবেদিত হেল্পডেস্ক টিম।'
                : 'Dedicated desk team for date changes, flight cancellations, or refund assistance.'
              }
            </p>
          </div>

        </div>
      </div>

      {/* HOW TO GET TICKET SECTION */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
            {isBn ? 'টিকিট সংগ্রহের উপায়' : 'Ticket Delivery Options'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
            {isBn ? 'কিভাবে টিকিট পাবেন?' : 'How to Receive Your Flight Ticket?'}
          </h2>
          <p className="text-xs text-slate-600">
            {isBn ? 'আপনার সুবিধাজনক মাধ্যমে যেকোনো স্থান থেকে টিকিট কপি সংগ্রহ করুন' : 'Collect your ticket copy smoothly via your preferred method'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-md hover:border-[#D4AF37] transition-all flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-200 text-[#0D472B]">
              <Building className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#0D472B]">
                {isBn ? '০১ — সরাসরি পান্থপথ অফিস থেকে' : '01 — Direct Office Collection'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'আমাদের অফিসে এসে সরাসরি প্রিন্টেড কনফার্মড টিকিট কপি হ্যান্ডওভার নিতে পারেন।'
                  : 'Visit our main office and collect your physical printed ticket copy directly.'
                }
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B38712] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{isBn ? 'ঠিকানা: ৪৩-আর/৮, ইন্দিরা রোড, পান্থপথ, ঢাকা-১২১৫' : 'Address: 43-R/8, Indira Road, Panthapath, Dhaka-1215'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-md hover:border-[#D4AF37] transition-all flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-200 text-[#0D472B]">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#0D472B]">
                {isBn ? '০২ — ইমেইল / WhatsApp-এর মাধ্যমে' : '02 — Via Email & WhatsApp'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'টিকিটের ডিজিটাল E-Copy আপনার দেওয়া ইমেইল বা হোয়াটসঅ্যাপে মুহূর্তেই পাঠানো হবে।'
                  : 'Get your digital E-Ticket PDF copy directly sent to your WhatsApp or Email.'
                }
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B38712] pt-1">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{isBn ? 'ইমেইল: worldheritagebd@gmail.com' : 'Email: worldheritagebd@gmail.com'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REQUIRED DOCUMENTS SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0D472B]">
              {isBn ? 'প্রয়োজনীয় কাগজপত্র' : 'Required Documents'}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {isBn ? 'এয়ার টিকিট বুকিং ও ইস্যুর সময় যেসব তথ্য ও ডকুমেন্ট প্রয়োজন' : 'Necessary information & documents for issuing flight tickets'}
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full w-max">
            {isBn ? 'সহজ প্রসেসিং' : 'Hassle-free Processing'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic Requirements */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h3 className="text-base font-extrabold text-[#0D472B] flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="flex items-center gap-2">
                <span className="text-xl">🇧🇩</span>
                <span>{isBn ? 'BD অভ্যন্তরীণ (Domestic)' : 'BD Domestic Routes'}</span>
              </span>
              <span className="text-[10px] bg-[#0D472B] text-white px-2 py-0.5 rounded-md font-bold">BD Internal</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'এনআইডি (NID) / জন্ম সনদ:' : 'NID / Birth Cert: '}</strong> {isBn ? 'ফটোকপি বা স্পষ্ট ছবি' : 'Photocopy or clear image'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'যাত্রীর পুরো নাম:' : 'Full Name: '}</strong> {isBn ? 'এনআইডি অনুযায়ী সঠিক বানান' : 'Spelling as per NID'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'ভ্রমণের তারিখ:' : 'Travel Date: '}</strong> {isBn ? 'পছন্দনীয় ফ্লাইট সিডিউল' : 'Preferred flight schedule'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'মোবাইল নম্বর:' : 'Mobile Number: '}</strong> {isBn ? 'কনফার্মেশন এসএমএস প্রাপ্তির জন্য' : 'For booking confirmation SMS'}</span>
              </li>
            </ul>
          </div>

          {/* International Requirements */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h3 className="text-base font-extrabold text-[#0D472B] flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="flex items-center gap-2">
                <span className="text-xl">✈</span>
                <span>{isBn ? 'আন্তর্জাতিক (International)' : 'International Routes'}</span>
              </span>
              <span className="text-[10px] bg-[#0D472B] text-white px-2 py-0.5 rounded-md font-bold">Global Flights</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'পাসপোর্ট কপি:' : 'Passport Copy: '}</strong> {isBn ? 'ন্যূনতম ৬ মাস মেয়াদী পাসপোর্ট' : 'Minimum 6 months validity'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'ভ্যালিড ভিসা কপি:' : 'Valid Visa Copy: '}</strong> {isBn ? 'গন্তব্য দেশের প্রযোজ্য ভিসা' : 'Applicable visa for destination'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'ভ্রমণের সময়সূচি:' : 'Travel Dates: '}</strong> {isBn ? 'ওয়ান-ওয়ে বা রাউন্ড ট্রিপ বিস্তারিত' : 'One-way or Round-trip details'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span><strong>{isBn ? 'যোগাযোগ নম্বর:' : 'Contact No: '}</strong> {isBn ? 'যাত্রীর সচল মোবাইল ও ইমেইল' : 'Active mobile & email'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* PARTNER AIRLINES GRID */}
      <div className="bg-[#021f11] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 text-white space-y-5 shadow-xl">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
            {isBn ? 'আমাদের সহযোগী নেটওয়ার্ক' : 'Partner Network'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-sans">
            {isBn ? 'আমাদের সহযোগী এয়ারলাইন্স সমূহ' : 'Partner Airlines'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            {isBn ? 'দেশি-বিদেশি খ্যাতনামা এয়ারলাইন্সের অফিসিয়াল টিকিট সার্ভিস' : 'Official ticketing partner for top domestic and international carriers'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allAirlines.map((air, i) => (
            <div
              key={i}
              className="p-3 bg-emerald-950/80 hover:bg-emerald-900 rounded-xl border border-emerald-800/80 hover:border-[#D4AF37] transition-all flex items-center justify-between gap-2 shadow-xs group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl shrink-0">{air.logo}</span>
                <span className="text-xs font-bold text-white group-hover:text-[#F3E0A0] transition-colors">{air.name}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-900 px-1.5 py-0.5 rounded shrink-0 border border-emerald-700">
                {air.code}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CONTACT FOOTER BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-2xl p-6 text-white text-center space-y-3 border border-[#D4AF37]/50 shadow-lg">
        <h3 className="text-xl font-black text-[#F3E0A0]">
          {isBn ? 'যেকোনো রুটের টিকিটের রেট ও অফার জানতে আজই কল করুন' : 'Call Today to Check Flight Rates & Special Deals'}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
          {isBn
            ? 'পান্থপথ পান্থকুঞ্জ পার্কের বিপরীতে আমাদের প্রধান কার্যালয়ে আসুন অথবা ফোনে যোগাযোগ করে আপনার পছন্দের ফ্লাইট নিশ্চিত করুন।'
            : 'Visit our Panthapath main office or call us directly to book your flight tickets instantly.'
          }
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenBookingModal('Air Ticket', isBn ? 'এয়ার টিকিট সরাসরি ইনকোয়ারি' : 'Air Ticket Inquiry')}
            className="bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-emerald-950" />
            <span>{isBn ? 'ইনকোয়ারি পাঠান' : 'Submit Inquiry'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
