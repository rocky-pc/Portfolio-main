import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/gradient-button';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import { ShaderAnimation } from '@/components/ui/shader-animation';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  const titles = [
    'Full-Stack Developer',
    'Software Engineer',
    'React Specialist',
    'Python Developer',
    'AWS Cloud Expert'
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 90 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, titles]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated particles background */}

      <div className="absolute inset-0 z-0">
                 <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
      </div>
        <ShaderAnimation />

      </div>
      <div className="container mx-auto px-6 z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 
              className="text-5xl md:text-7xl font-bold text-shadow-glow animate-in fade-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: '200ms' }}
            >
              Hi, I'm <span className="gradient-text">JEGATHESH</span>
            </h1>
            <div 
              className="text-2xl md:text-4xl font-light h-16 flex items-center justify-center animate-in fade-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: '400ms' }}
            >
              <span className="gradient-accent-text">
                {displayText}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
              </span>
            </div>
          </div>
          
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000"
            style={{ animationDelay: '600ms' }}
          >
            Passionate Full-Stack Developer with expertise in React, Python, and AWS. 
            Building scalable solutions for the oil & gas industry at 
            <span className="text-primary font-medium"> Assure Rig Safety Tech Solutions</span>.
          </p>
          
          <div 
            className="flex flex-wrap gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-1000"
            style={{ animationDelay: '800ms' }}
          >
            <a href="/Jegathesh Resume.pdf" download="Jegathesh Resume.pdf" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-primary text-white hover:shadow-glow hover:scale-105 transition-all duration-300 font-medium h-11 px-8">
              <Download className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Download Resume
            </a>
            <Button variant="glass" size="lg" onClick={() => scrollToSection('contact')}>
              <Mail className="w-5 h-5" />
              Get In Touch
            </Button>
          </div>
          
          <div 
            className="flex gap-6 justify-center animate-in fade-in slide-in-from-bottom duration-1000"
            style={{ animationDelay: '1000ms' }}
          >
            <a 
              href="https://github.com/rocky-pc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://linkedin.com/in/jegathesh-developer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="mailto:sjega82@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown 
          className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
          onClick={() => scrollToSection('about')}
        />
      </div>
    </section>
  );
};

export default Hero;