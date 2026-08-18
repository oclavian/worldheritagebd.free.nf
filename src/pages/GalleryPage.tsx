import React, { useState } from "react";
import { Camera, Maximize2 } from "lucide-react";
import { Language, GalleryItem } from "../types";
import { getTranslation } from "../data/translations";

interface GalleryPageProps {
  lang: Language;
  items: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  lang,
  items,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", labelKey: "filterAll" },
    { key: "umrah", labelKey: "filterUmrah" },
    { key: "hajj", labelKey: "filterHajj" },
    { key: "tours", labelKey: "filterTours" },
    { key: "office", labelKey: "filterOffice" },
    { key: "group", labelKey: "filterGroup" },
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-bengali">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0D472B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
          <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{getTranslation(lang, "galleryTitle")}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D472B]">
          {getTranslation(lang, "galleryTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {getTranslation(lang, "gallerySub")}
        </p>
      </div>

      {/* Category Tabs */}
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
            {getTranslation(lang, cat.labelKey as any)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-4/3"
          >
            <img
              src={item.imageUrl}
              alt={lang === "bn" ? item.titleBn : item.titleEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                {item.category.toUpperCase()}
              </span>
              <h3 className="text-sm font-bold line-clamp-1">
                {lang === "bn" ? item.titleBn : item.titleEn}
              </h3>
              {(item.captionBn || item.captionEn) && (
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {lang === "bn" ? item.captionBn : item.captionEn}
                </p>
              )}
            </div>

            <div className="absolute top-3 right-3 bg-slate-900/70 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
