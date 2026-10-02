import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { RegistrationPortal } from './components/RegistrationPortal';
import { StudentPortal } from './components/StudentPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppTelegramFloat } from './components/WhatsAppTelegramFloat';
import { Language, StudentRegistration, QuranProgress } from './types';
import { INITIAL_STUDENTS, INITIAL_PROGRESS } from './data/schoolData';
import { fetchStudentsFromApi, saveStudentToApi, fetchProgressFromApi, saveProgressToApi } from './services/api';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCourseForRegistration, setSelectedCourseForRegistration] = useState<string | undefined>(undefined);

  // Local storage persistence for student registrations & progress
  const [studentsList, setStudentsList] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('aldalai_students');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved students', e);
    }
    return INITIAL_STUDENTS;
  });

  const [progressList, setProgressList] = useState<Record<string, QuranProgress>>(() => {
    try {
      const saved = localStorage.getItem('aldalai_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved progress', e);
    }
    return INITIAL_PROGRESS;
  });

  // Sync RTL / LTR document direction with language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Load from Cloud SQL backend on startup
  useEffect(() => {
    async function loadData() {
      const dbStudents = await fetchStudentsFromApi();
      if (dbStudents && dbStudents.length > 0) {
        setStudentsList(dbStudents);
      }
      const dbProgress = await fetchProgressFromApi();
      if (dbProgress && Object.keys(dbProgress).length > 0) {
        setProgressList(dbProgress);
      }
    }
    loadData();
  }, []);

  // Persist students
  useEffect(() => {
    try {
      localStorage.setItem('aldalai_students', JSON.stringify(studentsList));
    } catch (e) {
      console.error('Error saving students', e);
    }
  }, [studentsList]);

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem('aldalai_progress', JSON.stringify(progressList));
    } catch (e) {
      console.error('Error saving progress', e);
    }
  }, [progressList]);

  const handleOpenRegister = (courseId?: string) => {
    if (courseId) {
      setSelectedCourseForRegistration(courseId);
    }
    setCurrentTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationComplete = (newRegistration: StudentRegistration) => {
    setStudentsList(prev => [newRegistration, ...prev]);

    // Initialize progress for newly registered student
    const newProgress: QuranProgress = {
      studentId: newRegistration.id,
      memorizedHizbCount: newRegistration.currentLevel === 'beginner' ? 1 :
                          newRegistration.currentLevel === 'juz_amma' ? 2 :
                          newRegistration.currentLevel === 'five_ahzab' ? 5 :
                          newRegistration.currentLevel === 'half_quran' ? 30 : 60,
      currentSurah: 'سورة الفاتحة وقصار السور',
      currentAyah: 7,
      lastEvaluationDate: newRegistration.registeredAt,
      evaluationGrade: 'ممتاز',
      tajweedMastery: 85,
      recentNotes: 'تم إتمام التسجيل وتأكيد المقعد بفرع المروج 3. أهلاً وسهلاً بالطالب في رحاب القرآن.',
      weeklyAttendanceRate: 100,
      memorizedSurahs: ['الفاتحة', 'الإخلاص', 'الفلق', 'الناس']
    };

    setProgressList(prev => ({
      ...prev,
      [newRegistration.id]: newProgress
    }));

    // Persist to Cloud SQL backend
    saveStudentToApi(newRegistration);
  };

  const handleAddNewProgressNote = (studentId: string, note: string) => {
    const current = progressList[studentId];
    if (!current) return;
    const updated = {
      ...current,
      recentNotes: `${note} — (تم التحديث بتاريخ اليوم)`
    };

    setProgressList(prev => ({
      ...prev,
      [studentId]: updated
    }));

    // Persist to Cloud SQL backend
    saveProgressToApi(updated);
  };

  return (
    <div className={`min-h-screen bg-stone-50 flex flex-col ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Body depending on Tab */}
      <main className="flex-1">
        
        {currentTab === 'home' && (
          <>
            <Hero
              language={language}
              onNavigate={setCurrentTab}
              onOpenRegister={handleOpenRegister}
            />
            <AboutSection
              language={language}
              onOpenRegister={() => handleOpenRegister()}
            />
            <CoursesSection
              language={language}
              onSelectCourseToRegister={handleOpenRegister}
            />
            <ScheduleSection
              language={language}
              onOpenRegister={handleOpenRegister}
            />
            <ContactSection language={language} />
          </>
        )}

        {currentTab === 'about' && (
          <AboutSection
            language={language}
            onOpenRegister={() => handleOpenRegister()}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesSection
            language={language}
            onSelectCourseToRegister={handleOpenRegister}
          />
        )}

        {currentTab === 'schedule' && (
          <ScheduleSection
            language={language}
            onOpenRegister={handleOpenRegister}
          />
        )}

        {currentTab === 'register' && (
          <RegistrationPortal
            language={language}
            selectedCourseId={selectedCourseForRegistration}
            onRegistrationComplete={handleRegistrationComplete}
            onNavigateToPortal={() => {
              setCurrentTab('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'portal' && (
          <StudentPortal
            language={language}
            studentsList={studentsList}
            progressList={progressList}
            onAddNewProgressNote={handleAddNewProgressNote}
          />
        )}

        {currentTab === 'contact' && (
          <ContactSection language={language} />
        )}

      </main>

      {/* Floating Speed Dial for WhatsApp and Telegram */}
      <WhatsAppTelegramFloat language={language} />

      {/* Rich Footer */}
      <Footer
        language={language}
        onNavigate={setCurrentTab}
        onOpenRegister={handleOpenRegister}
      />

    </div>
  );
}
