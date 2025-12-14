import { useEffect, useRef } from "react";
import anime from "animejs";
import { Github, Linkedin, Mail, ArrowDown, MousePointer } from "lucide-react";
import { Button } from "./ui/button";
import { Vortex } from "./ui/vortex";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial tagline reveal
    anime({
      targets: taglineRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      easing: "easeOutExpo",
      duration: 800,
      delay: 100,
    });

    // Split title into spans for letter animation
    if (titleRef.current) {
      const text = "Ayush Patel";
      titleRef.current.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block opacity-0 translate-y-12">${char}</span>`
        )
        .join("");

      // Staggered letter reveal with wave effect
      anime({
        targets: titleRef.current.querySelectorAll("span"),
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [-90, 0],
        scale: [0.5, 1],
        easing: "easeOutElastic(1, .8)",
        duration: 1400,
        delay: anime.stagger(60, { start: 400 }),
      });
    }

    // Subtitle blur-in effect
    anime({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      filter: ["blur(10px)", "blur(0px)"],
      easing: "easeOutExpo",
      duration: 1000,
      delay: 1000,
    });

    // CTA buttons spring animation
    anime({
      targets: ctaRef.current?.children,
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.9, 1],
      easing: "easeOutElastic(1, .6)",
      duration: 1200,
      delay: anime.stagger(120, { start: 1400 }),
    });

    // Social links slide in with rotation
    anime({
      targets: socialRef.current?.children,
      opacity: [0, 1],
      translateX: [-30, 0],
      rotate: [-10, 0],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(80, { start: 1800 }),
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Vortex
        backgroundColor="hsl(var(--background))"
        baseHue={170}
        rangeY={200}
        particleCount={500}
        baseSpeed={0.1}
        rangeSpeed={1.0}
        className="flex items-center justify-center min-h-screen w-full"
        containerClassName="min-h-screen"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Social links - left side on desktop */}
            <div
              ref={socialRef}
              className="hidden lg:flex flex-col gap-4 fixed left-8 top-1/2 -translate-y-1/2 z-50"
            >
              <a
                href="https://github.com/Ayushpate2003"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="https://linkedin.com/in/ayush-patel-a04515281"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Linkedin className="h-5 w-5 transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="mailto:ayushpatel7869595243@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:rotate-12" />
              </a>
              <div className="w-px h-24 bg-gradient-to-b from-border to-transparent mx-auto mt-4" />
            </div>

            {/* Main content */}
            <p 
              ref={taglineRef}
              className="text-primary font-medium mb-4 tracking-wider uppercase text-sm opacity-0"
            >
              Cloud Computing · Information Security · Frontend Development
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
              Transforming complex challenges into scalable cloud solutions and secure, user-centric applications
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center mb-24">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-medium glow-effect group overflow-hidden relative"
                asChild
              >
                <a href="#projects">
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-medium border-2 hover:bg-secondary group"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Get In Touch
                  <MousePointer className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </a>
              </Button>
            </div>

            {/* Mobile social links */}
            <div className="flex lg:hidden gap-4 justify-center mb-12">
              <a
                href="https://github.com/Ayushpate2003"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/ayush-patel-a04515281"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ayushpatel7869595243@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <a 
            href="#about" 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors p-4 z-20"
          >
            <div className="flex flex-col items-center gap-1">
              <ArrowDown className="h-6 w-6 animate-bounce" />
            </div>
          </a>
        </div>
      </Vortex>
    </section>
  );
}
