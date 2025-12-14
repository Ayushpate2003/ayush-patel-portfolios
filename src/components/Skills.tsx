import { useEffect, useRef } from "react";
import anime from "animejs";

const skillCategories = [
  {
    title: "Cloud & DevOps",
    skills: ["AWS EC2", "AWS S3", "Cloud Architecture", "Docker", "Containerization", "Resource Optimization"],
  },
  {
    title: "Frontend (React)",
    skills: ["Component Development", "State Management", "API Integration", "Responsive Design", "Performance Optimization"],
  },
  {
    title: "Programming & Tech Stack",
    skills: ["MERN Stack", "Python", "Version Control (Git)", "JavaScript", "TypeScript"],
  },
  {
    title: "Linux & System Administration",
    skills: ["System Commands", "Shell Scripting", "User & File Management", "Networking", "Administration", "Troubleshooting"],
  },
  {
    title: "AI & Generative AI Tools",
    skills: ["ChatGPT", "Google Gemini", "Hugging Face Transformers", "MidJourney", "DALL·E", "Runway ML", "Prompt Engineering"],
  },
  {
    title: "No-Code & AI Platforms",
    skills: ["Lovable AI", "Notion AI", "Canva AI", "Figma AI Plugins"],
  },
  {
    title: "Tools & Collaboration",
    skills: ["MS Office", "JIRA", "Trello", "Asana", "Slack", "Power BI", "Excel"],
  },
  {
    title: "Soft Skills",
    skills: ["Research", "Storytelling", "Content Creation", "UX Thinking", "Team Leadership", "Cross-team Communication"],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelectorAll(".skill-card"),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: "easeOutExpo",
              duration: 600,
              delay: anime.stagger(80),
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

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const card = e.currentTarget;
    anime({
      targets: card,
      translateZ: isEntering ? 30 : 0,
      boxShadow: isEntering
        ? "0 25px 50px -12px hsl(var(--primary) / 0.15)"
        : "0 0 0 0 transparent",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
            Expertise
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
            Skills Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="skill-card opacity-0 perspective-1000"
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="h-full p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                  <h3 className="font-semibold text-lg mb-4 text-primary">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
