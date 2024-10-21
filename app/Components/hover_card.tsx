"use client";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  useMotionTemplate,
} from "framer-motion";
import { MouseEvent } from "react";

export default function Hover_card() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x);
  const springY = useSpring(y);

  const rotateY = useTransform(springX, [-0.5, 0.5], ["-14deg", "14deg"]);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["14deg", "-14deg"]);
  const color = useTransform(springX, [-0.5, 0.5], ["#8ecae6", "#c1121f"]);
  const color2 = useTransform(springX, [-0.5, 0.5], ["#14213d", "#fcbf49"]);
  const backgroundImage = useMotionTemplate`linear-gradient(to left,${color}, ${color2})`;
  const HandleMouseMove = (e: MouseEvent) => {
    // @ts-ignore
    const rect = e.target?.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  return (
    <motion.div
      onMouseMove={HandleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ transformStyle: "preserve-3d", rotateY, rotateX }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-48 h-60 rounded-lg bg-white relative"
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(75px)",
          backgroundImage,
        }}
        className="bg-gray-300 grid place-content-center absolute inset-4 rounded-lg "
      >
        <h1 className="text-black font-bold text-3xl">Hover</h1>
      </motion.div>
    </motion.div>
  );
}
