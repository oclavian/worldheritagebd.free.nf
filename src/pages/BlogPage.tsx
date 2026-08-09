import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowLeft, X } from 'lucide-react';
import { Language, BlogPost } from '../types';
import { getTranslation } from '../data/translations';

interface BlogPageProps {
  lang: Language;
  posts: BlogPost[];
}

export const BlogPage: React.FC<BlogPageProps> = ({ lang, posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  const categories = [
    { key: 'all', labelBn: 'সব পোস্ট', labelEn: 'All Posts' },
    { key: 'umrah-guide', labelBn: 'উমরাহ্ গাইড', labelEn: 'Umrah Guide' },
    { key: 'hajj-guide', labelBn: 'হজ্ব গাইড', labelEn: 'Hajj Guide' },
    { key: 'air-travel', labelBn: 'এয়ার ভ্রমণ', labelEn: 'Air Travel' },
    { key: 'travel-tips', labelBn: 'ট্রাভেল টিপস', labelEn: 'Travel Tips' },
  ];

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.categoryKey === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 font-bengali">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0D472B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{getTranslation(lang, 'blogTitle')}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D472B]">
          {getTranslation(lang, 'blogTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {getTranslation(lang, 'blogSub')}
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
                ? 'bg-[#0D472B] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {lang === 'bn' ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden border-2 border-[#E6DEC8] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/9 bg-slate-100 relative">
                <img
                  src={post.image}
                  alt={lang === 'bn' ? post.titleBn : post.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#0D472B] text-white font-bold text-[10px] px-2.5 py-1 rounded-full border border-[#D4AF37]">
                  {lang === 'bn' ? post.categoryBn : post.categoryEn}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#D4AF37]" />
                    <span>{lang === 'bn' ? post.authorBn : post.authorEn}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0D472B] line-clamp-2 leading-snug">
                  {lang === 'bn' ? post.titleBn : post.titleEn}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {lang === 'bn' ? post.summaryBn : post.summaryEn}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-2">
              <button
                onClick={() => setSelectedPost(post)}
                className="w-full bg-[#FAF8F5] hover:bg-[#0D472B] text-[#0D472B] hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-emerald-200 mt-3"
              >
                {getTranslation(lang, 'readMore')} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] max-h-[90vh] flex flex-col">
            
            <div className="p-4 bg-[#0D472B] text-white flex items-center justify-between border-b border-[#D4AF37]">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                {lang === 'bn' ? selectedPost.categoryBn : selectedPost.categoryEn}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full hover:bg-emerald-800 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="aspect-21/9 bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={lang === 'bn' ? selectedPost.titleBn : selectedPost.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>📅 {selectedPost.date}</span>
                  <span>✍ {lang === 'bn' ? selectedPost.authorBn : selectedPost.authorEn}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0D472B]">
                  {lang === 'bn' ? selectedPost.titleBn : selectedPost.titleEn}
                </h2>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-4">
                {lang === 'bn' ? selectedPost.contentBn : selectedPost.contentEn}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
