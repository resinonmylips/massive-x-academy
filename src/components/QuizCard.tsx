import React, { useState } from 'react';
import { Check, X, Award, AlertCircle, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface QuizCardProps {
  quiz: QuizQuestion[];
  onQuizSubmit: (score: number) => void;
  savedHighScore: number;
}

export default function QuizCard({ quiz, onQuizSubmit, savedHighScore }: QuizCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowScoreScreen] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentQuestion = quiz[currentIdx];

  const handleOptionSelect = (optionIdx: number) => {
    if (submitted) return;
    setSelectedIdx(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedIdx === null || submitted) return;
    
    const isCorrect = selectedIdx === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setSubmitted(false);

    if (currentIdx + 1 < quiz.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // End of quiz
      const finalPercentage = Math.round((correctAnswersCount / quiz.length) * 100);
      setScore(finalPercentage);
      setShowScoreScreen(true);
      onQuizSubmit(finalPercentage);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setSubmitted(false);
    setCorrectAnswersCount(0);
    setShowScoreScreen(false);
  };

  return (
    <div id="quiz-block" className="bg-ni-card border border-ni-border rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* High score badge ribbon */}
      {savedHighScore > 0 && (
        <div className="absolute top-0 right-0 bg-ni-orange/10 border-l border-b border-ni-border px-3 py-1 text-[10px] font-mono text-ni-orange font-bold uppercase rounded-bl-lg tracking-wider">
          High Score: {savedHighScore}%
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full justify-between"
          >
            {/* Header info */}
            <div>
              <span className="text-[10px] font-mono text-ni-orange font-bold uppercase tracking-wider">
                Module Competency Quiz • Question {currentIdx + 1} of {quiz.length}
              </span>
              <h3 className="text-sm font-sans font-bold text-white mt-1 mb-5 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  let optStyle = 'border-ni-border bg-ni-dark hover:border-gray-500 hover:bg-ni-border/10 text-gray-300';
                  
                  if (selectedIdx === oIdx) {
                    optStyle = 'border-ni-orange bg-ni-orange/5 text-ni-orange font-medium';
                  }

                  if (submitted) {
                    if (oIdx === currentQuestion.correctAnswerIndex) {
                      optStyle = 'border-ni-teal bg-ni-teal/10 text-ni-teal font-medium';
                    } else if (selectedIdx === oIdx) {
                      optStyle = 'border-red-500 bg-red-500/10 text-red-400';
                    } else {
                      optStyle = 'border-ni-border bg-ni-dark opacity-40 text-gray-500';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      onClick={() => handleOptionSelect(oIdx)}
                      className={`w-full text-left text-xs font-sans rounded-lg border p-3.5 transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <span>{opt}</span>
                      <div className="shrink-0">
                        {submitted && oIdx === currentQuestion.correctAnswerIndex && (
                          <Check size={14} className="text-ni-teal" />
                        )}
                        {submitted && selectedIdx === oIdx && oIdx !== currentQuestion.correctAnswerIndex && (
                          <X size={14} className="text-red-400" />
                        )}
                        {!submitted && selectedIdx === oIdx && (
                          <div className="w-2.5 h-2.5 rounded-full bg-ni-orange" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation / Footer */}
            <div className="mt-6 border-t border-ni-border/60 pt-4">
              <AnimatePresence>
                {submittedState(selectedOutputStatus(selectedOutputState(submitted))) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-ni-dark/40 border border-ni-border/50 rounded-lg p-3 text-xs text-gray-300 mb-4 flex items-start gap-2.5 leading-relaxed"
                  >
                    {selectedIdx === currentQuestion.correctAnswerIndex ? (
                      <Check size={16} className="text-ni-teal shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold font-mono text-gray-200">
                        {selectedIdx === currentQuestion.correctAnswerIndex ? 'CORRECT! ' : 'INCORRECT. '}
                      </span>
                      {currentQuestion.explanation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                {!submitted ? (
                  <button
                    disabled={selectedIdx === null}
                    onClick={handleSubmitAnswer}
                    className="px-5 py-2.5 bg-ni-orange hover:bg-ni-orange/90 text-ni-dark disabled:bg-ni-border disabled:text-gray-500 font-mono text-xs font-bold rounded-lg transition-all"
                  >
                    SUBMIT ANSWER
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-ni-orange/20 border border-ni-orange/30 hover:bg-ni-orange/30 text-ni-orange font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                  >
                    {currentIdx + 1 < quiz.length ? 'NEXT QUESTION' : 'VIEW SCORE'}
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="score-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 flex flex-col items-center justify-center"
          >
            <div className="w-14 h-14 bg-ni-orange/10 border border-ni-orange/20 rounded-full flex items-center justify-center mb-4 text-ni-orange shadow-lg">
              <Award size={32} />
            </div>

            <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
              {score >= 80 ? 'Mastery Unlocked!' : 'Practice Needed'}
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              {score >= 80 
                ? 'Excellent synthesis comprehension! You have scored a high competency level for this module.' 
                : 'Keep practicing! Review the technical parameters of this chapter and retry.'}
            </p>

            <div className="my-6">
              <span className="text-5xl font-mono font-extrabold text-ni-orange tracking-tighter">
                {score}%
              </span>
              <span className="block text-[10px] font-mono text-gray-500 mt-2 uppercase tracking-widest">
                ({correctAnswersCount} OF {quiz.length} QUESTIONS CORRECT)
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2 bg-ni-border hover:bg-ni-border/80 text-gray-300 font-mono text-xs font-bold rounded-lg transition-all"
              >
                RETRY QUIZ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function submittedState(isSubmitted: boolean) {
  return isSubmitted;
}
function selectedOutputStatus(isSubmitted: boolean) {
  return isSubmitted;
}
function selectedOutputState(isSubmitted: boolean) {
  return isSubmitted;
}
