type ProjectSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <section className="break-inside-avoid border-t border-zinc-200 py-8 print:border-zinc-300 print:py-6">
      <h2 className="text-lg font-semibold text-zinc-900 print:text-black">
        {title}
      </h2>
      <div className="mt-4 space-y-6">{children}</div>
    </section>
  );
}
