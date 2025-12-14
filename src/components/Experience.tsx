import { useEffect, useRef } from "react";
import anime from "animejs";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    title: "Front-End Developer Intern",
    company: "Miraiyantra Pvt. Ltd",
    location: "Nashik, MH",
    period: "Present",
    responsibilities: [
      "Developing responsive and user-friendly web interfaces using modern front-end technologies",
      "Collaborating with designers and backend developers to enhance UI/UX",
      "Assisting in feature implementation, testing, and bug fixing for live applications",
    ],
    tags: ["React", "UI/UX", "Responsive Design"],
  },
  {
    title: "Cloud Developer Intern",
    company: "Ediglobe",
    location: "Pune, MH",
    period: "2025",
    responsibilities: [
      "Worked on developing and deploying cloud-based solutions for scalable applications",
      "Assisted in configuring cloud infrastructure and optimizing resource usage",
      "Collaborated with the team on automation scripts and cloud service integrations",
    ],
    tags: ["Cloud", "Infrastructure", "Automation"],
  },
  {
    title: "Computer Hardware Intern",
    company: "BSM Cement Products",
    location: "Khandwa, MP",
    period: "2023",
    responsibilities: [
      "Managed and maintained computer hardware systems to ensure smooth business operations",
      "Provided technical support, troubleshooting, and repair for on-site IT infrastructure",
      "Assisted in system upgrades and hardware installations to improve efficiency",
    ],
    tags: ["Hardware", "IT Support", "Troubleshooting"],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollAnimation<HTMLDivElement>("fade-up");
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate timeline line drawing
            anime({
              targets: ".timeline-line",
              height: ["0%", "100%"],
              easing: "easeInOutQuad",
              duration: 1500,
            });

            // Animate timeline items with alternating directions
            const items = timelineRef.current?.querySelectorAll(".timeline-item");
            items?.forEach((item, index) => {
              const isEven = index % 2 === 0;
              
              // Animate the dot
              anime({
                targets: item.querySelector(".timeline-dot"),
                scale: [0, 1],
                easing: "easeOutElastic(1, .5)",
                duration: 800,
                delay: 300 + index * 250,
              });

              // Animate the card
              anime({
                targets: item.querySelector(".timeline-card"),
                opacity: [0, 1],
                translateX: [isEven ? -60 : 60, 0],
                rotateY: [isEven ? -10 : 10, 0],
                easing: "easeOutExpo",
                duration: 1000,
                delay: 400 + index * 250,
              });
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

  return (
    <section ref={sectionRef} id="experience" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef}>
            <p className="animate-item text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
              Career Path
            </p>
            <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16 opacity-0">
              Experience
            </h2>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 overflow-hidden">
              <div className="timeline-line w-full bg-gradient-to-b from-primary via-primary to-primary/20 h-0" />
            </div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-0 md:left-1/2 w-5 h-5 bg-background border-4 border-primary rounded-full md:-translate-x-1/2 -translate-x-1/2 mt-2 z-10 scale-0">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                </div>

                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div 
                    className="timeline-card opacity-0 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/5 bg-gradient-to-br from-primary/5 to-secondary/50"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2 group/item">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 transition-transform group-hover/item:translate-x-1" />
                          <span className="group-hover/item:text-foreground transition-colors">{resp}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-background/50 backdrop-blur-sm rounded-full text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
