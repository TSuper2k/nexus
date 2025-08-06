import { Users, Github, MessageCircle, Twitter } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function CommunitySection() {
  const { t } = useLanguage();

  const communityLinks = [
    {
      icon: Users,
      title: 'How to contribute',
      description: 'Find out all the different ways you can help earthchain.org grow and be better.',
      testId: 'link-contribute'
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Contribute to code, design, articles, etc.',
      testId: 'link-github'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'To ask questions, coordinate contribution and join community calls.',
      testId: 'link-discord'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      description: 'To keep up with our updates and important news.',
      testId: 'link-twitter'
    }
  ];

  return (
    <section id="community" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-cyan-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              EarthChain.org Community
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('community.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('community.subtitle')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Come ask questions, connect with people around the world and contribute to the website. You will get relevant practical experience and be guided during the process!
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-semibold">
              EarthChain.org community is the perfect place to start and learn.
            </p>
            
            <div className="space-y-4">
              {communityLinks.map((link, index) => (
                <button 
                  key={index}
                  className="flex items-start space-x-3 text-left text-ethereum hover:text-ethereum-dark transition-colors w-full"
                  data-testid={link.testId}
                >
                  <link.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">{link.title}</div>
                    {link.description && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {link.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Diverse community of developers and creators collaborating" 
              className="rounded-2xl w-full h-auto shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
