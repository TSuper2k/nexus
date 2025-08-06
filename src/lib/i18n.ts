export interface Translation {
  [key: string]: string | Translation;
}

export const translations: Record<string, Translation> = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      ecosystem: 'Ecosystem',
      community: 'Community',
      developers: 'Developers'
    },
    hero: {
      title: 'Welcome to',
      subtitle: 'The leading platform for global blockchain innovation and decentralized applications',
      getWallet: 'Get Wallet',
      getEth: 'Get ETH',
      tryApps: 'Try Apps',
      startBuilding: 'Start Building',
      globalUsers: 'Global Users',
      countries: 'Countries'
    },
    features: {
      title: 'A new way to use the internet',
      subtitle: 'Explore the possibilities of decentralized applications'
    },
    ecosystem: {
      title: 'The strongest ecosystem',
      subtitle: 'Activity from all EarthChain networks'
    },
    learn: {
      title: 'Understand EarthChain',
      subtitle: 'Crypto can feel overwhelming. Don\'t worry, these materials are designed to help you understand EarthChain in just a few minutes.'
    },
    developers: {
      title: 'Blockchain\'s biggest builder community',
      subtitle: 'EarthChain is home to Web3\'s largest and most vibrant developer ecosystem.'
    },
    community: {
      title: 'Built by the community',
      subtitle: 'The earthchain.org website is built and maintained by hundreds of translators, coders, designers, copywriters, and enthusiastic community members each month.'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      features: 'Características',
      ecosystem: 'Ecosistema',
      community: 'Comunidad',
      developers: 'Desarrolladores'
    },
    hero: {
      title: 'Bienvenido a',
      subtitle: 'La plataforma líder para la innovación blockchain global y aplicaciones descentralizadas',
      getWallet: 'Obtener Billetera',
      getEth: 'Obtener ETH',
      tryApps: 'Probar Apps',
      startBuilding: 'Empezar a Construir',
      globalUsers: 'Usuarios Globales',
      countries: 'Países'
    },
    features: {
      title: 'Una nueva forma de usar internet',
      subtitle: 'Explora las posibilidades de las aplicaciones descentralizadas'
    },
    ecosystem: {
      title: 'El ecosistema más fuerte',
      subtitle: 'Actividad de todas las redes EarthChain'
    },
    learn: {
      title: 'Entender EarthChain',
      subtitle: 'Las criptomonedas pueden sentirse abrumadoras. No te preocupes, estos materiales están diseñados para ayudarte a entender EarthChain en solo unos minutos.'
    },
    developers: {
      title: 'La comunidad de constructores más grande de blockchain',
      subtitle: 'EarthChain es el hogar del ecosistema de desarrolladores más grande y vibrante de Web3.'
    },
    community: {
      title: 'Construido por la comunidad',
      subtitle: 'El sitio web earthchain.org es construido y mantenido por cientos de traductores, programadores, diseñadores, redactores y miembros entusiastas de la comunidad cada mes.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      ecosystem: 'Écosystème',
      community: 'Communauté',
      developers: 'Développeurs'
    },
    hero: {
      title: 'Bienvenue à',
      subtitle: 'La plateforme leader pour l\'innovation blockchain mondiale et les applications décentralisées',
      getWallet: 'Obtenir Portefeuille',
      getEth: 'Obtenir ETH',
      tryApps: 'Essayer Apps',
      startBuilding: 'Commencer à Construire',
      globalUsers: 'Utilisateurs Mondiaux',
      countries: 'Pays'
    },
    features: {
      title: 'Une nouvelle façon d\'utiliser internet',
      subtitle: 'Explorez les possibilités des applications décentralisées'
    },
    ecosystem: {
      title: 'L\'écosystème le plus fort',
      subtitle: 'Activité de tous les réseaux EarthChain'
    },
    learn: {
      title: 'Comprendre EarthChain',
      subtitle: 'La crypto peut sembler écrasante. Ne vous inquiétez pas, ces matériaux sont conçus pour vous aider à comprendre EarthChain en quelques minutes.'
    },
    developers: {
      title: 'La plus grande communauté de constructeurs blockchain',
      subtitle: 'EarthChain abrite le plus grand et le plus vibrant écosystème de développeurs du Web3.'
    },
    community: {
      title: 'Construit par la communauté',
      subtitle: 'Le site web earthchain.org est construit et maintenu par des centaines de traducteurs, codeurs, designers, rédacteurs et membres enthousiastes de la communauté chaque mois.'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      features: 'Funktionen',
      ecosystem: 'Ökosystem',
      community: 'Gemeinschaft',
      developers: 'Entwickler'
    },
    hero: {
      title: 'Willkommen bei',
      subtitle: 'Die führende Plattform für globale Blockchain-Innovation und dezentrale Anwendungen',
      getWallet: 'Wallet Holen',
      getEth: 'ETH Holen',
      tryApps: 'Apps Testen',
      startBuilding: 'Anfangen zu Bauen',
      globalUsers: 'Globale Nutzer',
      countries: 'Länder'
    },
    features: {
      title: 'Ein neuer Weg, das Internet zu nutzen',
      subtitle: 'Entdecken Sie die Möglichkeiten dezentraler Anwendungen'
    },
    ecosystem: {
      title: 'Das stärkste Ökosystem',
      subtitle: 'Aktivität von allen EarthChain-Netzwerken'
    },
    learn: {
      title: 'EarthChain verstehen',
      subtitle: 'Krypto kann überwältigend wirken. Keine Sorge, diese Materialien sind darauf ausgelegt, Ihnen zu helfen, EarthChain in nur wenigen Minuten zu verstehen.'
    },
    developers: {
      title: 'Blockchains größte Builder-Community',
      subtitle: 'EarthChain ist die Heimat des größten und lebendigsten Entwickler-Ökosystems von Web3.'
    },
    community: {
      title: 'Von der Gemeinschaft gebaut',
      subtitle: 'Die earthchain.org-Website wird von Hunderten von Übersetzern, Programmierern, Designern, Textern und enthusiastischen Community-Mitgliedern jeden Monat erstellt und gepflegt.'
    }
  },
  zh: {
    nav: {
      home: '首页',
      features: '特性',
      ecosystem: '生态系统',
      community: '社区',
      developers: '开发者'
    },
    hero: {
      title: '欢迎来到',
      subtitle: '全球区块链创新和去中心化应用的领先平台',
      getWallet: '获取钱包',
      getEth: '获取 ETH',
      tryApps: '试用应用',
      startBuilding: '开始构建',
      globalUsers: '全球用户',
      countries: '国家'
    },
    features: {
      title: '使用互联网的新方式',
      subtitle: '探索去中心化应用的可能性'
    },
    ecosystem: {
      title: '最强大的生态系统',
      subtitle: '所有 EarthChain 网络的活动'
    },
    learn: {
      title: '了解 EarthChain',
      subtitle: '加密货币可能让人感到不知所措。别担心，这些材料旨在帮助您在几分钟内了解 EarthChain。'
    },
    developers: {
      title: '区块链最大的建设者社区',
      subtitle: 'EarthChain 是 Web3 最大、最充满活力的开发者生态系统的家园。'
    },
    community: {
      title: '由社区构建',
      subtitle: 'earthchain.org 网站每月由数百名翻译者、程序员、设计师、文案撰稿人和热情的社区成员构建和维护。'
    }
  }
};

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // fallback to key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}
