import { StudentRegistration, QuranProgress } from '../types';

export async function fetchStudentsFromApi(): Promise<StudentRegistration[] | null> {
  try {
    const res = await fetch('/api/students');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('API fetch students error:', err);
    return null;
  }
}

export async function saveStudentToApi(student: StudentRegistration): Promise<boolean> {
  try {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    return res.ok;
  } catch (err) {
    console.error('API save student error:', err);
    return false;
  }
}

export async function fetchProgressFromApi(): Promise<Record<string, QuranProgress> | null> {
  try {
    const res = await fetch('/api/progress');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('API fetch progress error:', err);
    return null;
  }
}

export async function saveProgressToApi(progress: QuranProgress): Promise<boolean> {
  try {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress),
    });
    return res.ok;
  } catch (err) {
    console.error('API save progress error:', err);
    return false;
  }
}
