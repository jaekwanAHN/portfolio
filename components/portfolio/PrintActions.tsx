"use client";

export function PrintActions() {
  return (
    <div className="print:hidden fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-md transition hover:bg-zinc-50"
      >
        PDF / 인쇄
      </button>
    </div>
  );
}
