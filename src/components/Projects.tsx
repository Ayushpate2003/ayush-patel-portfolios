import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ExternalLink, X, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const headingRef = useScrollAnimation<HTMLDivElement>("fade-up");
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards with staggered reveal
            const cards = gridRef.current?.querySelectorAll(".project-card");
            cards?.forEach((card, index) => {
              anime({
                targets: card,
                opacity: [0, 1],
                translateY: [60, 0],
                rotateX: [15, 0],
                scale: [0.9, 1],
                easing: "easeOutExpo",
                duration: 1000,
                delay: index * 150,
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

  // Modal animation
  useEffect(() => {
    if (selectedProject) {
      anime({
        targets: ".modal-backdrop",
        opacity: [0, 1],
        easing: "easeOutQuad",
        duration: 300,
      });
      anime({
        targets: ".modal-content",
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [30, 0],
        easing: "easeOutElastic(1, .8)",
        duration: 600,
      });
    }
  }, [selectedProject]);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const card = e.currentTarget;
    if (isEntering) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      anime({
        targets: card,
        rotateX: -y / 15,
        rotateY: x / 15,
        translateZ: 30,
        boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.2)",
        duration: 400,
        easing: "easeOutQuad",
      });
    } else {
      anime({
        targets: card,
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        boxShadow: "0 0 0 0 transparent",
        duration: 600,
        easing: "easeOutElastic(1, .5)",
      });
    }
  };

  const closeModal = () => {
    anime({
      targets: ".modal-backdrop",
      opacity: 0,
      easing: "easeOutQuad",
      duration: 200,
    });
    anime({
      targets: ".modal-content",
      opacity: 0,
      scale: 0.95,
      easing: "easeOutQuad",
      duration: 200,
      complete: () => setSelectedProject(null),
    });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef}>
            <p className="animate-item text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0">
              Portfolio
            </p>
            <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-16 opacity-0">
              Selected Projects
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card opacity-0"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                onMouseMove={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div
                  className="h-full p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-primary/5 via-transparent to-secondary/30"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full mb-4 border border-primary/20">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground mb-6 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-background/50 backdrop-blur-sm rounded-full text-muted-foreground border border-border/50 group-hover:border-primary/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4" />
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
          className="modal-backdrop fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={closeModal}
        >
          <div
            className="modal-content bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                {selectedProject.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full mb-3 border border-primary/20">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-1">{selectedProject.title}</h3>
                <p className="text-muted-foreground">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-secondary rounded-lg transition-colors group"
              >
                <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
            
            <h4 className="font-semibold mb-3 text-primary">Key Achievements</h4>
            <ul className="space-y-3 mb-6">
              {selectedProject.details.map((detail, i) => (
                <li key={i} className="text-muted-foreground flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="hover:text-foreground transition-colors">{detail}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-3 text-primary">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors"
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
