import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Check, 
  CreditCard, 
  MessageSquare, 
  ChevronRight,
  Sparkles,
  Award,
  Baby
} from 'lucide-react';
import { COURSES, SCHOOL_INFO } from '../data/schoolData';
import { Course, Language } from '../types';

interface CoursesSectionProps {
  language: Language;
  onSelectCourseToRegister: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  language,
  onSelectCourseToRegister
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const isAr = language === 'ar';

  const categories = [
    { id: 'all', labelAr: 'جميع الدورات', labelFr: 'Tous les cours' },
    { id: 'kids', labelAr: 'الأطفال والبراعم', labelFr: 'Enfants' },
    { id: 'youth', labelAr: 'الناشئة والشباب', labelFr: 'Jeunes' },
    { id: 'adults', labelAr: 'الكبار والرجال', labelFr: 'Adultes (Hommes)' },
    { id: 'women', labelAr: 'النساء والفتيات', labelFr: 'Femmes' },
    { id: 'ijaza', labelAr: 'الإجازة والتجويد', labelFr: 'Ijaza & Tajweed' },
  ];

  const filteredCourses = COURSES.filter((course) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'kids') return course.id === 'kids-memorization' || course.id === 'summer-intensive';
    if (selectedCategory === 'youth') return course.id === 'youth-tajweed' || course.id === 'summer-intensive';
    if (selectedCategory === 'adults') return course.id === 'adults-men';
    if (selectedCategory === 'women') return course.id === 'women-classes';
    if (selectedCategory === 'ijaza') return course.id === 'ijaza-tajweed';
    return true;
  });

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isAr ? 'المسارات والدورات القرآنية' : 'Programmes & Inscriptions'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-cairo mb-4">
            {isAr ? 'اختر الدورة المناسبة لك أو لأبنائك' : 'Choisissez le cours adapté à vos besoins'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'برامج تعليمية متكاملة لجميع الفئات والأعمار تحت إشراف مشايخ مجازين، مع إمكانية التسجيل الفوري والدفع الإلكتروني الآمن بالدينار التونسي.'
              : 'Des formations coraniques structurées adaptées à chaque tranche d’âge avec possibilité d’inscription et paiement en ligne immédiat.'}
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20 scale-105'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelFr}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-stone-50 rounded-2xl border border-stone-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top */}
              <div className="p-6">
                
                {/* Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                    {isAr ? course.categoryAr : course.categoryFr}
                  </span>
                  {course.badgeAr && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>{isAr ? course.badgeAr : course.badgeFr}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-stone-900 font-cairo mb-2 group-hover:text-emerald-800 transition-colors">
                  {isAr ? course.titleAr : course.titleFr}
                </h3>

                {/* Target & Schedule */}
                <div className="space-y-1.5 mb-4 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{isAr ? course.targetGroupAr : course.targetGroupFr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{isAr ? course.scheduleAr : course.scheduleFr}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {isAr ? course.descriptionAr : course.descriptionFr}
                </p>

                {/* Features list */}
                <div className="space-y-1.5 pt-3 border-t border-stone-200/60 mb-4">
                  {(isAr ? course.featuresAr : course.featuresFr).slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer: Fee & Action */}
              <div className="p-6 pt-4 bg-white border-t border-stone-200/80">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black text-emerald-800 font-cairo">
                      {course.monthlyFee}
                    </span>
                    <span className="text-xs font-bold text-stone-600 mr-1">
                      {isAr ? 'د.ت / شهرياً' : ' TND / mois'}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {isAr ? `+ ${course.registrationFee} د.ت رسوم تسجيل` : `+ ${course.registrationFee} TND inscription`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectCourseToRegister(course.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isAr ? 'سجل وادفع الآن' : 'S’inscrire & Payer'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent(
                      `السلام عليكم، أود الاستفسار عن ${course.titleAr} بفرع الشيخ الدلاعي بالمروج 3`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* School Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-amber-50/50 to-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right rtl:text-right ltr:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                {isAr ? 'شهادات وإجازات معتمدة من الرابطة الوطنية للقرآن الكريم' : 'Certifications officielles reconnues'}
              </h4>
              <p className="text-xs text-stone-600">
                {isAr ? 'تختم كل دورة بامتحان تقييمي وشهادة معتمدة أو إجازة بالسند المتصل للمتقنين.' : 'Attestation officielle délivrée à la fin de chaque cycle.'}
              </p>
            </div>
          </div>
          <a
            href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
            className="shrink-0 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 font-bold text-xs hover:border-emerald-500 shadow-2xs transition-colors flex items-center gap-2"
          >
            <span>{isAr ? 'استفسر هاتفياً:' : 'Téléphone :'}</span>
            <span dir="ltr" className="text-emerald-700">{SCHOOL_INFO.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
