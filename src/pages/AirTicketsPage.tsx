import React, { useState } from "react";
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
  Award,
  Search,
  Filter,
  Luggage,
  Calendar,
  Layers,
  FileText,
} from "lucide-react";
import { Language } from "../types";
import { partnerAirlines } from "../content/air-tickets";
import {
  flightDestinations,
  FlightDestination,
} from "../data/flightDestinations";

interface AirTicketsPageProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const AirTicketsPage: React.FC<AirTicketsPageProps> = ({
  lang,
  onOpenBookingModal,
}) => {
  const isBn = lang === "bn";

  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extended airlines list for partner grid
  const allAirlines = [
    ...partnerAirlines,
    { name: "Singapore Airlines", code: "SQ", logo: "🇸🇬" },
    { name: "Etihad Airways", code: "EY", logo: "🇦🇪" },
    { name: "Gulf Air", code: "GF", logo: "🇧🇭" },
    { name: "Oman Air", code: "WY", logo: "🇴🇲" },
    { name: "Thai Airways", code: "TG", logo: "🇹🇭" },
    { name: "Turkish Airlines", code: "TK", logo: "🇹🇷" },
    { name: "Malaysia Airlines", code: "MH", logo: "🇲🇾" },
    { name: "Air Astra", code: "2A", logo: "🇧🇩" },
  ];

  // Filter destinations by region and search term
  const filteredDestinations = flightDestinations.filter((dest) => {
    const matchesRegion =
      selectedRegion === "all" || dest.region === selectedRegion;
    const matchesSearch =
      searchQuery === "" ||
      dest.cityBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.cityEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.countryBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.countryEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.iata.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.airportBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.airportEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const regions = [
    {
      id: "all",
      labelBn: "🌍 সকল গন্তব্য (All)",
      labelEn: "All Destinations",
      count: flightDestinations.length,
    },
    {
      id: "domestic",
      labelBn: "🇧🇩 অভ্যন্তরীণ বাংলাদেশ",
      labelEn: "Domestic BD",
      count: flightDestinations.filter((d) => d.region === "domestic").length,
    },
    {
      id: "south-asia",
      labelBn: "🇮🇳 দক্ষিণ এশিয়া (ভারত)",
      labelEn: "South Asia",
      count: flightDestinations.filter((d) => d.region === "south-asia").length,
    },
    {
      id: "middle-east",
      labelBn: "🇸🇦 মধ্যপ্রাচ্য (সৌদি, দুবাই, কাতার)",
      labelEn: "Middle East",
      count: flightDestinations.filter((d) => d.region === "middle-east")
        .length,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-14 font-bengali">
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-br from-[#021f11] via-[#0D472B] to-[#04331d] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/80 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full shadow-md">
                <Plane className="w-3.5 h-3.5 text-emerald-950" />
                <span>
                  {isBn
                    ? "আন্তর্জাতিক ও অভ্যন্তরীণ এয়ার টিকিট"
                    : "Domestic & International Air Tickets"}
                </span>
              </span>
              <span className="bg-emerald-950/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-700">
                {isBn
                  ? "সর্বনিম্ন ফেয়ার গ্যারান্টি • দ্রুত কনফার্মেশন"
                  : "Best Fare Guarantee • Instant Confirmation"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-sans tracking-tight">
              {isBn ? (
                <>
                  মধ্যপ্রাচ্য, ভারত ও দেশের অভ্যন্তরে{" "}
                  <span className="text-[#D4AF37]">সকল এয়ার টিকিট</span> কাটুন
                  সর্বনিম্ন মূল্যে!
                </>
              ) : (
                <>
                  Book Flight Tickets for{" "}
                  <span className="text-[#D4AF37]">
                    Middle East, India & BD Domestic
                  </span>{" "}
                  at Best Fares!
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans max-w-2xl">
              {isBn
                ? "ঢাকা (DAC), চট্টগ্রাম (CGP) ও সিলেট (ZYL) থেকে সৌদি আরব (জেদ্দা, মদিনা, রিয়াদ, দাম্মাম), দুবাই, আবুধাবি, শারজাহ, কাতার, কুয়েত, ওমান, বাহরাইন, ভারত (কলকাতা, দিল্লি, চেন্নাই) এবং বাংলাদেশের অভ্যন্তরীণ সকল রুটের অফিসিয়াল সর্বনিম্ন ফেয়ারে এয়ার টিকিট সংগ্রহ করুন।"
                : "Get official confirmed air tickets from Dhaka, Chittagong, and Sylhet to Saudi Arabia (Jeddah, Madinah, Riyadh, Dammam), UAE (Dubai, Abu Dhabi, Sharjah), Qatar, Kuwait, Oman, Bahrain, India (Kolkata, Delhi, Chennai), and all domestic Bangladesh routes."}
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isBn ? "জিরো হিডেন চার্জ" : "Zero Hidden Charges"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {isBn
                    ? "তাত্ক্ষণিক ই-টিকিট ডেলিভারি"
                    : "Instant E-Ticket Delivery"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-100 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {isBn ? "২৪/৭ সাপোর্ট ও রি-ইস্যু" : "24/7 Support & Re-issue"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() =>
                onOpenBookingModal(
                  "Air Ticket",
                  isBn
                    ? "এয়ার টিকিট সরাসরি বুকিং ও ইনকোয়ারি"
                    : "Air Ticket Inquiry",
                )
              }
              className="bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all group"
            >
              <Plane className="w-4 h-4 text-emerald-950" />
              <span>
                {isBn ? "টিকিট ইনকোয়ারি পাঠান" : "Instant Ticket Inquiry"}
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/8801627737741?text=Hello%20World%20Heritage%20Travels%2C%20I%20need%20air%20ticket%20booking%20support."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-950/90 hover:bg-emerald-900 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm border border-[#D4AF37]/50 flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {isBn ? "হোয়াটসঅ্যাপ হেল্পডেস্ক" : "WhatsApp 24/7 Desk"}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. EXPANDED COUNTRY & REGION DESTINATION SHOWCASE */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {isBn
                  ? "গ্লোবাল রুট ডিরেক্টরি"
                  : "Global Routes & Destinations"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B] font-sans">
              {isBn
                ? "দেশ-বিদেশের প্রধান গন্তব্য ও ফ্লাইট বিস্তারিত"
                : "Explore Global Flight Destinations & Fares"}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {isBn
                ? "পছন্দের দেশ বা শহর ফিল্টার করুন। যেকোনো রুটে ডিরেক্ট ফ্লাইট, ট্রাভেল সময়, ফ্রি লাগেজ এবং আনুমানিক সর্বনিম্ন ভাড়া এক নজরে দেখে নিন।"
                : "Filter by region or search any country/city to view direct flight options, flight durations, free baggage allowances, and best available fares."}
            </p>
          </div>

          {/* Destination Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? "শহর, দেশ বা কোড খুঁজুন (যেমন: London, JED, Cox)..."
                  : "Search city, country or code..."
              }
              className="w-full bg-white text-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl border-2 border-emerald-200 focus:border-[#D4AF37] focus:outline-hidden shadow-xs font-sans placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedRegion === reg.id
                  ? "bg-[#0D472B] text-white shadow-md font-black border-2 border-[#D4AF37]"
                  : "bg-emerald-50 hover:bg-emerald-100 text-slate-700 border border-emerald-200"
              }`}
            >
              <span>{isBn ? reg.labelBn : reg.labelEn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRegion === reg.id
                    ? "bg-[#D4AF37] text-emerald-950 font-bold"
                    : "bg-emerald-200 text-emerald-900"
                }`}
              >
                {reg.count}
              </span>
            </button>
          ))}
        </div>

        {/* Destinations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl border-2 border-emerald-100 hover:border-[#D4AF37] p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              {/* Top Row: Region & Flag */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {isBn ? dest.regionLabelBn : dest.regionLabelEn}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{dest.flag}</span>
                    <span className="text-xs font-mono font-black bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                      {dest.iata}
                    </span>
                  </div>
                </div>

                {/* City & Country */}
                <div>
                  <h3 className="text-lg font-black text-[#0D472B] group-hover:text-[#B38712] transition-colors flex items-center gap-1.5">
                    <span>{isBn ? dest.cityBn : dest.cityEn}</span>
                    <span className="text-xs font-semibold text-slate-500">
                      ({isBn ? dest.countryBn : dest.countryEn})
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {isBn ? dest.airportBn : dest.airportEn}
                  </p>
                </div>

                {/* Route Visualizer DAC -> DEST */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100/80 flex items-center justify-between text-xs font-mono">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block font-sans">
                      {isBn ? "যাত্রা" : "From"}
                    </span>
                    <strong className="text-[#0D472B] font-black">
                      DAC (ঢাকা)
                    </strong>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold font-sans">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>
                        {isBn ? dest.flightDurationBn : dest.flightDuration}
                      </span>
                    </div>
                    <div className="w-16 h-0.5 bg-emerald-300 relative my-1">
                      <Plane className="w-3.5 h-3.5 text-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 rounded-sm ${dest.directFlight ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                      {dest.directFlight
                        ? isBn
                          ? "ডিরেক্ট ফ্লাইট"
                          : "Direct"
                        : isBn
                          ? "কানেক্টিং"
                          : "Connecting"}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-sans">
                      {isBn ? "গন্তব্য" : "To"}
                    </span>
                    <strong className="text-[#0D472B] font-black">
                      {dest.iata}
                    </strong>
                  </div>
                </div>

                {/* Key Specs: Baggage & Airlines */}
                <div className="space-y-1.5 text-xs text-slate-700 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>
                        {isBn ? "ফ্রি লাগেজ এলাউন্স:" : "Free Baggage:"}
                      </span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {dest.baggageAllowance}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isBn ? "প্রধান এয়ারলাইন্স:" : "Airlines:"}</span>
                    </span>
                    <span className="font-medium text-slate-700 line-clamp-1 text-right max-w-[150px]">
                      {dest.popularAirlines.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Booking Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {isBn
                      ? "গ্যারান্টিযুক্ত সেরা ফেয়ার"
                      : "Best Fare Guaranteed"}
                  </span>
                </div>

                <button
                  onClick={() =>
                    onOpenBookingModal(
                      "Air Ticket",
                      `Dhaka (DAC) ✈ ${dest.cityEn} (${dest.iata}) - ${dest.countryEn}`,
                    )
                  }
                  className="bg-[#0D472B] hover:bg-[#082e1c] text-[#F3E0A0] hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all group/btn border border-[#D4AF37]/40"
                >
                  <span>{isBn ? "বুকিং ইনকোয়ারি" : "Book Ticket"}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredDestinations.length === 0 && (
          <div className="bg-slate-50 p-8 rounded-2xl text-center space-y-2 border-2 border-dashed border-slate-200">
            <Plane className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">
              {isBn
                ? "আপনার অনুসন্ধানের সাথে কোনো নির্দিষ্ট গন্তব্য মেলেনি।"
                : "No destinations match your search query."}
            </p>
            <p className="text-xs text-slate-500">
              {isBn
                ? "তবে আমরা বিশ্বের যেকোনো দেশের যেকোনো রুটের টিকিট কাটতে পারি। সরাসরি যোগাযোগ করুন।"
                : "We can issue tickets to any destination worldwide. Please contact us directly."}
            </p>
            <button
              onClick={() => {
                setSelectedRegion("all");
                setSearchQuery("");
              }}
              className="mt-2 text-xs font-bold text-[#0D472B] underline"
            >
              {isBn ? "সকল রুট দেখুন" : "Show All Routes"}
            </button>
          </div>
        )}
      </div>

      {/* 5. OUR PROMISES & FEATURES */}
      <div className="bg-gradient-to-br from-[#021f11] via-[#0D472B] to-[#04331d] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/60 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 border-b border-emerald-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{isBn ? "আমাদের প্রতিশ্রুতি" : "Our Commitment"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            {isBn
              ? "কেন ওয়ার্ল্ড হেরিটেজ থেকে টিকিট কাটবেন?"
              : "Why Choose World Heritage for Flights?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn
                ? "বিশ্বব্যাপী গ্লোবাল কভারেজ"
                : "Worldwide Global Coverage"}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isBn
                ? "আন্তর্জাতিক ও দেশের ভেতরের সকল এয়ারলাইন্সের বুকিং সিস্টেম আমাদের সাথে সরাসরি সংযুক্ত।"
                : "Direct GDS access to all international and domestic airlines worldwide."}
            </p>
          </div>

          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? "সর্বনিম্ন মূল্য ও স্বচ্ছতা" : "Best Fare & Transparency"}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isBn
                ? "কোনো হিডেন বা গোপন চার্জ ছাড়াই এয়ারলাইন্সের অফিশিয়াল সর্বনিম্ন ফেয়ার সুবিধা পাবেন।"
                : "Get official airline lowest fares without any hidden extra charges."}
            </p>
          </div>

          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? "২৪/৭ সাপোর্ট ও রি-ইস্যু" : "24/7 Support & Re-issue"}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isBn
                ? "ইমার্জেন্সি ডেট চেঞ্জ, ফ্লাইট বাতিল বা রিফান্ডের যেকোনো প্রয়োজনে নিবেদিত হেল্পডেস্ক টিম।"
                : "Dedicated desk team for date changes, flight cancellations, or refund assistance."}
            </p>
          </div>
        </div>
      </div>

      {/* 6. HOW TO GET TICKET SECTION */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
            {isBn ? "টিকিট সংগ্রহের উপায়" : "Ticket Delivery Options"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D472B]">
            {isBn
              ? "কিভাবে টিকিট পাবেন?"
              : "How to Receive Your Flight Ticket?"}
          </h2>
          <p className="text-xs text-slate-600">
            {isBn
              ? "আপনার সুবিধাজনক মাধ্যমে যেকোনো স্থান থেকে টিকিট কপি সংগ্রহ করুন"
              : "Collect your ticket copy smoothly via your preferred method"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-md hover:border-[#D4AF37] transition-all flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-200 text-[#0D472B]">
              <Building className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#0D472B]">
                {isBn
                  ? "০১ — সরাসরি পান্থপথ অফিস থেকে"
                  : "01 — Direct Office Collection"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "আমাদের অফিসে এসে সরাসরি প্রিন্টেড কনফার্মড টিকিট কপি হ্যান্ডওভার নিতে পারেন।"
                  : "Visit our main office and collect your physical printed ticket copy directly."}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B38712] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isBn
                    ? "ঠিকানা: ৪৩-আর/৮, ইন্দিরা রোড, পান্থপথ, ঢাকা-১২১৫"
                    : "Address: 43-R/8, Indira Road, Panthapath, Dhaka-1215"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-md hover:border-[#D4AF37] transition-all flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-200 text-[#0D472B]">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#0D472B]">
                {isBn
                  ? "০২ — ইমেইল / WhatsApp-এর মাধ্যমে"
                  : "02 — Via Email & WhatsApp"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "টিকিটের ডিজিটাল E-Copy আপনার দেওয়া ইমেইল বা হোয়াটসঅ্যাপে মুহূর্তেই পাঠানো হবে।"
                  : "Get your digital E-Ticket PDF copy directly sent to your WhatsApp or Email."}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B38712] pt-1">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isBn
                    ? "ইমেইল: worldheritagebd@gmail.com"
                    : "Email: worldheritagebd@gmail.com"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. REQUIRED DOCUMENTS SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0D472B]">
              {isBn ? "প্রয়োজনীয় কাগজপত্র" : "Required Documents"}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {isBn
                ? "এয়ার টিকিট বুকিং ও ইস্যুর সময় যেসব তথ্য ও ডকুমেন্ট প্রয়োজন"
                : "Necessary information & documents for issuing flight tickets"}
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full w-max">
            {isBn ? "সহজ প্রসেসিং" : "Hassle-free Processing"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic Requirements */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h3 className="text-base font-extrabold text-[#0D472B] flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="flex items-center gap-2">
                <span className="text-xl">🇧🇩</span>
                <span>
                  {isBn ? "BD অভ্যন্তরীণ (Domestic)" : "BD Domestic Routes"}
                </span>
              </span>
              <span className="text-[10px] bg-[#0D472B] text-white px-2 py-0.5 rounded-md font-bold">
                BD Internal
              </span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>
                    {isBn ? "এনআইডি (NID) / জন্ম সনদ:" : "NID / Birth Cert: "}
                  </strong>{" "}
                  {isBn ? "ফটোকপি বা স্পষ্ট ছবি" : "Photocopy or clear image"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>{isBn ? "যাত্রীর পুরো নাম:" : "Full Name: "}</strong>{" "}
                  {isBn ? "এনআইডি অনুযায়ী সঠিক বানান" : "Spelling as per NID"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>{isBn ? "ভ্রমণের তারিখ:" : "Travel Date: "}</strong>{" "}
                  {isBn
                    ? "পছন্দনীয় ফ্লাইট সিডিউল"
                    : "Preferred flight schedule"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>{isBn ? "মোবাইল নম্বর:" : "Mobile Number: "}</strong>{" "}
                  {isBn
                    ? "কনফার্মেশন এসএমএস প্রাপ্তির জন্য"
                    : "For booking confirmation SMS"}
                </span>
              </li>
            </ul>
          </div>

          {/* International Requirements */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h3 className="text-base font-extrabold text-[#0D472B] flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="flex items-center gap-2">
                <span className="text-xl">✈</span>
                <span>
                  {isBn
                    ? "আন্তর্জাতিক (International)"
                    : "International Routes"}
                </span>
              </span>
              <span className="text-[10px] bg-[#0D472B] text-white px-2 py-0.5 rounded-md font-bold">
                Global Flights
              </span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>{isBn ? "পাসপোর্ট কপি:" : "Passport Copy: "}</strong>{" "}
                  {isBn
                    ? "ন্যূনতম ৬ মাস মেয়াদী পাসপোর্ট"
                    : "Minimum 6 months validity"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>
                    {isBn ? "ভ্যালিড ভিসা কপি:" : "Valid Visa Copy: "}
                  </strong>{" "}
                  {isBn
                    ? "গন্তব্য দেশের প্রযোজ্য ভিসা"
                    : "Applicable visa for destination"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>
                    {isBn ? "ভ্রমণের সময়সূচি:" : "Travel Dates: "}
                  </strong>{" "}
                  {isBn
                    ? "ওয়ান-ওয়ে বা রাউন্ড ট্রিপ বিস্তারিত"
                    : "One-way or Round-trip details"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0" />
                <span>
                  <strong>{isBn ? "যোগাযোগ নম্বর:" : "Contact No: "}</strong>{" "}
                  {isBn
                    ? "যাত্রীর সচল মোবাইল ও ইমেইল"
                    : "Active mobile & email"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 8. PARTNER AIRLINES GRID */}
      <div className="bg-[#021f11] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 text-white space-y-5 shadow-xl">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
            {isBn ? "আমাদের সহযোগী নেটওয়ার্ক" : "Partner Network"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-sans">
            {isBn ? "আমাদের সহযোগী এয়ারলাইন্স সমূহ" : "Partner Airlines"}
          </h2>
          <p className="text-xs text-emerald-200/80">
            {isBn
              ? "দেশি-বিদেশি খ্যাতনামা এয়ারলাইন্সের অফিসিয়াল টিকিট সার্ভিস"
              : "Official ticketing partner for top domestic and international carriers"}
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
                <span className="text-xs font-bold text-white group-hover:text-[#F3E0A0] transition-colors">
                  {air.name}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-900 px-1.5 py-0.5 rounded shrink-0 border border-emerald-700">
                {air.code}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. BOTTOM CONTACT FOOTER BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-2xl p-6 text-white text-center space-y-3 border border-[#D4AF37]/50 shadow-lg">
        <h3 className="text-xl font-black text-[#F3E0A0]">
          {isBn
            ? "যেকোনো রুটের টিকিটের রেট ও অফার জানতে আজই কল করুন"
            : "Call Today to Check Flight Rates & Special Deals"}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
          {isBn
            ? "পান্থপথ পান্থকুঞ্জ পার্কের বিপরীতে আমাদের প্রধান কার্যালয়ে আসুন অথবা ফোনে যোগাযোগ করে আপনার পছন্দের ফ্লাইট নিশ্চিত করুন।"
            : "Visit our Panthapath main office or call us directly to book your flight tickets instantly."}
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() =>
              onOpenBookingModal(
                "Air Ticket",
                isBn ? "এয়ার টিকিট সরাসরি ইনকোয়ারি" : "Air Ticket Inquiry",
              )
            }
            className="bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-emerald-950" />
            <span>{isBn ? "ইনকোয়ারি পাঠান" : "Submit Inquiry"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
