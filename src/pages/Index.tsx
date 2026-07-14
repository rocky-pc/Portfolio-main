import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Service from '@/components/Service';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  useScrollAnimation();

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Service />
          <Skills />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="bg-secondary/10 py-8 border-t border-border/30">
          <div className="container mx-auto px-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                © 2025 Jegathesh S. Crafted with passion using React & TypeScript.
              </p>
              <p className="text-sm text-muted-foreground">
                Available for freelance projects and full-time opportunities.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
