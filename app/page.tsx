import { CodeBlock } from "@/components/portfolio/CodeBlock";
import { BackgroundBlock } from "@/components/portfolio/BackgroundBlock";
import { Header } from "@/components/portfolio/Header";
import { Introduction } from "@/components/portfolio/Introduction";
import { ProblemBlock } from "@/components/portfolio/ProblemBlock";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { ResultBlock } from "@/components/portfolio/ResultBlock";
import { PrintActions } from "@/components/portfolio/PrintActions";
import { SolutionBlock } from "@/components/portfolio/SolutionBlock";
import { Stack } from "@/components/portfolio/Stack";

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

const CODE_QUERY_KEY = `// Before
['queries']
invalidateQueries(['queries'])
// After
// mutation 이후 전체 캐시가 아닌 댓글 관련 캐시만 무효화하도록 조정
['queries', 'board', 'detail', id, 'comment']
invalidateQueries(['queries', 'board', 'detail', id, 'comment'])`;

const CODE_POLYMORPHIC = `// ComponentPropsWithoutRef<C>로 전달된 element의 native props 확장
// Omit<..., keyof TButtonProps>로 공통 props와 충돌 제거
type PolymorphicProps<C extends React.ElementType> = {
  as?: C;
} & TButtonProps
  & Omit<React.ComponentPropsWithoutRef<C>, keyof TButtonProps>;

type ButtonProps<C extends React.ElementType> = PolymorphicProps<C>;`;

export default function Home() {
  return (
    <>
      <PrintActions />
      <div className="min-h-screen print:bg-white">
        <div className="mx-auto min-h-screen max-w-[794px] print:max-w-none print:px-0 print:shadow-none">
          <div className="screen-sheet bg-white px-6 py-10 shadow-sm print:px-12 print:py-8 print:shadow-none md:px-10 md:py-12">
            <Header />
            <Introduction />
            <Stack />

            <section className="print-doc-section border-t border-zinc-200 py-8 print:border-zinc-300 print:py-0">
              <p className="text-[15px] leading-7 text-zinc-800 print:text-zinc-900">
                가구 관련 의뢰를 하우저 운영자가 관리하는 백오피스 서비스입니다. 공통 설정
                변경, 의뢰별 정보 조회, 진행 상태 확인, 문의 처리 등 운영에 필요한 기능을
                제공합니다.
              </p>
            </section>

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

            <ProjectSection title="Polymorphic Button 타입 개선">
              <BackgroundBlock
                lede={
                  <p>
                    공통으로 사용하는 Button 컴포넌트는 다양한 상황에서 재사용할 수 있도록
                    styled-components 기반으로 구현되어 있었고, as props를 통해 button , label
                    , a 등 다른 element로 렌더링할 수 있도록 설계되어 있었습니다.
                  </p>
                }
              />

              <ProblemBlock>
                <div className="print-problem-item print-avoid-break">
                  <p>
                    하지만 기존 타입 정의에서는 as props로 다른 element를 지정하더라도, 해당
                    element가 기본적으로 가지는 속성들을 함께 사용할 수 없었습니다.
                  </p>
                  <p className="mt-2">
                    예를 들어 as=&quot;label&quot; 을 전달해 렌더링하더라도 label element의
                    고유 속성을 타입 수준에서 인식하지 못해 타입 에러가 발생했습니다.
                  </p>
                </div>
              </ProblemBlock>

              <SolutionBlock>
                <div className="print-solution-item">
                  <p>
                    이를 해결하기 위해 Button 컴포넌트의 props를 다음 기준으로 다시
                    설계했습니다.
                  </p>
                  <div className="print-explanation-code mt-3">
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Button 컴포넌트가 공통으로 사용하는 커스텀 props를 정의하고</li>
                      <li>
                        as 로 전달된 element의 native props를 함께 받을 수 있도록 확장한 뒤
                      </li>
                      <li>
                        두 props 간 이름이 겹치는 경우에는 Button 컴포넌트의 커스텀 props가
                        우선되도록 Omit 으로 충돌을 제거했습니다
                      </li>
                    </ul>
                    <CodeBlock code={CODE_POLYMORPHIC} language="typescript" />
                  </div>
                </div>
              </SolutionBlock>

              <ResultBlock>
                <p>
                  as=&quot;label&quot; 이나 as=&quot;a&quot; 처럼 렌더링 요소를 바꿔도
                  native props를 타입 안전하게 함께 사용할 수 있게 되었고, 사용처별
                  요구사항을 별도 컴포넌트 분리 없이 공통 Button으로 수용할 수 있게
                  되었습니다.
                </p>
              </ResultBlock>
            </ProjectSection>

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
          </div>
        </div>
      </div>
    </>
  );
}
