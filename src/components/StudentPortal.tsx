import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  BookOpen, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Printer, 
  Phone, 
  Send, 
  MessageSquare,
  Sparkles,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { StudentRegistration, QuranProgress, Language } from '../types';
import { SCHOOL_INFO, INITIAL_STUDENTS, INITIAL_PROGRESS } from '../data/schoolData';

interface StudentPortalProps {
  language: Language;
  studentsList: StudentRegistration[];
  progressList: Record<string, QuranProgress>;
  onAddNewProgressNote?: (studentId: string, note: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  language,
  studentsList,
  progressList,
  onAddNewProgressNote
}) => {
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('DALAI-2025-0101');
  const [activeStudent, setActiveStudent] = useState<StudentRegistration | null>(() => {
    return studentsList[0] || INITIAL_STUDENTS[0];
  });
  const [dailyLogText, setDailyLogText] = useState('');
  const [logSubmitted, setLogSubmitted] = useState(false);

  // Search logic
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = studentsList.find(s => 
      s.id.toLowerCase() === query || 
      s.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, '')) ||
      s.studentName.toLowerCase().includes(query)
    );

    if (found) {
      setActiveStudent(found);
    } else {
      alert(isAr ? 'لم يتم العثور على طالب بهذا الرقم. جرب رقم التسجيل التجريبي: DALAI-2025-0101 أو هاتف: 93708100' : 'Aucun étudiant trouvé avec cet identifiant.');
    }
  };

  const studentProgress: QuranProgress = (activeStudent && progressList[activeStudent.id]) || {
    studentId: activeStudent?.id || '',
    memorizedHizbCount: 2,
    currentSurah: 'سورة الأعلى',
    currentAyah: 19,
    lastEvaluationDate: new Date().toISOString().split('T')[0],
    evaluationGrade: 'ممتاز',
    tajweedMastery: 85,
    recentNotes: 'حفظ جديد مستمر، التزام ممتاز بالحضور.',
    weeklyAttendanceRate: 95,
    memorizedSurahs: ['جزء عم', 'الفاتحة']
  };

  const handleSaveDailyLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyLogText.trim()) return;
    if (activeStudent && onAddNewProgressNote) {
      onAddNewProgressNote(activeStudent.id, dailyLogText);
    }
    setLogSubmitted(true);
    setTimeout(() => {
      setDailyLogText('');
      setLogSubmitted(false);
    }, 2500);
  };

  return (
    <section id="student-portal-section" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAr ? 'فضاء الطالب وولي الأمر' : 'Espace Étudiant & Parents'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-cairo">
            {isAr ? 'متابعة الحفظ والتقييم القرآني والبطاقة' : 'Suivi de la Mémorisation & Dossier'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isAr 
              ? 'أدخل رقم التسجيل أو رقم الهاتف للاطلاع على دفتر متابعة الحفظ، الأحزاب المنجزة، والوصل المعتمد.'
              : 'Consultez en direct l’état d’avancement de la mémorisation, l’assiduité et l’attestation officielle.'}
          </p>
        </div>

        {/* Search / Lookup Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'أدخل رقم التسجيل (مثل DALAI-2025-0101) أو رقم الهاتف' : 'Saisir N° Inscription (ex: DALAI-2025-0101) ou Téléphone'}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-colors shrink-0"
            >
              {isAr ? 'بحث وعرض الملف' : 'Consulter le dossier'}
            </button>
          </form>

          {/* Quick Demo Chips for Instant Testing */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span>{isAr ? 'ملفات تجريبية سريعة:' : 'Exemples de test :'}</span>
            <button
              onClick={() => {
                setSearchQuery('DALAI-2025-0101');
                const s = studentsList.find(x => x.id === 'DALAI-2025-0101');
                if (s) setActiveStudent(s);
              }}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 font-mono text-[11px] border border-stone-200 transition-colors"
            >
              احمد الزغلامي (DALAI-2025-0101)
            </button>
            <button
              onClick={() => {
                setSearchQuery('DALAI-2025-0102');
                const s = studentsList.find(x => x.id === 'DALAI-2025-0102');
                if (s) setActiveStudent(s);
              }}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 font-mono text-[11px] border border-stone-200 transition-colors"
            >
              سارة الورغي (DALAI-2025-0102)
            </button>
          </div>
        </div>

        {/* Student Active Dashboard Display */}
        {activeStudent ? (
          <div className="space-y-6">
            
            {/* Top Identity Card */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-200 bg-emerald-800/80 px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                      {activeStudent.courseTitle}
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {activeStudent.paymentStatus === 'paid' ? (isAr ? 'اشتراك نشط' : 'Actif') : (isAr ? 'حجز مؤقت' : 'En attente')}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-cairo text-white">
                    {activeStudent.studentName}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100/90 mt-2">
                    <span>{isAr ? 'الولي:' : 'Tuteur :'} {activeStudent.guardianName || activeStudent.studentName}</span>
                    <span>•</span>
                    <span>{isAr ? 'المقر:' : 'Section :'} المروج 3 - بن عروس</span>
                    <span>•</span>
                    <span>{isAr ? 'الفترة:' : 'Horaire :'} {activeStudent.sessionPreference}</span>
                  </div>
                </div>

                <div className="text-right rtl:text-right ltr:text-left bg-emerald-950/70 p-3 rounded-xl border border-emerald-700/50">
                  <div className="text-[11px] text-emerald-300">{isAr ? 'رقم التسجيل المعتمد:' : 'Identifiant :'}</div>
                  <div className="text-lg font-mono font-bold text-amber-300">{activeStudent.id}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">تاريخ التسجيل: {activeStudent.registeredAt}</div>
                </div>
              </div>
            </div>

            {/* Memorization Progress Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Progress Box (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-700" />
                    <h4 className="font-bold text-stone-900 text-base font-cairo">
                      {isAr ? 'سجل متابعة الحفظ والإتقان القرآني' : 'Progression de Mémorisation'}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {isAr ? `التقييم: ${studentProgress.evaluationGrade}` : `Note : ${studentProgress.evaluationGrade}`}
                  </span>
                </div>

                {/* Progress Bar of Ahzab */}
                <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold text-stone-800">
                      {isAr ? 'الأحزاب المحفوظة من كتاب الله:' : 'Hizbs mémorisés :'}
                    </span>
                    <span className="font-mono font-bold text-emerald-800 text-sm">
                      {studentProgress.memorizedHizbCount} / 60 {isAr ? 'حزباً' : 'Hizbs'}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, (studentProgress.memorizedHizbCount / 60) * 100))}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>{isAr ? 'البداية (جزء عم)' : 'Début'}</span>
                    <span>30 حزباً (نصف القرآن)</span>
                    <span>60 حزباً (الختمة المباركة)</span>
                  </div>
                </div>

                {/* Current recitation target */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                    <span className="text-[11px] text-emerald-700 block font-medium">
                      {isAr ? 'السورة الحالية للتسميع' : 'Sourate actuelle'}
                    </span>
                    <span className="font-bold text-stone-900 text-sm font-quran">
                      {studentProgress.currentSurah}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <span className="text-[11px] text-amber-800 block font-medium">
                      {isAr ? 'مستوى ضبط التجويد' : 'Maîtrise Tajweed'}
                    </span>
                    <span className="font-bold text-stone-900 text-sm">
                      {studentProgress.tajweedMastery}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-blue-800 block font-medium">
                      {isAr ? 'نسبة الحضور بالحلقات' : 'Taux d’assiduité'}
                    </span>
                    <span className="font-bold text-stone-900 text-sm">
                      {studentProgress.weeklyAttendanceRate}%
                    </span>
                  </div>
                </div>

                {/* Teacher's latest note */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs mb-4">
                  <div className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isAr ? 'ملاحظة وتوجيه المؤدب / الشيخ المشرف:' : 'Appréciation de l’enseignant :'}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed font-sans">
                    « {studentProgress.recentNotes} »
                  </p>
                  <span className="text-[10px] text-stone-400 block mt-1">
                    تاريخ التقييم الأخير: {studentProgress.lastEvaluationDate}
                  </span>
                </div>

                {/* Memorized Surahs Chips */}
                <div>
                  <span className="text-xs font-bold text-stone-700 block mb-2">
                    {isAr ? 'نماذج من السور المتقنة المراجعة:' : 'Sourates validées :'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {studentProgress.memorizedSurahs.map((surah, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>{surah}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar: Direct Communication & Daily Recitation Log */}
              <div className="space-y-6">
                
                {/* Contact Teacher directly via WhatsApp / Telegram */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
                  <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>{isAr ? 'تواصل مباشر مع إدارة المدرسة' : 'Contact Éducatif Direct'}</span>
                  </h4>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    {isAr 
                      ? 'لإرسال تسجيل صوتي للتسميع أو الاستفسار عن مواعيد الحلقات في المروج 3:' 
                      : 'Envoyez un enregistrement ou demandez un renseignement direct.'}
                  </p>

                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent(
                        `السلام عليكم، أنا ولي أمر الطالب ${activeStudent.studentName} (رقم التسجيل: ${activeStudent.id})، أود التواصل مع مؤدب الحلقة.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <span>WhatsApp (93 708 100)</span>
                    </a>

                    <a
                      href={SCHOOL_INFO.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>Telegram فرع المروج 3</span>
                    </a>
                  </div>
                </div>

                {/* Daily Revision Log Submission */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
                  <h4 className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-amber-600" />
                    <span>{isAr ? 'تسجيل ورد المراجعة اليومي' : 'Journal de Révision'}</span>
                  </h4>
                  <p className="text-[11px] text-stone-500 mb-3">
                    {isAr ? 'دوّن ما قام الطالب بحفظه أو مراجعته في المنزل اليوم:' : 'Notez les révisions faites à la maison :'}
                  </p>

                  <form onSubmit={handleSaveDailyLog} className="space-y-2">
                    <textarea
                      rows={2}
                      value={dailyLogText}
                      onChange={(e) => setDailyLogText(e.target.value)}
                      placeholder={isAr ? 'مثال: تم تكرار سورة النبأ 5 مرات مع مراجعة الحزب الأول...' : 'Ex: Révision de la sourate An-Naba...'}
                      className="w-full p-2.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    ></textarea>
                    
                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition-colors"
                    >
                      {isAr ? 'حفظ وإرسال للمؤدب' : 'Enregistrer'}
                    </button>

                    {logSubmitted && (
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs text-center font-semibold animate-in fade-in">
                        {isAr ? 'تم تسجيل ورد المراجعة بنجاح بارك الله فيكم' : 'Enregistré avec succès.'}
                      </div>
                    )}
                  </form>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">{isAr ? 'يرجى إدخال رقم تسجيل صالح للبحث' : 'Veuillez saisir un identifiant valide.'}</p>
          </div>
        )}

      </div>
    </section>
  );
};
