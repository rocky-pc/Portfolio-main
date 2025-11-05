import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to API)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold gradient-text">Contact Us</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Merchant Information */}
            <Card className="glass-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Merchant Information
                </CardTitle>
                <CardDescription>Our legal and operational details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">Merchant Legal Entity Name:</Label>
                  <p className="text-muted-foreground">Jegathesh</p>
                </div>
                <Separator />
                <div>
                  <Label className="font-semibold">Registered Address:</Label>
                  <p className="text-muted-foreground">
                    NADU STREET, CUDDALORE O.T, Cuddalore Old Town, Tamil Nadu, PIN: 607003
                  </p>
                </div>
                <div>
                  <Label className="font-semibold">Operational Address:</Label>
                  <p className="text-muted-foreground">
                    NADU STREET, CUDDALORE O.T, Cuddalore Old Town, Tamil Nadu, PIN: 607003
                  </p>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-semibold mr-2">Telephone No:</span>
                  <p className="text-muted-foreground">7339004705</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-semibold mr-2">E-Mail ID:</span>
                  <p className="text-muted-foreground">sjega82@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="glass-hover">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'd love to hear from you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;