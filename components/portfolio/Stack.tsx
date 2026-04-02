export function Stack() {
  return (
    <section className="break-inside-avoid border-t border-zinc-200 py-8 print:border-zinc-300 print:py-6">
      <h2 className="text-lg font-semibold text-zinc-900 print:text-black">
        기술 스택
      </h2>
      <dl className="mt-4 space-y-3 text-[15px] leading-7 text-zinc-800 print:text-zinc-900">
        <div>
          <dt className="font-medium text-zinc-900 print:text-black">Core</dt>
          <dd>JavaScript, TypeScript, React, Next.js</dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-900 print:text-black">
            Server State
          </dt>
          <dd>TanStack Query</dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-900 print:text-black">UI</dt>
          <dd>HTML, CSS, styled-components, Tailwind CSS</dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-900 print:text-black">
            Test / Tools
          </dt>
          <dd>Cypress, Git, GitHub, GitLab, Jira, Slack</dd>
        </div>
      </dl>
    </section>
  );
}
