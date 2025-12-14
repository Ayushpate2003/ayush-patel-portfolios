import { useEffect, useRef } from "react";
import anime from "animejs";
import { GraduationCap, Award, Calendar } from "lucide-react";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelectorAll(".animate-card"),
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

  return (
    <section ref={sectionRef} id="education" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
            Credentials
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
            Education & Certifications
          </h2>

          {/* Education */}
          <div className="mb-16">
            <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h3>
            <div className="grid gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="animate-card opacity-0 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h4 className="text-lg font-bold">{edu.degree}</h4>
                    <span className="text-primary font-semibold">GPA: {edu.gpa}</span>
                  </div>
                  {edu.specialization && (
                    <p className="text-muted-foreground mb-2">
                      Specialization: {edu.specialization}
                    </p>
                  )}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-muted-foreground">
                    <span>{edu.institution}</span>
                    <span className="flex items-center gap-1">
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
            <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
              <Award className="h-6 w-6 text-primary" />
              Certifications
            </h3>
            <div className="grid gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="animate-card opacity-0 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300"
                >
                  <h4 className="text-lg font-bold mb-2">{cert.title}</h4>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-muted-foreground mb-3">
                    <span className="text-primary font-medium">{cert.institution}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {cert.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
