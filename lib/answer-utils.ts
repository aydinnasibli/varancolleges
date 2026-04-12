/**
 * Parse a student or admin answer string into a numeric value.
 * Handles: integers, decimals, fractions (a/b), negative values, leading dots (.5).
 * Returns null if the string cannot be parsed as a number.
 */
function parseNumeric(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;

  // Fraction: optional sign, digits, /, digits  e.g. "1/2", "-3/4", "2/1"
  const fractionMatch = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) {
    const num = parseInt(fractionMatch[1], 10);
    const den = parseInt(fractionMatch[2], 10);
    if (den === 0) return null;
    return num / den;
  }

  // Integer or decimal (including ".5" or "-.5")
  const n = parseFloat(s);
  if (!isNaN(n) && isFinite(n)) return n;

  return null;
}

/**
 * Compare a student's free-response answer against the correct answer.
 *
 * Rules (in order):
 * 1. If both can be parsed as numbers → compare within tolerance 0.0001
 *    This means: "0.5" === "1/2", "0.333" ≈ "1/3", "2" === "2/1"
 * 2. Otherwise → case-insensitive, whitespace-trimmed string comparison
 */
export function answersMatch(student: string, correct: string): boolean {
  const sNum = parseNumeric(student);
  const cNum = parseNumeric(correct);

  if (sNum !== null && cNum !== null) {
    return Math.abs(sNum - cNum) < 0.0001;
  }

  // Fallback: string equality (trimmed, lowercase)
  return student.trim().toLowerCase() === correct.trim().toLowerCase();
}
