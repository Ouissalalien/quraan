import React from 'react';
import { 
  Award, 
  BookOpen, 
  Users, 
  Compass, 
  CheckCircle, 
  Sparkles, 
  Shield, 
  Calendar, 
  Building2,
  Heart
} from 'lucide-react';
import { TEACHERS, SCHOOL_INFO } from '../data/schoolData';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
  onOpenRegister: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  onOpenRegister
}) => {
  const isAr = language === 'ar';

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isAr ? 'عن المدرسة والفرع' : 'À Propos de Notre École'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-cairo mb-4">
            {isAr 
              ? 'الفرع المحلي للرابطة الوطنية للقرآن الكريم الشيخ الدلاعي بالمروج 3'
              : 'Section Locale Cheikh Al Dalai - El Mourouj 3'}
          </h2>
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            {isAr
              ? 'مؤسسة قرآنية تعليمية عريقة تعمل بإشراف الرابطة الوطنية للقرآن الكريم بتونس، تحتضن أبناء المروج وبن عروس لتعليم كتاب الله وتنشئتهم على موائد الوحي والقرآن الكريم.'
              : 'Établissement coranique de premier plan œuvrant sous l’égide de la Ligue Nationale du Saint Coran en Tunisie, au service des habitants d’El Mourouj 3 et de Ben Arous.'}
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Main Story Box */}
          <div className="lg:col-span-7 space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  {isAr ? 'رسالتنا وأهدافنا التربوية' : 'Notre Mission & Nos Valeurs'}
                </h3>
                <span className="text-xs text-stone-500">
                  {isAr ? 'خدمة القرآن الكريم في المروج 3' : 'Au service du Coran à El Mourouj 3'}
                </span>
              </div>
            </div>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {isAr ? (
                'تأسس فرع الشيخ الدلاعي للقرآن الكريم بالمروج 3 استجابة لتطلعات العائلات وأهالي المنطقة في توفير محضنة تربوية إيمانية آمنة ومتميزة. يعتمد الفرع المناهج المعتمدة من الرابطة الوطنية للقرآن الكريم بتونس، مع التركيز على رواية قالون عن نافع المدني التي نشأ عليها أهل تونس والمغرب العربي.'
              ) : (
                'La section Cheikh Al Dalai à El Mourouj 3 est née pour offrir un cadre éducatif et spirituel sécurisé d’excellence. Nous dispensons les programmes officiels de la Ligue Nationale avec accent sur la lecture traditionnelle de Qaloun.'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-150">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {isAr ? 'تحفيظ متدرج ومستمر' : 'Mémorisation Progressive'}
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'متابعة فردية لكل طالب بحسب قدراته' : 'Suivi individualisé du rythme de chaque élève'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-150">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {isAr ? 'إتقان التجويد والمخارج' : 'Maîtrise du Tajweed'}
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'تصحيح صوتي مباشر وتدريس المتون' : 'Correction phonétique et textes classiques'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-150">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {isAr ? 'قسم نسائي مستقل' : 'Espace Féminin Dédié'}
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'إشراف كامل من معلمات وأستاذات مجازات' : 'Encadrement féminin bienveillant et certifié'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-150">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {isAr ? 'إجازات بالسند المتصل' : 'Ijaza & Chaîne de transmission'}
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'شهادات معتمدة للمتقنين من الرابطة' : 'Diplômes reconnus pour les élèves avancés'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
              >
                {isAr ? 'انضم إلى حلقاتنا القرآنية' : 'Rejoindre nos cours'}
              </button>
              <a
                href={SCHOOL_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors border border-blue-200 inline-flex items-center gap-1.5"
              >
                <span>{isAr ? 'متابعة صفحتنا على فيسبوك' : 'Suivre sur Facebook'}</span>
              </a>
            </div>
          </div>

          {/* School Facilities & Credentials Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
              
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                {isAr ? 'مميزات فرع المروج 3' : 'Atouts de l’École'}
              </span>
              
              <h3 className="text-xl font-bold font-cairo mb-4">
                {isAr ? 'بيئة نموذجية مهيأة للتعلم والسكينة' : 'Un cadre propice à l’apprentissage et à la sérénité'}
              </h3>

              <div className="space-y-3.5 text-xs text-emerald-100/90">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-800 flex items-center justify-center shrink-0 text-amber-300 font-bold">1</div>
                  <p>
                    <strong className="text-white block">{isAr ? 'قاعات مجهزة ومكيفة:' : 'Salles climatisées et équipées :'}</strong>
                    {isAr ? 'فضاءات دراسية رحبة توفر أقصى درجات التركيز والراحة للطلاب والطالبات.' : 'Espaces spacieux conçus pour un confort maximal.'}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-800 flex items-center justify-center shrink-0 text-amber-300 font-bold">2</div>
                  <p>
                    <strong className="text-white block">{isAr ? 'مكتبة قرآنية متخصصة:' : 'Bibliothèque coranique spécialisée :'}</strong>
                    {isAr ? 'مصاحف برواية قالون التونسية وكتب التفاسير ومتون التجويد المعتمدة.' : 'Exemplaires selon Qaloun, exégèses et recueils de Tajweed.'}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-800 flex items-center justify-center shrink-0 text-amber-300 font-bold">3</div>
                  <p>
                    <strong className="text-white block">{isAr ? 'موقع استراتيجي بالمروج 3:' : 'Emplacement central à El Mourouj 3 :'}</strong>
                    {isAr ? 'سهولة الوصول من مختلف أحياء المروج وبن عروس وقرب وسائل النقل.' : 'Accès facile, transports à proximité.'}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-800 flex items-center justify-center shrink-0 text-amber-300 font-bold">4</div>
                  <p>
                    <strong className="text-white block">{isAr ? 'تواصل رقمي مستمر:' : 'Communication continue :'}</strong>
                    {isAr ? 'متابعة عبر واتساب وتلغرام وبوابة إلكترونية لمتابعة الحفظ والدفع.' : 'Suivi via WhatsApp, Telegram et portail en ligne.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-200">
                <span>{isAr ? 'هاتف الاستعلامات:' : 'Informations :'}</span>
                <span dir="ltr" className="font-bold text-amber-300 text-sm">{SCHOOL_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Teachers / Sheiks Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              {isAr ? 'الكادر التربوي والتعليمي' : 'Corps Enseignant'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-cairo">
              {isAr ? 'مشايخنا ومؤدبونا المجازون بالمروج 3' : 'Nos Enseignants & Cheikhs Agréés'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEACHERS.map((teacher) => (
              <div 
                key={teacher.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base border border-emerald-200">
                      {isAr ? teacher.nameAr[0] : teacher.nameFr[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-base font-cairo">
                        {isAr ? teacher.nameAr : teacher.nameFr}
                      </h4>
                      <p className="text-xs text-emerald-700 font-medium">
                        {isAr ? teacher.roleAr : teacher.roleFr}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-2.5 mb-3 text-xs text-emerald-900">
                    <span className="font-bold block text-[11px] text-emerald-700">
                      {isAr ? 'الإجازة والسند:' : 'Ijaza & Certification :'}
                    </span>
                    {isAr ? teacher.ijazaAr : teacher.ijazaFr}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {isAr ? teacher.bioAr : teacher.bioFr}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>{isAr ? `خبرة ${teacher.experienceYears} عاماً` : `${teacher.experienceYears} ans d'expérience`}</span>
                  <span className="text-emerald-700 font-semibold">{isAr ? 'فرع المروج 3' : 'Mourouj 3'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
