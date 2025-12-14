import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Split title into spans for letter animation
    if (titleRef.current) {
      const text = "Ayush Patel";
      titleRef.current.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block opacity-0">${char}</span>`
        )
        .join("");

      // Staggered letter reveal animation
      anime({
        targets: titleRef.current.querySelectorAll("span"),
        opacity: [0, 1],
        translateY: [40, 0],
        rotateX: [-90, 0],
        easing: "easeOutExpo",
        duration: 1200,
        delay: anime.stagger(50, { start: 300 }),
      });
    }

    // Subtitle fade in
    anime({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutExpo",
      duration: 1000,
      delay: 800,
    });

    // CTA buttons animation
    anime({
      targets: ctaRef.current?.children,
      opacity: [0, 1],
      translateY: [30, 0],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(100, { start: 1200 }),
    });

    // Social links animation
    anime({
      targets: socialRef.current?.children,
      opacity: [0, 1],
      translateX: [-20, 0],
      easing: "easeOutExpo",
      duration: 600,
      delay: anime.stagger(100, { start: 1500 }),
    });
  }, []);

  // Mouse parallax effect for glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 100;
      const y = (clientY / window.innerHeight - 0.5) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <div
        ref={glowRef}
        className="hero-glow animate-pulse-glow"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social links - left side on desktop */}
          <div
            ref={socialRef}
            className="hidden lg:flex flex-col gap-4 fixed left-8 top-1/2 -translate-y-1/2"
          >
            <a
              href="https://github.com/ayushpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://linkedin.com/in/ayushpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            >
              <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="mailto:ayush@example.com"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <div className="w-px h-24 bg-border mx-auto mt-4" />
          </div>

          {/* Main content */}
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
            Full-Stack Developer
          </p>

          <h1
            ref={titleRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 perspective-1000"
          >
            Ayush Patel
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0"
          >
            Cloud Computing & Security Specialist crafting robust, scalable solutions
            with modern technologies
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-medium glow-effect"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium border-2 hover:bg-secondary"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          {/* Mobile social links */}
          <div className="flex lg:hidden gap-4 justify-center mb-12">
            <a
              href="https://github.com/ayushpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/ayushpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:ayush@example.com"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
