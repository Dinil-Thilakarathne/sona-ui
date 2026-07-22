import { AiSection } from "./sections/ai-section";
import { FeaturedSection } from "./sections/featured-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { LandingFooter } from "./sections/landing-footer";
import { LandingHero } from "./sections/landing-hero";
import { OpenSourceSection } from "./sections/open-source-section";
import { OwnershipSection } from "./sections/ownership-section";
import { ProofSection } from "./sections/proof-section";

export default function LandingPage() {
  return (
    <main className="overflow-x-clip pt-header-height">
      <LandingHero />
      <ProofSection />
      <FeaturedSection />
      <OwnershipSection />
      <AiSection />
      <OpenSourceSection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}
