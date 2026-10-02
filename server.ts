import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { getAllStudents, createStudent, getAllProgress, saveProgress } from './src/db/queries.ts';
import { getOrCreateUser } from './src/db/users.ts';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { INITIAL_STUDENTS, INITIAL_PROGRESS } from './src/data/schoolData.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Fetch all students from Cloud SQL
  app.get('/api/students', async (_req, res) => {
    try {
      let list = await getAllStudents();
      // Auto-seed initial data if DB is empty
      if (list.length === 0) {
        for (const s of INITIAL_STUDENTS) {
          await createStudent(s);
        }
        for (const p of Object.values(INITIAL_PROGRESS)) {
          await saveProgress(p);
        }
        list = await getAllStudents();
      }
      res.json(list);
    } catch (error: any) {
      console.error('Failed to fetch students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

  // Register new student in Cloud SQL
  app.post('/api/students', async (req, res) => {
    try {
      const studentData = req.body;
      if (!studentData || !studentData.id || !studentData.studentName) {
        return res.status(400).json({ error: 'Missing required student registration data' });
      }

      const saved = await createStudent(studentData);

      // Create initial progress record for the student
      const initialHizb = studentData.currentLevel === 'beginner' ? 1 :
                          studentData.currentLevel === 'juz_amma' ? 2 :
                          studentData.currentLevel === 'five_ahzab' ? 5 :
                          studentData.currentLevel === 'half_quran' ? 30 : 60;

      await saveProgress({
        studentId: studentData.id,
        memorizedHizbCount: initialHizb,
        currentSurah: 'سورة الفاتحة وقصار السور',
        currentAyah: 7,
        lastEvaluationDate: studentData.registeredAt || new Date().toISOString().split('T')[0],
        evaluationGrade: 'ممتاز',
        tajweedMastery: 85,
        recentNotes: 'تم تسجيل الطالب بفرع المروج 3 بنجاح وتأكيد المقعد.',
        weeklyAttendanceRate: 100,
        memorizedSurahs: ['الفاتحة', 'الإخلاص', 'الفلق', 'الناس'],
      });

      res.status(201).json(saved);
    } catch (error: any) {
      console.error('Failed to create student:', error);
      res.status(500).json({ error: 'Failed to register student' });
    }
  });

  // Fetch all Quran progress records from Cloud SQL
  app.get('/api/progress', async (_req, res) => {
    try {
      let progressMap = await getAllProgress();
      if (Object.keys(progressMap).length === 0) {
        for (const p of Object.values(INITIAL_PROGRESS)) {
          await saveProgress(p);
        }
        progressMap = await getAllProgress();
      }
      res.json(progressMap);
    } catch (error: any) {
      console.error('Failed to fetch progress:', error);
      res.status(500).json({ error: 'Failed to fetch progress records' });
    }
  });

  // Save / Update student progress note or evaluation
  app.post('/api/progress', async (req, res) => {
    try {
      const progressData = req.body;
      if (!progressData || !progressData.studentId) {
        return res.status(400).json({ error: 'Missing studentId in progress data' });
      }

      const saved = await saveProgress(progressData);
      res.json(saved);
    } catch (error: any) {
      console.error('Failed to update progress:', error);
      res.status(500).json({ error: 'Failed to update progress' });
    }
  });

  // Sync authenticated user to users table
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const user = await getOrCreateUser(
        req.user.uid,
        req.user.email || '',
        req.user.name || undefined
      );
      res.json(user);
    } catch (error: any) {
      console.error('Failed to sync auth user:', error);
      res.status(500).json({ error: 'Failed to sync user' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
