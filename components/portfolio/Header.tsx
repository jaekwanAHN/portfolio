/** 배포 전 본인 연락처·URL로 수정하세요. (원본 PDF에 항목 없음) */
const PROFILE_LINKS = {
  email: "mailto:ggstork@gmail.com",
  githubLabel: "GitHub",
  githubHref: "https://github.com/jaekwanAHN",
} as const;

export function Header() {
  return (
    <header className="print-doc-header print-avoid-break border-b border-zinc-200 pb-6 print:border-zinc-300 print:pb-4">
      <p className="text-sm text-zinc-500 print:text-zinc-600">포트폴리오</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 print:text-black">
        안재관
      </h1>
      <p className="mt-1 text-sm text-zinc-600 print:text-zinc-800">
        프론트엔드 개발자
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-700 print:text-zinc-800">
        <li>
          <span className="text-zinc-500 print:text-zinc-600">이메일</span>{" "}
          <a
            className="underline decoration-zinc-300 underline-offset-2 print:text-black"
            href={PROFILE_LINKS.email}
          >
            ggstork@gmail.com
          </a>
        </li>
        <li>
          <span className="text-zinc-500 print:text-zinc-600">
            {PROFILE_LINKS.githubLabel}
          </span>{" "}
          <a
            className="underline decoration-zinc-300 underline-offset-2 print:text-black"
            href={PROFILE_LINKS.githubHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {PROFILE_LINKS.githubHref.replace(/^https?:\/\//, "")}
          </a>
        </li>
      </ul>
    </header>
  );
}
