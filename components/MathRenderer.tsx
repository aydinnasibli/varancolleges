"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Remove MS Word HTML cruft:
 *   1. Strip HTML comment blocks (<!--...-->) which contain Word CSS
 *   2. Strip all HTML tags EXCEPT the safe inline set we intentionally store
 */
function sanitizeContent(raw: string): string {
  // Remove HTML comment blocks (Word CSS lives here)
  let s = raw.replace(/<!--[\s\S]*?-->/g, "");
  // Remove any tag that isn't one of our allowed inline tags or a KaTeX span
  // We keep: <u>, <strong>, <b>, <em>, <i>, <span class="katex...">
  s = s.replace(/<\/?(?!u|strong|b|em|i|span|br)([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?\/?>/gi, "");
  return s.trim();
}

function renderMath(content: string): string {
  const cleaned = sanitizeContent(content);
  // Process block math first: $$...$$
  let result = cleaned.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `$$${math}$$`;
    }
  });

  // Then process inline math: $...$
  result = result.replace(/\$([^$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return `$${math}$`;
    }
  });

  return result;
}

interface MathRendererProps {
  content: string;
  className?: string;
}

export default function MathRenderer({ content, className }: MathRendererProps) {
  const html = renderMath(content);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
