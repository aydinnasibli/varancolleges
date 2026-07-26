"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

// The only tags we intentionally store in question / passage content
const ALLOWED_TAGS = /^(?:u|strong|b|em|i|sup|sub|span|br|ul|ol|li)$/i;

/**
 * Remove MS Word HTML cruft:
 *   1. Strip HTML comment blocks (<!--...-->) which contain Word CSS
 *   2. Strip all HTML tags EXCEPT the safe set we intentionally store,
 *      dropping the attributes (Word styles/classes, event handlers) of the
 *      ones we keep
 *   3. Squeeze the whitespace around list tags so `white-space: pre-wrap`
 *      doesn't render it as blank lines between the items
 */
function sanitizeContent(raw: string): string {
  // Remove HTML comment blocks (Word CSS lives here)
  let s = raw.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (_match, slash: string, tag: string) =>
    ALLOWED_TAGS.test(tag) ? `<${slash}${tag.toLowerCase()}>` : ""
  );
  s = s.replace(/\s*(<\/?(?:ul|ol|li)>)\s*/g, "$1");
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
      className={className ? `math-content ${className}` : "math-content"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
