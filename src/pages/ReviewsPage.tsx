import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  Plus,
  CheckCircle2,
  ShieldCheck,
  User,
} from "lucide-react";
import { Language, Review } from "../types";
import { getTranslation } from "../data/translations";

interface ReviewsPageProps {
  lang: Language;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date" | "verified">) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  lang,
  reviews,
  onAddReview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("উমরাহ্ প্যাকেজ");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    onAddReview({
      nameBn: name,
      nameEn: name,
      locationBn: location || "ঢাকা",
      locationEn: location || "Dhaka",
      serviceBn: service,
      serviceEn: service,
      rating,
      commentBn: comment,
      commentEn: comment,
    });

    setName("");
    setLocation("");
    setComment("");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 font-bengali">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6DEC8] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0D472B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{getTranslation(lang, "reviewsTitle")}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0D472B] mt-2">
            {getTranslation(lang, "reviewsTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {getTranslation(lang, "reviewsSub")}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0D472B] hover:bg-[#053B21] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all border border-[#D4AF37] flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>{getTranslation(lang, "addReviewCTA")}</span>
        </button>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border-2 border-[#E6DEC8] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-[#0D472B]" />
                    <span>
                      {lang === "bn"
                        ? "যাচাইকৃত ক্লায়েন্ট"
                        : "Verified Client"}
                    </span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                "{lang === "bn" ? rev.commentBn : rev.commentEn}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-100 text-[#0D472B] rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-300">
                <User className="w-4 h-4 text-[#0D472B]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0D472B]">
                  {lang === "bn" ? rev.nameBn : rev.nameEn}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {lang === "bn" ? rev.serviceBn : rev.serviceEn} •{" "}
                  {lang === "bn" ? rev.locationBn : rev.locationEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#D4AF37] space-y-4">
            <h3 className="text-lg font-bold text-[#0D472B]">
              {getTranslation(lang, "addReviewCTA")}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {getTranslation(lang, "formName")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === "bn" ? "স্থান / এলাকা" : "Location"}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={
                    lang === "bn" ? "যেমন: ধানমন্ডি, ঢাকা" : "e.g. Dhaka"
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {getTranslation(lang, "formService")}
                </label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === "bn" ? "রেটিং" : "Rating"}
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                  <option value={3}>⭐⭐⭐ 3 Stars</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === "bn" ? "আপনার অভিজ্ঞতা লিখুন" : "Your Review"}
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  {getTranslation(lang, "close")}
                </button>
                <button
                  type="submit"
                  className="bg-[#0D472B] text-white px-5 py-2 rounded-xl font-bold shadow-md hover:bg-[#053B21]"
                >
                  {lang === "bn" ? "জমাদান" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
