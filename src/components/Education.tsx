import { useEffect, useRef } from "react";
import anime from "animejs";
import { GraduationCap, Award, Calendar, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    specialization: "Cloud Computing & Information Security",
    institution: "Sandip University, Nashik",
    period: "Oct 2024 – Apr 2027",
    gpa: "8.32",
  },
  {
    degree: "Diploma in Computer Science",
    specialization: null,
    institution: "Govt. Polytechnic College, Itarsi, MP",
    period: "Sept 2021 – Apr 2024",
    gpa: "7.4",
  },
];

const certifications = [
  {
    title: "Cyber Security Certificate Program",
    institution: "IIT Jodhpur",
    period: "Oct 2023 – Jan 2024",
    description: "Completed an intensive program covering network security, ethical hacking, and secure system practices.",
  },
  {
    title: "Mobile App Security Bootcamp",
    institution: "CDAC Hyderabad",
    period: "2024",
    description: "Comprehensive training on mobile application security analysis, vulnerability assessment, and secure development practices.",
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollAnimation<HTMLDivElement>("fade-up");
  const eduRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate education section header
            anime({
              targets: ".edu-header",
              opacity: [0, 1],
              translateX: [-30, 0],
              easing: "easeOutExpo",
              duration: 800,
            });

            // Animate education cards from left
            const eduCards = eduRef.current?.querySelectorAll(".edu-card");
            eduCards?.forEach((card, index) => {
              anime({
                targets: card,
                opacity: [0, 1],
                translateX: [-60, 0],
                rotateY: [-10, 0],
                easing: "easeOutExpo",
                duration: 1000,
                delay: 200 + index * 150,
              });
            });

            // Animate certification section header
            anime({
              targets: ".cert-header",
              opacity: [0, 1],
              translateX: [30, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: 400,
            });

            // Animate certification cards from right
            const certCards = certRef.current?.querySelectorAll(".cert-card");
            certCards?.forEach((card, index) => {
              anime({
                targets: card,
                opacity: [0, 1],
                translateX: [60, 0],
                rotateY: [10, 0],
                easing: "easeOutExpo",
                duration: 1000,
                delay: 600 + index * 150,
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
    <section ref={sectionRef} id="education" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef}>
            <p className="animate-item text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
              Credentials
            </p>
            <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16 opacity-0">
              Education & Certifications
            </h2>
          </div>

          {/* Education */}
          <div className="mb-16">
            <h3 className="edu-header flex items-center gap-2 text-xl font-semibold mb-8 opacity-0">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              Education
            </h3>
            <div ref={eduRef} className="grid gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="edu-card opacity-0 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{edu.degree}</h4>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full text-sm">
                      <Star className="h-3 w-3" />
                      GPA: {edu.gpa}
                    </span>
                  </div>
                  {edu.specialization && (
                    <p className="text-muted-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary/50 rounded-full" />
                      Specialization: {edu.specialization}
                    </p>
                  )}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-muted-foreground">
                    <span className="font-medium">{edu.institution}</span>
                    <span className="flex items-center gap-1 text-primary/70">
                      <Calendar className="h-3 w-3" />
                      {edu.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="cert-header flex items-center gap-2 text-xl font-semibold mb-8 opacity-0">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              Certifications
            </h3>
            <div ref={certRef} className="grid gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="cert-card opacity-0 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{cert.title}</h4>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-muted-foreground mb-3">
                    <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full inline-block w-fit">
                      {cert.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {cert.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
