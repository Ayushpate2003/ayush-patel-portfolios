import { useEffect, useRef, useState } from "react";
import anime from "animejs";

type AnimationVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "scale" 
  | "blur"
  | "rotate"
  | "stagger-up"
  | "stagger-left"
  | "stagger-right";

interface UseScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  variant: AnimationVariant = "fade-up",
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const {
    threshold = 0.15,
    delay = 0,
    duration = 800,
    staggerDelay = 100,
    once = true,
  } = options;

  useEffect(() => {
    if (once && hasAnimated) return;
    
    const element = ref.current;
    if (!element) return;

    const getAnimation = () => {
      const baseConfig = {
        targets: element,
        easing: "easeOutExpo",
        duration,
        delay,
      };

      const staggerTargets = element.querySelectorAll(".animate-item");
      const hasStaggerItems = staggerTargets.length > 0;

      switch (variant) {
        case "fade-up":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            translateY: [40, 0],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "fade-down":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            translateY: [-40, 0],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "fade-left":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            translateX: [60, 0],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "fade-right":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            translateX: [-60, 0],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "scale":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "blur":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            filter: ["blur(10px)", "blur(0px)"],
            translateY: [20, 0],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "rotate":
          return {
            ...baseConfig,
            targets: hasStaggerItems ? staggerTargets : element,
            opacity: [0, 1],
            rotateX: [15, 0],
            translateY: [30, 0],
            delay: hasStaggerItems ? anime.stagger(staggerDelay, { start: delay }) : delay,
          };
        case "stagger-up":
          return {
            ...baseConfig,
            targets: staggerTargets,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(staggerDelay, { start: delay }),
          };
        case "stagger-left":
          return {
            ...baseConfig,
            targets: staggerTargets,
            opacity: [0, 1],
            translateX: [80, 0],
            delay: anime.stagger(staggerDelay, { start: delay }),
          };
        case "stagger-right":
          return {
            ...baseConfig,
            targets: staggerTargets,
            opacity: [0, 1],
            translateX: [-80, 0],
            delay: anime.stagger(staggerDelay, { start: delay }),
          };
        default:
          return baseConfig;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime(getAnimation());
            setHasAnimated(true);
            if (once) observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [variant, threshold, delay, duration, staggerDelay, once, hasAnimated]);

  return ref;
}

// Parallax hook for background elements
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
}

// Magnetic hover effect
export function useMagneticHover<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      anime({
        targets: element,
        translateX: x * strength,
        translateY: y * strength,
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: element,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: "easeOutElastic(1, .5)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
