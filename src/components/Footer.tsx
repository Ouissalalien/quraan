import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Facebook, 
  CreditCard, 
  UserCheck, 
  Heart 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenRegister: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenRegister
}) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t-4 border-emerald-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-emerald-400">
                  {isAr ? 'فرع المروج 3' : 'Section El Mourouj 3'}
                </div>
                <h3 className="font-bold text-white text-base font-cairo">
                  {isAr ? 'مدرسة الشيخ الدلاعي للقرآن' : 'École Cheikh Al Dalai'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {isAr
                ? 'الفرع المحلي للرابطة الوطنية للقرآن الكريم الشيخ الدلاعي بالمروج 3، بن عروس. تحفيظ القرآن الكريم وتجويده بالسند المتصل برواية قالون عن نافع.'
                : 'Section locale de la Ligue Nationale du Saint Coran à El Mourouj 3, Ben Arous. Mémorisation et perfectionnement du Tajweed.'}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${SCHOOL_INFO.rawPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-emerald-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <span className="font-bold text-xs">WA</span>
              </a>
              <a
                href={SCHOOL_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-sky-950/70 hover:bg-sky-700 text-sky-300 hover:text-white flex items-center justify-center transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={SCHOOL_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-950/70 hover:bg-blue-700 text-blue-300 hover:text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SCHOOL_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 font-cairo">
              {isAr ? 'أقسام الموقع' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isAr ? 'الصفحة الرئيسية' : 'Accueil'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isAr ? 'عن المدرسة والمشايخ' : 'À propos'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isAr ? 'الدورات والمسارات القرآنية' : 'Nos Cours'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isAr ? 'جدول المواعيد الأسبوعي' : 'Emploi du temps'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isAr ? 'قنوات الاتصال المباشر' : 'Contact'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Payment Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 font-cairo">
              {isAr ? 'الخدمات الإلكترونية' : 'Services en ligne'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onOpenRegister();
                    onNavigate('register');
                  }}
                  className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isAr ? 'التسجيل والدفع الإلكتروني' : 'Inscription & Paiement'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? 'فضاء الطالب ومتابعة الحفظ' : 'Espace Étudiant'}</span>
                </button>
              </li>
              <li className="pt-2 text-stone-400">
                <span className="block text-[11px] font-semibold text-stone-300 mb-1">
                  {isAr ? 'طرق الدفع المتاحة بتونس:' : 'Moyens de paiement acceptés :'}
                </span>
                <span className="text-[11px]">
                  بطاقة الدينار الإلكتروني (e-Dinar) • بطاقة CIB البنكية • فلوصي (Flouci) • الخلاص نقداً بمقر المروج 3
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact details */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 font-cairo">
              {isAr ? 'بيانات التواصل الرسمي' : 'Coordonnées'}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isAr ? SCHOOL_INFO.addressAr : SCHOOL_INFO.addressFr}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`} dir="ltr" className="hover:text-white font-mono font-bold">
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white truncate">
                  {SCHOOL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">Facebook:</span>
                <a href={SCHOOL_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white truncate underline">
                  {SCHOOL_INFO.facebookPageName}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {SCHOOL_INFO.nameAr}. جميع الحقوق محفوظة.
          </div>
          <div className="font-quran text-amber-200/70 text-sm">
            « وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا »
          </div>
        </div>

      </div>
    </footer>
  );
};
