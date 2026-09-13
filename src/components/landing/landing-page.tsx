// import { AiSection } from "./sections/ai-section";
import { FeaturedSection } from "./sections/featured-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { LandingFooter } from "./sections/landing-footer";
import { LandingHero } from "./sections/landing-hero";
// import { SponsorsSection } from "./sections/sponsors-section";
import { SiteGridFrame, SiteGridGap } from "./site-grid";
// import { ProofSection } from "./sections/proof-section";

export default function LandingPage() {
  return (
    <main className="overflow-x-clip pt-header-height relative z-10">
      <div className="bg-[radial-gradient(120%_75%_at_50%_-5%,#ffffff12,#0000_60%)] fixed min-h-svh w-full top-0 left-0 select-none z-0"></div>
      <SiteGridFrame className="relative z-10">
        <LandingHero />
        <SiteGridGap />
        <FeaturedSection />
        {/*<OwnershipSection />*/}
        {/*<AiSection />*/}
        {/*<OpenSourceSection />*/}
        <SiteGridGap />
        <FinalCtaSection />
        <SiteGridGap />
        {/*<SponsorsSection />*/}
        <SiteGridGap />
        <LandingFooter />
      </SiteGridFrame>
    </main>
  );
}
