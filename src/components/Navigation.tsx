import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Code, Settings, MessageCircle, Layers, ShoppingCart, LogOut, Package } from 'lucide-react';
import Auth from './Auth';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check if we're on the main portfolio page
  const isMainPage = location.pathname === '/';

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'service', label: 'Service', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Settings },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];



  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

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
    return () => {
      unsubscribeAuth();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (id: string) => {
    if (isMainPage) {
      // On main page, scroll to sections
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to main page
      window.location.href = '/';
    }
    setIsOpen(false);
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
                  onClick={() => handleNavigation(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-sm font-medium h-7"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass" align="end">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {currentUser.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = '/orders'}>
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = '/shop'}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Shop
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut(auth)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Auth>
                  <button
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === 'shop' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Shop
                  </button>
                </Auth>
              )}
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
                    onClick={() => handleNavigation(item.id)}
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
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm font-medium text-center bg-primary/10 rounded-lg">
                      <User className="w-4 h-4 inline mr-2" />
                      {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                    </div>
                    <button
                      onClick={() => { window.location.href = '/orders'; setIsOpen(false); }}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors hover:bg-card-glass/50 text-muted-foreground"
                    >
                      <Package size={18} />
                      <span className="font-medium">My Orders</span>
                    </button>
                    <button
                      onClick={() => { window.location.href = '/shop'; setIsOpen(false); }}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors hover:bg-card-glass/50 text-muted-foreground"
                    >
                      <ShoppingCart size={18} />
                      <span className="font-medium">Shop</span>
                    </button>
                    <button
                      onClick={() => { signOut(auth); setIsOpen(false); }}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors hover:bg-card-glass/50 text-red-600"
                    >
                      <LogOut size={18} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Auth>
                    <button
                      className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors hover:bg-card-glass/50 ${
                        activeSection === 'shop' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span className="font-medium">Shop</span>
                    </button>
                  </Auth>
                )}
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
