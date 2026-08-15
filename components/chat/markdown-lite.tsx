import { Fragment } from "react";

/** Minimal inline markdown: **bold** and [text](url) links. No new dependency for a feature this small. */
function renderInline(text: string, keyPrefix: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return tokens.map((token, i) => {
    const boldMatch = token.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold">
          {boldMatch[1]}
        </strong>
      );
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={`${keyPrefix}-${i}`}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
          className="underline decoration-blue/40 underline-offset-2 hover:decoration-blue"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{token}</Fragment>;
  });
}

/** Renders paragraphs and "- " bullet lists. Not a full markdown engine, matches what the model is instructed to produce. */
export function MarkdownLite({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l.trim()));

        if (isList) {
          return (
            <ul key={blockIndex} className="my-1.5 list-disc space-y-1 pl-5">
              {lines.map((line, i) => (
                <li key={i}>{renderInline(line.trim().replace(/^[-*]\s+/, ""), `${blockIndex}-${i}`)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={blockIndex} className={blockIndex > 0 ? "mt-2" : undefined}>
            {block.split("\n").map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {renderInline(line, `${blockIndex}-${i}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
