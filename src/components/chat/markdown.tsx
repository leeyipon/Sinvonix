import { Fragment, type ReactNode } from "react";
import { CodeBlock } from "./code-block";

/**
 * A tiny, safe markdown renderer for the subset the agent produces: paragraphs,
 * unordered lists, **bold**, `inline code`, [links](url) and ```fenced``` code.
 * Everything is rendered as React nodes — no HTML injection.
 */

/* ---- inline: bold / code / links ------------------------------------- */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(INLINE).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-content">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded bg-surface-2 px-1 py-0.5 font-mono text-[0.85em] text-[color:var(--accent-ink)]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target={link[2].startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="font-medium text-[color:var(--accent-ink)] underline underline-offset-2 hover:opacity-80"
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

/* ---- block level ----------------------------------------------------- */

type Block =
  | { type: "code"; code: string; lang?: string }
  | { type: "list"; items: string[] }
  | { type: "p"; lines: string[] };

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  // Split on fenced code first so ``` contents are preserved verbatim.
  const segments = text.split(/```/);

  segments.forEach((segment, idx) => {
    const isCode = idx % 2 === 1;
    if (isCode) {
      const nl = segment.indexOf("\n");
      const firstLine = nl === -1 ? "" : segment.slice(0, nl).trim();
      const body = nl === -1 ? segment : segment.slice(nl + 1);
      blocks.push({ type: "code", code: body.replace(/\n$/, ""), lang: firstLine || undefined });
      return;
    }
    // Non-code: break into paragraphs / lists by blank lines.
    for (const chunk of segment.split(/\n{2,}/)) {
      const lines = chunk.split("\n").filter((l) => l.trim() !== "");
      if (lines.length === 0) continue;
      if (lines.every((l) => /^\s*[-•]\s+/.test(l))) {
        blocks.push({ type: "list", items: lines.map((l) => l.replace(/^\s*[-•]\s+/, "")) });
      } else {
        blocks.push({ type: "p", lines });
      }
    }
  });

  return blocks;
}

export function Markdown({ text }: { text: string }) {
  const blocks = parseBlocks(text);
  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed">
      {blocks.map((block, i) => {
        if (block.type === "code") {
          return <CodeBlock key={i} code={block.code} lang={block.lang} />;
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-electric)]" />
                  <span>{renderInline(item, `${i}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {block.lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(line, `${i}-${j}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
