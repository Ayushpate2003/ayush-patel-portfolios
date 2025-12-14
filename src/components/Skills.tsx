import { useEffect, useRef } from "react";
import anime from "animejs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Cloud, Layout, Code, Terminal, Sparkles, Blocks, Wrench, Users } from "lucide-react";

const skillCategories = [
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS EC2", "AWS S3", "Cloud Architecture", "Docker", "Containerization", "Resource Optimization"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Frontend (React)",
    icon: Layout,
    skills: ["Component Development", "State Management", "API Integration", "Responsive Design", "Performance Optimization"],
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    title: "Programming & Tech Stack",
    icon: Code,
    skills: ["MERN Stack", "Python", "Version Control (Git)", "JavaScript", "TypeScript"],
    color: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Linux & System Administration",
    icon: Terminal,
    skills: ["System Commands", "Shell Scripting", "User & File Management", "Networking", "Administration", "Troubleshooting"],
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "AI & Generative AI Tools",
    icon: Sparkles,
    skills: ["ChatGPT", "Google Gemini", "Hugging Face Transformers", "MidJourney", "DALL·E", "Runway ML", "Prompt Engineering"],
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "No-Code & AI Platforms",
    icon: Blocks,
    skills: ["Lovable AI", "Notion AI", "Canva AI", "Figma AI Plugins"],
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Tools & Collaboration",
    icon: Wrench,
    skills: ["MS Office", "JIRA", "Trello", "Asana", "Slack", "Power BI", "Excel"],
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Research", "Storytelling", "Content Creation", "UX Thinking", "Team Leadership", "Cross-team Communication"],
    color: "from-yellow-500/20 to-orange-500/20",
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollAnimation<HTMLDivElement>("fade-up");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = gridRef.current?.querySelectorAll(".skill-card");
            cards?.forEach((card, index) => {
              // Staggered scale and fade animation
              anime({
                targets: card,
                opacity: [0, 1],
                translateY: [40, 0],
                scale: [0.9, 1],
                easing: "easeOutElastic(1, .7)",
                duration: 1000,
                delay: index * 80,
              });

              // Animate skills inside each card after card appears
              const skills = card.querySelectorAll(".skill-item");
              anime({
                targets: skills,
                opacity: [0, 1],
                translateX: [-20, 0],
                easing: "easeOutExpo",
                duration: 600,
                delay: anime.stagger(40, { start: 300 + index * 80 }),
              });
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
      translateY: isEntering ? -8 : 0,
      boxShadow: isEntering
        ? "0 25px 50px -12px hsl(var(--primary) / 0.15)"
        : "0 0 0 0 transparent",
      duration: 300,
      easing: "easeOutQuad",
    });

    // Animate icon
    const icon = card.querySelector(".skill-icon");
    anime({
      targets: icon,
      rotate: isEntering ? [0, 10] : [10, 0],
      scale: isEntering ? 1.1 : 1,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef}>
            <p className="animate-item text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
              Expertise
            </p>
            <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16 opacity-0">
              Skills Matrix
            </h2>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="skill-card opacity-0"
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className={`h-full p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 bg-gradient-to-br ${category.color}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="skill-icon p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">
                        {category.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {category.skills.map((skill, i) => (
                        <li
                          key={i}
                          className="skill-item text-sm text-muted-foreground flex items-center gap-2 opacity-0 hover:text-foreground transition-colors group"
                        >
                          <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
