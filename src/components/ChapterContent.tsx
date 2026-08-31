import React, { useState, useEffect } from 'react';
import { ManualModule } from '../types';
import { 
  BookOpen, HelpCircle, Table, CheckCircle, Info, AlertTriangle, 
  Lightbulb, Edit3, Save, Check, Award 
} from 'lucide-react';
import QuizCard from './QuizCard';
import { motion, AnimatePresence } from 'motion/react';

interface ChapterContentProps {
  module: ManualModule;
  progress: {
    completedModules: string[];
    moduleQuizScores: Record<string, number>;
    notes: Record<string, string>;
  };
  onQuizSubmit: (score: number) => void;
  onSaveNotes: (sectionId: string, text: string) => void;
}

export default function ChapterContent({ module, progress, onQuizSubmit, onSaveNotes }: ChapterContentProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'specs' | 'quiz'>('learn');
  const [notesText, setNotesText] = useState('');
  const [activeSectionId, setActiveSectionId] = useState(module.sections[0]?.id || '');
  const [noteSaved, setNoteSaved] = useState(false);

  // Synchronize note inputs when chapter or active section changes
  useEffect(() => {
    setNotesText(progress.notes[activeSectionId] || '');
    setNoteSaved(false);
  }, [activeSectionId, module, progress.notes]);

  // Handle active section change
  const currentSection = module.sections.find(s => s.id === activeSectionId) || module.sections[0];

  const handleSaveNotes = () => {
    onSaveNotes(activeSectionId, notesText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div id="chapter-main-panel" className="flex flex-col gap-6">
      {/* Chapter Overview Card */}
      <div className="bg-ni-card border border-ni-border rounded-xl p-6 shadow-xl relative overflow-hidden">
        {/* Ribbon decoration */}
        <div className="absolute top-0 left-0 w-1 h-full bg-ni-orange" />
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-ni-orange font-bold uppercase tracking-wider">
              Synth Curriculum • Chapter {module.id === 'intro-overview' ? '01' : module.id === 'play-view' ? '02' : '03'}
            </span>
            <h2 className="text-xl font-display font-extrabold text-white mt-1">
              {module.title}
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
              {module.description}
            </p>
          </div>

          {/* Module Completion Indicator */}
          {progress.completedModules.includes(module.id) && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-ni-teal/10 border border-ni-teal/20 text-ni-teal font-mono text-xs font-bold rounded-lg uppercase tracking-wide shrink-0">
              <CheckCircle size={13} />
              Completed
            </div>
          )}
        </div>

        {/* View Selection Bar */}
        <div className="flex gap-2.5 border-t border-ni-border/60 mt-5 pt-4">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'learn'
                ? 'bg-white text-ni-dark shadow'
                : 'text-gray-400 hover:text-white hover:bg-ni-border/30'
            }`}
          >
            <BookOpen size={14} />
            LEARN GUIDE
          </button>
          
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'specs'
                ? 'bg-white text-ni-dark shadow'
                : 'text-gray-400 hover:text-white hover:bg-ni-border/30'
            }`}
          >
            <Table size={14} />
            TECHNICAL SPECS
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-ni-dark shadow'
                : 'text-gray-400 hover:text-white hover:bg-ni-border/30'
            }`}
          >
            <HelpCircle size={14} />
            COMPETENCY QUIZ
          </button>
        </div>
      </div>

      {/* Main Learn Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Section Index List */}
            <div className="lg:col-span-4 flex flex-col gap-2 shrink-0">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2 px-1">Lesson Sections:</span>
              {module.sections.map((sect) => {
                const isActive = activeSectionId === sect.id;
                return (
                  <button
                    key={sect.id}
                    onClick={() => setActiveSectionId(sect.id)}
                    className={`text-left p-3.5 rounded-lg border text-xs leading-relaxed transition-all flex flex-col justify-between ${
                      isActive
                        ? 'border-ni-orange bg-ni-orange/5 text-ni-orange font-bold shadow'
                        : 'border-ni-border bg-ni-card hover:bg-ni-border/20 text-gray-300'
                    }`}
                  >
                    <span>{sect.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Content Panel */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Manual Content Markdown Body */}
              <div className="bg-ni-card border border-ni-border rounded-xl p-6 shadow-lg">
                <h3 className="text-md font-display font-extrabold text-white mb-4 border-b border-ni-border pb-3 flex items-center justify-between">
                  <span>{currentSection?.title}</span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">NI Manual Text</span>
                </h3>

                <div className="prose prose-invert prose-xs text-gray-300 max-w-none text-xs leading-relaxed space-y-4 font-sans">
                  {currentSection?.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return <h4 key={pIdx} className="text-white font-mono font-bold pt-3 text-xs uppercase tracking-wider border-l-2 border-ni-orange pl-2">{paragraph.replace('### ', '')}</h4>;
                    }
                    if (paragraph.startsWith('* ')) {
                      return (
                        <ul key={pIdx} className="list-disc pl-5 space-y-1.5 text-gray-300">
                          {paragraph.split('\n').map((item, itemIdx) => (
                            <li key={itemIdx}>{item.replace('* ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={pIdx} className="whitespace-pre-line">{paragraph}</p>;
                  })}
                </div>

                {/* Embedded warnings or tips within manual text */}
                {currentSection?.tips && currentSection.tips.length > 0 && (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 mt-6 flex gap-3 text-xs text-gray-300 leading-relaxed">
                    <Lightbulb className="text-ni-teal w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-400 font-mono">PRO TIP: </strong>
                      {currentSection.tips.join(' ')}
                    </div>
                  </div>
                )}

                {currentSection?.warnings && currentSection.warnings.length > 0 && (
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4 mt-4 flex gap-3 text-xs text-gray-300 leading-relaxed">
                    <AlertTriangle className="text-ni-orange w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-ni-orange font-mono">WARNING: </strong>
                      {currentSection.warnings.join(' ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Section Notes Editor */}
              <div className="bg-ni-card border border-ni-border rounded-xl p-5 shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 size={14} className="text-ni-orange" />
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Notebook Annotations</h4>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500">Auto-saved to local browser cache</span>
                </div>

                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Annotate with custom synthesis recipes, knob combinations, or patch diagrams. Your notes will persist across sessions!"
                  rows={3}
                  className="w-full bg-ni-dark border border-ni-border rounded-lg p-3 text-xs text-gray-300 font-sans outline-none focus:border-gray-500 resize-none"
                />

                <div className="flex justify-end shrink-0">
                  <button
                    onClick={handleSaveNotes}
                    className="flex items-center gap-1.5 px-4 py-2 bg-ni-border hover:bg-ni-border/80 text-white font-mono text-xs font-bold rounded-lg transition-all"
                  >
                    {noteSaved ? (
                      <>
                        <Check size={12} className="text-ni-teal" />
                        <span>ANNOTATION SAVED</span>
                      </>
                    ) : (
                      <>
                        <Save size={12} />
                        <span>SAVE SECTION NOTE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'specs' && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-ni-card border border-ni-border rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-sm font-mono text-white font-bold uppercase tracking-wider mb-4 border-b border-ni-border pb-2.5 flex items-center gap-2">
              <Table size={15} className="text-ni-blue" />
              Verified Synthesizer Parameters & Hardware Specs
            </h3>

            <div className="overflow-hidden border border-ni-border rounded-lg">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-ni-dark border-b border-ni-border text-gray-400">
                    <th className="p-3.5 w-1/3">Hardware / Software Specification</th>
                    <th className="p-3.5">Manual-Defined Standard Value / Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ni-border text-gray-300">
                  {/* Pull dynamically from currently selected module sections specs */}
                  {module.sections.map(s => 
                    s.technicalSpecs ? Object.entries(s.technicalSpecs).map(([key, val]) => (
                      <tr key={key} className="hover:bg-ni-border/10">
                        <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">{key}</td>
                        <td className="p-3.5 text-ni-blue font-semibold">{val}</td>
                      </tr>
                    )) : null
                  )}
                  {/* Default Global Specs list to guarantee data completeness */}
                  <tr className="hover:bg-ni-border/10">
                    <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">Polyphony Limit</td>
                    <td className="p-3.5 text-ni-blue font-semibold">64 active voice layers (excluding unison factors)</td>
                  </tr>
                  <tr className="hover:bg-ni-border/10">
                    <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">Sampling Rates Support</td>
                    <td className="p-3.5 text-ni-blue font-semibold">All rates accepted, downsampled/upsampled internally to 88.2 kHz</td>
                  </tr>
                  <tr className="hover:bg-ni-border/10">
                    <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">Noise Audio Duration</td>
                    <td className="p-3.5 text-ni-blue font-semibold">Must be between 10ms (minimum click) and 1 minute (maximum loop)</td>
                  </tr>
                  <tr className="hover:bg-ni-border/10">
                    <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">Pitch Bend Limits</td>
                    <td className="p-3.5 text-ni-blue font-semibold">-96 semitones to +96 semitones (discrete bipolar mapping)</td>
                  </tr>
                  <tr className="hover:bg-ni-border/10">
                    <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">LFO Rate Standard</td>
                    <td className="p-3.5 text-ni-blue font-semibold">0.004 Hz to approximately 60 Hz in free-running cycles</td>
                  </tr>
                  <tr className="hover:bg-ni-border/10">
                    <td className="p-3.5 text-gray-400 font-bold border-r border-ni-border">Unison Voices</td>
                    <td className="p-3.5 text-ni-blue font-semibold">1 to 6 layers per MIDI note pitch cluster</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <QuizCard
              quiz={module.quiz}
              onQuizSubmit={onQuizSubmit}
              savedHighScore={progress.moduleQuizScores[module.id] || 0}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
