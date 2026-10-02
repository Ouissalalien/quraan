import React from 'react';
import { 
  BookOpen, 
  Send, 
  Sparkles, 
  MapPin, 
  Phone, 
  CreditCard, 
  UserCheck, 
  Award, 
  ShieldCheck, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenRegister: (courseId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onNavigate,
  onOpenRegister
}) => {
  const isAr = language === 'ar';

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-14 sm:py-20">
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 islamic-pattern pointer-events-none"></div>
      
      {/* Radiant Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quranic Verse Banner */}
        <div className="max-w-2xl mx-auto mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs sm:text-sm font-medium backdrop-blur-xs shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{isAr ? 'قال رسول الله ﷺ:' : 'Le Prophète ﷺ a dit :'}</span>
            <span className="font-quran text-amber-200 text-sm sm:text-base font-bold">
              « خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ »
            </span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3.5 py-1 rounded-full uppercase">
              {isAr ? 'الرابطة الوطنية للقرآن الكريم بتونس' : 'Ligue Nationale du Saint Coran en Tunisie'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cairo tracking-tight text-white leading-tight mb-4">
            {isAr ? (
              <>
                الفرع المحلي للرابطة الوطنية للقرآن الكريم <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-200 to-amber-300">
                  الشيخ الدلاعي بالمروج 3
                </span>
              </>
            ) : (
              <>
                Ligue Nationale du Saint Coran <br />
                <span className="text-amber-300">Section Cheikh Al Dalai - El Mourouj 3</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr ? (
              'صرح قرآني رائد لتعليم كتاب الله العزيز وحفظه وإتقان أحكام التجويد برواية قالون عن نافع، مع رعاية متخصصة للأطفال، الشباب، النساء، والكبار، وبوابة متكاملة للتسجيل والدفع الإلكتروني.'
            ) : (
              'Institution de référence pour l’apprentissage et la mémorisation du Saint Coran, le Tajweed selon Qaloun an Nafi, avec portail d’inscription et de paiement en ligne sécurisé.'
            )}
          </p>

          {/* Quick Contacts Bar Highlight */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mb-8 text-xs font-medium">
            <div className="bg-emerald-800/60 border border-emerald-700/50 rounded-xl p-2.5 flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="truncate">
                <div className="text-emerald-300 font-bold">{isAr ? 'المقر' : 'Lieu'}</div>
                <div className="text-emerald-100 truncate">{isAr ? 'المروج 3، بن عروس' : 'Mourouj 3, Ben Arous'}</div>
              </div>
            </div>

            <a 
              href={`https://wa.me/${SCHOOL_INFO.rawPhone}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-700/50 hover:border-emerald-500 rounded-xl p-2.5 flex items-center gap-2 text-right transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                <span className="font-bold text-white text-xs">WA</span>
              </div>
              <div className="truncate">
                <div className="text-emerald-300 font-bold">WhatsApp</div>
                <div dir="ltr" className="text-white font-semibold">{SCHOOL_INFO.phone}</div>
              </div>
            </a>

            <a 
              href={SCHOOL_INFO.telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-700/50 hover:border-sky-500 rounded-xl p-2.5 flex items-center gap-2 text-right transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center shrink-0">
                <Send className="w-4 h-4 text-white" />
              </div>
              <div className="truncate">
                <div className="text-sky-300 font-bold">Telegram</div>
                <div className="text-white truncate">@ecole_aldalai</div>
              </div>
            </a>

            <div className="bg-emerald-800/60 border border-emerald-700/50 rounded-xl p-2.5 flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-lg bg-amber-600/80 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-amber-200" />
              </div>
              <div className="truncate">
                <div className="text-amber-300 font-bold">{isAr ? 'دفع إلكتروني' : 'Paiement'}</div>
                <div className="text-emerald-100 truncate">e-Dinar / CIB / Flouci</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <button
              id="hero-register-btn"
              onClick={() => {
                onOpenRegister();
                onNavigate('register');
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-900 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <CreditCard className="w-5 h-5 text-stone-900" />
              <span>{isAr ? 'التسجيل في الدورات والدفع الفوري' : 'S’inscrire & Payer en ligne'}</span>
            </button>

            <button
              id="hero-portal-btn"
              onClick={() => onNavigate('portal')}
              className="px-5 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/90 text-white font-bold text-sm sm:text-base border border-emerald-600/60 shadow-md transition-all flex items-center gap-2"
            >
              <UserCheck className="w-5 h-5 text-emerald-300" />
              <span>{isAr ? 'فضاء متابعة الطالب والولي' : 'Espace Suivi Étudiant'}</span>
            </button>

            <a
              id="hero-whatsapp-direct-btn"
              href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أرغب في الاستفسار عن التسجيل في مدرسة الشيخ الدلاعي بالمروج 3')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping"></span>
              <span>{isAr ? 'محادثة واتساب سريعة' : 'WhatsApp Direct'}</span>
            </a>
          </div>

          {/* Quick Feature Checklist */}
          <div className="mt-10 pt-8 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'إشراف مشايخ مجازين' : 'Cheikhs agréés'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'حلقات أطفال ونساء ورجال' : 'Tous âges et niveaux'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'وصل تسجيل معتمد وبطاقة طالب' : 'Reçu et carte officielle'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'رواية قالون عن نافع بالسند' : 'Récitation Qaloun & Sanad'}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
