import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table (synced with Firebase Auth)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Students registration table
export const students = pgTable('students', {
  id: text('id').primaryKey(), // DALAI-2025-XXXX
  studentName: text('student_name').notNull(),
  dateOfBirth: text('date_of_birth'),
  gender: text('gender').notNull(),
  guardianName: text('guardian_name'),
  guardianRelation: text('guardian_relation'),
  phone: text('phone').notNull(),
  email: text('email'),
  address: text('address'),
  city: text('city'),
  courseId: text('course_id').notNull(),
  courseTitle: text('course_title').notNull(),
  sessionPreference: text('session_preference').notNull(),
  currentLevel: text('current_level').notNull(),
  notes: text('notes'),
  registeredAt: text('registered_at').notNull(),
  status: text('status').notNull().default('active'),
  paymentStatus: text('payment_status').notNull().default('paid'),
  paymentMethod: text('payment_method'),
  amountPaid: integer('amount_paid').notNull().default(0),
  transactionRef: text('transaction_ref'),
  userId: text('user_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Quran memorization & Tajweed progress records
export const quranProgress = pgTable('quran_progress', {
  id: serial('id').primaryKey(),
  studentId: text('student_id')
    .notNull()
    .references(() => students.id),
  memorizedHizbCount: integer('memorized_hizb_count').notNull().default(0),
  currentSurah: text('current_surah').notNull(),
  currentAyah: integer('current_ayah').notNull().default(1),
  lastEvaluationDate: text('last_evaluation_date'),
  evaluationGrade: text('evaluation_grade').notNull().default('ممتاز'),
  tajweedMastery: integer('tajweed_mastery').notNull().default(80),
  recentNotes: text('recent_notes'),
  weeklyAttendanceRate: integer('weekly_attendance_rate').notNull().default(100),
  memorizedSurahs: text('memorized_surahs'), // JSON array string
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const studentsRelations = relations(students, ({ one }) => ({
  progress: one(quranProgress, {
    fields: [students.id],
    references: [quranProgress.studentId],
  }),
}));

export const quranProgressRelations = relations(quranProgress, ({ one }) => ({
  student: one(students, {
    fields: [quranProgress.studentId],
    references: [students.id],
  }),
}));
