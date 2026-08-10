import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Language, BookingInquiry } from '../types';
import { getTranslation } from '../data/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  prefilledService?: string;
  prefilledPackageTitle?: string;
  onSaveInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  prefilledService = 'Umrah',
  prefilledPackageTitle = '',
  onSaveInquiry,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState<'Umrah' | 'Hajj' | 'Air Ticket' | 'Tour & Visa' | 'General Inquiry'>(
    (prefilledService as any) || 'Umrah'
  );
  const [packageTitle, setPackageTitle] = useState(prefilledPackageTitle || '');
  const [travelersCount, setTravelersCount] = useState<number>(1);
  const [expectedDate, setExpectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    onSaveInquiry({
      customerName,
      phone,
      email,
      serviceType,
      packageTitle,
      travelersCount,
      expectedDate,
      message,
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setCustomerName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 font-bengali">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#D4AF37] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D472B] to-[#053B21] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-emerald-950 flex items-center justify-center font-bold">
              🕌
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-sans">
                {getTranslation(lang, 'bookModalTitle')}
              </h3>
              <p className="text-xs text-emerald-200">
                World Heritage Tours & Travels
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-emerald-800 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#0D472B] rounded-full flex items-center justify-center mx-auto border-2 border-[#D4AF37]">
                <CheckCircle2 className="w-10 h-10 text-[#0D472B]" />
              </div>
              <h4 className="text-xl font-bold text-[#0D472B]">
                {lang === 'bn' ? 'ইনকোয়ারি সফলভাবে পাঠানো হয়েছে!' : 'Inquiry Sent Successfully!'}
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {getTranslation(lang, 'successMsg')}
              </p>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-semibold inline-block">
                {lang === 'bn' ? 'জরুরি প্রয়োজনে সরাসরি কল করুন: ০১৬২৭৭৩৭৭৪১' : 'For urgent queries call: 01627737741'}
              </div>
              <div>
                <button
                  onClick={handleResetAndClose}
                  className="bg-[#0D472B] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#053B21] transition-all"
                >
                  {getTranslation(lang, 'close')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {packageTitle && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2 text-xs text-amber-900">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="font-bold">{lang === 'bn' ? 'নির্বাচিত প্যাকেজ:' : 'Selected Package:'} </span>
                    <span>{packageTitle}</span>
                  </div>
                </div>
              )}

              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {getTranslation(lang, 'formService')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                >
                  <option value="Umrah">{lang === 'bn' ? '🕋 উমরাহ্ প্যাকেজ' : '🕋 Umrah Package'}</option>
                  <option value="Hajj">{lang === 'bn' ? '🕋 হজ্ব প্যাকেজ ২০২৭' : '🕋 Holy Hajj 2027'}</option>
                  <option value="Air Ticket">{lang === 'bn' ? '✈ এয়ার টিকিট' : '✈ Air Ticket'}</option>
                  <option value="Tour & Visa">{lang === 'bn' ? '🌍 ট্যুর ও ভিসা' : '🌍 Tour & Visa'}</option>
                  <option value="General Inquiry">{lang === 'bn' ? '💬 সাধারণ তথ্য' : '💬 General Inquiry'}</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formPhone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01627737741"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>
              </div>

              {/* Email & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formEmail')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'travelers')}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>
              </div>

              {/* Expected Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {getTranslation(lang, 'preferredDate')}
                </label>
                <input
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {getTranslation(lang, 'formMessage')}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার যদি কোনো বিশেষ নির্দেশনা থাকে লিখুন...' : 'Any specific notes or requirements...'}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D472B]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0D472B] to-[#053B21] text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg border border-[#D4AF37] flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>{getTranslation(lang, 'submitInquiry')}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'bn' ? 'আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকবে।' : 'Your contact information is strictly confidential.'}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
