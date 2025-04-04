"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);

    // Your reveal animation logic here
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case "fade":
        return "reveal-fade";
      case "slide-up":
        return "reveal-slide-up";
      case "slide-down":
        return "reveal-slide-down";
      case "slide-left":
        return "reveal-slide-left";
      case "slide-right":
        return "reveal-slide-right";
      default:
        return "reveal-fade";
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
