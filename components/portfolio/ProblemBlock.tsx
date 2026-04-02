type ProblemBlockProps = {
  children: React.ReactNode;
};

export function ProblemBlock({ children }: ProblemBlockProps) {
  return (
    <div className="print-block print-problem-block space-y-3">
      <h3 className="print-subtitle text-base font-semibold text-zinc-900 print:text-black">
        문제
      </h3>
      <div className="print-block-body text-[15px] leading-7 text-zinc-800 print:text-zinc-900">
        {children}
      </div>
    </div>
  );
}
