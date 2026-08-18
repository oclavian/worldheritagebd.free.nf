import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { Language, AgencyInfo, BookingInquiry } from "../types";
import { getTranslation } from "../data/translations";
import { initialAgencyInfo } from "../data/initialData";
import { toBengaliDigits } from "../utils/formatters";
import { TeamAlbum } from "../components/TeamAlbum";

interface ContactPageProps {
  lang: Language;
  agencyInfo?: AgencyInfo;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  agencyInfo,
}) => {
  const safeAgencyInfo = agencyInfo || initialAgencyInfo;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0D472B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{getTranslation(lang, "contactTitle")}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D472B]">
          {getTranslation(lang, "contactTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {getTranslation(lang, "contactSub")}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#E6DEC8] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
                World Heritage Headquarters
              </span>
              <h2 className="text-xl font-bold text-[#0D472B]">
                {lang === "bn"
                  ? safeAgencyInfo.nameBn.replace("ট্যুরস", "ট্যুর্স")
                  : safeAgencyInfo.nameEn}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-800">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <MapPin className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">
                    {getTranslation(lang, "officeAddressLabel")}
                  </strong>
                  <span className="leading-relaxed">
                    {lang === "bn"
                      ? safeAgencyInfo.addressBn
                      : safeAgencyInfo.addressEn}
                  </span>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <Phone className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">
                    {getTranslation(lang, "hotlineLabel")}
                  </strong>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:${safeAgencyInfo.hotline}`}
                      className="text-lg font-extrabold text-[#0D472B] hover:underline font-sans"
                    >
                      {lang === "bn"
                        ? toBengaliDigits(safeAgencyInfo.hotline)
                        : safeAgencyInfo.hotline}
                    </a>
                    <span className="text-xs sm:text-sm font-bold text-amber-600 font-bengali">
                      ({lang === "bn" ? "হোয়াটসঅ্যাপ & ইমো" : "WhatsApp & Imo"}
                      )
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    <strong className="text-[#0D472B] font-bold">
                      {lang === "bn" ? "বিকল্প যোগাযোগ: " : "Alt Phone: "}
                    </strong>
                    <a
                      href="tel:01785970008"
                      className="hover:underline font-bold"
                    >
                      {lang === "bn"
                        ? toBengaliDigits("01785970008") + "-৯"
                        : "01785970008-9"}
                    </a>
                    ,{" "}
                    <a
                      href="tel:01920825145"
                      className="hover:underline font-bold"
                    >
                      {lang === "bn"
                        ? toBengaliDigits("01920825145")
                        : "01920825145"}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <Mail className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">
                    {getTranslation(lang, "emailLabel")}
                  </strong>
                  <a
                    href={`mailto:${safeAgencyInfo.email}`}
                    className="font-semibold text-slate-800 hover:underline"
                  >
                    {safeAgencyInfo.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <Clock className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">
                    {lang === "bn" ? "অফিস সময়সূচী" : "Office Hours"}
                  </strong>
                  <span>
                    {lang === "bn"
                      ? "শনিবার - বৃহস্পতিবার (সকাল ৯:৩০ - রাত ৮:৩০)"
                      : "Saturday - Thursday (9:30 AM - 8:30 PM)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/${safeAgencyInfo.whatsappNumber || "8801711200000"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {lang === "bn"
                    ? "হোয়াটসঅ্যাপে সরাসরি চ্যাট করুন"
                    : "Direct WhatsApp Chat"}
                </span>
              </a>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0D472B] shrink-0" />
            <span>
              {lang === "bn"
                ? "আপনার প্রয়োজনীয় যেকোনো তথ্যের জন্য সরাসরি আমাদের অফিসে আমন্ত্রিত।"
                : "Visit our office anytime for personal travel assistance."}
            </span>
          </div>

          {/* Facebook Official Page Embed Card */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#E6DEC8] shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 font-bold text-[#0D472B] text-sm">
                <Facebook className="w-5 h-5 text-[#1877F2] fill-current" />
                <span>
                  {lang === "bn"
                    ? "ফেসবুক অফিসিয়াল পেজ"
                    : "Official Facebook Page"}
                </span>
              </div>
              <a
                href={
                  safeAgencyInfo.facebookUrl ||
                  "https://www.facebook.com/worldharitage/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1877F2] hover:underline flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100"
              >
                <span>{lang === "bn" ? "পেজে যান" : "Visit Page"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 flex justify-center p-1 min-h-[380px]">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fworldharitage%2F&tabs=timeline&width=380&height=380&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="100%"
                height="380"
                style={{
                  border: "none",
                  overflow: "hidden",
                  minHeight: "380px",
                }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="World Heritage Facebook Page"
                className="w-full max-w-[400px] rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Column: Team & Moallems Album */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DEC8] shadow-sm space-y-6">
          <TeamAlbum lang={lang} />
        </div>
      </div>

      {/* Google Maps Location Visual Frame */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DEC8] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#0D472B]">
          <div className="flex items-center gap-2 font-bold text-base">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <span>
              {lang === "bn"
                ? "আমাদের অফিস লোকেশন ম্যাপ (ইন্দিরা রোড, পান্থপথ)"
                : "Our Office Location Map (Panthapath, Dhaka)"}
            </span>
          </div>
          {agencyInfo.googleMapsUrl && (
            <a
              href={agencyInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D472B] text-white px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37] hover:bg-[#053B21] transition-all shadow-sm shrink-0"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {lang === "bn"
                  ? "গুগল ম্যাপে নেভিগেট করুন"
                  : "Open in Google Maps"}
              </span>
            </a>
          )}
        </div>

        <div className="aspect-21/9 w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-300 relative shadow-inner">
          <iframe
            title="World Heritage Dhaka Office Location"
            src="https://maps.google.com/maps?q=Ground+Floor,+world+heritage+tours+%26+travels,+west+panthapath,+43,+R%2F8+Indira+Rd,+Dhaka+1215&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
