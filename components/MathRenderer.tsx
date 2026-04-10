"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

function renderMath(content: string): string {
  // Process block math first: $$...$$
  let result = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
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
