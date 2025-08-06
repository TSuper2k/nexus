import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { EcosystemStats } from "@/components/ecosystem-stats";
import { LearnSection } from "@/components/learn-section";
import { DevelopersSection } from "@/components/developers-section";
import { CommunitySection } from "@/components/community-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <EcosystemStats />
      <LearnSection />
      <DevelopersSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
