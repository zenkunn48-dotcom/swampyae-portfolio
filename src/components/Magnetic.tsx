import { motion, useMotionValue, useSpring } from "framer-motion";
import * as React from "react";

type MagneticProps = {
  children: React.ReactNode;
  /** Max pixel offset the element can shift toward the cursor. */
  strength?: number;
  /** Distance (px) from element center at which pull begins. */
  radius?: number;
  className?: string;
  as?: "div" | "span";
};

/**
 * Magnetic wrapper — elastic cursor attraction for premium CTAs.
 * Pointer-only: disabled on touch/coarse pointer devices.
 */
export function Magnetic({
  children,
  strength = 20,
  radius = 140,
  className,
  as = "span",
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const [enabled, setEnabled] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / radius);
    x.set((dx / (rect.width / 2)) * strength * falloff);
    y.set((dy / (rect.height / 2)) * strength * falloff);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export default Magnetic;
