"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Styled code block with lightweight, dependency-free token highlighting for
 * common languages, plus copy-to-clipboard. Highlighting is deliberately
 * coarse — enough to read, not a full grammar.
 */

const KEYWORDS =
  /\b(const|let|var|function|return|if|else|for|while|import|from|export|default|async|await|class|new|type|interface|extends|public|private|void|null|undefined|true|false|def|end|then|do|module|require|print|self|None|True|False)\b/g;

function highlight(code: string): string {
  // Escape first so we never inject raw HTML from user/agent text.
  const esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return esc
    .replace(/(&quot;|&#39;|"[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="tok-str">$1</span>')
    .replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="tok-com">$1</span>')
    .replace(KEYWORDS, '<span class="tok-kw">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
}

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="group relative my-2 overflow-hidden rounded-xl border border-line bg-surface-2/70">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-faint">
          {lang || "code"}
        </span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="flex cursor-pointer items-center gap-1 text-[11px] text-faint transition-colors hover:text-content"
        >
          {copied ? <Check className="h-3 w-3 text-emerald" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={cn("overflow-x-auto px-3 py-2.5 text-[12.5px] leading-relaxed")}>
        <code
          className="font-mono [&_.tok-com]:text-faint [&_.tok-com]:italic [&_.tok-kw]:text-[color:var(--color-purple)] [&_.tok-num]:text-[color:var(--color-cyan)] [&_.tok-str]:text-emerald"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </pre>
    </div>
  );
}
