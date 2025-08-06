import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function LearnSection() {
  const { t } = useLanguage();

  const topics = [
    'What is EarthChain?',
    'What are crypto wallets?',
    'How to start, step by step',
    'EarthChain Whitepaper',
    'EarthChain roadmap'
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Learning and education concept" 
              className="rounded-2xl w-full h-auto shadow-lg"
            />
          </div>
          <div>
            <span className="inline-block bg-ethereum text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Learn
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('learn.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('learn.subtitle')}
            </p>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Popular topics</h3>
              <ul className="space-y-3">
                {topics.map((topic, index) => (
                  <li key={index}>
                    <button 
                      className="text-ethereum hover:text-ethereum-dark transition-colors text-left"
                      data-testid={`topic-${index}`}
                    >
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              size="lg"
              className="bg-ethereum text-white hover:bg-ethereum-dark font-semibold flex items-center space-x-2"
              data-testid="button-other-topics"
            >
              <span>Other topics</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
