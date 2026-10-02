import { Course, Teacher, StudentRegistration, QuranProgress } from '../types';

export const SCHOOL_INFO = {
  nameAr: 'الفرع المحلي للرابطة الوطنية للقرآن الكريم الشيخ الدلاعي بالمروج 3',
  nameFr: 'Ligue Nationale du Saint Coran - Section Cheikh Al Dalai, El Mourouj 3',
  shortNameAr: 'مدرسة الشيخ الدلاعي للقرآن الكريم',
  shortNameFr: 'École Cheikh Al Dalai',
  addressAr: 'المروج 3، بن عروس، الجمهورية التونسية',
  addressFr: 'Mourouj 3, Ben Arous, Tunisie',
  phone: '93 708 100',
  internationalPhone: '+216 93 708 100',
  rawPhone: '21693708100',
  email: 'al.dalai.ecole@gmail.com',
  facebookUrl: 'https://www.facebook.com/ecole.aldalai',
  facebookPageName: 'ecole.aldalai',
  telegramUsername: 'ecole_aldalai_mourouj3',
  telegramUrl: 'https://t.me/ecole_aldalai_mourouj3',
  whatsappUrl: 'https://wa.me/21693708100',
  affiliationAr: 'تحت إشراف الرابطة الوطنية للقرآن الكريم بتونس',
  affiliationFr: 'Sous le patronage de la Ligue Nationale du Saint Coran en Tunisie',
  workingHoursAr: 'من الاثنين إلى الأحد: 08:30 صباحاً - 19:30 مساءً',
  workingHoursFr: 'Du Lundi au Dimanche: 08h30 - 19h30',
  coordinates: {
    lat: 36.7325,
    lng: 10.2185,
    locationLabel: 'Mourouj 3, Ben Arous'
  }
};

export const COURSES: Course[] = [
  {
    id: 'kids-memorization',
    titleAr: 'حلقة البراعم والأطفال (الحفظ والتلقين)',
    titleFr: 'Cercle des Tout-petits & Enfants (Mémorisation)',
    categoryAr: 'الأطفال والناشئة',
    categoryFr: 'Enfants et Jeunes',
    targetGroupAr: 'الأطفال من 5 إلى 11 سنة',
    targetGroupFr: 'Enfants de 5 à 11 ans',
    ageRange: '5 - 11 سنة',
    scheduleAr: 'الأربعاء والسبت والأحد (حصص صباحية ومسائية)',
    scheduleFr: 'Mercredi, Samedi et Dimanche (Matin et Après-midi)',
    monthlyFee: 25,
    registrationFee: 10,
    descriptionAr: 'منهاج تربوي قرآني يركز على تلقين القرآن الكريم بصوت ندي وحفظ السور القصيرة مع آداب المسلم والقصص القرآنية وتعليم مخارج الحروف وقواعد القراءة بالرسم العثماني برواية قالون عن نافع.',
    descriptionFr: 'Programme pédagogique coranique axé sur la mémorisation méthodique, les bonnes manières islamiques, l’apprentissage de la prononciation correcte et la récitation selon Qaloun an Nafi.',
    featuresAr: [
      'تلقين متقن من جزء عم إلى جزء تبارك',
      'تعليم مخارج الحروف والتهجئة القرآنية',
      'قصص الأنبياء والآداب الإسلامية وسير الصحابة',
      'متابعة أسبوعية في دفتر الطالب القرآني'
    ],
    featuresFr: [
      'Mémorisation progressive (Juz Amma et Tabarak)',
      'Apprentissage de la phonétique et lecture coranique',
      'Histoires des prophètes et valeurs morales',
      'Carnet de suivi hebdomadaire remis aux parents'
    ],
    instructorAr: 'نخبة من المؤدبين والمعلمات المعتمدات',
    instructorFr: 'Équipe d’enseignants agréés par la Ligue',
    capacity: 25,
    enrolledCount: 19,
    iconName: 'Baby',
    badgeAr: 'الأكثر طلباً',
    badgeFr: 'Très demandé'
  },
  {
    id: 'youth-tajweed',
    titleAr: 'مسار الناشئة والشباب (حفظ وإتقان التجويد)',
    titleFr: 'Filière Jeunes & Adolescents (Hifz & Tajweed)',
    categoryAr: 'الشباب',
    categoryFr: 'Jeunesse',
    targetGroupAr: 'الفتيان والفتيات من 12 إلى 18 سنة',
    targetGroupFr: 'Adolescents de 12 à 18 ans',
    ageRange: '12 - 18 سنة',
    scheduleAr: 'السبت والأحد وبعد العصر خلال الأسبوع',
    scheduleFr: 'Samedi, Dimanche et fin d’après-midi en semaine',
    monthlyFee: 30,
    registrationFee: 10,
    descriptionAr: 'برنامج مخصص للناشئة يجمع بين حفظ الأجزاء القرآنية وضبط أحكام التجويد النظري والتطبيقي مع حفظ منظومة تحفة الأطفال وحلقات مدارسة وتدبر.',
    descriptionFr: 'Programme pour adolescents alliant mémorisation de plusieurs Hizbs, apprentissage des règles de Tajweed théorique et pratique (Tuhfat Al-Atfal) et compréhension.',
    featuresAr: [
      'حفظ ربع حزب أسبوعياً مع مراجعة المحفوظ السابق',
      'دراسة منظومة تحفة الأطفال للجمزوري',
      'تطبيقات عملية في أحكام النون الساكنة والمدود',
      'إعداد للمسابقات القرآنية الوطنية'
    ],
    featuresFr: [
      'Mémorisation rythmée et révisions continues',
      'Étude du poème didactique Tuhfat Al-Atfal',
      'Mise en pratique approfondie des règles de récitation',
      'Préparation aux concours coraniques nationaux'
    ],
    instructorAr: 'الشيخ المؤدب محمد الصالح الدلاعي',
    instructorFr: 'Cheikh Mohamed Salah Dalai',
    capacity: 20,
    enrolledCount: 15,
    iconName: 'BookOpen',
    badgeAr: 'برنامج متميز',
    badgeFr: 'Programme d’excellence'
  },
  {
    id: 'adults-men',
    titleAr: 'حلقة الكبار والمهنيين (رجال)',
    titleFr: 'Cercle Adultes & Professionnels (Hommes)',
    categoryAr: 'الكبار',
    categoryFr: 'Adultes',
    targetGroupAr: 'الرجال والطلبة الجامعيين والمهنيين',
    targetGroupFr: 'Hommes, étudiants et professionnels',
    ageRange: '18 سنة فما فوق',
    scheduleAr: 'بين المغرب والعشاء + صباح الأحد',
    scheduleFr: 'Entre Maghreb et Isha + Dimanche matin',
    monthlyFee: 35,
    registrationFee: 10,
    descriptionAr: 'حلقات قرآنية مرنة تناسب أوقات العمل والدراسة، تهدف إلى تصحيح التلاوة وتدارك ما فات في الحفظ مع التركيز على رواية قالون وضبط الوقف والابتداء.',
    descriptionFr: 'Horaires flexibles adaptés aux travailleurs et étudiants, axés sur la correction de la lecture, la mémorisation continue et les règles d’arrêt et de reprise.',
    featuresAr: [
      'مواعيد مسائية مريحة بعد أوقات العمل',
      'تصحيح التلاوة لكل طالب على حدة',
      'حفظ ومراجعة برامج الأحزاب السنوية',
      'جلسات تفسير وتدبر مع مشايخ متخصصين'
    ],
    featuresFr: [
      'Horaires en soirée après le travail',
      'Correction individuelle de la récitation',
      'Programme de mémorisation personnalisable',
      'Séances de méditation et d’exégèse coranique'
    ],
    instructorAr: 'المشايخ المجازون بفرع المروج 3',
    instructorFr: 'Cheikhs certifiés de la section El Mourouj 3',
    capacity: 30,
    enrolledCount: 24,
    iconName: 'Users',
    badgeAr: 'أوقات مسائية',
    badgeFr: 'Soirées'
  },
  {
    id: 'women-classes',
    titleAr: 'حلقات الأمهات والنساء والفتيات',
    titleFr: 'Cercles Femmes, Mères et Jeunes Filles',
    categoryAr: 'النساء',
    categoryFr: 'Femmes',
    targetGroupAr: 'النساء والفتيات من مختلف الأعمار',
    targetGroupFr: 'Femmes et jeunes filles de tout âge',
    ageRange: 'مختلف الأعمار',
    scheduleAr: 'فترات صباحية (09:00 - 12:00) ومسائية',
    scheduleFr: 'Matinées (09h00 - 12h00) et après-midi',
    monthlyFee: 30,
    registrationFee: 10,
    descriptionAr: 'قاعات مخصصة ومستقلة تشرف عليها أستاذات ومعلمات حافظات مجازات بالقراءات، مع برامج تحفيظ متدرجة وتصحيح مخارج الحروف ومدارسة أحكام الصلاة والطهارة والأسرة المسلمة.',
    descriptionFr: 'Espaces dédiés animés par des enseignantes certifiées, cours progressifs de mémorisation, perfectionnement de la lecture et sciences islamiques pratiques.',
    featuresAr: [
      'إشراف كامل من معلمات مجازات ذوات خبرة',
      'أجواء إيمانية أخوية داعمة',
      'مستويات متعددة من المبتدئة إلى الحفظ المتقدم',
      'فضاء هادئ مجهز لراحة الأخوات'
    ],
    featuresFr: [
      'Encadrement par des enseignantes certifiées',
      'Atmosphère fraternelle et bienveillante',
      'Niveaux adaptés du débutant au perfectionnement',
      'Cadre convivial et climatisé'
    ],
    instructorAr: 'الأستاذة المؤدبة إيمان والشيخة مريم',
    instructorFr: 'Enseignantes Imene et Mariem',
    capacity: 35,
    enrolledCount: 31,
    iconName: 'HeartHandshake',
    badgeAr: 'إشراف نسائي كامل',
    badgeFr: '100% Féminin'
  },
  {
    id: 'ijaza-tajweed',
    titleAr: 'دورة إتقان التجويد والإجازة بالسند المتصل',
    titleFr: 'Perfectionnement du Tajweed & Ijaza (Sanad)',
    categoryAr: 'الإجازات والقراءات',
    categoryFr: 'Lectures et Sanad',
    targetGroupAr: 'لحفظة القرآن وطلبة العلم المجتهدين',
    targetGroupFr: 'Pour mémorisateurs et étudiants avancés',
    ageRange: 'متقدم',
    scheduleAr: 'الجمعة بعد العصر والسبت صباحاً',
    scheduleFr: 'Vendredi après-midi et Samedi matin',
    monthlyFee: 45,
    registrationFee: 15,
    descriptionAr: 'دورة تخصصية لدراسة متني "تحفة الأطفال" و"المقدمة الجزرية" للإمام ابن الجزري مع تطبيقات دقيقة على مخارج وصفات الحروف، ومنح إجازات بالسند المتصل إلى رسول الله ﷺ لمن يستوفي الشروط.',
    descriptionFr: 'Formation spécialisée sur les textes de référence (Al Jazariyya) et délivrance d’Ijaza avec chaîne de transmission continue (Sanad) pour les candidats méritants.',
    featuresAr: [
      'شرح مفصل لمنظومة المقدمة الجزرية',
      'تصويب الأداء والوقف والابتداء ورسم المصحف',
      'إجازة بالسند المتصل إلى النبي ﷺ لمن يختم بالتجويد',
      'امتحانات دورية تقييمية معتمدة'
    ],
    featuresFr: [
      'Explication détaillée de la Jazariyya',
      'Perfectionnement poussé de la phonétique coranique',
      'Délivrance de diplômes et chaînes de transmission',
      'Évaluations certifiées par la Ligue Nationale'
    ],
    instructorAr: 'الشيخ المقرئ المجاز بالقراءات العشر',
    instructorFr: 'Grand Cheikh diplômé des dix lectures',
    capacity: 15,
    enrolledCount: 11,
    iconName: 'Award',
    badgeAr: 'سند متصل معتمد',
    badgeFr: 'Sanad Certifié'
  },
  {
    id: 'summer-intensive',
    titleAr: 'المخيم القرآني الصيفي المكثف',
    titleFr: 'Camp Coranique Intensif d’Été',
    categoryAr: 'دورات مكثفة',
    categoryFr: 'Stages Intensifs',
    targetGroupAr: 'التلاميذ والطلبة خلال العطلة الصيفية',
    targetGroupFr: 'Écoliers et étudiants pendant les vacances',
    ageRange: '7 - 22 سنة',
    scheduleAr: 'يومياً (من الإثنين إلى الجمعة) 09:00 - 13:00',
    scheduleFr: 'Du Lundi au Vendredi de 09h00 à 13h00',
    monthlyFee: 50,
    registrationFee: 10,
    descriptionAr: 'فرصة ذهبية خلال العطلة لحفظ ومراجعة 5 إلى 10 أحزاب مع أنشطة ترفيهية وثقافية ومسابقات وجوائز قيمة للمتفوقين في المروج 3.',
    descriptionFr: 'Programme intensif pour mémoriser de 5 à 10 Hizbs pendant l’été avec activités récréatives, sorties et remises de prix.',
    featuresAr: [
      'حفظ مكثف بمعدل نصف حزب يومياً أو أسبوعياً',
      'أنشطة وورشات في الخط العربي والآداب',
      'رحلات ترفيهية ومسابقات وجوائز تكريمية',
      'شهادة تخرج في الحفل الختامي السنوي'
    ],
    featuresFr: [
      'Rythme intensif et dynamique',
      'Ateliers de calligraphie arabe et valeurs',
      'Excursions, compétitions et remises de prix',
      'Attestation de réussite lors de la cérémonie de clôture'
    ],
    instructorAr: 'فريق تربوي قرآني متكامل',
    instructorFr: 'Équipe pédagogique multidisciplinaire',
    capacity: 40,
    enrolledCount: 34,
    iconName: 'Sparkles',
    badgeAr: 'تسجيل مفتوح',
    badgeFr: 'Inscriptions Ouvertes'
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: 't-1',
    nameAr: 'الشيخ محمد الصالح الدلاعي',
    nameFr: 'Cheikh Mohamed Salah Dalai',
    roleAr: 'المشرف العام وشيخ المقرأة بالمروج 3',
    roleFr: 'Superviseur Général & Grand Cheikh de la section',
    ijazaAr: 'مجاز برواية قالون وورش وحفص بالسند المتصل',
    ijazaFr: 'Détenteur d’Ijaza en lectures Qaloun, Warsh et Hafs',
    experienceYears: 24,
    bioAr: 'من رواد التعليم القرآني بولاية بن عروس والمروج، أسهم في تخريج عشرات الحفظة وتدريس متون التجويد والقراءات بإشراف الرابطة الوطنية للقرآن الكريم.',
    bioFr: 'Pionnier de l’enseignement coranique à El Mourouj et Ben Arous, ayant formé des dizaines de mémorisateurs avec la Ligue Nationale.'
  },
  {
    id: 't-2',
    nameAr: 'الشيخ البشير الطرابلسي',
    nameFr: 'Cheikh Béchir Trabelsi',
    roleAr: 'أستاذ التجويد ورسم المصحف الشريف',
    roleFr: 'Professeur de Tajweed et Calligraphie Othmanienne',
    ijazaAr: 'إجازة في متن الجزرية وعلم الوقف والابتداء',
    ijazaFr: 'Certifié en Jazariyya et sciences de la récitation',
    experienceYears: 16,
    bioAr: 'متخصص في تصحيح المخارج الصوتية والتدريب الصوتي على التلاوة الخاشعة وحلقات الكبار المسائية.',
    bioFr: 'Spécialiste de la phonétique coranique, de la récitation méditative et des cours du soir pour adultes.'
  },
  {
    id: 't-3',
    nameAr: 'الأستاذة المؤدبة إيمان المرواني',
    nameFr: 'Oustadha Imène Marouani',
    roleAr: 'مسؤولة جناح النساء وحلقات البراعم',
    roleFr: 'Responsable du pôle féminin et cercles enfants',
    ijazaAr: 'حافظة لكتاب الله ومجازة في طرق التدريس القرآني للأطفال',
    ijazaFr: 'Hafidha du Coran et diplômée en pédagogie de l’enfance',
    experienceYears: 12,
    bioAr: 'تتميز بأسلوب تربوي محبب للأطفال واستخدام الوسائل السمعية والبصرية لتحفيظ جزء عم وتأسيس النطق الصحيح.',
    bioFr: 'Reconnue pour son approche bienveillante envers les enfants et l’utilisation d’outils audio-visuels d’apprentissage.'
  }
];

// Initial mock student registrations for demonstration and instant lookup in the portal
export const INITIAL_STUDENTS: StudentRegistration[] = [
  {
    id: 'DALAI-2025-0101',
    studentName: 'أحمد بن علي الزغلامي',
    dateOfBirth: '2014-05-12',
    gender: 'male',
    guardianName: 'علي الزغلامي',
    guardianRelation: 'الأب',
    phone: '93708100',
    email: 'ali.zoghlami@gmail.com',
    address: 'حي المستقبل، المروج 3',
    city: 'المروج 3، بن عروس',
    courseId: 'kids-memorization',
    courseTitle: 'حلقة البراعم والأطفال (الحفظ والتلقين)',
    sessionPreference: 'weekend',
    currentLevel: 'juz_amma',
    registeredAt: '2025-09-01',
    status: 'active',
    paymentStatus: 'paid',
    paymentMethod: 'edinar',
    amountPaid: 35,
    transactionRef: 'EDINAR-TUNISIE-984321',
    notes: 'طالب مجتهد، بدأ في حفظ سورة النبأ'
  },
  {
    id: 'DALAI-2025-0102',
    studentName: 'سارة بنت كمال الورغي',
    dateOfBirth: '2010-09-20',
    gender: 'female',
    guardianName: 'كمال الورغي',
    guardianRelation: 'الأب',
    phone: '98123456',
    email: 'kamal.warghi@gmail.com',
    address: 'شارع البيئة، المروج 3',
    city: 'المروج 3، بن عروس',
    courseId: 'youth-tajweed',
    courseTitle: 'مسار الناشئة والشباب (حفظ وإتقان التجويد)',
    sessionPreference: 'afternoon',
    currentLevel: 'five_ahzab',
    registeredAt: '2025-09-03',
    status: 'active',
    paymentStatus: 'paid',
    paymentMethod: 'bank_card',
    amountPaid: 40,
    transactionRef: 'CIB-TUN-445892',
    notes: 'أتمت حفظ 6 أحزاب وتدرس تحفة الأطفال'
  }
];

export const INITIAL_PROGRESS: Record<string, QuranProgress> = {
  'DALAI-2025-0101': {
    studentId: 'DALAI-2025-0101',
    memorizedHizbCount: 3,
    currentSurah: 'سورة النبأ (عم)',
    currentAyah: 40,
    lastEvaluationDate: '2025-09-15',
    evaluationGrade: 'ممتاز',
    tajweedMastery: 88,
    recentNotes: 'حفظ متقن ومخارج الحروف سليمة، التركيز على ترقيق الراء المكسورة والمد المنفصل.',
    weeklyAttendanceRate: 95,
    memorizedSurahs: ['الناس', 'الفلق', 'الإخلاص', 'المسد', 'النصر', 'الكافرون', 'الكوثر', 'الماعون', 'قريش', 'الفيل', 'الهمزة', 'العصر', 'التكاثر', 'القارعة', 'الزلزلة', 'البينة', 'القدر', 'العلق', 'التين', 'الشرح', 'الضحى', 'الليل', 'الشمس', 'البلد', 'الفجر', 'الغاشية', 'الأعلى', 'الطارق', 'البروج', 'الانشقاق', 'المطففين', 'الانفطار', 'التكوير', 'عبس', 'النازعات', 'النبأ']
  },
  'DALAI-2025-0102': {
    studentId: 'DALAI-2025-0102',
    memorizedHizbCount: 6,
    currentSurah: 'سورة الملك',
    currentAyah: 30,
    lastEvaluationDate: '2025-09-17',
    evaluationGrade: 'جيد جدا',
    tajweedMastery: 92,
    recentNotes: 'إتقان تام لأحكام النون الساكنة والتنوين والإدغام بغنة. أداء ندي وخاشع.',
    weeklyAttendanceRate: 100,
    memorizedSurahs: ['جزء عم كاملاً (حزبان)', 'جزء تبارك كاملاً (حزبان)', 'سورة يس', 'سورة الرحمن', 'سورة الواقعة']
  }
};

export const FAQS = [
  {
    qAr: 'أين يقع مقر مدرسة الشيخ الدلاعي بالضبط في المروج 3؟',
    qFr: 'Où se situe exactement l’école Cheikh Al Dalai à El Mourouj 3 ?',
    aAr: 'يقع مقر المدرسة في المروج 3 بولاية بن عروس بتونس، في موقع هادئ وقريب من وسائل النقل، ويمكنكم التواصل معنا عبر واتساب 93708100 لتلقي الموقع الجغرافي الدقيق على خرائط غوغل.',
    aFr: 'L’école est située à El Mourouj 3 (Gouvernorat de Ben Arous, Tunisie). Vous pouvez nous contacter sur WhatsApp au 93 708 100 pour recevoir l’emplacement exact sur Google Maps.'
  },
  {
    qAr: 'كيف تتم عملية التسجيل والدفع الإلكتروني؟',
    qFr: 'Comment s’inscrire et effectuer le paiement en ligne ?',
    aAr: 'يمكنكم اختيار الدورة المناسبة من الموقع وتعبئة استمارة التسجيل ببيانات الطالب أو ولي الأمر، ثم اختيار الدفع الإلكتروني بالبطاقة البنكية أو بطاقة الدينار الإلكتروني (e-Dinar للبريد التونسي) أو فلوصي Flouci أو الدفع نقداً بمقر المدرسة. فور إتمام الدفع، يصدر وصل التسجيل فوراً برقم تعريفي خاص بالطالب.',
    aFr: 'Choisissez le cours souhaité, remplissez le formulaire, puis réglez par carte bancaire, e-Dinar de La Poste Tunisienne, Flouci, ou en espèces sur place. Un reçu avec identifiant unique vous est immédiatement délivré.'
  },
  {
    qAr: 'هل الحلقات مخصصة فقط للأطفال أم تشمل جميع الأعمار؟',
    qFr: 'Les cours sont-ils réservés aux enfants ou ouverts à tous les âges ?',
    aAr: 'توفر المدرسة حلقات لجميع الفئات: براعم وصغار (من 5 سنوات)، ناشئة وشباب، رجال ومهنيين (أوقات مسائية ونهاية أسبوع)، وأقسام خاصة بالنساء والفتيات بإشراف معلمات مجازات.',
    aFr: 'Nous accueillons tous les âges : enfants (dès 5 ans), adolescents, cours du soir pour adultes et professionnels, et cercles féminins encadrés par des professeures agréées.'
  },
  {
    qAr: 'ما هي الروايات القرآنية التي تدرّس في المدرسة؟',
    qFr: 'Quelles lectures coraniques sont enseignées ?',
    aAr: 'الأصل المعتمد في تونس هو رواية قالون عن نافع المدني مع الرسم العثماني التونسي المعتمد، كما توفر المدرسة حلقات لرواية ورش ورواية حفص ودورات الإجازة بالسند المتصل.',
    aFr: 'Prioritairement la lecture de Qaloun an Nafi (tradition tunisienne), ainsi que Warsh, Hafs et des cursus d’Ijaza avec chaîne de transmission (Sanad).'
  },
  {
    qAr: 'هل يمكن لولي الأمر متابعة حفظ وحضور ابنه عن بعد؟',
    qFr: 'Les parents peuvent-ils suivre la progression et la présence de leur enfant à distance ?',
    aAr: 'نعم، عبر "فضاء الطالب" في موقعنا بمجرد إدخال رقم التسجيل أو رقم الهاتف المسجل، يظهر سجل الحفظ، الأحزاب المنجزة، التقييم الأسبوعي، ونسبة الحضور.',
    aFr: 'Oui, via l’espace étudiant en saisissant le numéro d’inscription ou le téléphone : historique des Hizbs mémorisés, appréciations et assiduité en direct.'
  }
];
