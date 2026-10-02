import React, { useState } from 'react';
import { 
  Phone, 
  Send, 
  MapPin, 
  Mail, 
  Menu, 
  X, 
  BookOpen, 
  GraduationCap, 
  UserCheck, 
  CreditCard,
  Globe,
  ExternalLink
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Language } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenRegister: (courseId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenRegister
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  const navItems = [
    { id: 'home', labelAr: 'الرئيسية', labelFr: 'Accueil' },
    { id: 'about', labelAr: 'عن المدرسة', labelFr: 'À propos' },
    { id: 'courses', labelAr: 'الدورات والبرامج', labelFr: 'Nos Cours' },
    { id: 'schedule', labelAr: 'جدول الأوقات', labelFr: 'Horaires' },
    { id: 'register', labelAr: 'التسجيل والدفع', labelFr: 'Inscription' },
    { id: 'portal', labelAr: 'فضاء الطالب', labelFr: 'Espace Étudiant' },
    { id: 'contact', labelAr: 'اتصل بنا', labelFr: 'Contact' },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner with direct contact details */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {isAr ? SCHOOL_INFO.addressAr : SCHOOL_INFO.addressFr}
            </span>
            <span className="hidden sm:inline-block text-emerald-600">|</span>
            <a 
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="اتصال هاتفي مباشر"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span dir="ltr" className="font-semibold">{SCHOOL_INFO.phone}</span>
            </a>
            <span className="hidden md:inline-block text-emerald-600">|</span>
            <a 
              href={`mailto:${SCHOOL_INFO.email}`}
              className="hidden md:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Direct WhatsApp Top Link */}
            <a
              href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن مدرسة الشيخ الدلاعي للقرآن الكريم بالمروج 3')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-emerald-200 hover:text-white text-xs transition-colors"
              title="مراسلة فورية عبر واتساب"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">WhatsApp</span>
              <span dir="ltr">93 708 100</span>
            </a>

            {/* Direct Telegram Top Link */}
            <a
              href={SCHOOL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-900 hover:bg-sky-800 text-sky-200 hover:text-white text-xs transition-colors"
              title="قناة ومحادثة تيليغرام"
            >
              <Send className="w-3 h-3 text-sky-400" />
              <span>Telegram</span>
            </a>

            {/* Language Toggle */}
            <button
              id="lang-toggle-btn"
              onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 text-xs font-semibold transition-colors ml-1"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'ar' ? 'Français' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & School Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleNav('home')}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 border border-emerald-600/40">
              <BookOpen className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  {isAr ? 'فرع المروج 3' : 'Section El Mourouj 3'}
                </span>
                <span className="text-[11px] text-stone-500 hidden sm:inline-block">
                  {isAr ? 'الرابطة الوطنية للقرآن الكريم' : 'Ligue Nationale du Saint Coran'}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-stone-900 leading-tight font-cairo">
                {isAr ? 'مدرسة الشيخ الدلاعي للقرآن الكريم' : 'École Cheikh Al Dalai'}
              </h1>
              <p className="text-xs text-stone-500 hidden md:block">
                {isAr ? 'المروج 3 - بن عروس - تونس' : 'El Mourouj 3 - Ben Arous - Tunisie'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/70 shadow-2xs'
                      : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-100/80'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelFr}
                </button>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="header-student-portal-btn"
              onClick={() => handleNav('portal')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>{isAr ? 'فضاء الطالب' : 'Espace Étudiant'}</span>
            </button>

            <button
              id="header-register-cta-btn"
              onClick={() => {
                onOpenRegister();
                handleNav('register');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm shadow-emerald-700/20 rounded-lg transition-all"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>{isAr ? 'سجل وادفع إلكترونياً' : 'Inscription en ligne'}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onOpenRegister();
                handleNav('register');
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-lg"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>{isAr ? 'التسجيل والدفع' : 'Inscription'}</span>
            </button>

            <button
              onClick={() => handleNav('portal')}
              className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>{isAr ? 'فضاء الطالب' : 'Espace Étudiant'}</span>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-right rtl:text-right ltr:text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  currentTab === item.id 
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{isAr ? item.labelAr : item.labelFr}</span>
              </button>
            ))}
          </div>

          {/* Social / Contact Quick Bar */}
          <div className="pt-3 border-t border-stone-200 flex justify-around items-center text-xs text-stone-600">
            <a
              href={`https://wa.me/${SCHOOL_INFO.rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-700 font-semibold"
            >
              <span>واتساب 93 708 100</span>
            </a>
            <a
              href={SCHOOL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-700 font-semibold"
            >
              <span>تلغرام المدرسة</span>
            </a>
            <a
              href={SCHOOL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-700 font-semibold"
            >
              <span>صفحة فيسبوك</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
