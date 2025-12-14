import { useEffect, useRef } from "react";
import anime from "animejs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headingRef = useScrollAnimation<HTMLDivElement>("fade-right", { delay: 0 });
  const contentRef = useScrollAnimation<HTMLDivElement>("fade-left", { delay: 200 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate stats counters with enhanced effect
            const statItems = statsRef.current?.querySelectorAll(".stat-item");
            
            statItems?.forEach((item, index) => {
              const numberEl = item.querySelector(".stat-number");
              const target = parseInt(numberEl?.getAttribute("data-target") || "0");
              
              // Animate the container first
              anime({
                targets: item,
                opacity: [0, 1],
                translateY: [50, 0],
                scale: [0.8, 1],
                easing: "easeOutElastic(1, .6)",
                duration: 1000,
                delay: index * 150,
              });
              
              // Then animate the counter
              anime({
                targets: numberEl,
                innerHTML: [0, target],
                round: 1,
                easing: "easeOutExpo",
                duration: 2500,
                delay: 300 + index * 150,
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef}>
            <p className="animate-item text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
              About Me
            </p>
            <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 opacity-0">
              Professional Summary
            </h2>
          </div>
          
          <div ref={contentRef}>
            <p className="animate-item text-lg text-muted-foreground leading-relaxed mb-8 opacity-0">
              Computer Science graduate with a Diploma and B.Tech specializing in Cloud Computing 
              and Information Security from Sandip University, Nashik. Experienced through hands-on 
              internships in cloud development, frontend engineering, and IT infrastructure. 
              Demonstrated ability to build scalable solutions through academic projects, hackathon 
              participation, and professional certification programs.
            </p>
            
            <p className="animate-item text-lg text-muted-foreground leading-relaxed mb-12 opacity-0">
              Focused on implementing secure, efficient cloud architectures while delivering 
              responsive, user-centric web interfaces. Committed to continuous learning and 
              practical application of emerging technologies.
            </p>
          </div>

          {/* Stats with enhanced animations */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="stat-item text-center opacity-0 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 relative">
                  <span className="stat-number" data-target="4">0</span>+
                </div>
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Projects Completed</p>
            </div>
            <div className="stat-item text-center opacity-0 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 relative">
                  <span className="stat-number" data-target="3">0</span>
                </div>
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Internships</p>
            </div>
            <div className="stat-item text-center opacity-0 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 relative">
                  <span className="stat-number" data-target="2">0</span>
                </div>
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Certifications</p>
            </div>
            <div className="stat-item text-center opacity-0 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 relative">
                  <span className="stat-number" data-target="1">0</span>
                </div>
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Hackathon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
