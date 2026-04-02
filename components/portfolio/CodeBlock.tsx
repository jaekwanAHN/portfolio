import { codeToHtml } from "shiki";
import { CodeCopyButton } from "./CodeCopyButton";

type CodeBlockProps = {
  code: string;
  language: "typescript" | "tsx";
};

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang: language,
    theme: "github-dark",
  });

  return (
    <figure className="relative my-5 break-inside-avoid rounded-lg border border-zinc-200 bg-zinc-950 print:border-zinc-300">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs font-medium text-zinc-400">
        <span className="font-mono">{language}</span>
      </figcaption>
      <CodeCopyButton code={code.trim()} />
      <div
        className="shiki-root overflow-x-auto p-3 font-mono text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
