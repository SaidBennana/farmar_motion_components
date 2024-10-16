"use client";
import React from "react";
import { motion } from "framer-motion";
export default function Staggered_Text() {
  const TEXT = "Staggered";
  return (
    <div className="h-[90vh] w-full grid place-content-center text-8xl font-bold uppercase whitespace-nowrap">
      <motion.div
        className="overflow-hidden cursor-pointer relative"
        initial="initial"
        whileHover="hovered"
        style={{lineHeight:0.80}}
      >
        <div className="h-fit">
          {TEXT.split("").map((l: string, i: number) => {
            return (
              <motion.span
                variants={{
                  initial: { y: "0" },
                  hovered: { y: "-100%" },
                }}
                transition={{duration:0.25,delay:0.025*i,ease:"easeInOut"}}
               
                className="inline-block"
              >
                {l}
              </motion.span>
            );
          })}
        </div>
        <div className="h-fit absolute top-0">
          {TEXT.split("").map((l: string, i: number) => {
            return (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: "0" },
                }}
                transition={{duration:0.25,delay:0.025*i,ease:"easeInOut"}}
                className="inline-block"
              >
                {l}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}