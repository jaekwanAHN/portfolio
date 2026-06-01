import { Header } from "@/components/portfolio/Header";
import { Introduction } from "@/components/portfolio/Introduction";
import { PrintActions } from "@/components/portfolio/PrintActions";
import { Stack } from "@/components/portfolio/Stack";
import { HowserIntro } from "@/components/portfolio/HowserIntro";
import { ConfigManageSection } from "@/components/portfolio/ConfigManageSection";
import { InquiryBoardSection } from "@/components/portfolio/InquiryBoardSection";
import { ApiOptimizeSection } from "@/components/portfolio/ApiOptimizeSection";
import { PolymorphicSection } from "@/components/portfolio/PolymorphicSection";
import { MiscSection } from "@/components/portfolio/MiscSection";

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
            <HowserIntro />
            <ConfigManageSection />
            <InquiryBoardSection />
            <ApiOptimizeSection />
            <PolymorphicSection />
            <MiscSection />
          </div>
        </div>
      </div>
    </>
  );
}
