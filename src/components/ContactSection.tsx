import React, { useState } from 'react';
import { 
  Phone, 
  Send, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Clock, 
  Facebook, 
  Share2, 
  Check, 
  Navigation,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { SCHOOL_INFO, FAQS } from '../data/schoolData';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [inquiryType, setInquiryType] = useState('general');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const predefinedMessages = [
    {
      id: 'kids',
      labelAr: 'تسجيل حلقة البراعم والأطفال',
      labelFr: 'Inscription Enfants',
      text: 'السلام عليكم ورحمة الله، أود الاستفسار عن تسجيل ابني/ابنتي في حلقة البراعم بفرع الشيخ الدلاعي بالمروج 3.'
    },
    {
      id: 'women',
      labelAr: 'حلقات النساء والفتيات',
      labelFr: 'Cercles Femmes',
      text: 'السلام عليكم ورحمة الله، أرغب في معرفة مواعيد حلقات النساء وأيام الحضور بالمدرسة.'
    },
    {
      id: 'adults',
      labelAr: 'حلقات الكبار والمهنيين',
      labelFr: 'Cours Adultes',
      text: 'السلام عليكم، أستفسر عن مواعيد حلقات الكبار المسائية وعطلة نهاية الأسبوع.'
    },
    {
      id: 'payment',
      labelAr: 'استفسار عن الدفع الإلكتروني',
      labelFr: 'Paiement en ligne',
      text: 'السلام عليكم، لدي استفسار بخصوص عملية الدفع الإلكتروني وتأكيد وصل التسجيل.'
    }
  ];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(SCHOOL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim()) return;

    // Direct redirection to WhatsApp with message prepared
    const msg = `السلام عليكم ورحمة الله، أنا ${senderName} (هاتف: ${senderPhone}). ${senderMessage || 'أود الاستفسار عن المدرسة والدورات بالمروج 3.'}`;
    const url = `https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isAr ? 'قنوات التواصل المباشر' : 'Contactez-nous'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-cairo mb-3">
            {isAr 
              ? 'تواصل فوري عبر واتساب، تلغرام، والهاتف'
              : 'Contact Direct via WhatsApp, Telegram et Téléphone'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            {isAr 
              ? 'فريق إدارة مدرسة الشيخ الدلاعي بالمروج 3 رهن إشارتكم للإجابة عن تساؤلاتكم ومساعدتكم في التسجيل.'
              : 'Notre équipe est à votre disposition pour vous orienter et répondre à vos questions.'}
          </p>
        </div>

        {/* Primary Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          
          {/* WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-500/40 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  WA
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
                  {isAr ? 'رد سريع' : 'En ligne'}
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-base font-cairo mb-1">
                WhatsApp المباشر
              </h3>
              <p className="text-xs text-stone-600 mb-3">
                {isAr ? 'محادثة فورية مع إدارة المدرسة والتسجيل' : 'Discussion instantanée sur WhatsApp'}
              </p>
              <div dir="ltr" className="text-lg font-bold text-emerald-800 font-mono mb-4 text-right rtl:text-right ltr:text-left">
                {SCHOOL_INFO.phone}
              </div>
            </div>

            <a
              href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent('السلام عليكم، أود التواصل مع مدرسة الشيخ الدلاعي بالمروج 3')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>{isAr ? 'فتح محادثة واتساب' : 'Discuter sur WhatsApp'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Telegram Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-sky-50 to-white border-2 border-sky-400/40 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                  {isAr ? 'قناة وتواصل' : 'Canal'}
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-base font-cairo mb-1">
                Telegram الفرع
              </h3>
              <p className="text-xs text-stone-600 mb-3">
                {isAr ? 'متابعة الإعلانات والمواعيد والمراسلة' : 'Annonces officielles et assistance'}
              </p>
              <div dir="ltr" className="text-sm font-bold text-sky-800 font-mono mb-4 text-right rtl:text-right ltr:text-left truncate">
                @{SCHOOL_INFO.telegramUsername}
              </div>
            </div>

            <a
              href={SCHOOL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>{isAr ? 'الانضمام لقناة تلغرام' : 'Rejoindre Telegram'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Phone Call Card */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-stone-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <Phone className="w-5 h-5 text-amber-300" />
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="text-[10px] font-semibold text-stone-600 hover:text-stone-900 bg-stone-200/80 px-2 py-0.5 rounded transition-colors"
                >
                  {copiedPhone ? (isAr ? 'تم النسخ' : 'Copié') : (isAr ? 'نسخ الرقم' : 'Copier')}
                </button>
              </div>
              <h3 className="font-bold text-stone-900 text-base font-cairo mb-1">
                {isAr ? 'الاتصال الهاتفي' : 'Appel Téléphonique'}
              </h3>
              <p className="text-xs text-stone-600 mb-3">
                {isAr ? 'استقبال المكالمات من 08:30 إلى 19:30' : 'Disponible de 08h30 à 19h30'}
              </p>
              <div dir="ltr" className="text-lg font-bold text-stone-900 font-mono mb-4 text-right rtl:text-right ltr:text-left">
                {SCHOOL_INFO.phone}
              </div>
            </div>

            <a
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isAr ? 'اتصال مباشر الآن' : 'Appeler'}</span>
            </a>
          </div>

          {/* Official Facebook & Email Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                  {isAr ? 'الصفحة الرسمية' : 'Facebook'}
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-base font-cairo mb-1">
                فيسبوك والبريد
              </h3>
              <p className="text-xs text-stone-600 mb-2 truncate">
                {SCHOOL_INFO.facebookPageName}
              </p>
              <div className="text-[11px] text-stone-500 truncate mb-4">
                {SCHOOL_INFO.email}
              </div>
            </div>

            <a
              href={SCHOOL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>{isAr ? 'زيارة صفحة فيسبوك' : 'Page Facebook'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Quick WhatsApp Message Presets Generator */}
        <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 mb-14">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold text-stone-900 font-cairo flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-700" />
              <span>{isAr ? 'مراسلة سريعة للإدارة عبر واتساب بنقرة واحدة:' : 'Modèles de messages WhatsApp :'}</span>
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              {isAr 
                ? 'اختر نوع استفسارك لتوليد رسالة جاهزة ومباشرة إلى رقم إدارة المدرسة 93 708 100:'
                : 'Sélectionnez votre demande pour générer un message instantané.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {predefinedMessages.map((msg) => (
              <a
                key={msg.id}
                href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent(msg.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between text-right rtl:text-right ltr:text-left group"
              >
                <div>
                  <span className="font-bold text-xs text-stone-900 block group-hover:text-emerald-800 transition-colors">
                    {isAr ? msg.labelAr : msg.labelFr}
                  </span>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                    « {msg.text} »
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                  <span>{isAr ? 'إرسال عبر واتساب' : 'Envoyer'}</span>
                  <span>←</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Location & Map Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Address Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isAr ? 'الموقع الجغرافي والوصول' : 'Emplacement Géographique'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-cairo">
              {isAr ? 'مقر المدرسة بالمروج 3، بن عروس - تونس' : 'Siège de l’école à El Mourouj 3, Ben Arous'}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {isAr 
                ? 'تقع مدرسة الشيخ الدلاعي في قلب المروج 3 بولاية بن عروس، في منطقة يسهل الوصول إليها عبر المترو الخفيف (الخط 6) وحافلات النقل العمومي، مع توفر أماكن لركن السيارات بجوار المقر.'
                : 'L’école est située à El Mourouj 3 (Gouvernorat de Ben Arous), facilement accessible en métro léger (ligne 6) ou en bus.'}
            </p>

            <div className="space-y-2 text-xs text-stone-700 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>العنوان:</strong> {isAr ? SCHOOL_INFO.addressAr : SCHOOL_INFO.addressFr}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>الهاتف / واتساب:</strong> {SCHOOL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>البريد الإلكتروني:</strong> {SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>التوقيت:</strong> {isAr ? SCHOOL_INFO.workingHoursAr : SCHOOL_INFO.workingHoursFr}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=El+Mourouj+3+Ben+Arous+Tunisia"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAr ? 'فتح خرائط غوغل وتحديد المسار' : 'Itinéraire Google Maps'}</span>
              </a>

              <a
                href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent('السلام عليكم، أرجو تزويدي بموقع المدرسة الجغرافي الدقيق على خرائط غوغل.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors border border-emerald-200 inline-flex items-center gap-2"
              >
                <span>{isAr ? 'طلب الموقع عبر واتساب' : 'Localisation sur WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Representation */}
          <div className="lg:col-span-6">
            <div className="bg-stone-100 rounded-2xl border border-stone-300 overflow-hidden shadow-xs relative">
              
              {/* Map Placeholder Graphic */}
              <div className="h-72 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative flex items-center justify-center text-white p-6 text-center">
                <div className="absolute inset-0 opacity-20 islamic-pattern"></div>
                
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-cairo">
                      {isAr ? 'مقر مدرسة الشيخ الدلاعي للقرآن الكريم' : 'École Cheikh Al Dalai'}
                    </h4>
                    <p className="text-xs text-emerald-200">
                      المروج 3، بن عروس - الجمهورية التونسية
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=El+Mourouj+3+Ben+Arous+Tunisia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-bold text-white transition-colors"
                  >
                    <span>{isAr ? 'عرض الخريطة التفاعلية' : 'Voir sur Google Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Transport hints */}
              <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <span>🚊 المترو الخفيف 6: محطة المروج</span>
                <span>🚌 خطوط الحافلات متوفرة</span>
                <span className="text-emerald-700 font-bold">Mourouj 3</span>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-stone-900 font-cairo">
              {isAr ? 'الأسئلة الشائعة وتوجيهات التسجيل' : 'Foire Aux Questions'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-start gap-2.5 mb-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                    {isAr ? faq.qAr : faq.qFr}
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pr-6 rtl:pr-6 ltr:pl-6">
                  {isAr ? faq.aAr : faq.aFr}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
