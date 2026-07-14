import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import { ShaderAnimation } from '@/components/ui/shader-animation';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimation();

  const titles = [
    'Full-Stack Developer',
    'Software Engineer',
    'React Specialist',
    'Python Developer',
    'Flutter Developer',
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
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, titles]);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }
    }
  } as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  } as const;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
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

      <motion.div
        className="container mx-auto px-6 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center space-y-8">
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-shadow-glow"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 15,
                delay: 0.2,
              }}
            >
              Hi, I'm <span className="gradient-text">JEGATHESH</span>
            </motion.h1>
            <motion.div
              className="text-2xl md:text-4xl font-light h-16 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="gradient-accent-text">
                {displayText}
                <motion.span
                  className="ml-1 inline-block"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  |
                </motion.span>
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Full-Stack Developer with expertise in React, Python, Flutter, and AWS.
            Building scalable mobile and web solutions at
            <span className="text-primary font-medium"> Wellsee Bundle Technology Pvt Ltd</span>.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.a
              href="/Jegathesh Resume.pdf"
              download="Jegathesh Resume.pdf"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-primary text-white font-medium h-11 px-8"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(217 91% 60% / 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Download className="w-5 h-5" />
              </motion.div>
              Download Resume
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button variant="glass" size="lg" onClick={() => scrollToSection('contact')}>
                <Mail className="w-5 h-5" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-6 justify-center"
            variants={fadeInUp}
          >
            {[
              { href: 'https://github.com/rocky-pc', Icon: Github },
              { href: 'https://linkedin.com/in/jegathesh-developer', Icon: Linkedin },
              { href: 'mailto:sjega82@gmail.com', Icon: Mail },
            ].map(({ href, Icon }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon size={28} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown
            className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => scrollToSection('about')}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
