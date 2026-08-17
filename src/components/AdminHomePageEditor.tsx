import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  Eye,
  Sparkles,
  Layers,
  Info,
  ListOrdered,
  HelpCircle,
  Award,
  Phone,
  CheckCircle2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  HomePageConfig,
  Language,
  HomePageStatItem,
  HomePageTrustBadge,
  HomePageServiceCard,
  HomePageAccordionItem,
  HomePageAccreditationItem,
} from "../types";
import { initialHomePageConfig } from "../data/initialHomePageData";
import { saveHomePageConfig } from "../services/firestoreService";

interface AdminHomePageEditorProps {
  lang: Language;
  config: HomePageConfig | null;
  onConfigSaved: (newConfig: HomePageConfig) => void;
  onShowToast: (type: "success" | "error", text: string) => void;
}

const STOCK_HERO_BG_OPTIONS = [
  {
    label: "Kaaba at Sunset / Dusk",
    url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "Masjid al-Haram Aerial Night View",
    url: "https://images.unsplash.com/photo-1565552684305-7e8e50b86a8e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "Prophet’s Mosque (Madinah Green Dome)",
    url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "Makkah Clock Tower & Holy Sanctuary",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80",
  },
];

export const AdminHomePageEditor: React.FC<AdminHomePageEditorProps> = ({
  lang,
  config: initialPropConfig,
  onConfigSaved,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<HomePageConfig>(() => {
    return initialPropConfig
      ? { ...initialHomePageConfig, ...initialPropConfig }
      : { ...initialHomePageConfig };
  });

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [confirmResetModal, setConfirmResetModal] = useState(false);

  // Sync if prop updates from outside
  React.useEffect(() => {
    if (initialPropConfig) {
      setFormData((prev) => ({ ...prev, ...initialPropConfig }));
    }
  }, [initialPropConfig]);

  const handleTextChange = (field: keyof HomePageConfig, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: keyof HomePageConfig) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveHomePageConfig(formData);
      onConfigSaved(formData);
      onShowToast(
        "success",
        lang === "bn"
          ? "হোম পেজের সকল পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে!"
          : "Home page CMS configuration saved successfully!",
      );
    } catch (error) {
      console.error("Error saving home page config:", error);
      onShowToast(
        "error",
        lang === "bn"
          ? "সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
          : "Failed to save configuration. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefaults = async () => {
    try {
      setIsSaving(true);
      const defaults = { ...initialHomePageConfig };
      setFormData(defaults);
      await saveHomePageConfig(defaults);
      onConfigSaved(defaults);
      setConfirmResetModal(false);
      onShowToast(
        "success",
        lang === "bn"
          ? "হোম পেজ ডিফল্ট মানে রিসেট করা হয়েছে!"
          : "Home page reset to default configuration successfully!",
      );
    } catch (error) {
      console.error("Error resetting home page config:", error);
      onShowToast(
        "error",
        lang === "bn"
          ? "রিসেট করতে ব্যর্থ হয়েছে।"
          : "Failed to reset configuration.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const sectionsList = [
    {
      id: "hero",
      titleBn: "১. হিরো ব্যানার ও মূল শিরোনাম (Hero Banner & Headline)",
      titleEn: "1. Hero Banner & Headline",
      icon: Sparkles,
    },
    {
      id: "hajjCard",
      titleBn: "২. হজ্ব ঘোষণা কার্ড (Top Hajj Announcement Card)",
      titleEn: "2. Top Hajj Announcement Card",
      icon: Award,
    },
    {
      id: "importantInfo",
      titleBn: "৩. গুরুত্বপূর্ণ তথ্য বক্স (Important Guidance Section)",
      titleEn: "3. Important Guidance Section",
      icon: Info,
    },
    {
      id: "services",
      titleBn: "৪. প্রধান সেবাসমূহ (Core 4 Services)",
      titleEn: "4. Core 4 Services",
      icon: Layers,
    },
    {
      id: "featured",
      titleBn: "৫. বিশেষ প্যাকেজসমূহ (Featured Packages Showcase)",
      titleEn: "5. Featured Packages Showcase",
      icon: Award,
    },
    {
      id: "accordion",
      titleBn: "৬. আরও দেখুন & গাইডলাইন (Accordion FAQ & Guides)",
      titleEn: "6. Accordion FAQ & Guides",
      icon: HelpCircle,
    },
    {
      id: "features",
      titleBn: "৭. আমাদের বৈশিষ্ট্যসমূহ (Distinctive Features)",
      titleEn: "7. Distinctive Features",
      icon: CheckCircle2,
    },
    {
      id: "accreditations",
      titleBn: "৮. সরকারি স্বীকৃতি ও সনদ (Accreditations & Licenses)",
      titleEn: "8. Accreditations & Licenses",
      icon: Award,
    },
    {
      id: "contactBanner",
      titleBn: "৯. নিচের সরাসরি যোগাযোগ ব্যানার (Bottom Contact Banner)",
      titleEn: "9. Bottom Contact Banner",
      icon: Phone,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Global Actions Bar */}
      <div className="bg-gradient-to-r from-[#03180D] via-[#0D472B] to-[#03180D] text-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Home Page Live CMS & Customizer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            {lang === "bn"
              ? "হোম পেজের সম্পূর্ণ টেক্সট ও কম্পোনেন্ট এডিটর"
              : "Home Page Visual CMS Editor"}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5">
            {lang === "bn"
              ? "হোম পেজের যেকোনো লেখা, ব্যানার, সার্ভিস কার্ড, পরিসংখ্যান বা সেকশন অন/অফ করুন এবং সাথে সাথে লাইভ দেখুন।"
              : "Edit all headlines, banners, stats, service cards, and toggle visibility of home page sections."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setConfirmResetModal(true)}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-rose-200 bg-rose-950/60 hover:bg-rose-900 border border-rose-700/60 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "ডিফল্ট রিসেট" : "Reset Defaults"}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-black text-emerald-950 bg-gradient-to-r from-[#D4AF37] via-[#F3E0A0] to-[#B38712] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                <span>{lang === "bn" ? "সংরক্ষণ হচ্ছে..." : "Saving..."}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>
                  {lang === "bn" ? "সকল পরিবর্তন সেভ করুন" : "Save All Changes"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sectionsList.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border ${
                isActive
                  ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md"
                  : "bg-white text-slate-700 hover:bg-emerald-50/50 border-slate-200"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-slate-400"}`}
              />
              <span>
                {lang === "bn"
                  ? sec.titleBn.split(" (")[0]
                  : sec.titleEn.split(" (")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN EDITOR SECTIONS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO BANNER & HEADLINE */}
        {/* ========================================================================= */}
        {activeSection === "hero" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ১. হিরো ব্যানার ও মূল শিরোনাম (Hero Banner & Headlines)
                </h3>
                <p className="text-xs text-slate-500">
                  হোম পেজের সবার উপরের প্রধান ব্যানার, টাইটেল, সাব-টাইটেল ও
                  স্ট্যাটস কনফিগারেশন
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showHeroSection !== false}
                  onChange={() => handleToggle("showHeroSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            {/* Background Image */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>
                  হিরো ব্যাকগ্রাউন্ড ইমেজ URL (Hero Background Image URL)
                </span>
                <span className="text-[11px] text-slate-400">
                  হাই-রেজোলিউশন ছবি লিংক দিন
                </span>
              </label>
              <input
                type="text"
                value={formData.heroBgImage || ""}
                onChange={(e) =>
                  handleTextChange("heroBgImage", e.target.value)
                }
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-500 py-1">
                  প্রিসেট ছবি বেছে নিন:
                </span>
                {STOCK_HERO_BG_OPTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTextChange("heroBgImage", preset.url)}
                    className="text-[11px] bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Main Headline (Bn & En) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  মূল শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.heroTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("heroTitleBn", e.target.value)
                  }
                  placeholder="পবিত্র উমরাহ্, হজ্ব ও ফ্লাইট টিকিটে সর্বোচ্চ বিশ্বস্ততা"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Main Headline (English)
                </label>
                <input
                  type="text"
                  value={formData.heroTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("heroTitleEn", e.target.value)
                  }
                  placeholder="Your Trusted Partner for Holy Umrah, Hajj & Flights"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Subtitles (Bn & En) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  সাব-শিরোনাম ও বিবরণ (বাংলা)
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("heroSubtitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Subtitle & Description (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("heroSubtitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Typewriter Messages Editor */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D472B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    লাইভ টাইপরাইটার অ্যানিমেশন বার্তাগুলো (Typewriter Rotating
                    Messages)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const bn = [...(formData.typewriterMessagesBn || [])];
                    const en = [...(formData.typewriterMessagesEn || [])];
                    bn.push("নতুন লাইভ বার্তা");
                    en.push("New Live Tagline");
                    setFormData((prev) => ({
                      ...prev,
                      typewriterMessagesBn: bn,
                      typewriterMessagesEn: en,
                    }));
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full shadow-2xs hover:bg-emerald-100"
                >
                  <Plus className="w-3 h-3" />
                  <span>নতুন বার্তা যোগ করুন</span>
                </button>
              </div>

              {(formData.typewriterMessagesBn || []).map((msg, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-xl border border-emerald-100"
                >
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={msg}
                      onChange={(e) => {
                        const copy = [...(formData.typewriterMessagesBn || [])];
                        copy[idx] = e.target.value;
                        handleTextChange("typewriterMessagesBn", copy);
                      }}
                      placeholder="বাংলা বার্তা"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      value={
                        (formData.typewriterMessagesEn &&
                          formData.typewriterMessagesEn[idx]) ||
                        ""
                      }
                      onChange={(e) => {
                        const copy = [...(formData.typewriterMessagesEn || [])];
                        copy[idx] = e.target.value;
                        handleTextChange("typewriterMessagesEn", copy);
                      }}
                      placeholder="English tagline"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        const bn = (formData.typewriterMessagesBn || []).filter(
                          (_, i) => i !== idx,
                        );
                        const en = (formData.typewriterMessagesEn || []).filter(
                          (_, i) => i !== idx,
                        );
                        setFormData((prev) => ({
                          ...prev,
                          typewriterMessagesBn: bn,
                          typewriterMessagesEn: en,
                        }));
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Badges Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                ৪ টি হাইলাইট পরিসংখ্যান (4 Quick Stats Badges)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(formData.stats || initialHomePageConfig.stats).map(
                  (stat, idx) => (
                    <div
                      key={stat.id || idx}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">
                            সংখ্যা (বাংলা)
                          </label>
                          <input
                            type="text"
                            value={stat.valueBn}
                            onChange={(e) => {
                              const copy = [
                                ...(formData.stats ||
                                  initialHomePageConfig.stats),
                              ];
                              copy[idx] = {
                                ...copy[idx],
                                valueBn: e.target.value,
                              };
                              handleTextChange("stats", copy);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">
                            Value (English)
                          </label>
                          <input
                            type="text"
                            value={stat.valueEn}
                            onChange={(e) => {
                              const copy = [
                                ...(formData.stats ||
                                  initialHomePageConfig.stats),
                              ];
                              copy[idx] = {
                                ...copy[idx],
                                valueEn: e.target.value,
                              };
                              handleTextChange("stats", copy);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">
                            লেবেল (বাংলা)
                          </label>
                          <input
                            type="text"
                            value={stat.labelBn}
                            onChange={(e) => {
                              const copy = [
                                ...(formData.stats ||
                                  initialHomePageConfig.stats),
                              ];
                              copy[idx] = {
                                ...copy[idx],
                                labelBn: e.target.value,
                              };
                              handleTextChange("stats", copy);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">
                            Label (English)
                          </label>
                          <input
                            type="text"
                            value={stat.labelEn}
                            onChange={(e) => {
                              const copy = [
                                ...(formData.stats ||
                                  initialHomePageConfig.stats),
                              ];
                              copy[idx] = {
                                ...copy[idx],
                                labelEn: e.target.value,
                              };
                              handleTextChange("stats", copy);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                ৩ টি বিশ্বস্ততার ব্যাজ (3 Trust Badges)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  formData.trustBadges || initialHomePageConfig.trustBadges
                ).map((badge, idx) => (
                  <div
                    key={badge.id || idx}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        বাংলা বিবরণ
                      </label>
                      <input
                        type="text"
                        value={badge.textBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.trustBadges ||
                              initialHomePageConfig.trustBadges),
                          ];
                          copy[idx] = { ...copy[idx], textBn: e.target.value };
                          handleTextChange("trustBadges", copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        English Text
                      </label>
                      <input
                        type="text"
                        value={badge.textEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.trustBadges ||
                              initialHomePageConfig.trustBadges),
                          ];
                          copy[idx] = { ...copy[idx], textEn: e.target.value };
                          handleTextChange("trustBadges", copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  উমরাহ্ বাটন (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.heroBtnUmrahBn || ""}
                  onChange={(e) =>
                    handleTextChange("heroBtnUmrahBn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  Umrah Button (English)
                </label>
                <input
                  type="text"
                  value={formData.heroBtnUmrahEn || ""}
                  onChange={(e) =>
                    handleTextChange("heroBtnUmrahEn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  হজ্ব বাটন (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.heroBtnHajjBn || ""}
                  onChange={(e) =>
                    handleTextChange("heroBtnHajjBn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  Hajj Button (English)
                </label>
                <input
                  type="text"
                  value={formData.heroBtnHajjEn || ""}
                  onChange={(e) =>
                    handleTextChange("heroBtnHajjEn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: TOP HAJJ ANNOUNCEMENT CARD */}
        {/* ========================================================================= */}
        {activeSection === "hajjCard" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ২. হিরো সেকশনের ডানপাশের হজ্ব কার্ড (Hajj Announcement Card)
                </h3>
                <p className="text-xs text-slate-500">
                  হিরো ব্যানারে থাকা আকর্ষণীয় সোনালী হজ্ব ঘোষণা কার্ড ও
                  প্রি-রেজিস্ট্রেশন বিবরণ
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showHajjAnnouncementCard !== false}
                  onChange={() => handleToggle("showHajjAnnouncementCard")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  কার্ড প্রদর্শন করুন
                </span>
              </label>
            </div>

            {/* Badges and Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  টপ অ্যানাউন্সমেন্ট ব্যাজ (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.hajjCardBadgeBn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardBadgeBn", e.target.value)
                  }
                  placeholder="যেমন: বিশেষ ঘোষণা"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Announcement Badge (English)
                </label>
                <input
                  type="text"
                  value={formData.hajjCardBadgeEn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardBadgeEn", e.target.value)
                  }
                  placeholder="e.g. Announcement"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  হজ্ব চক্র টেক্সট (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.hajjCardCycleBn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardCycleBn", e.target.value)
                  }
                  placeholder="যেমন: হজ্ব চক্র ২০২৭-২০২৮"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  সরকারি হজ্ব পোর্টাল লিংক
                </label>
                <input
                  type="text"
                  value={formData.hajjCardPortalUrl || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardPortalUrl", e.target.value)
                  }
                  placeholder="https://hajj.gov.bd"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  পোর্টাল বাটন টেক্সট
                </label>
                <input
                  type="text"
                  value={formData.hajjCardPortalTextBn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardPortalTextBn", e.target.value)
                  }
                  placeholder="হজ পোর্টাল"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* TAB 1: PRIMARY HAJJ (2027) */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                <span className="text-sm font-black text-emerald-950">
                  ট্যাব ১: ২০২৭ সালের হজ্ব প্রাক-নিবন্ধন
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    ট্যাব ১ শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1TitleBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1TitleBn", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Tab 1 Title (English)
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1TitleEn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1TitleEn", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    ট্যাব ১ সাব-শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1SubtitleBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1SubtitleBn", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    সরকারি প্রাক-নিবন্ধন ফি
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1GovtFeeBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1GovtFeeBn", e.target.value)
                    }
                    placeholder="৩০,০০০ টাকা"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">
                    নিবন্ধন শুরু
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1StartDateBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1StartDateBn", e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">
                    নিবন্ধন শেষ
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1EndDateBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1EndDateBn", e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">
                    সম্ভাব্য হজ্বের তারিখ
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab1HajjDateBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab1HajjDateBn", e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Conditions list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">
                    শর্তাবলী ও নিয়মাবলী (বাংলা)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const list = [...(formData.hajjTab1ConditionsBn || [])];
                      list.push("নতুন শর্ত...");
                      setFormData((prev) => ({
                        ...prev,
                        hajjTab1ConditionsBn: list,
                      }));
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-white border border-emerald-300 px-3 py-1 rounded-full hover:bg-emerald-100"
                  >
                    <Plus className="w-3 h-3" />
                    <span>শর্ত যোগ করুন</span>
                  </button>
                </div>
                {(formData.hajjTab1ConditionsBn || []).map((cond, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cond}
                      onChange={(e) => {
                        const copy = [...(formData.hajjTab1ConditionsBn || [])];
                        copy[idx] = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          hajjTab1ConditionsBn: copy,
                        }));
                      }}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const copy = (
                          formData.hajjTab1ConditionsBn || []
                        ).filter((_, i) => i !== idx);
                        setFormData((prev) => ({
                          ...prev,
                          hajjTab1ConditionsBn: copy,
                        }));
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TAB 2: SECONDARY HAJJ (2028) */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="text-sm font-black text-amber-950">
                  ট্যাব ২: ২০২৮ সালের অগ্রিম প্রাক-নিবন্ধন নির্দেশিকা
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    ট্যাব ২ শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab2TitleBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab2TitleBn", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    নিবন্ধন ফি ও মেয়াদ
                  </label>
                  <input
                    type="text"
                    value={formData.hajjTab2RegFeeBn || ""}
                    onChange={(e) =>
                      handleTextChange("hajjTab2RegFeeBn", e.target.value)
                    }
                    placeholder="৩০,০০০ টাকা (২ বছর কার্যকর)"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  ট্যাব ২ বিবরণ ও গাইডলাইন
                </label>
                <textarea
                  rows={2}
                  value={formData.hajjTab2SubtitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjTab2SubtitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  বিশেষ নোট
                </label>
                <input
                  type="text"
                  value={formData.hajjTab2NoteBn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjTab2NoteBn", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* CTA Button label */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  নিবন্ধন বাটন টেক্সট (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.hajjCardCtaBtnBn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardCtaBtnBn", e.target.value)
                  }
                  placeholder="এখনই হজের রেজিস্ট্রেশন করুন"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  CTA Button Text (English)
                </label>
                <input
                  type="text"
                  value={formData.hajjCardCtaBtnEn || ""}
                  onChange={(e) =>
                    handleTextChange("hajjCardCtaBtnEn", e.target.value)
                  }
                  placeholder="Register for Hajj Now"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: IMPORTANT INFORMATION (একটু জেনে নিন...) */}
        {/* ========================================================================= */}
        {activeSection === "importantInfo" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৩. একটু জেনে নিন... (Important Guidance Section)
                </h3>
                <p className="text-xs text-slate-500">
                  হাজীদের জন্য বিশেষ দিকনির্দেশনা, পাসপোর্ট ও স্বাস্থ্যবিধি বক্স
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showImportantInfoSection !== false}
                  onChange={() => handleToggle("showImportantInfoSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  ট্যাগলাইন (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.importantTaglineBn || ""}
                  onChange={(e) =>
                    handleTextChange("importantTaglineBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Tagline (English)
                </label>
                <input
                  type="text"
                  value={formData.importantTaglineEn || ""}
                  onChange={(e) =>
                    handleTextChange("importantTaglineEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.importantTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("importantTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={formData.importantTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("importantTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  প্রধান অনুচ্ছেদ বিবরণ (বাংলা)
                </label>
                <textarea
                  rows={4}
                  value={formData.importantDescBn || ""}
                  onChange={(e) =>
                    handleTextChange("importantDescBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Main Description (English)
                </label>
                <textarea
                  rows={4}
                  value={formData.importantDescEn || ""}
                  onChange={(e) =>
                    handleTextChange("importantDescEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* Box title & points */}
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    বক্সের সাব-হেডার (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.importantBoxTitleBn || ""}
                    onChange={(e) =>
                      handleTextChange("importantBoxTitleBn", e.target.value)
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    Box Subheader (English)
                  </label>
                  <input
                    type="text"
                    value={formData.importantBoxTitleEn || ""}
                    onChange={(e) =>
                      handleTextChange("importantBoxTitleEn", e.target.value)
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    পাসপোর্ট ও প্রস্তুতি বুলেট পয়েন্ট (Box Bullet Points)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const bn = [...(formData.importantBoxPointsBn || [])];
                      const en = [...(formData.importantBoxPointsEn || [])];
                      bn.push("নতুন নিয়ম বা নির্দেশিকা");
                      en.push("New guideline item");
                      setFormData((prev) => ({
                        ...prev,
                        importantBoxPointsBn: bn,
                        importantBoxPointsEn: en,
                      }));
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-900 bg-white border border-rose-300 px-3 py-1 rounded-full hover:bg-rose-100"
                  >
                    <Plus className="w-3 h-3" />
                    <span>পয়েন্ট যোগ করুন</span>
                  </button>
                </div>

                {(formData.importantBoxPointsBn || []).map((pt, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white p-2 rounded-xl border border-rose-100 mb-2"
                  >
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.importantBoxPointsBn || []),
                          ];
                          copy[idx] = e.target.value;
                          handleTextChange("importantBoxPointsBn", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        value={
                          (formData.importantBoxPointsEn &&
                            formData.importantBoxPointsEn[idx]) ||
                          ""
                        }
                        onChange={(e) => {
                          const copy = [
                            ...(formData.importantBoxPointsEn || []),
                          ];
                          copy[idx] = e.target.value;
                          handleTextChange("importantBoxPointsEn", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div className="sm:col-span-1 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          const bn = (
                            formData.importantBoxPointsBn || []
                          ).filter((_, i) => i !== idx);
                          const en = (
                            formData.importantBoxPointsEn || []
                          ).filter((_, i) => i !== idx);
                          setFormData((prev) => ({
                            ...prev,
                            importantBoxPointsBn: bn,
                            importantBoxPointsEn: en,
                          }));
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  বাটন টেক্সট (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.importantBtnTextBn || ""}
                  onChange={(e) =>
                    handleTextChange("importantBtnTextBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Button Text (English)
                </label>
                <input
                  type="text"
                  value={formData.importantBtnTextEn || ""}
                  onChange={(e) =>
                    handleTextChange("importantBtnTextEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: CORE SERVICES (৪ টি প্রধান সার্ভিস) */}
        {/* ========================================================================= */}
        {activeSection === "services" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৪. আমাদের প্রধান সেবাসমূহ (Core Services Cards)
                </h3>
                <p className="text-xs text-slate-500">
                  হোম পেজে প্রদর্শিত উমরাহ্, হজ্ব, এয়ার টিকিট ও ট্যুরিজম সার্ভিস
                  কার্ডগুলো
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showServicesSection !== false}
                  onChange={() => handleToggle("showServicesSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  সেকশন শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.servicesTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("servicesTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Section Title (English)
                </label>
                <input
                  type="text"
                  value={formData.servicesTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("servicesTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* Service Cards */}
            <div className="space-y-4 pt-2">
              {(
                formData.servicesList || initialHomePageConfig.servicesList
              ).map((srv, idx) => (
                <div
                  key={srv.id || idx}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0D472B] flex items-center gap-2">
                      <span className="text-xl">{srv.emoji}</span>
                      <span>
                        সার্ভিস কার্ড #{idx + 1}: {srv.titleBn} / {srv.titleEn}
                      </span>
                    </span>
                    <input
                      type="text"
                      value={srv.emoji}
                      onChange={(e) => {
                        const copy = [
                          ...(formData.servicesList ||
                            initialHomePageConfig.servicesList),
                        ];
                        copy[idx] = { ...copy[idx], emoji: e.target.value };
                        handleTextChange("servicesList", copy);
                      }}
                      className="w-12 text-center py-1 text-sm rounded-lg border border-slate-300"
                      title="Emoji Icon"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        কার্ড শিরোনাম (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={srv.titleBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.servicesList ||
                              initialHomePageConfig.servicesList),
                          ];
                          copy[idx] = { ...copy[idx], titleBn: e.target.value };
                          handleTextChange("servicesList", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Card Title (English)
                      </label>
                      <input
                        type="text"
                        value={srv.titleEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.servicesList ||
                              initialHomePageConfig.servicesList),
                          ];
                          copy[idx] = { ...copy[idx], titleEn: e.target.value };
                          handleTextChange("servicesList", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        বিবরণ (বাংলা)
                      </label>
                      <textarea
                        rows={2}
                        value={srv.descBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.servicesList ||
                              initialHomePageConfig.servicesList),
                          ];
                          copy[idx] = { ...copy[idx], descBn: e.target.value };
                          handleTextChange("servicesList", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Description (English)
                      </label>
                      <textarea
                        rows={2}
                        value={srv.descEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.servicesList ||
                              initialHomePageConfig.servicesList),
                          ];
                          copy[idx] = { ...copy[idx], descEn: e.target.value };
                          handleTextChange("servicesList", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: FEATURED PACKAGES SHOWCASE */}
        {/* ========================================================================= */}
        {activeSection === "featured" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৫. আকর্ষণীয় প্যাকেজ শোকেস (Featured Packages Section)
                </h3>
                <p className="text-xs text-slate-500">
                  হোম পেজের বিশেষ আকর্ষণীয় প্যাকেজসমূহ ও ফিল্টার বাটন টেক্সট
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showFeaturedPackagesSection !== false}
                  onChange={() => handleToggle("showFeaturedPackagesSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.featuredTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={formData.featuredTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  ফিল্টার ১: সব (All)
                </label>
                <input
                  type="text"
                  value={formData.featuredFilterAllBn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredFilterAllBn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  ফিল্টার ২: উমরাহ্ (Umrah)
                </label>
                <input
                  type="text"
                  value={formData.featuredFilterUmrahBn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredFilterUmrahBn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  ফিল্টার ৩: হজ্ব (Hajj)
                </label>
                <input
                  type="text"
                  value={formData.featuredFilterHajjBn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredFilterHajjBn", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  সকল প্যাকেজ দেখুন বাটন (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.featuredExploreBtnBn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredExploreBtnBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Explore All Button (English)
                </label>
                <input
                  type="text"
                  value={formData.featuredExploreBtnEn || ""}
                  onChange={(e) =>
                    handleTextChange("featuredExploreBtnEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: ACCORDION FAQ & GUIDES ("আরও দেখুন") */}
        {/* ========================================================================= */}
        {activeSection === "accordion" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৬. আরও দেখুন & গাইডলাইন (Accordion FAQ & Guides)
                </h3>
                <p className="text-xs text-slate-500">
                  হোম পেজের নিচের অ্যাকর্ডিয়ন গাইডলাইন, ইতিহাস ও স্বাস্থ্যবিধি
                  আইটেম
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showAccordionSection !== false}
                  onChange={() => handleToggle("showAccordionSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  হেডার শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.accordionTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("accordionTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Header Title (English)
                </label>
                <input
                  type="text"
                  value={formData.accordionTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("accordionTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* Accordion Items */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D472B]">
                  অ্যাকর্ডিয়ন আইটেমসমূহ (Accordion Questions/Topics)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const copy = [
                      ...(formData.accordionItems ||
                        initialHomePageConfig.accordionItems),
                    ];
                    copy.push({
                      id: `acc-${Date.now()}`,
                      titleBn: "নতুন গাইডলাইন বা তথ্যের শিরোনাম",
                      titleEn: "New Guideline Topic Title",
                      contentBn: "এখানে বিস্তারিত বাংলা বিবরণ লিখুন...",
                      contentEn: "Write detailed English content here...",
                    });
                    handleTextChange("accordionItems", copy);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-white border border-emerald-300 px-3 py-1 rounded-full shadow-2xs hover:bg-emerald-100"
                >
                  <Plus className="w-3 h-3" />
                  <span>নতুন টপিক যোগ করুন</span>
                </button>
              </div>

              {(
                formData.accordionItems || initialHomePageConfig.accordionItems
              ).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      টপিক #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = (
                          formData.accordionItems ||
                          initialHomePageConfig.accordionItems
                        ).filter((_, i) => i !== idx);
                        handleTextChange("accordionItems", copy);
                      }}
                      className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>মুছুন</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        শিরোনাম (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={item.titleBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accordionItems ||
                              initialHomePageConfig.accordionItems),
                          ];
                          copy[idx] = { ...copy[idx], titleBn: e.target.value };
                          handleTextChange("accordionItems", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={item.titleEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accordionItems ||
                              initialHomePageConfig.accordionItems),
                          ];
                          copy[idx] = { ...copy[idx], titleEn: e.target.value };
                          handleTextChange("accordionItems", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        বিস্তারিত বিবরণ (বাংলা)
                      </label>
                      <textarea
                        rows={3}
                        value={item.contentBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accordionItems ||
                              initialHomePageConfig.accordionItems),
                          ];
                          copy[idx] = {
                            ...copy[idx],
                            contentBn: e.target.value,
                          };
                          handleTextChange("accordionItems", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Content (English)
                      </label>
                      <textarea
                        rows={3}
                        value={item.contentEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accordionItems ||
                              initialHomePageConfig.accordionItems),
                          ];
                          copy[idx] = {
                            ...copy[idx],
                            contentEn: e.target.value,
                          };
                          handleTextChange("accordionItems", copy);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 7: DISTINCTIVE FEATURES (আমাদের বৈশিষ্ঠ্য) */}
        {/* ========================================================================= */}
        {activeSection === "features" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৭. আমাদের বিশেষ বৈশিষ্ট্যসমূহ (Distinctive Features)
                </h3>
                <p className="text-xs text-slate-500">
                  ডার্ক গ্রিন ব্যাকগ্রাউন্ডে থাকা ৬ টি মূল সেবা ও প্রতিশ্রুতির
                  তালিকা
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showFeaturesSection !== false}
                  onChange={() => handleToggle("showFeaturesSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.featuresTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("featuresTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={formData.featuresTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("featuresTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D472B]">
                  বৈশিষ্ট্যের তালিকা (Feature Items)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const bn = [...(formData.featuresListBn || [])];
                    const en = [...(formData.featuresListEn || [])];
                    bn.push("নতুন বৈশিষ্ট্য বিবরণ");
                    en.push("New distinctive feature description");
                    setFormData((prev) => ({
                      ...prev,
                      featuresListBn: bn,
                      featuresListEn: en,
                    }));
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-white border border-emerald-300 px-3 py-1 rounded-full shadow-2xs hover:bg-emerald-100"
                >
                  <Plus className="w-3 h-3" />
                  <span>বৈশিষ্ট্য যোগ করুন</span>
                </button>
              </div>

              {(formData.featuresListBn || []).map((feat, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-xl border border-emerald-100"
                >
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => {
                        const copy = [...(formData.featuresListBn || [])];
                        copy[idx] = e.target.value;
                        handleTextChange("featuresListBn", copy);
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      value={
                        (formData.featuresListEn &&
                          formData.featuresListEn[idx]) ||
                        ""
                      }
                      onChange={(e) => {
                        const copy = [...(formData.featuresListEn || [])];
                        copy[idx] = e.target.value;
                        handleTextChange("featuresListEn", copy);
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        const bn = (formData.featuresListBn || []).filter(
                          (_, i) => i !== idx,
                        );
                        const en = (formData.featuresListEn || []).filter(
                          (_, i) => i !== idx,
                        );
                        setFormData((prev) => ({
                          ...prev,
                          featuresListBn: bn,
                          featuresListEn: en,
                        }));
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 8: ACCREDITATIONS & LICENSES */}
        {/* ========================================================================= */}
        {activeSection === "accreditations" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৮. সরকারি স্বীকৃতি ও সনদ (Accreditations & Licenses)
                </h3>
                <p className="text-xs text-slate-500">
                  ধর্ম মন্ত্রণালয়, সৌদি উমরাহ্ মন্ত্রণালয়, ক্যাব ও আইএটিএ
                  ব্যাজসমূহ
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showAccreditationsSection !== false}
                  onChange={() => handleToggle("showAccreditationsSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.accreditationsTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("accreditationsTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={formData.accreditationsTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("accreditationsTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                formData.accreditationsList ||
                initialHomePageConfig.accreditationsList
              ).map((acc, idx) => (
                <div
                  key={acc.id || idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      স্বীকৃতি #{idx + 1}
                    </span>
                    <select
                      value={acc.iconName}
                      onChange={(e) => {
                        const copy = [
                          ...(formData.accreditationsList ||
                            initialHomePageConfig.accreditationsList),
                        ];
                        copy[idx] = { ...copy[idx], iconName: e.target.value };
                        handleTextChange("accreditationsList", copy);
                      }}
                      className="text-xs border rounded-lg px-2 py-1 bg-white"
                    >
                      <option value="ShieldCheck">
                        ShieldCheck (ধর্ম মন্ত্রণালয়)
                      </option>
                      <option value="Award">Award (সৌদি মন্ত্রণালয়)</option>
                      <option value="Building2">
                        Building2 (সিভিল এভিয়েশন)
                      </option>
                      <option value="Plane">Plane (আইএটিএ মেম্বার)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        টাইটেল (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={acc.titleBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accreditationsList ||
                              initialHomePageConfig.accreditationsList),
                          ];
                          copy[idx] = { ...copy[idx], titleBn: e.target.value };
                          handleTextChange("accreditationsList", copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={acc.titleEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accreditationsList ||
                              initialHomePageConfig.accreditationsList),
                          ];
                          copy[idx] = { ...copy[idx], titleEn: e.target.value };
                          handleTextChange("accreditationsList", copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        সাব-টাইটেল (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={acc.subBn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accreditationsList ||
                              initialHomePageConfig.accreditationsList),
                          ];
                          copy[idx] = { ...copy[idx], subBn: e.target.value };
                          handleTextChange("accreditationsList", copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Subtitle (English)
                      </label>
                      <input
                        type="text"
                        value={acc.subEn}
                        onChange={(e) => {
                          const copy = [
                            ...(formData.accreditationsList ||
                              initialHomePageConfig.accreditationsList),
                          ];
                          copy[idx] = { ...copy[idx], subEn: e.target.value };
                          handleTextChange("accreditationsList", copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 9: BOTTOM CONTACT BANNER */}
        {/* ========================================================================= */}
        {activeSection === "contactBanner" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-[#0D472B]">
                  ৯. সরাসরি যোগাযোগ ব্যানার (Bottom Contact Banner)
                </h3>
                <p className="text-xs text-slate-500">
                  হোম পেজের সবার নিচের ডার্ক গ্রিন কল টু অ্যাকশন ও হটলাইন
                  ব্যানার
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showContactBannerSection !== false}
                  onChange={() => handleToggle("showContactBannerSection")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  সেকশন প্রদর্শন করুন
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  ব্যানার শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerTitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerTitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Banner Title (English)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerTitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerTitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  ঠিকানা / সাব-টাইটেল (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerSubtitleBn || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerSubtitleBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Address / Subtitle (English)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerSubtitleEn || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerSubtitleEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  হটলাইন নম্বর (Hotline Number)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerHotline || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerHotline", e.target.value)
                  }
                  placeholder="+880 1888-000000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  হটলাইন লেবেল (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerHotlineLabelBn || ""}
                  onChange={(e) =>
                    handleTextChange(
                      "contactBannerHotlineLabelBn",
                      e.target.value,
                    )
                  }
                  placeholder="হোয়াটসঅ্যাপ & ইমো"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Hotline Label (English)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerHotlineLabelEn || ""}
                  onChange={(e) =>
                    handleTextChange(
                      "contactBannerHotlineLabelEn",
                      e.target.value,
                    )
                  }
                  placeholder="WhatsApp & Imo"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  যোগাযোগ বাটন লেবেল (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerCtaBtnBn || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerCtaBtnBn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Contact CTA Button Label (English)
                </label>
                <input
                  type="text"
                  value={formData.contactBannerCtaBtnEn || ""}
                  onChange={(e) =>
                    handleTextChange("contactBannerCtaBtnEn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Quick Save Sticky Bar */}
      <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-emerald-600 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>
            {lang === "bn"
              ? "হোম পেজের এডিটিং সক্রিয় রয়েছে"
              : "Live Home Page CMS is Active"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmResetModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {lang === "bn" ? "রিসেট" : "Reset"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black text-emerald-950 bg-gradient-to-r from-[#D4AF37] via-[#F3E0A0] to-[#B38712] hover:shadow-lg transition-all cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>
              {lang === "bn" ? "সকল পরিবর্তন সেভ করুন" : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      {/* Confirm Reset Modal */}
      {confirmResetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h4 className="text-lg font-black text-slate-900">
                {lang === "bn"
                  ? "ডিফল্ট মানে রিসেট করতে চান?"
                  : "Reset to Default Settings?"}
              </h4>
              <p className="text-xs text-slate-600">
                {lang === "bn"
                  ? "এটি হোম পেজের সকল কাস্টমাইজেশন মুছে দিয়ে মূল ডিফল্ট লেখা ও ছবি ফিরিয়ে আনবে।"
                  : "This will restore the original default headlines, descriptions, and preset values."}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmResetModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {lang === "bn" ? "বাতিল" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-md"
              >
                {lang === "bn" ? "হ্যাঁ, রিসেট করুন" : "Yes, Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
