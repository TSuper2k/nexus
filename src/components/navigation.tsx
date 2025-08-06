import { useState } from "react";
import { Menu, Sun, Moon, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/components/language-provider";
import { Language } from "@/lib/i18n";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-ethereum rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">EarthChain</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
              data-testid="nav-home"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
              data-testid="nav-features"
            >
              {t('nav.features')}
            </button>
            <button 
              onClick={() => scrollToSection('ecosystem')}
              className="text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
              data-testid="nav-ecosystem"
            >
              {t('nav.ecosystem')}
            </button>
            <button 
              onClick={() => scrollToSection('community')}
              className="text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
              data-testid="nav-community"
            >
              {t('nav.community')}
            </button>
            <button 
              onClick={() => scrollToSection('developers')}
              className="text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
              data-testid="nav-developers"
            >
              {t('nav.developers')}
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger 
                className="w-20 bg-transparent border border-gray-300 dark:border-gray-600"
                data-testid="language-selector"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
                data-testid="mobile-nav-home"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
                data-testid="mobile-nav-features"
              >
                {t('nav.features')}
              </button>
              <button 
                onClick={() => scrollToSection('ecosystem')}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
                data-testid="mobile-nav-ecosystem"
              >
                {t('nav.ecosystem')}
              </button>
              <button 
                onClick={() => scrollToSection('community')}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
                data-testid="mobile-nav-community"
              >
                {t('nav.community')}
              </button>
              <button 
                onClick={() => scrollToSection('developers')}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-ethereum dark:hover:text-ethereum transition-colors"
                data-testid="mobile-nav-developers"
              >
                {t('nav.developers')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
