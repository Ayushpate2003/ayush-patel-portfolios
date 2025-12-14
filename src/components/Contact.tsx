import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Mail, Phone, Linkedin, Github, Send, Calendar, Download, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollAnimation<HTMLDivElement>("fade-up");
  const formRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
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
            // Animate form from left
            anime({
              targets: formRef.current,
              opacity: [0, 1],
              translateX: [-60, 0],
              easing: "easeOutExpo",
              duration: 1000,
              delay: 200,
            });

            // Animate form fields with stagger
            const formFields = formRef.current?.querySelectorAll(".form-field");
            anime({
              targets: formFields,
              opacity: [0, 1],
              translateY: [20, 0],
              easing: "easeOutExpo",
              duration: 600,
              delay: anime.stagger(100, { start: 400 }),
            });

            // Animate contact links from right with stagger
            const links = linksRef.current?.querySelectorAll(".contact-link");
            links?.forEach((link, index) => {
              anime({
                targets: link,
                opacity: [0, 1],
                translateX: [60, 0],
                scale: [0.9, 1],
                easing: "easeOutElastic(1, .7)",
                duration: 1000,
                delay: 300 + index * 100,
              });
            });

            // Animate action buttons
            anime({
              targets: ".action-button",
              opacity: [0, 1],
              translateY: [30, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: anime.stagger(100, { start: 800 }),
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
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
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef}>
            <p className="animate-item text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
              Get In Touch
            </p>
            <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16 opacity-0">
              Contact
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="opacity-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field opacity-0">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field opacity-0">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="form-field opacity-0">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-field opacity-0 w-full py-6 text-lg glow-effect group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>

            {/* Contact Links */}
            <div ref={linksRef} className="space-y-6">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-link opacity-0 flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="font-medium group-hover:text-primary transition-colors">{link.value}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}

              {/* Additional Actions */}
              <div className="flex flex-col gap-4 pt-6">
                <Button variant="outline" className="action-button opacity-0 w-full py-6 group" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                    Download Resume
                  </a>
                </Button>
                <Button variant="outline" className="action-button opacity-0 w-full py-6 group" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5 transition-transform group-hover:scale-110" />
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ayush Patel. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with passion using React & Tailwind
          </p>
        </div>
      </div>
    </section>
  );
}
