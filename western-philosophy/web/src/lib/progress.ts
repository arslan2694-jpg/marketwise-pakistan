"use client";

import { useSyncExternalStore } from "react";

// Local-first learner profile. Everything lives in localStorage under one
// key so it's trivial to export/import/reset. No network calls, no accounts.

const STORAGE_KEY = "wp-progress-v1";

export interface QuizAttempt {
  chapterId: string;
  timestamp: number;
  score: number; // 0-1
  total: number;
  correct: number;
  missedConcepts: string[];
}

export interface FlashcardState {
  // simple SM-2-lite: box 0-5, higher = more confident, due date in ms epoch
  box: number;
  dueAt: number;
  lastReviewed: number;
}

export interface Note {
  id: string;
  chapterId: string;
  text: string;
  createdAt: number;
  sourcePage?: number;
}

export interface ProgressState {
  completedChapters: Record<string, boolean>;
  completedLessons: Record<string, string[]>; // chapterId -> lesson keys completed
  bookmarks: Record<string, boolean>; // chapterId -> bookmarked
  notes: Note[];
  quizAttempts: QuizAttempt[];
  flashcards: Record<string, FlashcardState>; // flashcard key -> state
  readingSeconds: number;
  streakDays: string[]; // ISO date strings (yyyy-mm-dd) the learner was active
  lastVisitedChapter?: string;
  confidence: Record<string, 1 | 2 | 3 | 4 | 5>; // conceptOrChapterKey -> self-rated confidence
}

function emptyState(): ProgressState {
  return {
    completedChapters: {},
    completedLessons: {},
    bookmarks: {},
    notes: [],
    quizAttempts: [],
    flashcards: {},
    readingSeconds: 0,
    streakDays: [],
    confidence: {},
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable; fail silently, it's non-critical
  }
  emitProgressChange();
}

// --- useSyncExternalStore plumbing, so components can read progress
// reactively without the effect+setState hydration anti-pattern. ---

type Listener = () => void;
let listeners: Listener[] = [];

function emitProgressChange() {
  for (const l of listeners) l();
}

function subscribeToProgress(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

let cachedSnapshot: ProgressState = emptyState();
let cachedRaw = "";

function getProgressSnapshot(): ProgressState {
  if (typeof window === "undefined") return cachedSnapshot;
  let raw = "";
  try {
    raw = localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    raw = "";
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = loadProgress();
  }
  return cachedSnapshot;
}

function getProgressServerSnapshot(): ProgressState {
  return emptyState();
}

/** Reactive read of the full progress state; re-renders on any saveProgress() call (including from other components) and is SSR/hydration-safe. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribeToProgress, getProgressSnapshot, getProgressServerSnapshot);
}

export function recordVisit(chapterId: string) {
  const s = loadProgress();
  s.lastVisitedChapter = chapterId;
  const today = new Date().toISOString().slice(0, 10);
  if (!s.streakDays.includes(today)) s.streakDays.push(today);
  saveProgress(s);
}

export function markChapterComplete(chapterId: string, complete = true) {
  const s = loadProgress();
  s.completedChapters[chapterId] = complete;
  saveProgress(s);
  return s;
}

export function toggleBookmark(chapterId: string) {
  const s = loadProgress();
  s.bookmarks[chapterId] = !s.bookmarks[chapterId];
  saveProgress(s);
  return s;
}

export function markLessonComplete(chapterId: string, lessonKey: string) {
  const s = loadProgress();
  const list = s.completedLessons[chapterId] ?? [];
  if (!list.includes(lessonKey)) list.push(lessonKey);
  s.completedLessons[chapterId] = list;
  saveProgress(s);
  return s;
}

export function addNote(chapterId: string, text: string, sourcePage?: number) {
  const s = loadProgress();
  s.notes.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    chapterId,
    text,
    createdAt: Date.now(),
    sourcePage,
  });
  saveProgress(s);
  return s;
}

export function deleteNote(noteId: string) {
  const s = loadProgress();
  s.notes = s.notes.filter((n) => n.id !== noteId);
  saveProgress(s);
  return s;
}

export function recordQuizAttempt(attempt: QuizAttempt) {
  const s = loadProgress();
  s.quizAttempts.push(attempt);
  saveProgress(s);
  return s;
}

// Very small spaced-repetition schedule (SM-2 simplified to 6 boxes).
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];

export function reviewFlashcard(cardKey: string, remembered: boolean) {
  const s = loadProgress();
  const prev = s.flashcards[cardKey] ?? { box: 0, dueAt: 0, lastReviewed: 0 };
  const nextBox = remembered ? Math.min(prev.box + 1, BOX_INTERVAL_DAYS.length - 1) : 0;
  const days = BOX_INTERVAL_DAYS[nextBox];
  s.flashcards[cardKey] = {
    box: nextBox,
    dueAt: Date.now() + days * 24 * 60 * 60 * 1000,
    lastReviewed: Date.now(),
  };
  saveProgress(s);
  return s;
}

export function dueFlashcardKeys(allKeys: string[]): string[] {
  const s = loadProgress();
  const now = Date.now();
  return allKeys.filter((k) => {
    const st = s.flashcards[k];
    return !st || st.dueAt <= now;
  });
}

export function setConfidence(key: string, level: 1 | 2 | 3 | 4 | 5) {
  const s = loadProgress();
  s.confidence[key] = level;
  saveProgress(s);
  return s;
}

export function exportProgress(): string {
  return JSON.stringify(loadProgress(), null, 2);
}

export function importProgress(json: string) {
  const parsed = JSON.parse(json);
  saveProgress({ ...emptyState(), ...parsed });
}

export function resetProgress() {
  saveProgress(emptyState());
}
