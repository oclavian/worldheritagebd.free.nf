import React, { useState } from 'react';
import { Plane, CheckCircle2, Mail, Building, FileText, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { partnerAirlines } from '../content/air-tickets';

interface AirTicketsPageProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const AirTicketsPage: React.FC<AirTicketsPageProps> = ({
  lang,
  onOpenBookingModal,
}) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [fromCity, setFromCity] = useState(lang === 'bn' ? 'ঢাকা (DAC)' : 'Dhaka (DAC)');
  const [toCity, setToCity] = useState(lang === 'bn' ? 'জেদ্দা (JED)' : 'Jeddah (JED)');
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState('');

  const airlines = partnerAirlines;

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingModal(
      'Air Ticket',
      `${fromCity} → ${toCity} (${tripType === 'round-trip' ? 'Round Trip' : 'One Way'}), Date: ${travelDate}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      
      {/* Hero Banner */}
      <div className="bg-[#052917] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F3E0A0]">
            <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'অভ্যন্তরীণ ও আন্তর্জাতিক এয়ার টিকিট' : 'Domestic & International Flight Tickets'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans leading-tight">
            {getTranslation(lang, 'airTicketHeading')}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            {getTranslation(lang, 'airTicketSubheading')}
          </p>
        </div>
      </div>

      {/* Flight Search / Booking Form Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DEC8] shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-[#0D472B] flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'ফ্লাইট টিকিট ইনকোয়ারি' : 'Flight Ticket Inquiry'}</span>
          </h2>

          <div className="flex items-center bg-emerald-50 rounded-xl p-1 border border-emerald-200 text-xs font-bold text-[#0D472B]">
            <button
              onClick={() => setTripType('round-trip')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tripType === 'round-trip' ? 'bg-[#0D472B] text-white shadow-sm' : ''
              }`}
            >
              {lang === 'bn' ? 'রাউন্ড ট্রিপ (আসা-যাওয়া)' : 'Round Trip'}
            </button>
            <button
              onClick={() => setTripType('one-way')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tripType === 'one-way' ? 'bg-[#0D472B] text-white shadow-sm' : ''
              }`}
            >
              {lang === 'bn' ? 'ওয়ান ওয়ে (একমুখী)' : 'One Way'}
            </button>
          </div>
        </div>

        <form onSubmit={handleFlightSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'কোথা থেকে (Departure)' : 'Departure City'}
            </label>
            <input
              type="text"
              required
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-[#0D472B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'কোথায় যাবেন (Destination)' : 'Destination City'}
            </label>
            <input
              type="text"
              required
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-[#0D472B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {getTranslation(lang, 'preferredDate')}
            </label>
            <input
              type="date"
              required
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-[#0D472B]"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition-all border border-[#D4AF37] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'টিকিট অনুসন্ধান ইনকোয়ারি' : 'Search Flight Inquiry'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Commitment Section */}
      <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 space-y-3 text-emerald-950">
        <h3 className="text-xl font-bold font-sans text-[#0D472B]">
          {getTranslation(lang, 'ourCommitmentTitle')}
        </h3>
        <p className="text-sm leading-relaxed text-slate-800">
          {getTranslation(lang, 'ourCommitmentText')}
        </p>
      </div>

      {/* How To Get Ticket Section (কিভাবে টিকেট পাবেন?) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-extrabold text-[#0D472B]">
            {getTranslation(lang, 'howToGetTitle')}
          </h2>
          <p className="text-xs text-slate-600">
            {lang === 'bn' ? 'আপনার সুবিধাজনক মাধ্যমে যেকোনো স্থান থেকে টিকিট সংগ্রহ করুন' : 'Collect your ticket copy smoothly via your preferred method'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-[#E6DEC8] shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-300 text-[#0D472B]">
              <Building className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'getWay1Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {getTranslation(lang, 'getWay1Desc')}
              </p>
              <span className="text-[11px] font-bold text-[#B38712] block pt-1">
                {lang === 'bn' ? 'ঠিকানা: ৪৩-আর/৮, ইন্দিরা রোড, পান্থপথ, ঢাকা-১২১৫' : 'Address: 43-R/8, Indira Road, Panthapath, Dhaka-1215'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#E6DEC8] shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-300 text-[#0D472B]">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0D472B]">
                {getTranslation(lang, 'getWay2Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {getTranslation(lang, 'getWay2Desc')}
              </p>
              <span className="text-[11px] font-bold text-[#B38712] block pt-1">
                {lang === 'bn' ? 'ইমেইল: worldheritagebd@gmail.com' : 'Email: worldheritagebd@gmail.com'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Documents Section (প্রয়োজনীয় কাগজপত্র) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DEC8] space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-2xl font-extrabold text-[#0D472B]">
            {getTranslation(lang, 'reqDocsTitle')}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {lang === 'bn' ? 'এয়ার টিকিট কাটার সময় যেসব তথ্য ও ডকুমেন্ট প্রয়োজন' : 'Required information & documents for issuing flight tickets'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Domestic */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-[#0D472B] flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-lg">🇧🇩</span>
              <span>{getTranslation(lang, 'docDomestic')}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqNid')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqName')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqDob')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqPhone')}</span>
              </li>
            </ul>
          </div>

          {/* International */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-[#0D472B] flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-lg">✈</span>
              <span>{getTranslation(lang, 'docInternational')}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqPassport')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqVisa')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B]" />
                <span>{getTranslation(lang, 'reqPhone')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Partner Airlines Grid */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6DEC8] space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider text-center">
          {lang === 'bn' ? 'আমাদের সহযোগী এয়ারলাইন্স সমূহ' : 'Partner Airlines'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {airlines.map((air, i) => (
            <div key={i} className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2">
              <span className="text-lg">{air.logo}</span>
              <span>{air.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
