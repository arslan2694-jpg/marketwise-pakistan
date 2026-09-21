"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { recordQuizAttempt } from "@/lib/progress";

export default function QuizRunner({
  chapterId,
  questions,
  title,
}: {
  chapterId: string;
  questions: QuizQuestion[];
  title?: string;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (questions.length === 0) {
    return <p className="text-[13.5px] text-ink-3">No quiz questions available yet.</p>;
  }

  function submit() {
    let correct = 0;
    const missed: string[] = [];
    questions.forEach((q, i) => {
      const given = answers[i];
      const isRight =
        q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school"
          ? given === String(q.correct_index)
          : given?.trim().toLowerCase() === (q.correct_answer ?? "").trim().toLowerCase();
      if (isRight) correct += 1;
      else if (q.related_concept) missed.push(q.related_concept);
    });
    recordQuizAttempt({
      chapterId,
      timestamp: Date.now(),
      score: correct / questions.length,
      total: questions.length,
      correct,
      missedConcepts: missed,
    });
    setSubmitted(true);
  }

  const score = submitted
    ? questions.reduce((acc, q, i) => {
        const given = answers[i];
        const isRight =
          q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school"
            ? given === String(q.correct_index)
            : given?.trim().toLowerCase() === (q.correct_answer ?? "").trim().toLowerCase();
        return acc + (isRight ? 1 : 0);
      }, 0)
    : 0;

  return (
    <div className="space-y-5">
      {title && <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>}
      {submitted && (
        <div className="rounded-md border border-line bg-surface-2 px-4 py-3 text-[14px] font-medium text-ink">
          Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
        </div>
      )}
      {questions.map((q, i) => {
        const given = answers[i];
        const isMC =
          q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school";
        const correctIdx = q.correct_index;
        return (
          <div key={i} className="rounded-md border border-line bg-surface p-4">
            <div className="mb-2 flex items-center gap-2 text-[11px] text-ink-3">
              <span className="rounded bg-surface-2 px-1.5 py-0.5 uppercase tracking-wide">
                {q.difficulty}
              </span>
              <span className="uppercase tracking-wide">{q.type.replace(/_/g, " ")}</span>
              {q.source_page && <span>· p.{q.source_page}</span>}
            </div>
            <p className="mb-3 text-[14px] text-ink">{q.prompt}</p>
            {isMC && q.options ? (
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const chosen = given === String(oi);
                  const showCorrect = submitted && oi === correctIdx;
                  const showWrong = submitted && chosen && oi !== correctIdx;
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: String(oi) }))}
                      className={`block w-full rounded-md border px-3 py-2 text-left text-[13.5px] transition-colors ${
                        showCorrect
                          ? "border-ok bg-ok/10 text-ink"
                          : showWrong
                            ? "border-bad bg-bad/10 text-ink"
                            : chosen
                              ? "border-brand bg-brand-soft text-ink"
                              : "border-line text-ink-2 hover:bg-surface-2"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <input
                disabled={submitted}
                value={given ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                placeholder="Your answer…"
                className="w-full rounded-md border border-line bg-page px-3 py-2 text-[13.5px] focus:outline-none focus:ring-1 focus:ring-brand"
              />
            )}
            {submitted && (
              <p className="mt-2.5 border-t border-line pt-2.5 text-[12.5px] text-ink-3">
                <span className="font-medium text-ink-2">Explanation: </span>
                {q.explanation}
                {!isMC && q.correct_answer && (
                  <>
                    {" "}
                    <span className="font-medium text-ink-2">Model answer:</span> {q.correct_answer}
                  </>
                )}
              </p>
            )}
          </div>
        );
      })}
      {!submitted && (
        <button
          onClick={submit}
          className="rounded-md bg-brand px-4 py-2 text-[13.5px] font-medium text-white hover:bg-brand-strong"
        >
          Submit answers
        </button>
      )}
      {submitted && (
        <button
          onClick={() => {
            setSubmitted(false);
            setAnswers({});
          }}
          className="rounded-md border border-line px-4 py-2 text-[13.5px] text-ink-2 hover:bg-surface-2"
        >
          Retake
        </button>
      )}
    </div>
  );
}
