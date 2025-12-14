import { useEffect, useRef } from "react";
import anime from "animejs";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate section content
            anime({
              targets: sectionRef.current?.querySelectorAll(".animate-in"),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: anime.stagger(100),
            });

            // Animate stats counters
            const statNumbers = statsRef.current?.querySelectorAll(".stat-number");
            statNumbers?.forEach((stat) => {
              const target = parseInt(stat.getAttribute("data-target") || "0");
              anime({
                targets: stat,
                innerHTML: [0, target],
                round: 1,
                easing: "easeOutExpo",
                duration: 2000,
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
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
      className="py-24 lg:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="animate-in text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
            About Me
          </p>
          <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 opacity-0">
            Professional Summary
          </h2>
          
          <p className="animate-in text-lg text-muted-foreground leading-relaxed mb-8 opacity-0">
            Computer Science graduate with a Diploma and B.Tech specializing in Cloud Computing 
            and Information Security from Sandip University, Nashik. Experienced through hands-on 
            internships in cloud development, frontend engineering, and IT infrastructure. 
            Demonstrated ability to build scalable solutions through academic projects, hackathon 
            participation, and professional certification programs.
          </p>
          
          <p className="animate-in text-lg text-muted-foreground leading-relaxed mb-12 opacity-0">
            Focused on implementing secure, efficient cloud architectures while delivering 
            responsive, user-centric web interfaces. Committed to continuous learning and 
            practical application of emerging technologies.
          </p>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="animate-in text-center opacity-0">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <span className="stat-number" data-target="4">0</span>+
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="animate-in text-center opacity-0">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <span className="stat-number" data-target="3">0</span>
              </div>
              <p className="text-muted-foreground">Internships</p>
            </div>
            <div className="animate-in text-center opacity-0">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <span className="stat-number" data-target="2">0</span>
              </div>
              <p className="text-muted-foreground">Certifications</p>
            </div>
            <div className="animate-in text-center opacity-0">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <span className="stat-number" data-target="1">0</span>
              </div>
              <p className="text-muted-foreground">Hackathon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
