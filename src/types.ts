export type Language = 'ar' | 'fr';

export interface Course {
  id: string;
  titleAr: string;
  titleFr: string;
  categoryAr: string;
  categoryFr: string;
  targetGroupAr: string;
  targetGroupFr: string;
  ageRange: string;
  scheduleAr: string;
  scheduleFr: string;
  monthlyFee: number; // in TND
  registrationFee: number; // in TND
  descriptionAr: string;
  descriptionFr: string;
  featuresAr: string[];
  featuresFr: string[];
  instructorAr: string;
  instructorFr: string;
  capacity: number;
  enrolledCount: number;
  iconName: string;
  badgeAr?: string;
  badgeFr?: string;
}

export interface StudentRegistration {
  id: string; // e.g. DALAI-2025-XXXX
  studentName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  guardianName?: string;
  guardianRelation?: string;
  phone: string; // WhatsApp enabled
  email: string;
  address: string;
  city: string;
  courseId: string;
  courseTitle: string;
  sessionPreference: 'morning' | 'afternoon' | 'evening' | 'weekend';
  currentLevel: 'beginner' | 'juz_amma' | 'five_ahzab' | 'half_quran' | 'khatim';
  notes?: string;
  registeredAt: string;
  status: 'confirmed' | 'pending_payment' | 'active';
  paymentStatus: 'paid' | 'pending' | 'cash_on_site';
  paymentMethod?: 'edinar' | 'bank_card' | 'flouci' | 'cash';
  amountPaid: number;
  transactionRef?: string;
}

export interface QuranProgress {
  studentId: string;
  memorizedHizbCount: number;
  currentSurah: string;
  currentAyah: number;
  lastEvaluationDate: string;
  evaluationGrade: 'ممتاز' | 'جيد جدا' | 'جيد' | 'يحتاج مراجعة';
  tajweedMastery: number; // percentage 0-100
  recentNotes: string;
  weeklyAttendanceRate: number; // percentage
  memorizedSurahs: string[];
}

export interface Teacher {
  id: string;
  nameAr: string;
  nameFr: string;
  roleAr: string;
  roleFr: string;
  ijazaAr: string;
  ijazaFr: string;
  experienceYears: number;
  bioAr: string;
  bioFr: string;
}
