import { Building, Coins, Wallet, Globe, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function DevelopersSection() {
  const { t } = useLanguage();

  const codeExamples = [
    {
      icon: Building,
      title: 'Your own bank',
      description: 'Build a bank powered by logic you\'ve programmed',
      color: 'text-ethereum'
    },
    {
      icon: Coins,
      title: 'Your own currency',
      description: 'Create tokens that you can transfer and use across applications',
      color: 'text-purple-accent'
    },
    {
      icon: Wallet,
      title: 'A JavaScript EarthChain wallet',
      description: 'Use existing languages to interact with EarthChain and other applications',
      color: 'text-cyan-accent'
    },
    {
      icon: Globe,
      title: 'An open, permissionless DNS',
      description: 'Re-imagine existing services as decentralized, open applications',
      color: 'text-green-500'
    }
  ];

  return (
    <section id="developers" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Builders
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('developers.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            {t('developers.subtitle')} Use JavaScript and Python, or learn a smart contract language like Solidity or Vyper to write your own app.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Developer workspace with coding environment" 
              className="rounded-2xl w-full h-auto shadow-lg"
            />
          </div>
          <div className="space-y-8">
            {codeExamples.map((example, index) => (
              <div key={index} data-testid={`code-example-${index}`}>
                <h3 className="text-2xl font-bold mb-3 flex items-center space-x-3">
                  <example.icon className={`w-6 h-6 ${example.color}`} />
                  <span className="text-gray-900 dark:text-white">{example.title}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg"
              className="bg-ethereum text-white hover:bg-ethereum-dark font-semibold flex items-center space-x-2"
              data-testid="button-builders-portal"
            >
              <span>Builder's Portal</span>
              <ExternalLink className="w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-ethereum text-ethereum hover:bg-ethereum hover:text-white font-semibold flex items-center space-x-2"
              data-testid="button-documentation"
            >
              <span>Documentation</span>
              <BookOpen className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
