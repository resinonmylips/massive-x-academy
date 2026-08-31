import React from 'react';
import { ManualModule } from '../types';
import { 
  Award, BookOpen, Compass, ChevronRight, CheckCircle, Flame, 
  Settings, HelpCircle, Trophy, BarChart2 
} from 'lucide-react';

interface SidebarProps {
  modules: ManualModule[];
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  progress: {
    completedModules: string[];
    moduleQuizScores: Record<string, number>;
    totalPoints: number;
    unlockedBadges: string[];
  };
  onResetProgress: () => void;
}

export default function Sidebar({ modules, activeModuleId, onSelectModule, progress, onResetProgress }: SidebarProps) {
  // Static badges mapped to competency thresholds
  const badgeDefinitions = [
    { name: 'Novice Patches', desc: 'Read first manual introduction', pts: 0 },
    { name: 'Routing Alchemist', desc: 'Scored 80%+ on any quiz', pts: 80 },
    { name: 'Oscillation Adept', desc: 'Score 100% on two modules', pts: 200 },
    { name: 'Synthesizer Oracle', desc: 'Complete all chapter contents', pts: 500 },
  ];

  // Calculate stats
  const completedCount = progress.completedModules.length;
  const totalQuizzesPassed = Object.values(progress.moduleQuizScores).filter(score => score >= 80).length;

  return (
    <div id="left-sidebar" className="bg-ni-card border border-ni-border rounded-xl flex flex-col h-full overflow-hidden shadow-2xl shrink-0">
      {/* Brand Header */}
      <div className="bg-ni-dark border-b border-ni-border px-5 py-4.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-ni-orange flex items-center justify-center text-ni-dark font-mono font-extrabold text-sm tracking-tighter">
            MX
          </div>
          <div>
            <h1 className="text-xs font-mono font-bold tracking-widest text-white leading-none uppercase">Massive X</h1>
            <span className="text-[10px] font-mono text-ni-orange font-bold uppercase tracking-wider mt-0.5 inline-block">ACADEMY</span>
          </div>
        </div>
        <span className="text-[9px] font-mono text-gray-500 border border-ni-border/80 px-2 py-0.5 rounded">V1.6</span>
      </div>

      {/* Progress & Trophy Deck */}
      <div className="p-4 bg-ni-dark/40 border-b border-ni-border/70 grid grid-cols-2 gap-2.5">
        <div className="bg-ni-dark border border-ni-border/80 rounded-lg p-3 text-center">
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Total Points</span>
          <div className="flex items-center justify-center gap-1">
            <Trophy size={13} className="text-ni-yellow shrink-0" />
            <span className="text-lg font-mono font-bold text-white tracking-tight">{progress.totalPoints}</span>
          </div>
        </div>
        <div className="bg-ni-dark border border-ni-border/80 rounded-lg p-3 text-center">
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Chapters</span>
          <div className="flex items-center justify-center gap-1">
            <CheckCircle size={13} className="text-ni-teal shrink-0" />
            <span className="text-lg font-mono font-bold text-white tracking-tight">
              {completedCount} / {modules.length}
            </span>
          </div>
        </div>
      </div>

      {/* Curriculum list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2 px-1">Interactive Syllabus</span>
          <div className="flex flex-col gap-1.5">
            {modules.map((m) => {
              const isActive = m.id === activeModuleId;
              const isCompleted = progress.completedModules.includes(m.id);
              const quizScore = progress.moduleQuizScores[m.id];

              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className={`w-full text-left p-3 rounded-lg border text-xs leading-normal transition-all flex items-center justify-between group relative overflow-hidden ${
                    isActive
                      ? 'border-ni-orange bg-ni-orange/5 text-ni-orange font-bold'
                      : 'border-ni-border/70 bg-ni-card hover:bg-ni-border/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden w-full">
                    <div className="shrink-0">
                      {isCompleted ? (
                        <CheckCircle size={14} className="text-ni-teal" />
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border border-gray-500 ${isActive ? 'border-ni-orange' : ''}`} />
                      )}
                    </div>
                    <span className="truncate pr-2 font-medium">{m.title}</span>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {quizScore !== undefined && (
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        quizScore >= 80 ? 'bg-ni-teal/10 text-ni-teal' : 'bg-ni-border text-gray-400'
                      }`}>
                        {quizScore}%
                      </span>
                    )}
                    <ChevronRight size={12} className={`opacity-40 group-hover:opacity-100 transition-all ${isActive ? 'text-ni-orange translate-x-0.5' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Badges Deck */}
        <div className="border-t border-ni-border/60 pt-4">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2 px-1">Unlocked Synthesis Badges</span>
          <div className="grid grid-cols-2 gap-2">
            {badgeDefinitions.map((b) => {
              // Award conditions
              const isUnlocked = 
                (b.pts === 0) || 
                (b.pts === 80 && totalQuizzesPassed >= 1) ||
                (b.pts === 200 && Object.values(progress.moduleQuizScores).filter(s => s === 100).length >= 1) ||
                (b.pts === 500 && completedCount === modules.length);

              return (
                <div
                  key={b.name}
                  className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center justify-between gap-1.5 relative overflow-hidden ${
                    isUnlocked
                      ? 'border-ni-orange bg-ni-orange/5 shadow shadow-ni-orange/5'
                      : 'border-ni-border/40 bg-ni-dark/20 opacity-30 select-none'
                  }`}
                >
                  <Award size={18} className={isUnlocked ? 'text-ni-orange' : 'text-gray-500'} />
                  <div>
                    <span className="text-[9px] font-mono font-extrabold text-white truncate block max-w-full uppercase">{b.name}</span>
                    <span className="text-[8px] font-sans text-gray-400 leading-none mt-0.5 block">{b.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Utility Panel */}
      <div className="p-4 border-t border-ni-border bg-ni-dark/80 shrink-0">
        <button
          onClick={onResetProgress}
          className="w-full flex items-center justify-center gap-1.5 py-2 hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 font-mono text-[10px] uppercase rounded border border-ni-border transition-all"
        >
          <Settings size={11} />
          <span>RESET ACADEMY PROGRESS</span>
        </button>
      </div>
    </div>
  );
}
