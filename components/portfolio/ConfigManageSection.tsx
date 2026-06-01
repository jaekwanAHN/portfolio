import { BackgroundBlock } from "@/components/portfolio/BackgroundBlock";
import { CodeBlock } from "@/components/portfolio/CodeBlock";
import { ProblemBlock } from "@/components/portfolio/ProblemBlock";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { ResultBlock } from "@/components/portfolio/ResultBlock";
import { SolutionBlock } from "@/components/portfolio/SolutionBlock";

const CODE_CONFIG_PREFETCH = `// getServerSideProps
const queryClient = new QueryClient();
await newPrefetchAll(queryClient, {
  // 여러 API를 병렬로 prefetch하는 내부 유틸 함수
  '/api/happycall/self/config/global': ['selfConfigGlobal'],
  '/api/happycall/self/center/status': ['getCenterStatus'],
});
return { props: { dehydratedState: dehydrate(queryClient) } };`;

const CODE_VIEWMODEL = `// ViewModel 생성 함수 — 도메인 데이터를 테이블/리스트용 형태로 변환
const tableData = createSelfConfigVerticalTableData(globalConfigData);
const logList = createConfigLogList(configLogs);`;

export function ConfigManageSection() {
  return (
    <ProjectSection title="설정 관리 페이지 개발">
      <BackgroundBlock
        lede={
          <p>
            셀프해피콜 설정을 관리하는 신규 페이지를 Next.js 기반으로 개발했습니다.
          </p>
        }
      >
        <>
          <p>
            이 페이지는 전역 사용 여부, 센터별 시공 유형별 설정, 희망일 있는 의뢰의
            최대 수량 및 예외일 관리, 최근 1개월 변경 이력 조회를 하나의 화면에서
            처리하는 복수 설정 도메인 통합 페이지였습니다.
          </p>
          <p>
            운영에 직접 영향을 주는 민감한 설정을 다루는 페이지였기 때문에, 잘못된
            설정 저장을 방지하는 안전한 편집 흐름과 여러 설정 도메인을 한 화면에서
            관리하면서도 유지보수 가능한 구조가 핵심 과제였습니다.
          </p>
        </>
      </BackgroundBlock>

      <ProblemBlock>
        <div className="print-problem-item print-avoid-break">
          <p className="font-medium text-zinc-900 print:text-black">
            1. 복수 설정 도메인의 상태·로직 혼재 위험
          </p>
          <p className="mt-2">
            전역 설정, 센터별 설정, 예외일, 변경 이력이 각각 다른 API와 UI 패턴을
            가져 하나의 컴포넌트에서 처리할 경우 상태와 로직이 쉽게 뒤섞일 수
            있었습니다.
          </p>
        </div>
        <div className="print-problem-item print-avoid-break">
          <p className="font-medium text-zinc-900 print:text-black">
            2. 민감한 설정의 실수 저장 방지 필요
          </p>
          <p className="mt-2">
            전역 on/off, 센터별 사용 여부처럼 운영에 즉각적인 영향을 주는 설정에서
            사용자의 실수 저장을 방지할 필요가 있었습니다. 동시에 취소 시에는 변경
            전 상태로 정확히 복원되어야 했습니다.
          </p>
        </div>
        <div className="print-problem-item print-avoid-break">
          <p className="font-medium text-zinc-900 print:text-black">
            3. 초기 로딩 시 데이터 지연
          </p>
          <p className="mt-2">
            여러 설정 API를 클라이언트에서 순차 호출할 경우, 초기 진입 시 데이터
            로딩 지연과 화면 깜빡임이 발생할 수 있었습니다.
          </p>
        </div>
      </ProblemBlock>

      <SolutionBlock>
        <div className="print-solution-item">
          <p className="font-medium text-zinc-900 print:text-black">
            1. SSR + TanStack Query prefetch 기반 초기 데이터 패칭
          </p>
          <div className="print-explanation-code mt-2">
            <p>
              getServerSideProps 에서 QueryClient 를 생성하고 주요 설정 API를
              newPrefetchAll (여러 API를 병렬로 prefetch하는 내부 유틸 함수)로 사전
              요청한 뒤, TanStack Query hydration으로 클라이언트 초기 상태를
              구성했습니다.
            </p>
            <CodeBlock code={CODE_CONFIG_PREFETCH} language="typescript" />
          </div>
          <p className="mt-2">
            이를 통해 초기 진입 시 로딩 없이 설정 데이터가 즉시 렌더링되도록 했습니다.
          </p>
        </div>

        <div className="print-solution-item">
          <p className="mt-6 font-medium text-zinc-900 print:text-black print:mt-0">
            2. 도메인별 커스텀 훅 + ViewModel 생성 함수 분리
          </p>
          <p className="mt-2">
            설정 도메인별로 커스텀 훅을 분리해 각 훅이 담당하는 API와 UI 흐름을
            명확히 했습니다.
          </p>
          <p className="mt-2">useSelfHappyCallConfig — 전역 사용 여부</p>
          <p className="mt-1">useNoHopeDayConfig — 센터별 희망일 없는 의뢰 설정</p>
          <p className="mt-1">useSelfConfig — 기본 설정·예외일·변경 이력·팝업</p>
          <div className="print-explanation-code mt-2">
            <p>
              도메인 데이터를 테이블/리스트 형태로 변환하는 로직은 ViewModel 생성
              함수로 컴포넌트 외부에 분리해, UI 컴포넌트는 렌더에만 집중하도록
              구성했습니다.
            </p>
            <CodeBlock code={CODE_VIEWMODEL} language="typescript" />
          </div>
        </div>

        <div className="print-solution-item print-solution-item--relaxed print-break-before-page">
          <p className="mt-6 font-medium text-zinc-900 print:text-black print:mt-0">
            3. 로컬 편집 상태와 확인 팝업 기반 안전한 편집 흐름
          </p>
          <p className="mt-2">
            서버 상태(TanStack Query)와 별도로 로컬 편집 상태( status ,{" "}
            centerStatus )를 두어, 저장 전까지는 변경이 서버에 반영되지 않도록
            설계했습니다.
          </p>
          <p className="mt-2">
            저장 시에는 확인 팝업을 거치도록 하고, 취소 시에는 서버에서 가져온 원본
            데이터로 로컬 상태를 복원하는 흐름으로 구성했습니다.
          </p>
          <div className="print-flow-lines print-allow-break">
            <p className="mt-2 font-mono text-[14px] text-zinc-700 print:text-zinc-800">
              편집 시작 → 로컬 상태 변경 → 저장 버튼 → 확인 팝업 → mutate →
              invalidateQueries
            </p>
            <p className="mt-1 font-mono text-[14px] text-zinc-700 print:text-zinc-800">
              취소 시 → 서버 원본 데이터로 로컬 상태 복원
            </p>
          </div>
        </div>
      </SolutionBlock>

      <ResultBlock>
        <p>
          초기 진입 시 설정 데이터를 바로 확인할 수 있도록 해 로딩 지연과 화면
          깜빡임을 줄였습니다.
        </p>
        <p className="mt-2">
          도메인별 훅과 ViewModel 구조를 통해 설정 섹션이 추가되더라도 일관된
          패턴으로 확장할 수 있게 했습니다.
        </p>
        <p className="mt-2">
          로컬 편집 상태와 확인 팝업 흐름을 통해 잘못된 설정 저장으로 인한 운영
          리스크를 줄였습니다.
        </p>
      </ResultBlock>
    </ProjectSection>
  );
}
