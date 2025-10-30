import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award } from 'lucide-react';

const About = () => {
  const highlights = [
    "Enterprise-level client experience in oil & gas industry",
    "Full-stack development with React, Python, and AWS",
    "Expert in cloud deployment and offline application packaging",
    "Proven track record in scalable and secure solutions"
  ];

  const education = {
    degree: "Bachelor of Technology (Information Technology)",
    institution: "Manakula Vinayagar Institute of Technology",
    year: "2024",
    cgpa: "7.4"
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover my journey as a passionate full-stack developer
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 reveal-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold gradient-accent-text">Professional Summary</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionate and adaptable Full-Stack Software Developer with hands-on experience in 
                developing and deploying web applications for enterprise-level clients in the oil and gas industry. 
                Currently working at <span className="text-primary font-medium">Assure Rig Safety Tech Solutions</span>, 
                with a proven track record of building scalable and secure solutions.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold">Key Strengths</h4>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Cuddalore, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 reveal-right">
            <Card className="glass glass-hover p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h4 className="text-xl font-semibold">Education</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-primary">{education.degree}</h5>
                  <p className="text-muted-foreground">{education.institution}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Graduated: {education.year}</span>
                  <Badge variant="secondary">CGPA: {education.cgpa}</Badge>
                </div>
              </div>
            </Card>

            <Card className="glass glass-hover p-6">
              <h4 className="text-xl font-semibold mb-4">Certifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Complete Fullstack in Python Programming</span>
                  <Badge variant="outline">ISO Certified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fundamentals of Digital Marketing</span>
                  <Badge variant="outline">Google</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AWS Academy Cloud Foundation</span>
                  <Badge variant="outline">AWS</Badge>
                </div>
              </div>
            </Card>

            <Card className="glass glass-hover p-6">
              <h4 className="text-xl font-semibold mb-4">Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span className="text-sm">1st Prize - Technical Connection Quiz (MVIT)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span className="text-sm">1st Prize - Technical Quiz (MVIT)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;