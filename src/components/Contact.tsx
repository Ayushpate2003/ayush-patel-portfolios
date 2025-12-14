import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Mail, Phone, Linkedin, Github, Send, Calendar, Download } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelectorAll(".animate-in"),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: anime.stagger(100),
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "ayushpatel7869595243@gmail.com",
      href: "mailto:ayushpatel7869595243@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7869595243",
      href: "tel:+917869595243",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "ayush-patel-a04515281",
      href: "https://linkedin.com/in/ayush-patel-a04515281",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Ayushpate2003",
      href: "https://github.com/Ayushpate2003",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="animate-in text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
            Get In Touch
          </p>
          <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16 opacity-0">
            Contact
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-in opacity-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg glow-effect"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Links */}
            <div className="space-y-6">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="animate-in opacity-0 flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="font-medium">{link.value}</p>
                  </div>
                </a>
              ))}

              {/* Additional Actions */}
              <div className="animate-in opacity-0 flex flex-col gap-4 pt-6">
                <Button variant="outline" className="w-full py-6" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
                <Button variant="outline" className="w-full py-6" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule a Call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ayush Patel. All rights reserved.
        </p>
      </div>
    </section>
  );
}
