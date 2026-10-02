import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, Check, MapPin } from 'lucide-react';
import { COURSES, SCHOOL_INFO } from '../data/schoolData';
import { Language } from '../types';

interface ScheduleSectionProps {
  language: Language;
  onOpenRegister: (courseId?: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  language,
  onOpenRegister
}) => {
  const isAr = language === 'ar';
  const [activeDay, setActiveDay] = useState<'all' | 'weekend' | 'weekdays'>('all');

  const daysSchedule = [
    {
      periodAr: 'الفترة الصباحية (09:00 - 12:00)',
      periodFr: 'Matinée (09h00 - 12h00)',
      daysAr: 'الأربعاء، السبت، الأحد',
      daysFr: 'Mercredi, Samedi, Dimanche',
      courses: [
        { nameAr: 'حلقة البراعم والأطفال (حفظ وتلقين)', nameFr: 'Enfants (Hifz & Talqin)', courseId: 'kids-memorization' },
        { nameAr: 'حلقات الأمهات والنساء (قسم صباحي هادئ)', nameFr: 'Femmes (Matin)', courseId: 'women-classes' }
      ]
    },
    {
      periodAr: 'فترة ما بعد الزوال (14:30 - 17:00)',
      periodFr: 'Après-midi (14h30 - 17h00)',
      daysAr: 'الأربعاء والسبت',
      daysFr: 'Mercredi et Samedi',
      courses: [
        { nameAr: 'مسار الناشئة والشباب (حفظ المتون والتجويد)', nameFr: 'Jeunes & Ados (Tajweed)', courseId: 'youth-tajweed' },
        { nameAr: 'المخيم القرآني وتصحيح التلاوة', nameFr: 'Stage intensif & Récitation', courseId: 'summer-intensive' }
      ]
    },
    {
      periodAr: 'الفترة المسائية (بين المغرب والعشاء)',
      periodFr: 'Soirée (Maghreb - Isha)',
      daysAr: 'كامل أيام الأسبوع',
      daysFr: 'Tous les jours en semaine',
      courses: [
        { nameAr: 'حلقات الكبار والمهنيين والطلبة', nameFr: 'Adultes & Professionnels', courseId: 'adults-men' },
        { nameAr: 'دورة إتقان التجويد ومتن الجزرية والإجازة', nameFr: 'Jazariyya & Ijaza Sanad', courseId: 'ijaza-tajweed' }
      ]
    },
    {
      periodAr: 'عطلة نهاية الأسبوع (السبت والأحد كاملاً)',
      periodFr: 'Week-end (Samedi & Dimanche)',
      daysAr: 'السبت والأحد',
      daysFr: 'Samedi et Dimanche',
      courses: [
        { nameAr: 'حلقات مكثفة لجميع المستويات والأعمار', nameFr: 'Séances intensives tous niveaux', courseId: 'kids-memorization' },
        { nameAr: 'مجالس قراءة وإجازة بالسند مع الشيخ المشرف', nameFr: 'Auditions Sanad avec le Cheikh', courseId: 'ijaza-tajweed' }
      ]
    }
  ];

  return (
    <section id="schedule-section" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isAr ? 'المواعيد والتوقيت الأسبوعي' : 'Emploi du Temps'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-cairo mb-3">
            {isAr ? 'جدول الحلقات والمواعيد بفرع المروج 3' : 'Horaires des Cours à El Mourouj 3'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            {isAr 
              ? 'مواعيد مرنة طيلة أيام الأسبوع تناسب أوقات دراسة التلاميذ وأوقات عمل الموظفين والمهنيين.'
              : 'Des créneaux flexibles tout au long de la semaine adaptés aux écoliers et actifs.'}
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {daysSchedule.map((slot, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base font-cairo">
                      {isAr ? slot.periodAr : slot.periodFr}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {isAr ? slot.daysAr : slot.daysFr}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {slot.courses.map((c, i) => (
                    <div 
                      key={i}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></div>
                        <span className="text-xs font-bold text-stone-800">
                          {isAr ? c.nameAr : c.nameFr}
                        </span>
                      </div>
                      <button
                        onClick={() => onOpenRegister(c.courseId)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline shrink-0"
                      >
                        {isAr ? 'سجل في هذا التوقيت' : 'S’inscrire'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>المروج 3 - قاعات مكيفة</span>
                </span>
                <span className="font-semibold text-emerald-700">فرع الشيخ الدلاعي</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
