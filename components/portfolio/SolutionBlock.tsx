type SolutionBlockProps = {
  children: React.ReactNode;
};

export function SolutionBlock({ children }: SolutionBlockProps) {
  return (
    <div className="break-inside-avoid space-y-3">
      <h3 className="text-base font-semibold text-zinc-900 print:text-black">해결</h3>
      <div className="text-[15px] leading-7 text-zinc-800 print:text-zinc-900">
        {children}
      </div>
    </div>
  );
}
