/**
 * Single source of truth for where an exam sits relative to its exam day.
 *
 * Three phases, because the rules differ in each:
 *   upcoming — nobody may sit it yet (first-time takers are blocked)
 *   today    — exam day: open, and the on-site password applies
 *   past     — archive paper: open to everyone, no password
 *
 * Two details this gets right that scattered `examDate <= new Date()` checks did not:
 *
 * 1. examDate is a calendar DAY, not an instant. The admin form posts an
 *    <input type="date"> value, and `new Date("2026-08-31")` parses as UTC
 *    midnight — so the day it stands for is read from its UTC parts.
 *
 * 2. "Today" is resolved in the centre's timezone, never the server's.
 *    Production runs in UTC, where an exam dated 31 August would have opened at
 *    04:00 Baku on the 31st and, worse, still counted as "today" until 04:00 on
 *    1 September.
 */
export const EXAM_TIME_ZONE = "Asia/Baku";

export type ExamPhase = "upcoming" | "today" | "past";

// en-CA renders as YYYY-MM-DD, which compares correctly as a plain string
const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: EXAM_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The calendar day an exam date stands for, as YYYY-MM-DD. */
function examDayKey(examDate: Date | string): string {
  return new Date(examDate).toISOString().slice(0, 10);
}

/** Today in the centre's timezone, as YYYY-MM-DD. */
function todayKey(now: Date): string {
  return dayKeyFormatter.format(now);
}

export function getExamPhase(
  examDate: Date | string | null | undefined,
  now: Date = new Date()
): ExamPhase {
  // No date on the record — treat as an always-open archive paper
  if (!examDate) return "past";

  const examDay = examDayKey(examDate);
  const today = todayKey(now);

  if (today < examDay) return "upcoming";
  if (today === examDay) return "today";
  return "past";
}

/** Students may sit the exam from its exam day onward. */
export function isExamOpen(
  examDate: Date | string | null | undefined,
  now: Date = new Date()
): boolean {
  return getExamPhase(examDate, now) !== "upcoming";
}

/**
 * The on-site password gates exam day only. Once the day has passed the paper
 * becomes a freely retakeable archive exam, so the password stops applying even
 * if the admin never clears it.
 */
export function requiresExamPassword(
  examDate: Date | string | null | undefined,
  examPassword: string | null | undefined,
  now: Date = new Date()
): boolean {
  return getExamPhase(examDate, now) === "today" && !!examPassword;
}
