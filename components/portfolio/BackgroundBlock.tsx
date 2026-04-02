type BackgroundBlockProps = {
  /** 인쇄 시 ‘배경’ 제목과 함께 한 덩어리로 유지할 첫 문단(들) */
  lede: React.ReactNode;
  /** 긴 배경 문단 등 — 중간 분할 허용 */
  children?: React.ReactNode;
};

export function BackgroundBlock({ lede, children }: BackgroundBlockProps) {
  return (
    <div className="print-block print-background-block space-y-3">
      <h3 className="print-subtitle text-base font-semibold text-zinc-900 print:text-black">
        배경
      </h3>
      <div className="print-block-body text-[15px] leading-7 text-zinc-800 print:text-zinc-900">
        <div className="print-avoid-break print-bg-lede">{lede}</div>
        {children ? (
          <div className="print-bg-rest print-allow-break mt-3 space-y-3 print:mt-0 print:space-y-0">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
