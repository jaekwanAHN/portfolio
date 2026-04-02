type ResultBlockProps = {
  children: React.ReactNode;
};

export function ResultBlock({ children }: ResultBlockProps) {
  return (
    <div className="print-block print-result-block space-y-3">
      <h3 className="print-subtitle text-base font-semibold text-zinc-900 print:text-black">
        결과
      </h3>
      <div className="print-block-body text-[15px] leading-7 text-zinc-800 print:text-zinc-900">
        {children}
      </div>
    </div>
  );
}
