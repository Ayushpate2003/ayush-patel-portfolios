import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Krishi-Drishti",
    subtitle: "Sun Hack Hackathon 2025",
    description: "A platform designed to assist farmers in improving crop growth with accessible, practical solutions for the agricultural sector.",
    details: [
      "Built a comprehensive platform to help farmers optimize crop growth",
      "Designed offline-first features for rural accessibility",
      "Focused on providing actionable insights for agricultural improvement",
    ],
    technologies: ["Web Development", "User Research", "Offline-First Design"],
    featured: true,
  },
  {
    title: "Skill Hub Quiz Website",
    subtitle: "Project – 2023",
    description: "An interactive quiz-based learning platform designed for exam preparation with dynamic quiz modules.",
    details: [
      "Built an interactive quiz-based learning platform for exam preparation",
      "Designed user-friendly interfaces with intuitive navigation",
      "Implemented dynamic quiz modules to enhance user engagement",
    ],
    technologies: ["Web Development", "UI Design", "Interactive Features"],
    featured: false,
  },
  {
    title: "AWS Cloud Project",
    subtitle: "Project – 2024",
    description: "Cloud-based solution leveraging AWS EC2 and S3 services for scalable application deployment.",
    details: [
      "Implemented a cloud-based solution using AWS EC2 and S3 services",
      "Focused on scalability and efficient storage management",
      "Configured deployment pipelines for application hosting",
    ],
    technologies: ["AWS EC2", "AWS S3", "Cloud Architecture"],
    featured: true,
  },
  {
    title: "Docker-Based Project",
    subtitle: "Containerization Project",
    description: "Application containerization using Docker for consistent development and deployment environments.",
    details: [
      "Containerized applications with Docker for consistent environments",
      "Reduced deployment issues across different platforms",
      "Improved resource utilization and deployment efficiency",
    ],
    technologies: ["Docker", "Containerization", "DevOps"],
    featured: false,
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelectorAll(".project-card"),
              opacity: [0, 1],
              translateY: [40, 0],
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

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const card = e.currentTarget;
    if (isEntering) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      anime({
        targets: card,
        rotateX: -y / 20,
        rotateY: x / 20,
        translateZ: 20,
        duration: 300,
        easing: "easeOutQuad",
      });
    } else {
      anime({
        targets: card,
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
            Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
            Selected Projects
          </h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card opacity-0 perspective-1000 ${
                  project.featured ? "md:row-span-1" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div
                  className={`h-full p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group ${
                    project.featured ? "bg-gradient-to-br from-card to-secondary/50" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.featured && (
                    <span className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full mb-4">
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">{selectedProject.title}</h3>
                <p className="text-muted-foreground">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
            
            <h4 className="font-semibold mb-3">Key Achievements</h4>
            <ul className="space-y-2 mb-6">
              {selectedProject.details.map((detail, i) => (
                <li key={i} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {detail}
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-secondary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
