import { Wallet, Coins, Smartphone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarthCanvas } from "@/components/earth-canvas";
import { useLanguage } from "@/components/language-provider";
import GlobeScene from "./globe-scene";
import { AutoScrollBanner } from "./auto-scroll-banner";
import React, { useEffect, useRef, useState } from "react";
import { EarthSection } from "./earth-section";

export function HeroSection() {
  const { t } = useLanguage();
  const [globeState, setGlobeState] = useState<'hero' | 'transition' | 'earth'>('hero');
  const [globeScale, setGlobeScale] = useState(1);
  const globeTransitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const earthSection = document.getElementById("earth-section");
      if (!hero || !earthSection) return;
      const heroRect = hero.getBoundingClientRect();
      const earthRect = earthSection.getBoundingClientRect();
      // Scroll progress từ bottom của hero đến top của earthSection
      const windowHeight = window.innerHeight;
      const transitionStart = heroRect.bottom - windowHeight * 0.5;
      const transitionEnd = earthRect.top - windowHeight * 0.5;
      if (transitionEnd <= 0) {
        setGlobeState('earth');
        setGlobeScale(0.5);
      } else if (transitionStart < 0) {
        // Đang transition
        setGlobeState('transition');
        // Tính scale mượt mà từ 1 -> 0.5
        const total = Math.abs(transitionEnd - transitionStart);
        const current = Math.abs(transitionEnd);
        const progress = Math.min(1, current / total);
        setGlobeScale(1 - 0.5 * progress);
      } else {
        setGlobeState('hero');
        setGlobeScale(1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section 
        id="hero" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <div className="absolute inset-0 gradient-bg"></div>
        {/* GlobeScene phủ toàn bộ section, không bị che/cắt */}
        {globeState !== 'earth' && (
          <div
            ref={globeTransitionRef}
            className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
            style={{
              transform: `scale(${globeScale})`,
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <GlobeScene />
          </div>
        )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">{t('hero.title')}</span>
              <br />
              <span className="text-cyan-accent">EarthChain</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-white text-ethereum hover:bg-gray-100 font-semibold flex items-center justify-center space-x-2"
                data-testid="button-get-wallet"
              >
                <Wallet className="w-5 h-5" />
                <span>{t('hero.getWallet')}</span>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white hover:bg-white hover:text-ethereum font-semibold flex items-center justify-center space-x-2"
                data-testid="button-get-eth"
              >
                <Coins className="w-5 h-5" />
                <span>{t('hero.getEth')}</span>
              </Button>
              <Button 
                size="lg"
                className="bg-purple-accent text-white hover:bg-purple-600 font-semibold flex items-center justify-center space-x-2"
                data-testid="button-try-apps"
              >
                <Smartphone className="w-5 h-5" />
                <span>{t('hero.tryApps')}</span>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-cyan-accent text-cyan-accent hover:bg-cyan-accent hover:text-white font-semibold flex items-center justify-center space-x-2"
                data-testid="button-start-building"
              >
                <Code className="w-5 h-5" />
                <span>{t('hero.startBuilding')}</span>
              </Button>
            </div>
            {/* Global Stats */}
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-accent" data-testid="stat-global-users">14.6M+</div>
                <div className="text-gray-200 text-sm">{t('hero.globalUsers')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-accent" data-testid="stat-countries">160+</div>
                <div className="text-gray-200 text-sm">{t('hero.countries')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner tự động chạy ở cuối section */}
      <div className="absolute left-0 right-0 bottom-0 z-30">
        <AutoScrollBanner
          items={[
            { text: "EarthChain Mainnet is live!", url: "#" },
            { text: "160+ countries supported", url: "#" },
            { text: "14.6M+ global users", url: "#" },
            { text: "Build your dApp now!", url: "#" },
            { text: "Try EarthChain Apps", url: "#" }
          ]}
          speed={80}
          hoverSpeed={15}
        />
      </div>
      </section>
      {/* Section mới bên dưới HeroSection */}
      <EarthSection showGlobe={globeState === 'earth'}>
        {globeState === 'earth' && <GlobeScene />}
      </EarthSection>
    </>
  );
}
