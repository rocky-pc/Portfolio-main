import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Database, 
  Cloud, 
  Wrench, 
  Globe, 
  Smartphone,
  Server,
  GitBranch
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "C#", "HTML5", "CSS3"],
      color: "text-blue-400"
    },
    {
      title: "Frontend Development",
      icon: Globe,
      skills: ["React.js", "HTML5", "CSS3", "JavaScript", "TypeScript", "Responsive Design"],
      color: "text-green-400"
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: ["Node.js", "Flask", "FastAPI", ".NET", "RESTful APIs", "Microservices"],
      color: "text-purple-400"
    },
    {
      title: "Database Systems",
      icon: Database,
      skills: ["SQLite", "MySQL", "Database Design", "Query Optimization"],
      color: "text-orange-400"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS EC2", "AWS S3", "Git", "GitHub", "PyInstaller", "Linux", "Windows"],
      color: "text-cyan-400"
    },
    {
      title: "Development Tools",
      icon: Wrench,
      skills: ["VS Code", "Git", "GitHub", "PyInstaller", "EXE Builds", "API Development"],
      color: "text-red-400"
    }
  ];

  const specializations = [
    "Full-Stack Web Development",
    "Enterprise Application Development",
    "Cloud Deployment & Management",
    "Offline-first Applications",
    "API Development & Integration",
    "Database Design & Optimization"
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across the full development stack
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass glass-hover p-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-card-glass rounded-lg ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className="text-xs hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass glass-hover p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                <span className="gradient-accent-text">Specializations</span>
              </h3>
              <p className="text-muted-foreground">
                Areas where I excel and deliver exceptional results
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {specializations.map((specialization, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-card-glass/50 transition-colors"
                >
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{specialization}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-muted-foreground mb-6">
            Always learning and staying updated with the latest technologies and best practices in software development.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="px-4 py-2">
              <GitBranch className="w-4 h-4 mr-2" />
              Continuous Learning
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Smartphone className="w-4 h-4 mr-2" />
              Agile Development
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Code2 className="w-4 h-4 mr-2" />
              Clean Code Practices
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;