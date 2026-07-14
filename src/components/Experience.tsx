import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: "Wellsee Bundle Technology Pvt Ltd",
      role: "Full Stack Developer",
      location: "Puducherry",
      duration: "November 2025 – June 2026",
      projects: [
        {
          name: "Wellsee Food Delivery & Ecosystem",
          description: "Engineered and deployed a high-traffic food delivery ecosystem, managing the full lifecycle from backend architecture to global App Store and Play Store publishing. Developed cross-platform mobile applications using Flutter, ensuring a high-performance, native-feel experience across iOS and Android. Architected robust backend services using PHP (Laravel), optimizing database queries and API response times for real-time order tracking.",
          technologies: ["Flutter", "PHP (Laravel)", "MySQL", "Hostinger Shared Hosting", "App Store Connect", "Google Play Console"],
          impact: "Delivered a complete food delivery ecosystem with successful global app store publishing"
        }
      ],
      responsibilities: [
        "Infrastructure & DevOps: Managed cloud hosting environments on Hostinger and AWS, configuring SSL (HTTPS) and automated deployment pipelines",
        "App Lifecycle Management: Successfully navigated the Apple App Store and Google Play Console submission processes, including version control (v1.0.2) and resolving complex build validation issues"
      ]
    },
    {
      company: "Assure Rig Safety Tech Solutions",
      role: "Software Developer",
      location: "Cuddalore",
      duration: "April 2025 – November 2025",
      projects: [
        {
          name: "Digital Work Permit System",
          description: "Developed a secure, digital permit management system for Saudi Arabia-based oil industry client. Enabled permit creation, Role-based access, approval, tracking, and PDF reporting.",
          technologies: ["React", "TypeScript", "FastAPI", "SQLite", "AWS EC2", "AWS S3", "HTTPS", "PyInstaller"],
          impact: "Streamlined permit management process for enterprise oil & gas operations"
        },
        {
          name: "Stop Card Analysis Platform",
          description: "Built a full-stack analytics solution for monitoring safety observations and performance trends. Included chart visualizations and cloud-based data sync.",
          technologies: ["React", "TypeScript", "Python", "SQLite", "AWS"],
          impact: "Enhanced safety monitoring capabilities with real-time analytics"
        }
      ],
      responsibilities: [
        "Full project lifecycle: requirement gathering, UI/UX, backend API, database design, deployment, and client demo"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building enterprise solutions in the oil & gas industry
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="glass glass-hover p-8 reveal-up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">{exp.company}</h3>
                  </div>
                  <h4 className="text-xl gradient-accent-text font-semibold">{exp.role}</h4>
                </div>
                <div className="flex flex-col md:items-end space-y-1 mt-4 md:mt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-lg font-semibold mb-3">Key Projects</h5>
                  <div className="space-y-6">
                    {exp.projects.map((project, pIndex) => (
                      <div key={pIndex} className="border-l-2 border-primary/30 pl-6 space-y-3">
                        <div>
                          <h6 className="text-lg font-semibold text-primary">{project.name}</h6>
                          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-accent font-medium">
                          💡 {project.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-3">Key Responsibilities</h5>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, rIndex) => (
                      <li key={rIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
