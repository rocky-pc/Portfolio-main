import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Brain, FileText, Smartphone } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Wellsee Mobile App",
      description: "Independently developed the Wellsee mobile application and published it for Android and iOS users. Explore the live app listings on both official app stores.",
      technologies: ["Flutter", "Mobile App Development", "Google Play Console", "App Store Connect"],
      category: "Published Mobile Application",
      icon: Smartphone,
      highlights: [
        "Independently developed the mobile application",
        "Published on Google Play",
        "Published on the Apple App Store",
        "Worked through app release and store submission"
      ],
      playStore: "https://play.google.com/store/apps/details?id=in.co.wellsee",
      appStore: "https://apps.apple.com/in/app/wellsee/id6746031430"
    },
    {
      title: "Advanced AI Voice Assistant",
      description: "Built an AI assistant using NLP and ML with LCD display for voice-based interaction. Aimed at enhancing digital accessibility through natural language processing and embedded systems integration.",
      technologies: ["Python", "NLP", "Machine Learning", "Embedded C", "LCD Display"],
      category: "Academic Major Project",
      icon: Brain,
      highlights: [
        "Natural Language Processing implementation",
        "Machine Learning algorithms for voice recognition",
        "Embedded systems integration with LCD display",
        "Focus on digital accessibility"
      ]
    },
    {
      title: "Smart Resume Analyzer",
      description: "Developed an AI-powered tool to assess resumes and match them with job descriptions. Utilized OpenAI API to suggest skill enhancements and provide detailed analysis for job seekers.",
      technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "OpenAI API"],
      category: "AI/ML Application",
      icon: FileText,
      highlights: [
        "AI-powered resume analysis using OpenAI",
        "Job description matching algorithm",
        "Skill enhancement recommendations",
        "Full-stack web application with Flask"
      ]
    }
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions showcasing my technical expertise and creativity
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass glass-hover p-8 h-full">
                <div className="space-y-6 h-full flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <project.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">{project.category}</Badge>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-primary">Key Highlights</h4>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-primary">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30">
                    {project.playStore && (
                      <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                        <span aria-hidden="true">▶</span> Google Play
                      </a>
                    )}
                    {project.appStore && (
                      <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                        <span aria-hidden="true"></span> App Store
                      </a>
                    )}
                    {!project.playStore && !project.appStore && (
                      <span className="text-xs text-muted-foreground">Project details available on request</span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-6">
            Want to see more projects? Check out my GitHub profile for additional work and contributions.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="https://github.com/rocky-pc" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;