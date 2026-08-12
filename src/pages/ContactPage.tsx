import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Building2, ShieldCheck, MessageCircle } from 'lucide-react';
import { Language, AgencyInfo, BookingInquiry } from '../types';
import { getTranslation } from '../data/translations';

interface ContactPageProps {
  lang: Language;
  agencyInfo: AgencyInfo;
  onSaveInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  agencyInfo,
  onSaveInquiry,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Umrah');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onSaveInquiry({
      customerName: name,
      phone,
      email,
      serviceType: service as any,
      message,
      travelersCount: 1,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0D472B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{getTranslation(lang, 'contactTitle')}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D472B]">
          {getTranslation(lang, 'contactTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {getTranslation(lang, 'contactSub')}
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
                {lang === 'bn' ? agencyInfo.nameBn.replace('ট্যুরস', 'ট্যুর্স') : agencyInfo.nameEn}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-800">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <MapPin className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">{getTranslation(lang, 'officeAddressLabel')}</strong>
                  <span className="leading-relaxed">{lang === 'bn' ? agencyInfo.addressBn : agencyInfo.addressEn}</span>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <Phone className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">{getTranslation(lang, 'hotlineLabel')}</strong>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a href={`tel:${agencyInfo.hotline}`} className="text-base font-extrabold text-[#0D472B] hover:underline">
                      {agencyInfo.hotline}
                    </a>
                    <span className="text-xs font-semibold text-amber-600 font-bengali">
                      ({lang === 'bn' ? 'হোয়াটসঅ্যাপ & ইমো' : 'WhatsApp & Imo'})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <strong className="text-[#0D472B]">{lang === 'bn' ? 'বিকল্প যোগাযোগ: ' : 'Alt Phone: '}</strong>
                    <a href="tel:01785970008" className="hover:underline font-semibold">01785970008-9</a>,{' '}
                    <a href="tel:01920825145" className="hover:underline font-semibold">01920825145</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0D472B] flex items-center justify-center shrink-0 border border-emerald-300">
                  <Mail className="w-5 h-5 text-[#0D472B]" />
                </div>
                <div>
                  <strong className="block text-[#0D472B] font-bold text-xs uppercase">{getTranslation(lang, 'emailLabel')}</strong>
                  <a href={`mailto:${agencyInfo.email}`} className="font-semibold text-slate-800 hover:underline">
                    {agencyInfo.email}
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
                    {lang === 'bn' ? 'অফিস সময়সূচী' : 'Office Hours'}
                  </strong>
                  <span>{lang === 'bn' ? 'শনিবার - বৃহস্পতিবার (সকাল ৯:৩০ - রাত ৮:৩০)' : 'Saturday - Thursday (9:30 AM - 8:30 PM)'}</span>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/${agencyInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি চ্যাট করুন' : 'Direct WhatsApp Chat'}</span>
              </a>
            </div>

          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0D472B] shrink-0" />
            <span>{lang === 'bn' ? 'আপনার ব্যক্তিগত বার্তাটি সর্বোচ্চ নিরাপত্তার সাথে সংরক্ষিত থাকবে।' : 'Your inquiries are handled with strict privacy.'}</span>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DEC8] shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-[#0D472B]">
              {lang === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send Us a Message'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {lang === 'bn' ? 'নিচের ফর্মটি পূরণ করে পাঠান, আমাদের প্রতিনিধি অতিসত্বর যোগাযোগ করবেন।' : 'Fill out the form below and our travel advisor will respond promptly.'}
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border-2 border-[#D4AF37] p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#0D472B] mx-auto" />
              <h3 className="text-xl font-bold text-[#0D472B]">
                {lang === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                {getTranslation(lang, 'successMsg')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 bg-[#0D472B] text-white px-5 py-2 rounded-xl font-bold text-xs"
              >
                {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formPhone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formEmail')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {getTranslation(lang, 'formService')}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                  >
                    <option value="Umrah">{lang === 'bn' ? 'উমরাহ্ প্যাকেজ' : 'Umrah Package'}</option>
                    <option value="Hajj">{lang === 'bn' ? 'হজ্ব প্যাকেজ ২০২৭' : 'Hajj 2027'}</option>
                    <option value="Air Ticket">{lang === 'bn' ? 'এয়ার টিকিট' : 'Air Ticket'}</option>
                    <option value="Tour & Visa">{lang === 'bn' ? 'ট্যুর ও ভিসা' : 'Tour & Visa'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {getTranslation(lang, 'formMessage')}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D472B]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all border border-[#D4AF37] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>{getTranslation(lang, 'sendMessageBtn')}</span>
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Google Maps Location Visual Frame */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DEC8] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#0D472B]">
          <div className="flex items-center gap-2 font-bold text-base">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'আমাদের অফিস লোকেশন ম্যাপ (ইন্দিরা রোড, পান্থপথ)' : 'Our Office Location Map (Panthapath, Dhaka)'}</span>
          </div>
          {agencyInfo.googleMapsUrl && (
            <a
              href={agencyInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D472B] text-white px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37] hover:bg-[#053B21] transition-all shadow-sm shrink-0"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'গুগল ম্যাপে নেভিগেট করুন' : 'Open in Google Maps'}</span>
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
