import React, { useState, useEffect } from 'react';
import { manualModules } from './data/manualContent';
import { UserProgress } from './types';
import Sidebar from './components/Sidebar';
import ChapterContent from './components/ChapterContent';
import InteractivePlayground from './components/InteractivePlayground';
import Chatbot from './components/Chatbot';
import { 
  Trophy, BookOpen, MessageSquare, Sparkles, Cpu, Clock, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState('intro-overview');
  
  // Progress states
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('massive_x_academy_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse progress cache:", e);
      }
    }
    return {
      completedModules: [],
      moduleQuizScores: {},
      totalPoints: 0,
      unlockedBadges: ['Novice Patches'],
      notes: {}
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('massive_x_academy_progress', JSON.stringify(progress));
  }, [progress]);

  const activeModule = manualModules.find(m => m.id === activeModuleId) || manualModules[0];

  const handleQuizSubmit = (score: number) => {
    const prevScore = progress.moduleQuizScores[activeModuleId] || 0;
    const isNewHigh = score > prevScore;

    setProgress(prev => {
      const updatedScores = { ...prev.moduleQuizScores };
      let ptsAwarded = 0;

      if (isNewHigh) {
        updatedScores[activeModuleId] = score;
        
        // Calculate points based on performance bands
        if (score === 100) {
          ptsAwarded = 100 - (prevScore === 0 ? 0 : Math.round(prevScore * 0.8));
        } else if (score >= 80) {
          ptsAwarded = 50 - (prevScore === 0 ? 0 : Math.round(prevScore * 0.5));
        } else {
          ptsAwarded = 15;
        }
      }

      // Add to completed modules list if passed (80% or greater)
      const updatedCompleted = [...prev.completedModules];
      if (score >= 80 && !updatedCompleted.includes(activeModuleId)) {
        updatedCompleted.push(activeModuleId);
      }

      const newPoints = prev.totalPoints + ptsAwarded;
      const updatedBadges = [...prev.unlockedBadges];

      // Auto-unlock point-based badge triggers
      if (newPoints >= 80 && !updatedBadges.includes('Routing Alchemist')) {
        updatedBadges.push('Routing Alchemist');
      }
      if (newPoints >= 200 && !updatedBadges.includes('Oscillation Adept')) {
        updatedBadges.push('Oscillation Adept');
      }
      if (updatedCompleted.length === manualModules.length && !updatedBadges.includes('Synthesizer Oracle')) {
        updatedBadges.push('Synthesizer Oracle');
      }

      return {
        ...prev,
        moduleQuizScores: updatedScores,
        completedModules: updatedCompleted,
        totalPoints: newPoints,
        unlockedBadges: updatedBadges
      };
    });
  };

  const handleSaveNotes = (sectionId: string, text: string) => {
    setProgress(prev => {
      const updatedNotes = { ...prev.notes, [sectionId]: text };
      return {
        ...prev,
        notes: updatedNotes
      };
    });
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your synth training progress? This will delete all scores, badges, and annotations.")) {
      setProgress({
        completedModules: [],
        moduleQuizScores: {},
        totalPoints: 0,
        unlockedBadges: ['Novice Patches'],
        notes: {}
      });
      setActiveModuleId('intro-overview');
    }
  };

  const syllabusProgressRatio = progress.completedModules.length / manualModules.length;
  const syllabusProgressPercent = Math.round(syllabusProgressRatio * 100);

  return (
    <div className="min-h-screen bg-ni-dark text-gray-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-ni-deep border-b border-ni-border py-3 px-6 flex items-center justify-between shadow-md shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ni-orange animate-ping" />
            <Cpu className="text-ni-orange shrink-0" size={18} />
            <span className="text-sm font-mono font-extrabold tracking-widest text-white uppercase">NATIVE INSTRUMENTS HUB</span>
          </div>
          <div className="hidden sm:block h-4 w-[1px] bg-ni-border" />
          <span className="hidden sm:inline text-xs font-mono text-gray-500">MASSIVE X COMPREHENSIVE TRAINING CENTRE</span>
        </div>

        {/* User context metadata */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="hidden lg:flex items-center gap-1.5 text-gray-400">
            <Clock size={13} className="text-ni-blue" />
            <span>UTC: 2026-07-08 08:17:36</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 bg-ni-border/30 border border-ni-border px-3 py-1 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-400">User:</span>
            <span className="text-white font-bold">evanfrosty@gmail.com</span>
          </div>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-ni-deep via-ni-card to-ni-deep border-b border-ni-border py-8 px-6 lg:px-8 select-none shrink-0 relative overflow-hidden">
        {/* Abstract background vector glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-ni-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-10 bg-ni-blue/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 bg-ni-orange/10 border border-ni-orange/20 text-ni-orange px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase max-w-max mb-2">
              <Sparkles size={11} />
              Interactive Synthesizer Academy
            </div>
            <h1 className="text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight">
              Mastering Massive X
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
              Become a sound design expert through step-by-step documentation, interactive modular visualizers, skill challenges, and a dedicated synthesist AI co-pilot.
            </p>
          </div>

          {/* Quick stats ribbon */}
          <div className="flex items-center gap-4 bg-ni-dark/80 border border-ni-border p-4 rounded-xl shadow-lg shrink-0">
            <div className="border-r border-ni-border pr-4">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Rank Badge</span>
              <span className="text-xs font-mono font-bold text-ni-orange uppercase tracking-wide">
                {progress.totalPoints >= 500 ? 'Synthesist Oracle' : progress.totalPoints >= 200 ? 'Oscillator Adept' : progress.totalPoints >= 80 ? 'Routing Alchemist' : 'Novice Designer'}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Syllabus Progress</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-16 h-1.5 bg-ni-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-ni-teal transition-all duration-500" 
                    style={{ width: `${syllabusProgressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-ni-teal font-bold">{syllabusProgressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        {/* Sidebar Left Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Sidebar
            modules={manualModules}
            activeModuleId={activeModuleId}
            onSelectModule={setActiveModuleId}
            progress={progress}
            onResetProgress={handleResetProgress}
          />
        </div>

        {/* Center Primary and Interactive Columns */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Chapter Guide & Lessons */}
          <ChapterContent
            module={activeModule}
            progress={progress}
            onQuizSubmit={handleQuizSubmit}
            onSaveNotes={handleSaveNotes}
          />

          {/* Core Interactive Synth Board */}
          <InteractivePlayground />
        </div>

        {/* Right Chatbot Co-Pilot Panel */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="sticky top-4">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
