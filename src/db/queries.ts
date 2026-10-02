import { db } from './index.ts';
import { students, quranProgress } from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { StudentRegistration, QuranProgress } from '../types';

export async function getAllStudents(): Promise<StudentRegistration[]> {
  try {
    const rows = await db.select().from(students).orderBy(desc(students.createdAt));
    return rows.map(r => ({
      id: r.id,
      studentName: r.studentName,
      dateOfBirth: r.dateOfBirth || '',
      gender: r.gender as 'male' | 'female',
      guardianName: r.guardianName || undefined,
      guardianRelation: r.guardianRelation || undefined,
      phone: r.phone,
      email: r.email || '',
      address: r.address || '',
      city: r.city || '',
      courseId: r.courseId,
      courseTitle: r.courseTitle,
      sessionPreference: r.sessionPreference as 'morning' | 'afternoon' | 'evening' | 'weekend',
      currentLevel: r.currentLevel as 'beginner' | 'juz_amma' | 'five_ahzab' | 'half_quran' | 'khatim',
      notes: r.notes || undefined,
      registeredAt: r.registeredAt,
      status: r.status as 'confirmed' | 'pending_payment' | 'active',
      paymentStatus: r.paymentStatus as 'paid' | 'pending' | 'cash_on_site',
      paymentMethod: (r.paymentMethod || undefined) as any,
      amountPaid: r.amountPaid,
      transactionRef: r.transactionRef || undefined,
    }));
  } catch (error) {
    console.error('Database getAllStudents query failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function createStudent(student: StudentRegistration, userId?: string): Promise<StudentRegistration> {
  try {
    await db.insert(students).values({
      id: student.id,
      studentName: student.studentName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      guardianName: student.guardianName,
      guardianRelation: student.guardianRelation,
      phone: student.phone,
      email: student.email,
      address: student.address,
      city: student.city,
      courseId: student.courseId,
      courseTitle: student.courseTitle,
      sessionPreference: student.sessionPreference,
      currentLevel: student.currentLevel,
      notes: student.notes,
      registeredAt: student.registeredAt,
      status: student.status,
      paymentStatus: student.paymentStatus,
      paymentMethod: student.paymentMethod,
      amountPaid: student.amountPaid,
      transactionRef: student.transactionRef,
      userId: userId || null,
    });

    return student;
  } catch (error) {
    console.error('Database createStudent query failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getAllProgress(): Promise<Record<string, QuranProgress>> {
  try {
    const rows = await db.select().from(quranProgress);
    const result: Record<string, QuranProgress> = {};

    for (const r of rows) {
      let memorizedSurahs: string[] = [];
      try {
        if (r.memorizedSurahs) {
          memorizedSurahs = JSON.parse(r.memorizedSurahs);
        }
      } catch {
        memorizedSurahs = r.memorizedSurahs ? r.memorizedSurahs.split(',') : [];
      }

      result[r.studentId] = {
        studentId: r.studentId,
        memorizedHizbCount: r.memorizedHizbCount,
        currentSurah: r.currentSurah,
        currentAyah: r.currentAyah,
        lastEvaluationDate: r.lastEvaluationDate || '',
        evaluationGrade: r.evaluationGrade as any,
        tajweedMastery: r.tajweedMastery,
        recentNotes: r.recentNotes || '',
        weeklyAttendanceRate: r.weeklyAttendanceRate,
        memorizedSurahs,
      };
    }

    return result;
  } catch (error) {
    console.error('Database getAllProgress query failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function saveProgress(progress: QuranProgress): Promise<QuranProgress> {
  try {
    const existing = await db
      .select()
      .from(quranProgress)
      .where(eq(quranProgress.studentId, progress.studentId));

    if (existing.length > 0) {
      await db
        .update(quranProgress)
        .set({
          memorizedHizbCount: progress.memorizedHizbCount,
          currentSurah: progress.currentSurah,
          currentAyah: progress.currentAyah,
          lastEvaluationDate: progress.lastEvaluationDate,
          evaluationGrade: progress.evaluationGrade,
          tajweedMastery: progress.tajweedMastery,
          recentNotes: progress.recentNotes,
          weeklyAttendanceRate: progress.weeklyAttendanceRate,
          memorizedSurahs: JSON.stringify(progress.memorizedSurahs),
          updatedAt: new Date(),
        })
        .where(eq(quranProgress.studentId, progress.studentId));
    } else {
      await db.insert(quranProgress).values({
        studentId: progress.studentId,
        memorizedHizbCount: progress.memorizedHizbCount,
        currentSurah: progress.currentSurah,
        currentAyah: progress.currentAyah,
        lastEvaluationDate: progress.lastEvaluationDate,
        evaluationGrade: progress.evaluationGrade,
        tajweedMastery: progress.tajweedMastery,
        recentNotes: progress.recentNotes,
        weeklyAttendanceRate: progress.weeklyAttendanceRate,
        memorizedSurahs: JSON.stringify(progress.memorizedSurahs),
      });
    }

    return progress;
  } catch (error) {
    console.error('Database saveProgress query failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
