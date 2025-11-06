import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Code, Settings, MessageCircle, Layers, ShoppingCart } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'service', label: 'Service', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Settings },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  // Navigate to shop page on click of shop button
  const handleShopClick = () => {
    window.location.href = '/shop';
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      // Update active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }

      // Update scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, progress));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="glass px-6 py-3 rounded-full">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleShopClick}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'shop' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >Shop
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Button */}
      <Button
        variant="hero"
        size="icon"
        className="fixed top-6 right-6 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-20 right-6 glass rounded-2xl p-6 min-w-[200px]">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors hover:bg-card-glass/50 ${
                      activeSection === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleShopClick}
                  className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors hover:bg-card-glass/50 ${
                    activeSection === 'shop' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                  }`}
                >
                  <ShoppingCart size={18} />
                  <span className="font-medium">Shop</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary/20 z-50">
        <div 
          className="h-full bg-gradient-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
};

export default Navigation;