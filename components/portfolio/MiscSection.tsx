export function MiscSection() {
  return (
    <section className="print-doc-section print-misc border-t border-zinc-200 py-8 print:border-zinc-300 print:py-0">
      <h2 className="text-lg font-semibold text-zinc-900 print:text-black">
        기타 경험
      </h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-7 text-zinc-800 print:space-y-2 print:text-zinc-900">
        <li>
          잦은 변경이 있던 게시판에 Cypress E2E 테스트를 도입해 주요 CRUD 흐름의
          회귀 확인을 자동화하고 QA 부담을 줄였습니다.
        </li>
        <li>
          공통 컴포넌트인 CheckboxGroup 에서 문자열 includes 사용으로 발생하던
          부분 일치 선택 버그를 발견해, 배열 기반 비교로 수정했습니다.
        </li>
      </ul>
    </section>
  );
}
