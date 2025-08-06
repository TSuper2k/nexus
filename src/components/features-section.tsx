import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      id: 'stable-finance',
      title: 'Stable Finance',
      description: 'Stablecoins maintain stable value. Their price matches the U.S. dollar or other steady assets.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      link: 'Learn more'
    },
    {
      id: 'fair-finance',
      title: 'Fair Finance',
      description: 'Billions can\'t open bank accounts or freely use their money. EarthChain\'s financial system is always open and unbiased.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      link: 'Explore DeFi'
    },
    {
      id: 'network-hub',
      title: 'Network Hub',
      description: 'EarthChain is the hub for blockchain innovation. The best projects are built on our platform.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      link: 'Explore benefits'
    },
    {
      id: 'private-apps',
      title: 'Private Apps',
      description: 'EarthChain apps work without selling your data. Protect your privacy while accessing innovative services.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      link: 'Browse apps'
    },
    {
      id: 'digital-assets',
      title: 'Digital Assets',
      description: 'Art, certificates or even real estate can be tokenized. Anything can be a tradable token. Ownership is public and verifiable.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      link: 'More on NFTs'
    },
    {
      id: 'global-reach',
      title: 'Global Reach',
      description: 'Connect with users worldwide through our decentralized network spanning over 160 countries.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      link: 'Join the network'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow overflow-hidden border-0"
              data-testid={`feature-${feature.id}`}
            >
              <div className="p-0">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-ethereum">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                  <button 
                    className="text-ethereum font-semibold hover:text-ethereum-dark transition-colors"
                    data-testid={`link-${feature.id}`}
                  >
                    {feature.link} →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
