import { useEffect, useRef } from "react";
import anime from "animejs";
import { Briefcase, Calendar, MapPin } from "lucide-react";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelectorAll(".timeline-item"),
              opacity: [0, 1],
              translateX: (el: Element, i: number) => [i % 2 === 0 ? -50 : 50, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: anime.stagger(200),
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

  return (
    <section ref={sectionRef} id="experience" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
            Career Path
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
            Experience
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-12 opacity-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 -translate-x-1/2 mt-2 z-10" />

                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
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
                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
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
