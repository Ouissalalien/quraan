import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Printer, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Lock, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  AlertCircle,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { COURSES, SCHOOL_INFO } from '../data/schoolData';
import { StudentRegistration, Course, Language } from '../types';

interface RegistrationPortalProps {
  language: Language;
  selectedCourseId?: string;
  onRegistrationComplete: (registration: StudentRegistration) => void;
  onNavigateToPortal: () => void;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  language,
  selectedCourseId,
  onRegistrationComplete,
  onNavigateToPortal
}) => {
  const isAr = language === 'ar';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCourse, setSelectedCourse] = useState<Course>(() => {
    return COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  });

  // Form states
  const [studentName, setStudentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2014-06-15');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('الأب');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('المروج 3، بن عروس');
  const [sessionPreference, setSessionPreference] = useState<'morning' | 'afternoon' | 'evening' | 'weekend'>('weekend');
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'juz_amma' | 'five_ahzab' | 'half_quran' | 'khatim'>('beginner');
  const [notes, setNotes] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'edinar' | 'bank_card' | 'flouci' | 'cash'>('edinar');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [edinarPin, setEdinarPin] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState<StudentRegistration | null>(null);

  // Sync when prop changes
  useEffect(() => {
    if (selectedCourseId) {
      const found = COURSES.find(c => c.id === selectedCourseId);
      if (found) setSelectedCourse(found);
    }
  }, [selectedCourseId]);

  const totalAmount = selectedCourse.monthlyFee + selectedCourse.registrationFee;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !phone.trim()) {
      alert(isAr ? 'يرجى إدخال اسم الطالب ورقم الهاتف (واتساب)' : 'Veuillez saisir le nom de l’étudiant et le numéro de téléphone');
      return;
    }
    setStep(3);
  };

  const handleExecutePayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedId = `DALAI-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      const transactionRef = paymentMethod === 'cash' 
        ? `CASH-MOUROUJ3-${Date.now().toString().slice(-6)}`
        : paymentMethod === 'edinar' 
          ? `EDINAR-TUNISIE-${Date.now().toString().slice(-6)}`
          : paymentMethod === 'flouci'
            ? `FLOUCI-TN-${Date.now().toString().slice(-6)}`
            : `CIB-BANQUE-${Date.now().toString().slice(-6)}`;

      const newRegistration: StudentRegistration = {
        id: generatedId,
        studentName,
        dateOfBirth,
        gender,
        guardianName: guardianName || undefined,
        guardianRelation: guardianRelation || undefined,
        phone,
        email: email || `${generatedId.toLowerCase()}@aldalai-student.tn`,
        address,
        city: 'المروج 3، بن عروس',
        courseId: selectedCourse.id,
        courseTitle: isAr ? selectedCourse.titleAr : selectedCourse.titleFr,
        sessionPreference,
        currentLevel,
        notes,
        registeredAt: new Date().toISOString().split('T')[0],
        status: 'active',
        paymentStatus: paymentMethod === 'cash' ? 'cash_on_site' : 'paid',
        paymentMethod,
        amountPaid: totalAmount,
        transactionRef
      };

      setCompletedRegistration(newRegistration);
      onRegistrationComplete(newRegistration);
      setStep(4);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="registration-portal-section" className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isAr ? 'البوابة الرسمية للتسجيل والدفع' : 'Portail d’Inscription & Paiement'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-cairo">
            {isAr ? 'تسجيل طالب جديد والدفع الإلكتروني' : 'Inscription en ligne & Paiement sécurisé'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isAr 
              ? 'سجل في حلقات مدرسة الشيخ الدلاعي بالمروج 3 وادفع بالدينار التونسي واحصل فوراً على وصل التسجيل وبطاقة الطالب.'
              : 'Inscrivez-vous aux cours de l’école Cheikh Al Dalai à El Mourouj 3 avec paiement en Dinars Tunisiens.'}
          </p>
        </div>

        {/* Steps Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-stone-200 -z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                1
              </div>
              <span className="text-[11px] font-semibold text-stone-700 mt-1">
                {isAr ? 'اختيار الدورة' : 'Cours'}
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                2
              </div>
              <span className="text-[11px] font-semibold text-stone-700 mt-1">
                {isAr ? 'بيانات الطالب' : 'Coordonnées'}
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 3 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                3
              </div>
              <span className="text-[11px] font-semibold text-stone-700 mt-1">
                {isAr ? 'الدفع الإلكتروني' : 'Paiement'}
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 4 ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                4
              </div>
              <span className="text-[11px] font-semibold text-stone-700 mt-1">
                {isAr ? 'وصل التسجيل' : 'Attestation'}
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: Choose Course & Schedule */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <h3 className="text-lg font-bold text-stone-900 font-cairo mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>{isAr ? 'الخطوة 1: اختر المسار القرآني المطلوب' : 'Étape 1 : Choisissez le cours'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {COURSES.map((course) => {
                const isSelected = selectedCourse.id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' 
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                        <h4 className="font-bold text-stone-900 text-sm">
                          {isAr ? course.titleAr : course.titleFr}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                        {course.monthlyFee} {isAr ? 'د.ت / شهر' : 'TND'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mb-2 line-clamp-2">
                      {isAr ? course.descriptionAr : course.descriptionFr}
                    </p>

                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isAr ? course.scheduleAr : course.scheduleFr}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Session Preference */}
            <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <label className="block text-xs font-bold text-stone-800 mb-2">
                {isAr ? 'الفترة الزمنية المفضلة للحضور بالمدرسة بالمروج 3:' : 'Créneau horaire préféré :'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'morning', labelAr: 'صباحي (09:00 - 12:00)', labelFr: 'Matin' },
                  { id: 'afternoon', labelAr: 'بعد الزوال (14:00 - 16:30)', labelFr: 'Après-midi' },
                  { id: 'evening', labelAr: 'مسائي (المغرب - العشاء)', labelFr: 'Soir' },
                  { id: 'weekend', labelAr: 'نهاية الأسبوع (السبت والأحد)', labelFr: 'Week-end' },
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSessionPreference(slot.id as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      sessionPreference === slot.id
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isAr ? slot.labelAr : slot.labelFr}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>{isAr ? 'المتابعة: إدخال بيانات الطالب' : 'Continuer : Coordonnées'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Student & Parent Info Form */}
        {step === 2 && (
          <form onSubmit={handleNextToPayment} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <h3 className="text-lg font-bold text-stone-900 font-cairo mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-700" />
              <span>{isAr ? 'الخطوة 2: معلومات الطالب والولي' : 'Étape 2 : Données de l’étudiant'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'اسم ولقب الطالب *' : 'Nom et prénom de l’étudiant *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'مثال: محمد بن علي الورغي' : 'Ex: Mohamed Ali'}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'تاريخ الميلاد *' : 'Date de naissance *'}
                </label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'الجنس *' : 'Genre *'}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="male">{isAr ? 'ذكر' : 'Masculin'}</option>
                  <option value="female">{isAr ? 'أنثى' : 'Féminin'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'اسم الولي (للأطفال والناشئة)' : 'Nom du parent ou tuteur'}
                </label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: كمال الورغي (الأب)' : 'Ex: Kamal (Père)'}
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'رقم الهاتف والواتساب للتواصل *' : 'Numéro WhatsApp / Téléphone *'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="93 708 100 / 98 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-left"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-stone-400">TN (+216)</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  {isAr ? 'سيتم إرسال بطاقة الطالب وتأكيد التسجيل إلى هذا الرقم عبر واتساب' : 'Le reçu et l’accès vous seront confirmés par WhatsApp'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  placeholder="exemple@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-left"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'عنوان السكن بالمروج أو بن عروس' : 'Adresse'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'المستوى القرآني الحالي للطالب' : 'Niveau coranique actuel'}
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="beginner">{isAr ? 'مبتدئ (تلقين الحروف والقصار)' : 'Débutant'}</option>
                  <option value="juz_amma">{isAr ? 'حفظ جزء عم' : 'Juz Amma mémorisé'}</option>
                  <option value="five_ahzab">{isAr ? 'من 3 إلى 5 أحزاب' : '3 à 5 Hizbs'}</option>
                  <option value="half_quran">{isAr ? 'نصف القرآن (30 حزباً فما فوق)' : 'Plus de 30 Hizbs'}</option>
                  <option value="khatim">{isAr ? 'خاتم لكتاب الله (دورة إتقان وسند)' : 'Khatim (Coran complet)'}</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isAr ? 'ملاحظات إضافية (أوقات معينة، احتياجات خاصة)' : 'Remarques éventuelles'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'أي معلومة مفيدة للمؤدب أو إدارة الفرع...' : 'Information utile...'}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
              >
                {isAr ? 'الرجوع لاختيار الدورة' : 'Retour'}
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>{isAr ? 'المتابعة إلى بوابة الدفع الإلكتروني' : 'Passer au paiement en ligne'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Online Payment Portal */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <h3 className="text-lg font-bold text-stone-900 font-cairo mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              <span>{isAr ? 'الخطوة 3: ملخص الرسوم وبوابة الدفع الإلكتروني' : 'Étape 3 : Paiement en ligne'}</span>
            </h3>

            {/* Summary Box */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-6">
              <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-stone-200/80">
                <div>
                  <span className="text-xs text-stone-500 block">{isAr ? 'الدورة المختارة:' : 'Cours sélectionné :'}</span>
                  <span className="font-bold text-stone-900 text-sm">{isAr ? selectedCourse.titleAr : selectedCourse.titleFr}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-500 block">{isAr ? 'الطالب المسجل:' : 'Étudiant :'}</span>
                  <span className="font-bold text-stone-900 text-sm">{studentName} ({phone})</span>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{isAr ? 'معلوم الاشتراك الشهري الأول:' : 'Cotisation mensuelle :'}</span>
                  <span className="font-semibold text-stone-800">{selectedCourse.monthlyFee} د.ت</span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? 'معلوم التسجيل والملف والبطاقة القرآنية:' : 'Frais d’inscription et badge :'}</span>
                  <span className="font-semibold text-stone-800">{selectedCourse.registrationFee} د.ت</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-emerald-900">
                  <span>{isAr ? 'المجموع المستحق للخلاص:' : 'Total à payer :'}</span>
                  <span className="text-base text-emerald-700 font-black">{totalAmount} د.ت (TND)</span>
                </div>
              </div>
            </div>

            {/* Payment Methods Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-stone-800 mb-3">
                {isAr ? 'اختر وسيلة الدفع المناسبة لك:' : 'Moyen de paiement sécurisé :'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* e-Dinar */}
                <div
                  onClick={() => setPaymentMethod('edinar')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'edinar'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-stone-900">e-Dinar</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">البريد التونسي</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'بطاقة الدينار الإلكتروني للبريد' : 'Poste Tunisienne'}
                  </p>
                </div>

                {/* Carte Bancaire */}
                <div
                  onClick={() => setPaymentMethod('bank_card')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'bank_card'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-stone-900">بطاقة بنكية CIB</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Visa / Master</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'جميع البطاقات البنكية التونسية' : 'Carte Bancaire CIB'}
                  </p>
                </div>

                {/* Flouci / Mobile */}
                <div
                  onClick={() => setPaymentMethod('flouci')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'flouci'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-stone-900">فلوصي Flouci</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">محفظة</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'الدفع السريع عبر الهاتف' : 'Portefeuille Flouci'}
                  </p>
                </div>

                {/* Cash on site */}
                <div
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-stone-900">{isAr ? 'نقداً بالمقر' : 'Sur place'}</span>
                    <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded font-bold">المروج 3</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {isAr ? 'الخلاص بمكتب المدرسة بالمروج 3' : 'Paiement à l’école'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Fields according to method */}
            {paymentMethod === 'edinar' && (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 mb-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{isAr ? 'بيانات بطاقة الدينار الإلكتروني e-Dinar (البريد التونسي)' : 'Paiement e-Dinar La Poste'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {isAr ? 'رقم بطاقة الدينار الإلكتروني (16 رقماً)' : 'Numéro de carte e-Dinar'}
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white font-mono text-center tracking-wider"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {isAr ? 'الرمز السري للدفع عبر الإنترنت (Code Confidentiel)' : 'Code secret'}
                    </label>
                    <input
                      type="password"
                      maxLength={8}
                      placeholder="••••"
                      value={edinarPin}
                      onChange={(e) => setEdinarPin(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white text-center tracking-widest"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_card' && (
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 mb-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>{isAr ? 'الدفع الآمن بالبطاقة البنكية التونسية CIB / Visa' : 'Paiement Carte Bancaire'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {isAr ? 'رقم البطاقة البنكية' : 'Numéro de carte'}
                    </label>
                    <input
                      type="text"
                      placeholder="5359 •••• •••• ••••"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white font-mono text-center tracking-wider"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {isAr ? 'تاريخ الانتهاء' : 'Exp.'}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'flouci' && (
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 mb-6 text-xs text-purple-900">
                <p className="font-semibold mb-1">
                  {isAr ? 'سيتم ربط عملية الدفع فوراً مع تطبيق فلوصي Flouci عبر رقم هاتفك:' : 'Paiement instantané via l’application Flouci :'}
                </p>
                <p className="font-bold text-purple-950 font-mono text-sm">{phone || 'الهاتف المسجل'}</p>
                <p className="text-[11px] text-purple-700 mt-1">
                  {isAr ? 'ستصلك إشعار للموافقة الفورية على تحويل مبلغ 35 د.ت' : 'Une notification de confirmation s’affichera sur votre téléphone.'}
                </p>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 mb-6 text-xs text-amber-900">
                <p className="font-bold mb-1">
                  {isAr ? 'حجز مقعد مبدئي والخلاص بمقر المدرسة:' : 'Réservation temporaire et règlement sur place :'}
                </p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {isAr 
                    ? 'سيتم حجز المقعد للطالب لمدة 48 ساعة، ويمكنكم التوجه لمقر المدرسة بالمروج 3 لتأكيد الخلاص واستلام بطاقة الطالب.'
                    : 'Place réservée 48 heures. Présentez-vous au siège d’El Mourouj 3 pour finaliser l’inscription.'}
                </p>
              </div>
            )}

            {/* Security Guarantee Note */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isAr ? 'معاملة مشفرة وآمنة وفق معايير الدفع الإلكتروني بتونس' : 'Paiement sécurisé et chiffré'}</span>
              </span>
              <span className="font-semibold text-emerald-800">
                {isAr ? 'الرابطة الوطنية للقرآن الكريم' : 'Ligue du Coran'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isProcessingPayment}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
              >
                {isAr ? 'تعديل البيانات' : 'Retour'}
              </button>

              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isProcessingPayment}
                className="px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isAr ? 'جارٍ معالجة وتأكيد الدفع...' : 'Traitement en cours...'}</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>
                      {paymentMethod === 'cash'
                        ? (isAr ? 'تأكيد الحجز واستخراج الوصل' : 'Confirmer la réservation')
                        : (isAr ? `تأكيد الدفع الإلكتروني (${totalAmount} د.ت)` : `Valider le paiement (${totalAmount} TND)`)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success & Printable Official Attestation */}
        {step === 4 && completedRegistration && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-500 shadow-lg">
            
            {/* Success Header */}
            <div className="text-center pb-6 border-b border-stone-200 mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                {isAr ? 'تمت عملية التسجيل بنجاح مبارك' : 'Inscription Validée avec Succès'}
              </span>
              <h3 className="text-2xl font-black text-stone-900 font-cairo">
                {isAr ? 'وصل تسجيل رسمي وبطاقة طالب' : 'Attestation d’Inscription & Carte d’Élève'}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {isAr ? 'مدرسة الشيخ الدلاعي للقرآن الكريم بالمروج 3 - بن عروس' : 'École Cheikh Al Dalai - El Mourouj 3, Ben Arous'}
              </p>
            </div>

            {/* Official Student Card / Receipt Print Box */}
            <div id="printable-receipt" className="bg-stone-50 rounded-2xl p-6 border border-stone-300 relative overflow-hidden mb-6">
              
              {/* Watermark */}
              <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none font-quran text-9xl font-bold">
                القرآن
              </div>

              {/* Receipt Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-stone-300">
                <div>
                  <div className="text-xs font-bold text-emerald-800">
                    {SCHOOL_INFO.nameAr}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {SCHOOL_INFO.addressAr} | هاتف: {SCHOOL_INFO.phone}
                  </div>
                </div>
                <div className="text-right rtl:text-right ltr:text-left bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
                  <div>{isAr ? 'رقم التسجيل:' : 'N° Inscription :'}</div>
                  <div className="text-amber-300 text-sm">{completedRegistration.id}</div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 text-xs text-stone-700 border-b border-stone-300">
                <div>
                  <span className="text-stone-500 block">{isAr ? 'اسم الطالب:' : 'Nom de l’élève :'}</span>
                  <span className="font-bold text-stone-900 text-sm">{completedRegistration.studentName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">{isAr ? 'تاريخ التسجيل:' : 'Date d’inscription :'}</span>
                  <span className="font-semibold text-stone-800">{completedRegistration.registeredAt}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">{isAr ? 'رقم الهاتف والواتساب:' : 'WhatsApp :'}</span>
                  <span dir="ltr" className="font-semibold text-stone-800">{completedRegistration.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-500 block">{isAr ? 'المسار أو الدورة:' : 'Cours :'}</span>
                  <span className="font-bold text-emerald-800 text-sm">{completedRegistration.courseTitle}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">{isAr ? 'فترة الحضور بالمدرسة:' : 'Créneau :'}</span>
                  <span className="font-semibold text-stone-800">{completedRegistration.sessionPreference}</span>
                </div>
              </div>

              {/* Payment Receipt Line */}
              <div className="flex flex-wrap justify-between items-center gap-2 pt-4 text-xs">
                <div>
                  <span className="text-stone-500 block">{isAr ? 'حالة الخلاص المالي:' : 'Statut de paiement :'}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>
                      {completedRegistration.paymentStatus === 'paid' 
                        ? (isAr ? 'خالص إلكترونياً بالكامل' : 'Payé en ligne')
                        : (isAr ? 'محجوز - الخلاص بمقر المدرسة' : 'Réservé - À régler sur place')}
                    </span>
                  </span>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                    المرجع: {completedRegistration.transactionRef}
                  </div>
                </div>

                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="text-stone-500 block">{isAr ? 'المبلغ المستخلص:' : 'Montant réglé :'}</span>
                  <span className="text-xl font-black text-emerald-900 font-cairo">
                    {completedRegistration.amountPaid} د.ت
                  </span>
                </div>
              </div>

              {/* Official Seal Mock */}
              <div className="mt-4 pt-3 border-t border-dashed border-stone-300 flex justify-between items-center text-[10px] text-stone-500">
                <span>ختم وإدارة مدرسة الشيخ الدلاعي - المروج 3</span>
                <span>صالحة للموسم القرآني 2025 - 2026</span>
              </div>
            </div>

            {/* Quick Actions after Registration */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handlePrint}
                  className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
                >
                  <Printer className="w-4 h-4 text-stone-600" />
                  <span>{isAr ? 'طباعة / حفظ الوصل' : 'Imprimer le reçu'}</span>
                </button>

                <a
                  href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent(
                    `السلام عليكم، قمت بالتسجيل في دورة ${completedRegistration.courseTitle}، رقم تسجيلي هو: ${completedRegistration.id} للطالب: ${completedRegistration.studentName}. أرجو تأكيد المقعد.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{isAr ? 'إرسال الوصل للمدرسة عبر واتساب' : 'Envoyer à l’école sur WhatsApp'}</span>
                </a>

                <button
                  onClick={onNavigateToPortal}
                  className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>{isAr ? 'الدخول إلى فضاء الطالب' : 'Accéder à l’Espace Étudiant'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setStep(1);
                    setStudentName('');
                    setPhone('');
                    setCompletedRegistration(null);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  {isAr ? 'تسجيل طالب آخر جديد' : 'Inscrire un autre étudiant'}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
