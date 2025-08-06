import { Wallet, Coins, Smartphone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarthCanvas } from "@/components/earth-canvas";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 gradient-bg"></div>
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
                className="border-white text-white hover:bg-white hover:text-ethereum font-semibold flex items-center justify-center space-x-2"
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
          
          {/* Interactive Earth Canvas */}
          <div className="flex justify-center">
            <EarthCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
