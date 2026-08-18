import React, { useState } from "react";
import {
  ChevronRight,
  FileText,
  CheckCircle2,
  Train,
  Plane,
  MapPin,
  Sparkles,
  Building,
  Utensils,
  Award,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Language, HajjPackage } from "../types";
import { getTranslation } from "../data/translations";
import { PackageCard } from "../components/PackageCard";
import { PackageDetailView } from "../components/PackageDetailView";
import { adaptHajjPackage, StandardPackageItem } from "../utils/packageAdapter";
import { HajjDualAnnouncementGrid } from "../components/HajjDualAnnouncementGrid";
import { HajjPackageComparison } from "../components/HajjPackageComparison";
import { toBengaliDigits } from "../utils/formatters";

interface HajjPageProps {
  lang: Language;
  hajjPackages?: HajjPackage[];
  hajjPackage?: HajjPackage;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const HajjPage: React.FC<HajjPageProps> = ({
  lang,
  hajjPackages,
  hajjPackage,
  onOpenBookingModal,
}) => {
  const [selectedDetailPackage, setSelectedDetailPackage] =
    useState<StandardPackageItem | null>(null);

  // Packages list resolution
  const packagesList: HajjPackage[] =
    hajjPackages && hajjPackages.length > 0
      ? hajjPackages
      : hajjPackage
        ? [hajjPackage]
        : [];

  const isBn = lang === "bn";

  // If a package detail is selected, render full page view
  if (selectedDetailPackage) {
    return (
      <PackageDetailView
        lang={lang}
        pkg={selectedDetailPackage}
        onBack={() => setSelectedDetailPackage(null)}
        onBookNow={(service, packageTitle) =>
          onOpenBookingModal(service, packageTitle)
        }
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      {/* Hero Banner with Dual Announcement Grid (2027 & 2028 Side-by-Side) */}
      <div className="w-full">
        <HajjDualAnnouncementGrid
          lang={lang}
          onOpenBookingModal={onOpenBookingModal}
        />
      </div>

      {/* Main Hajj Packages Section */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {isBn
                  ? "২০২৭ সালের পবিত্র হজ্ব কাফেলা"
                  : "Holy Hajj 2027 Delegation"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
              {isBn ? "পবিত্র হজ্ব প্যাকেজসমূহ" : "Holy Hajj Packages"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isBn
                ? "আমাদের এজেন্সির নির্ধারিত ২০২৭ সালের বিশেষ ইকোনমি ও স্ট্যান্ডার্ড হজ্ব প্যাকেজের বিবরণ"
                : "Explore our agency-crafted 2027 Economy and Standard Hajj packages"}
            </p>
          </div>

          <div className="text-xs bg-emerald-50 text-[#0D472B] font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
            {isBn
              ? "মোট ২টি অনুমোদিত হজ্ব প্যাকেজ"
              : "2 Official Hajj Packages"}
          </div>
        </div>

        {/* 2 Packages Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {packagesList.map((pkg) => {
            const adapted = adaptHajjPackage(pkg);
            return (
              <div key={pkg.id} className="flex flex-col">
                <PackageCard
                  lang={lang}
                  pkg={adapted}
                  onViewDetails={(item) => setSelectedDetailPackage(item)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison & Highlights Table */}
      <HajjPackageComparison
        lang={lang}
        onOpenBookingModal={onOpenBookingModal}
        onSelectPackageDetail={(pkgId) => {
          const found = packagesList.find((p) => p.id === pkgId);
          if (found) {
            setSelectedDetailPackage(adaptHajjPackage(found));
          }
        }}
      />

      {/* Required Registration Documents */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DEC8] space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <FileText className="w-6 h-6 text-[#0D472B]" />
          <div>
            <h3 className="text-xl font-bold text-[#0D472B]">
              {isBn
                ? "২০২৭ সালের হজ্ব নিবন্ধনের জন্য প্রয়োজনীয় কাগজপত্র"
                : "Required Documents for Hajj 2027 Registration"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn
                ? "সরকারি নির্ধারিত নিয়মানুযায়ী সময়মত প্রাক-নিবন্ধন সম্পন্ন করুন"
                : "Complete your pre-registration on time according to government rules"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-800">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <span className="font-bold text-[#0D472B] block text-sm">
              {isBn ? "০১. পাসপোর্ট ও ছবি" : "01. Passport & Photos"}
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              {isBn
                ? "কমপক্ষে হজ্ব পরবর্তী ৬ মাস মেয়াদ সম্বলিত আসল ডিজিটাল/ই-পাসপোর্ট এবং ৪ কপি পাসপোর্ট সাইজ ল্যাব প্রিন্ট সাদা ব্যাকগ্রাউন্ড ছবি।"
                : "Original e-passport with at least 6 months validity post-Hajj and 4 passport-sized white background photos."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <span className="font-bold text-[#0D472B] block text-sm">
              {isBn ? "০২. জাতীয় পরিচয়পত্র (NID)" : "02. National ID (NID)"}
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              {isBn
                ? "স্মার্ট জাতীয় পরিচয়পত্রের স্পষ্ট ফটোকপি (১৮ বছরের নিচে হলে সরকার অনুমোদিত ডিজিটাল জন্ম নিবন্ধন সনদপত্র)।"
                : "Clear photocopy of Smart National ID Card (Digital birth certificate for minors below 18)."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <span className="font-bold text-[#0D472B] block text-sm">
              {isBn
                ? "০৩. প্রাক-নিবন্ধন ফি ও স্বাস্থ্য সনদ"
                : "03. Pre-Reg Fee & Medical"}
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              {isBn
                ? "হজ্ব প্রাক-নিবন্ধন সরকারি ফি মাত্র ৩০,০০০/- টাকা (অফেরতযোগ্য) এবং সরকারি মনোনীত কেন্দ্র থেকে স্বাস্থ্য পরীক্ষা সনদ।"
                : "Government Hajj pre-registration fee BDT 30,000 and authorized health fitness certification."}
            </p>
          </div>
        </div>

        <div className="text-center pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() =>
              onOpenBookingModal(
                "Hajj",
                isBn
                  ? "২০২৭ সালের হজ্ব প্রাক-নিবন্ধন (ইকোনমি / স্ট্যান্ডার্ড)"
                  : "Hajj 2027 Pre-Registration",
              )
            }
            className="bg-[#0D472B] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#053B21] transition-all border border-[#D4AF37] active:scale-95"
          >
            {getTranslation(lang, "registerNowCTA")}
          </button>
        </div>
      </div>
    </div>
  );
};
