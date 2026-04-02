"use client";

import { useCallback, useState } from "react";

type CodeCopyButtonProps = {
  code: string;
};

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className="print:hidden absolute right-2 top-2 rounded border border-white/20 bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-100 transition hover:bg-zinc-700"
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
}
