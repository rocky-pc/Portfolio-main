import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  ExternalLink,
  Send,
  MessageCircle
} from 'lucide-react';

const Contact = () => {
  const contactInfo = {
    email: "sjega82@gmail.com",
    phone: "+91 7339004705",
    location: "Cuddalore, Tamil Nadu - 607003"
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/rocky-pc",
      description: "Explore my code repositories and contributions"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/jegathesh-developer",
      description: "Connect with me professionally"
    }
  ];

  const blogs = [
    {
      title: "Career & Tech Blog",
      description: "Insights on software development and career growth",
      url: "https://sjega82.wixsite.com/jegatheshwrites"
    },
    {
      title: "Zoho Books Guide",
      description: "Comprehensive guide for using Zoho Books effectively",
      url: "https://sjega82.wixsite.com/zoho-books-guide"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next project or discuss new opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 reveal-left">
            <Card className="glass glass-hover p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-accent-text">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-lg hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-lg hover:text-primary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass glass-hover p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-accent-text">Social Links</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-card-glass/50 transition-colors group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{link.name}</h4>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Call to Action & Blogs */}
          <div className="space-y-8 reveal-right">
            <Card className="glass glass-hover p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-accent-text">Ready to Collaborate?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects, 
                and ways to contribute to meaningful software development initiatives. 
                Whether you're looking for a full-stack developer or want to collaborate on something exciting, 
                I'd love to hear from you!
              </p>
              
              <div className="space-y-8">
                <a href={`mailto:${contactInfo.email}`} className="w-full">
                  <Button variant="hero" size="lg" className="w-full group">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Email
                  </Button>
                </a>
                
                <a href={`tel:${contactInfo.phone}`} className="w-full">
                  <Button variant="glass" size="lg" className="w-full group">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Schedule a Call
                  </Button>
                </a>
              </div>

              <div className="mt-6 p-4 bg-card-glass/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-primary">Current Status:</strong> Open to new opportunities and freelance projects
                </p>
              </div>
            </Card>

            <Card className="glass glass-hover p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-accent-text">Featured Blogs</h3>
              <div className="space-y-4">
                {blogs.map((blog, index) => (
                  <a
                    key={index}
                    href={blog.url}
                    className="block p-4 rounded-lg hover:bg-card-glass/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{blog.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{blog.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/30">
                <Badge variant="outline" className="w-full justify-center py-2">
                  More content coming soon...
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;