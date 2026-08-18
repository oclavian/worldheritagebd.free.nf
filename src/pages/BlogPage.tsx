import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { Language, BlogPost } from "../types";
import { getTranslation } from "../data/translations";
import { PackageCard } from "../components/PackageCard";
import { PackageDetailView } from "../components/PackageDetailView";
import { adaptBlogPost, StandardPackageItem } from "../utils/packageAdapter";

interface BlogPageProps {
  lang: Language;
  posts: BlogPost[];
}

export const BlogPage: React.FC<BlogPageProps> = ({ lang, posts }) => {
  const [selectedDetailPackage, setSelectedDetailPackage] =
    useState<StandardPackageItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [selectedCategory]);

  const categories = [
    { key: "all", labelBn: "সব পোস্ট", labelEn: "All Posts" },
    { key: "umrah-guide", labelBn: "উমরাহ্ গাইড", labelEn: "Umrah Guide" },
    { key: "hajj-guide", labelBn: "হজ্ব গাইড", labelEn: "Hajj Guide" },
    { key: "air-travel", labelBn: "এয়ার ভ্রমণ", labelEn: "Air Travel" },
    { key: "travel-tips", labelBn: "ট্রাভেল টিপস", labelEn: "Travel Tips" },
  ];

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.categoryKey === selectedCategory;
  });

  // If a post/package detail is selected, render full page view
  if (selectedDetailPackage) {
    return (
      <PackageDetailView
        lang={lang}
        pkg={selectedDetailPackage}
        onBack={() => setSelectedDetailPackage(null)}
        onBookNow={() => {}}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 font-bengali">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0D472B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{getTranslation(lang, "blogTitle")}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D472B]">
          {getTranslation(lang, "blogTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {getTranslation(lang, "blogSub")}
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat.key
                ? "bg-[#0D472B] text-white shadow-md border border-[#D4AF37]"
                : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            {lang === "bn" ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => {
          const adapted = adaptBlogPost(post);
          return (
            <PackageCard
              key={post.id}
              lang={lang}
              pkg={adapted}
              onViewDetails={(item) => setSelectedDetailPackage(item)}
            />
          );
        })}
      </div>
    </div>
  );
};
