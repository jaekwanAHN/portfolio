import { BackgroundBlock } from "@/components/portfolio/BackgroundBlock";
import { CodeBlock } from "@/components/portfolio/CodeBlock";
import { ProblemBlock } from "@/components/portfolio/ProblemBlock";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { ResultBlock } from "@/components/portfolio/ResultBlock";
import { SolutionBlock } from "@/components/portfolio/SolutionBlock";

const CODE_POLYMORPHIC = `// ComponentPropsWithoutRef<C>로 전달된 element의 native props 확장
// Omit<..., keyof TButtonProps>로 공통 props와 충돌 제거
type PolymorphicProps<C extends React.ElementType> = {
  as?: C;
} & TButtonProps
  & Omit<React.ComponentPropsWithoutRef<C>, keyof TButtonProps>;

type ButtonProps<C extends React.ElementType> = PolymorphicProps<C>;`;

export function PolymorphicSection() {
  return (
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
  );
}
