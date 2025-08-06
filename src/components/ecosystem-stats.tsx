import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export function EcosystemStats() {
  const { t } = useLanguage();

  const stats = [
    {
      id: 'defi-value',
      value: '$177.2B',
      label: 'Value locked in DeFi',
      color: 'text-ethereum'
    },
    {
      id: 'staking-value',
      value: '$130.6B',
      label: 'Value protecting EarthChain',
      color: 'text-purple-accent'
    },
    {
      id: 'avg-tx-cost',
      value: '$0.0027',
      label: 'Average transaction cost',
      color: 'text-cyan-accent'
    },
    {
      id: 'daily-tx',
      value: '14.46M',
      label: 'Transactions in the last 24h',
      color: 'text-green-500'
    }
  ];

  return (
    <section id="ecosystem" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('ecosystem.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('ecosystem.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card 
              key={stat.id}
              className="bg-white dark:bg-gray-900 p-8 text-center shadow-lg border-0"
              data-testid={`stat-${stat.id}`}
            >
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button 
              className="text-ethereum font-semibold hover:text-ethereum-dark transition-colors"
              data-testid="link-enterprise"
            >
              Enterprise EarthChain →
            </button>
            <button 
              className="text-ethereum font-semibold hover:text-ethereum-dark transition-colors"
              data-testid="link-ecosystem-resources"
            >
              More ecosystem resources →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
