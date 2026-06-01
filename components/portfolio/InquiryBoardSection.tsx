import { BackgroundBlock } from "@/components/portfolio/BackgroundBlock";
import { CodeBlock } from "@/components/portfolio/CodeBlock";
import { ProblemBlock } from "@/components/portfolio/ProblemBlock";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { ResultBlock } from "@/components/portfolio/ResultBlock";
import { SolutionBlock } from "@/components/portfolio/SolutionBlock";

const CODE_INQUIRY_ROUTER = `useEffect(() => {
  router.replace(
    { query: { ...payload } },
    undefined,
    { shallow: true } // SSR 재호출 없이 URL만 업데이트
  );
}, [payload]);`;

const CODE_INQUIRY_STATE = `// 초기 진입 시 URL 쿼리를 payload에 병합해 상태 복원
const [payload, setPayload] = useState<IInquiryPayload>({
  startDate: oneMonthAgo,
  endDate: today,
  ...router.query, // URL 쿼리로 초기 상태 복원
  assignedToSrl: Number(router.query.assignedToSrl) || undefined,
});`;

const CODE_USE_BOARD = `// useBoard 훅 내부에서 역할별 분기를 일괄 결정
const isRegist = ['SELLERS', 'COMPANY_A', 'COMPANY_B',...].includes(companyType);
const isHowser = companyType === 'HOWSER';
// UI 컴포넌트에서는 결과값만 참조
{isRegist && <Button>문의하기</Button>}
{isHowser && <CompanySearch />}`;

export function InquiryBoardSection() {
  return (
    <ProjectSection title="문의 게시판 페이지 개발">
      <BackgroundBlock
        lede={
          <p>사업체 문의를 관리하는 신규 페이지를 Next.js 기반으로 개발했습니다.</p>
        }
      >
        <p>
          이 페이지는 키워드, 회사, 문의유형, 담당부서, 처리상태, 기간 등 복수의
          필터를 제공하는 검색 중심 목록 페이지였습니다. 사업자와 내부 담당자 등
          서로 다른 역할의 사용자가 같은 화면을 함께 사용하는 구조였기 때문에,
          필터 상태의 일관성과 역할별 기능 분기의 유지보수성이 핵심 과제였습니다.
        </p>
      </BackgroundBlock>

      <ProblemBlock>
        <div className="print-problem-item print-avoid-break">
          <p className="font-medium text-zinc-900 print:text-black">
            1. 새로고침·URL 공유 시 필터 상태 초기화
          </p>
          <p className="mt-2">
            복수의 필터를 제공하면서, 새로고침이나 URL 공유 시 검색 조건이 초기화되는
            문제가 있었습니다. 운영 담당자 간 특정 문의 목록을 공유하거나 재현해야
            하는 상황에서 불편함이 컸습니다.
          </p>
        </div>
        <div className="print-problem-item print-avoid-break">
          <p className="font-medium text-zinc-900 print:text-black">
            2. 역할별 UI 분기 복잡도
          </p>
          <p className="mt-2">
            사업자·내부 담당자 등 역할에 따라 노출해야 하는 버튼·필터·옵션이
            달랐습니다. 분기 조건이 여러 컴포넌트에 흩어질 경우 역할이 추가되거나
            조건이 변경될 때 수정 범위가 불명확해지는 문제가 있었습니다.
          </p>
        </div>
      </ProblemBlock>

      <SolutionBlock>
        <div className="print-solution-item">
          <p className="font-medium text-zinc-900 print:text-black">
            1. 단일 payload 모델 + URL 쿼리 동기화
          </p>
          <p className="mt-2">
            복수 필터를 IInquiryPayload 단일 모델로 통합 관리하고, useEffect 와{" "}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[13px] print:bg-zinc-50">
              {'router.replace({ shallow: true })'}
            </code>
            를 조합해 필터 상태 변경 시 URL 쿼리를 즉시 반영했습니다.
          </p>
          <div className="print-explanation-code mt-2">
            <p>
              shallow: true 옵션을 사용해 필터 변경 시 SSR 재호출과 페이지 리마운트
              없이 URL만 업데이트되도록 했습니다.
            </p>
            <CodeBlock code={CODE_INQUIRY_ROUTER} language="tsx" />
          </div>
          <div className="print-explanation-code mt-2">
            <p>
              초기 진입 시에는 router.query 를 payload에 병합해 URL 기반으로 필터
              상태를 복원했습니다.
            </p>
            <CodeBlock code={CODE_INQUIRY_STATE} language="tsx" />
          </div>
        </div>

        <div className="print-solution-item">
          <p className="mt-6 font-medium text-zinc-900 print:text-black print:mt-0">
            2. companyType 기반 역할별 UI 분기를 훅 내부로 집중
          </p>
          <div className="print-explanation-code mt-2">
            <p>
              getMe() 기반 companyType 을 useBoard 훅 내부에서 받아 버튼·필터·옵션
              노출 여부를 한 곳에서 일괄 결정하고, UI 컴포넌트는 결과값만 의존하도록
              구성했습니다.
            </p>
            <CodeBlock code={CODE_USE_BOARD} language="tsx" />
          </div>
          <p className="mt-2">
            역할별 분기 조건이 훅 내부에 집중되어, 역할이 추가되거나 노출 조건이
            변경될 때 수정 범위가 useBoard 훅으로 한정됩니다.
          </p>
        </div>
      </SolutionBlock>

      <ResultBlock>
        <p>
          URL 기반으로 필터 상태를 복원할 수 있게 해 새로고침이나 링크 공유 시에도
          동일한 문의 목록을 재현할 수 있게 했습니다.
        </p>
        <p className="mt-2">
          역할별 분기 로직을 훅 내부로 모아 UI 컴포넌트는 노출 결과만 참조하도록
          단순화했고, 역할 추가나 조건 변경 시 수정 범위를 useBoard 훅으로
          좁혔습니다.
        </p>
      </ResultBlock>
    </ProjectSection>
  );
}
