import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Server, ShoppingCart } from 'lucide-react';

const services = [
  {
    title: "Web Applications",
    description: "Building modern, responsive, and scalable web applications tailored to your needs.",
    icon: Globe,
  },
  {
    title: "Hosting",
    description: "Reliable and secure hosting solutions to ensure your application is always available.",
    icon: Server,
  },
  {
    title: "Domain Buy",
    description: "Helping you find and purchase the perfect domain name for your business.",
    icon: ShoppingCart,
  },
];

const Service = () => {
  return (
    <section id="service" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Providing top-notch services to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="reveal-up">
              <Card className="glass glass-hover h-full">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
