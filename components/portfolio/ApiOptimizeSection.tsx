import { BackgroundBlock } from "@/components/portfolio/BackgroundBlock";
import { CodeBlock } from "@/components/portfolio/CodeBlock";
import { ProblemBlock } from "@/components/portfolio/ProblemBlock";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { ResultBlock } from "@/components/portfolio/ResultBlock";
import { SolutionBlock } from "@/components/portfolio/SolutionBlock";

const CODE_QUERY_KEY = `// Before
['queries']
invalidateQueries(['queries'])
// After
// mutation 이후 전체 캐시가 아닌 댓글 관련 캐시만 무효화하도록 조정
['queries', 'board', 'detail', id, 'comment']
invalidateQueries(['queries', 'board', 'detail', id, 'comment'])`;

export function ApiOptimizeSection() {
  return (
    <ProjectSection title="API 호출 최적화 (TanStack Query)">
      <BackgroundBlock
        lede={
          <p>
            문의 게시판에서는 게시글·댓글 목록 조회, 게시글·댓글 등록/수정/삭제 등 여러
            응답 데이터를 함께 다루고 있었습니다. 이 과정에서 TanStack Query를 활용해
            데이터를 관리했지만, mutation 이후 어떤 범위의 캐시를 갱신할지에 대한
            기준이 명확하지 않았습니다.
          </p>
        }
      />

      <ProblemBlock>
        <div className="print-problem-item print-allow-break">
          <p>
            초기에는 대부분의 QueryKey가 [&apos;queries&apos;] 를 공통 prefix로만
            사용하고 있었고, 기능별로 세부 규칙 없이 작성되어 있었습니다. 그 결과
            댓글 등록이나 수정처럼 일부 데이터만 변경되는 상황에서도
            invalidateQueries([&apos;queries&apos;]) 와 같이 넓은 범위의 무효화가
            발생했고, 관련 없는 데이터까지 다시 요청되는 문제가 있었습니다.
          </p>
          <p className="mt-3">이로 인해:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>불필요한 API 재호출이 발생했고</li>
            <li>영향을 받지 않아도 되는 컴포넌트까지 함께 갱신되었으며</li>
            <li>화면이 복잡해질수록 네트워크 비용과 유지보수 부담이 커졌습니다.</li>
          </ul>
        </div>
      </ProblemBlock>

      <SolutionBlock>
        <div className="print-solution-item">
          <div className="print-explanation-code">
            <p>
              QueryKey를 도메인과 데이터 성격 기준으로 다시 설계했습니다. 단순히 공통
              prefix 아래 나열하는 방식이 아니라, 도메인과 조회 맥락, 식별자, 연관
              데이터를 기준으로 QueryKey를 계층화했습니다. 예를 들어 board 는 게시판
              도메인, detail 은 상세 조회 맥락, id 는 게시글 식별자, comment 는 댓글
              데이터로 구분해 필요한 데이터만 선택적으로 갱신할 수 있도록 구조를
              정리했습니다.
            </p>
            <CodeBlock code={CODE_QUERY_KEY} language="typescript" />
          </div>
          <p className="mt-2">
            또한 mutation 이후에는 모든 쿼리를 일괄 무효화하지 않고, onSuccess 에서
            실제로 변경된 데이터에만 invalidateQueries 또는 필요한 갱신 로직을
            적용하도록 수정했습니다. 이를 통해 댓글 변경 시 게시글 상세 전체를 다시
            불러오는 대신, 댓글 관련 데이터만 갱신하는 식으로 범위를 축소했습니다.
          </p>
        </div>
      </SolutionBlock>

      <ResultBlock>
        <p>
          댓글 등록/수정 시 관련 댓글 데이터만 선택적으로 갱신하도록 바꾸면서
          불필요한 재요청을 줄였고, DataDog 기준 API 호출 건수를 기존 대비 약 50%로
          감소시켰습니다.
        </p>
        <p className="mt-2">
          QueryKey 규칙을 도메인별로 표준화해 이후 다른 화면에서도 동일한 기준으로
          캐시 무효화 범위를 설계할 수 있게 했습니다.
        </p>
      </ResultBlock>
    </ProjectSection>
  );
}
