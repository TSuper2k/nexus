import { Globe, Twitter, Github, MessageCircle, Youtube } from "lucide-react";

export function Footer() {
  const learnLinks = [
    'What is EarthChain?',
    'Get started',
    'Wallets',
    'DeFi',
    'NFTs'
  ];

  const buildLinks = [
    'Developer docs',
    'Tutorials',
    'Smart contracts',
    'Tools',
    'Community'
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-ethereum rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">EarthChain</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Join the global blockchain revolution with interactive Earth visualization and decentralized applications.
            </p>
            <div className="flex space-x-4">
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-twitter"
              >
                <Twitter className="w-6 h-6" />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-github"
              >
                <Github className="w-6 h-6" />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-discord"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-youtube"
              >
                <Youtube className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Learn Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Learn</h4>
            <ul className="space-y-3">
              {learnLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    className="hover:text-white transition-colors text-left"
                    data-testid={`footer-learn-${index}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Build Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Build</h4>
            <ul className="space-y-3">
              {buildLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    className="hover:text-white transition-colors text-left"
                    data-testid={`footer-build-${index}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 EarthChain. Built by the community, for the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
