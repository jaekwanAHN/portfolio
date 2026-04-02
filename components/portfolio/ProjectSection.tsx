type ProjectSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function ProjectSection({ title, children, className }: ProjectSectionProps) {
  return (
    <section
      className={`print-section border-t border-zinc-200 py-8 print:border-zinc-300 print:py-0${className ? ` ${className}` : ""}`}
    >
      <h2 className="print-section-title text-lg font-semibold text-zinc-900 print:text-black">
        {title}
      </h2>
      <div className="mt-4 space-y-6 print-section-children print:mt-0">{children}</div>
    </section>
  );
}
