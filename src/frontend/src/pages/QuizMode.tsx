import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Star, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";
import { quizData } from "../data/quizData";

export default function QuizMode() {
  const { user, setUser, activeTopic, setPage, setXpFlash, addMessage } =
    useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = quizData[activeTopic] ?? quizData["Data Structures"];
  const question = questions[currentQ];
  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowFeedback(true);
    const correct = idx === question.correct;
    if (correct) {
      const xp = question.xp;
      setScore((s) => s + 1);
      setEarnedXP((e) => e + xp);
      setXpFlash(xp);
      setTimeout(() => setXpFlash(null), 1500);
      addMessage({
        role: "companion",
        text: preset.correctAnswerResponses[
          Math.floor(Math.random() * preset.correctAnswerResponses.length)
        ],
      });
    } else {
      addMessage({
        role: "companion",
        text: preset.wrongAnswerResponses[
          Math.floor(Math.random() * preset.wrongAnswerResponses.length)
        ],
      });
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      setUser({ xp: user.xp + earnedXP });
      if (earnedXP >= 30) {
        const badge = `${activeTopic} Master 🏆`;
        if (!user.badges.includes(badge)) {
          setUser({ badges: [...user.badges, badge] });
        }
      }
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowFeedback(false);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-card-hover"
          data-ocid="quiz.success_state"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-foreground mb-2">
            Quiz Complete! 🎉
          </h2>
          <p className="text-muted-foreground mb-6">
            {activeTopic} · {score}/{questions.length} correct
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted rounded-2xl p-4">
              <div className="text-3xl font-bold text-primary">
                {score}/{questions.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Correct Answers
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-4">
              <div className="text-3xl font-bold text-yellow-500">
                +{earnedXP}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                XP Earned
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 mb-6">
            {questions.map((q, i) => (
              <Star
                key={q.q}
                className={`w-6 h-6 ${
                  i < score
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-100"
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-foreground bg-muted rounded-2xl p-3 mb-6">
            {
              preset.encouragements[
                Math.floor(Math.random() * preset.encouragements.length)
              ]
            }
          </p>

          <Button
            data-ocid="quiz.back_to_study.button"
            onClick={() => setPage("study")}
            className="w-full rounded-full h-12 font-bold bg-primary text-primary-foreground"
          >
            Back to Study 💕
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            data-ocid="quiz.back.button"
            variant="ghost"
            onClick={() => setPage("study")}
            className="text-white hover:bg-white/20 rounded-full"
          >
            ← Back
          </Button>
          <span className="text-white font-semibold">
            Question {currentQ + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-1 text-yellow-300 font-bold">
            <Trophy className="w-4 h-4" />
            {earnedXP} XP
          </div>
        </div>

        <Progress
          value={((currentQ + (answered ? 1 : 0)) / questions.length) * 100}
          className="h-2 rounded-full mb-6 bg-white/30"
        />

        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 shadow-card-hover"
        >
          {/* Topic badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-muted px-3 py-1 rounded-full">
              {activeTopic}
            </span>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6 leading-snug">
            {question.q}
          </h2>

          <div className="space-y-3" data-ocid="quiz.options.list">
            {question.options.map((opt, i) => {
              let className =
                "w-full text-left rounded-2xl p-4 border-2 font-medium transition-all duration-200 ";
              if (!answered) {
                className +=
                  "border-border hover:border-primary hover:bg-muted cursor-pointer";
              } else if (i === question.correct) {
                className += "border-green-400 bg-green-50 text-green-700";
              } else if (i === selected && i !== question.correct) {
                className += "border-red-400 bg-red-50 text-red-600";
              } else {
                className += "border-border opacity-50";
              }
              return (
                <button
                  type="button"
                  key={opt}
                  data-ocid={`quiz.option.${i + 1}`}
                  className={className}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-2xl flex items-start gap-3 ${
                  selected === question.correct
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
                data-ocid={
                  selected === question.correct
                    ? "quiz.correct.success_state"
                    : "quiz.wrong.error_state"
                }
              >
                <img
                  src={preset.image}
                  alt="companion"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <p className="text-sm text-foreground">
                  {selected === question.correct
                    ? preset.correctAnswerResponses[
                        Math.floor(
                          Math.random() * preset.correctAnswerResponses.length,
                        )
                      ]
                    : preset.wrongAnswerResponses[
                        Math.floor(
                          Math.random() * preset.wrongAnswerResponses.length,
                        )
                      ]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {answered && (
            <Button
              data-ocid="quiz.next.button"
              onClick={handleNext}
              className="w-full mt-6 rounded-full h-12 font-bold bg-primary text-primary-foreground"
            >
              {currentQ + 1 >= questions.length
                ? "See Results 🎉"
                : "Next Question"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
