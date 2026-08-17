import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  Volume2,
  Pause,
  Play,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";

interface HajjHadithMarqueeProps {
  lang: "bn" | "en";
}

export const hadithQuotes = [
  {
    id: 1,
    source: "সূরা আলে ইমরান (৩) : ৯৭",
    sourceEn: "Surah Ali Imran (3) : 97",
    arabic:
      "وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا ۚ وَمَن كَفَرَ فَإِنَّ اللَّهَ غَنِيٌّ عَنِ الْعَالَمِينَ",
    textBn:
      "আল্লাহ তাআলা ইরশাদ করেছেন— মানুষের মধ্যে যারা সেখানে (বায়তুল্লাহ) পৌঁছার সামর্থ্য রাখে তাদের উপর আল্লাহর উদ্দেশ্যে এ গৃহের হজ্ব করা ফরয। আর কেউ যদি অস্বীকার করে তাহলে জেনে রাখা উচিত যে, আল্লাহ তাআলা সৃষ্টিজগতের প্রতি মুখাপেক্ষী নন।",
    textEn:
      "And pilgrimage to the House is a duty unto Allah for mankind, for him who can find a way thither. And whosoever disbelieveth, Allah is Independent of all creatures.",
  },
  {
    id: 2,
    source: "মুসনাদে আহমদ: ১৮৩৩; ইবনে মাজাহ: ২৮৮৩; আবু দাউদ: ১৭৩২",
    sourceEn: "Musnad Ahmad: 1833; Ibn Majah: 2883; Abu Dawud: 1732",
    arabic:
      "مَنْ أَرَادَ الْحَجَّ فَلْيَتَعَجَّلْ، فَإِنَّهُ قَدْ يَمْرَضُ الْمَرِيضُ وَتَضِلُّ الضَّالَّةُ وَتَعْرِضُ الْحَاجَةُ",
    textBn:
      "রাসূলে কারীম (সা.) ইরশাদ করেছেন— যে ব্যক্তি হজ্ব করার ইচ্ছে করে, সে যেন তাড়াতাড়ি তা আদায় করে নেয়। কারণ যে কোনো সময় সে অসুস্থ হয়ে যেতে পারে বা বাহনের ব্যবস্থার ব্যাঘাত হতে পারে অথবা অন্য কোনো সমস্যার সম্মুখীন হতে পারে।",
    textEn:
      "The Prophet (PBUH) said: Whoever intends to perform Hajj, let him hasten to do so, for he may fall ill, his riding animal may go astray, or some necessity may arise.",
  },
  {
    id: 3,
    source: "মুসনাদে আহমদ: ২৮৬৭; সুনানে কুবরা বায়হাকী: ৪/৩৪০",
    sourceEn: "Musnad Ahmad: 2867; Sunan al-Kubra Bayhaqi: 4/340",
    arabic:
      "تَعَجَّلُوا إِلَى الْحَجِّ - يَعْنِي الْفَرِيضَةَ - فَإِنَّ أَحَدَكُمْ لَا يَدْرِي مَا يَعْرِضُ لَهُ",
    textBn:
      "রাসূলুল্লাহ (সা.) ইরশাদ করেছেন— ফরয হজ্ব আদায়ে তোমরা বিলম্ব করো না। কারণ তোমাদের কারো জানা নেই তোমাদের পরবর্তী জীবনে কী ঘটবে।",
    textEn:
      "The Prophet (PBUH) said: Hasten to perform Hajj (the obligatory one), for none of you knows what obstacles may happen to him.",
  },
  {
    id: 4,
    source: "সহীহ ইবনে হিববান: ৩৬৯৫; মুসনাদে আবু ইয়ালা: ১০৩১; তবারানী: ৪৯০",
    sourceEn: "Sahih Ibn Hibban: 3695; Musnad Abu Ya'la: 1031",
    arabic:
      "يَقُولُ اللَّهُ عَزَّ وَجَلَّ: إِنَّ عَبْدًا صَحَّحْتُ لَهُ جِسْمَهُ، وَوَسَّعْتُ عَلَيْهِ فِي الْمَعِيشَةِ تَمْضِي عَلَيْهِ خَمْسَةُ أَعْوَامٍ لَا يَفِدُ إِلَيَّ لَمَحْرُومٌ",
    textBn:
      "হাদীসে কুদসী— আল্লাহ তাআলা বলেন: আমি আমার বান্দার শরীরকে সুস্থ রাখলাম, তার রিযিক ও আয়-উপার্জনে প্রশস্ততা দান করলাম। পাঁচ বছর অতিক্রান্ত হওয়ার পরও যদি সে আমার গৃহের হজ্বের উদ্দেশ্যে আগমন না করে তবে সে হতভাগ্য, বঞ্চিত।",
    textEn:
      "Hadith Qudsi: Allah says: Any servant of Mine whose body I have made healthy and whose sustenance I have broadened, yet five years pass and he does not visit My House, is truly deprived.",
  },
  {
    id: 5,
    source: "সহীহ ইবনে খুযাইমা: ২৫০৬; সহীহ ইবনে হিববান: ৬৭১৮",
    sourceEn: "Sahih Ibn Khuzaymah: 2506; Sahih Ibn Hibban: 6718",
    arabic:
      "اسْتَمْتِعُوا بِهَذَا الْبَيْتِ فَقَدْ هُدِمَ مَرَّتَيْنِ وَيُرْفَعُ فِي الثَّالِثَةِ",
    textBn:
      "রাসূলুল্লাহ (সা.) বলেছেন— তোমরা হজ্ব ও উমরার মাধ্যমে এই (বায়তুল্লাহ) গৃহের উপকার গ্রহণ কর। কেননা তা ইতিপূর্বে দু’বার ধ্বংস হয়েছে। তৃতীয়বারের পর উঠিয়ে নেওয়া হবে।",
    textEn:
      "The Prophet (PBUH) said: Benefit from this House, for it has been destroyed twice, and the third time it will be raised up.",
  },
  {
    id: 6,
    source: "তাফসীরে ইবনে কাসীর: ১/৫৭৮ (হযরত ওমর রা.)",
    sourceEn: "Tafsir Ibn Kathir: 1/578 (Hazrat Umar RA)",
    arabic:
      "مَنْ أَطَاقَ الْحَجَّ فَلَمْ يَحُجَّ فَسَوَاءٌ عَلَيْهِ مَاتَ يَهُودِيًّا أَوْ نَصْرَانِيًّا",
    textBn:
      "ওমর ইবনুল খাত্তাব (রা.) বলেন— যে ব্যক্তি হজ্ব করার সামর্থ্য রাখে, তবুও হজ্ব করে না সে ইহুদী হয়ে মৃত্যুবরণ করল কি খৃস্টান হয়ে তার কোনো পরোয়া আল্লাহর নেই।",
    textEn:
      "Umar ibn al-Khattab (RA) said: Whoever possesses the means to perform Hajj and does not do so, it is all the same whether he dies as a Jew or a Christian.",
  },
];

export const HajjHadithMarquee: React.FC<HajjHadithMarqueeProps> = ({
  lang,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  // Prevent background page from scrolling when modal is open
  useEffect(() => {
    if (showFullModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFullModal]);

  return (
    <>
      <div className="w-full mt-3 sm:mt-4">
        {/* Continuous Animated Marquee Box */}
        <div
          className="relative bg-gradient-to-r from-black/80 via-[#041c10]/95 to-black/80 border border-[#D4AF37]/50 rounded-2xl p-1.5 sm:p-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-center gap-2 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Golden Badge Header on the Left */}
          <div className="shrink-0 flex items-center justify-between w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B38712] text-emerald-950 px-3.5 py-2 rounded-xl font-extrabold text-xs sm:text-sm shadow-md z-20">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <BookOpen className="w-4 h-4 text-emerald-950" />
              <span>
                {lang === "bn"
                  ? "হাদীস ও কুরআনের নির্দেশ"
                  : "Hajj in Hadith & Quran"}
              </span>
            </div>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="sm:hidden p-0.5 text-emerald-950 hover:bg-black/10 rounded ml-2"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Marquee Content Rail */}
          <div className="relative flex-1 overflow-hidden w-full mask-gradient">
            <style>{`
              @keyframes hadithMarqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-hadith-marquee {
                display: flex;
                width: max-content;
                animation: hadithMarqueeScroll 210s linear infinite;
              }
              .animate-hadith-marquee.paused {
                animation-play-state: paused;
              }
              .mask-gradient {
                mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
              }
            `}</style>

            <div
              className={`animate-hadith-marquee ${isPaused ? "paused" : ""} items-center py-1`}
            >
              {/* Duplicate array for seamless infinite loop */}
              {[...hadithQuotes, ...hadithQuotes].map((quote, idx) => (
                <div
                  key={`${quote.id}-${idx}`}
                  className="flex items-center gap-3 px-5 text-sm font-medium cursor-pointer shrink-0"
                  onClick={() => setShowFullModal(true)}
                >
                  <span className="text-[#D4AF37] text-base">✦</span>

                  {/* Arabic snippet with golden tint */}
                  <span className="font-serif text-[#F3E0A0] text-sm sm:text-base dir-rtl font-bold bg-[#D4AF37]/20 px-2.5 py-1 rounded-md border border-[#D4AF37]/40 whitespace-nowrap shadow-xs">
                    {quote.arabic}
                  </span>

                  {/* Bengali / English Meaning */}
                  <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap leading-normal">
                    {lang === "bn" ? quote.textBn : quote.textEn}
                  </span>

                  {/* Reference Citation Badge */}
                  <span className="bg-emerald-950 text-[#D4AF37] px-2.5 py-0.5 rounded-full text-xs border border-[#D4AF37]/50 whitespace-nowrap font-sans font-bold shadow-xs">
                    [{lang === "bn" ? quote.source : quote.sourceEn}]
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick View All Button */}
          <div className="shrink-0 hidden md:flex items-center gap-1.5 pl-1.5 pr-2 z-20">
            <button
              onClick={() => setShowFullModal(true)}
              className="bg-white/15 hover:bg-[#D4AF37] text-[#F3E0A0] hover:text-emerald-950 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-[#D4AF37]/50 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>{lang === "bn" ? "সবগুলো পড়ুন" : "Read All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Modal to comfortably read all Hajj Hadith & Quran Verses rendered via createPortal at body level */}
      {showFullModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFullModal(false);
            }}
          >
            <div className="relative bg-[#02180D] border-2 border-[#D4AF37] rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38712] p-4 text-emerald-950 flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-950 shrink-0" />
                  <h3 className="font-extrabold text-sm sm:text-base md:text-lg">
                    {lang === "bn"
                      ? "হজ্ব ফরয হওয়া ও অবিলম্বে আদায়ের গুরুত্ব (হাদীস ও কুরআন)"
                      : "Importance of Hajj in Hadith & Quran"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFullModal(false)}
                  className="p-1.5 bg-emerald-950/20 hover:bg-emerald-950/40 rounded-full text-emerald-950 cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body with smooth internal scrollbar */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-emerald-50 divide-y divide-[#D4AF37]/20 flex-1">
                {hadithQuotes.map((quote, idx) => (
                  <div
                    key={quote.id}
                    className={`pt-3 ${idx === 0 ? "pt-0" : ""} space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                        {lang === "bn" ? quote.source : quote.sourceEn}
                      </span>
                      <span className="text-emerald-400 text-xs">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Arabic */}
                    <p className="font-serif text-amber-200 text-sm sm:text-base leading-relaxed bg-black/50 p-3 rounded-xl border border-[#D4AF37]/30 text-right dir-rtl">
                      {quote.arabic}
                    </p>

                    {/* Bengali / English Translation */}
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans pl-1">
                      {lang === "bn" ? quote.textBn : quote.textEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="bg-black/80 p-3 border-t border-[#D4AF37]/30 flex justify-end shrink-0">
                <button
                  onClick={() => setShowFullModal(false)}
                  className="bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 px-6 py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-md cursor-pointer transition-all active:scale-95"
                >
                  {lang === "bn" ? "বন্ধ করুন" : "Close"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
