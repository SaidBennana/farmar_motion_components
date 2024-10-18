"use client";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useMotionValue,
  animate,
  useMotionTemplate,
  motion,
} from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import SliderNavBar from "./SliderNavBar";

const COLORS = ["#13FFAA", "#CE84CF", "#DD335C"];
export default function Aurora_Effect() {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(120% 120% at 50% 0%, black 50%, ${color})`;
  const shadowButton = useMotionTemplate`0px 0px 10px ${color}`;
  useEffect(() => {
    animate(color, COLORS, {
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  return (
    <motion.div
      style={{
        backgroundImage: backgroundImage,
      }}
      className="w-full h-[100vh] relative flex justify-center items-center flex-col"
    >
      <SliderNavBar/>
      <div className="flex justify-center flex-col items-center gap-6 z-10 select-none">
        <span className="bg-violet-500 font-semibold py-1 text-sm  px-2 rounded-full">
          Expand Your Business!
        </span>
        <div className="text-6xl font-bold text-center">Said Bennana</div>
        <p className="text-center md:w-1/3 lg:w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum dolor
          sit amet consectetur adipisicing elit. Quae,
        </p>
        <motion.button
          style={{
            boxShadow: shadowButton,
          }}
          className="flex items-center gap-2 p-2 px-3 hover:px-4 transition-all rounded-full"
        >
          <span>Get in touch</span> <FaArrowRight />
        </motion.button>
      </div>
      <div className="absolute inset-0">
        <Canvas>
          <Stars
            radius={100}
            depth={100}
            count={5000}
            saturation={0}
            fade
            speed={1}
          />

          <mesh position={[0, 0, 100]} scale={[10, 10, 10]}>
            <OrbitControls enableZoom={false} />
            <sphereGeometry />
          </mesh>
          <mesh position={[0, 15, 100]} scale={[-10, 10, 10]}>
            <Text rotation={[0,0,0]} characters="abcdefghijklmnopqrstuvwxyz0123456789!" color="white" anchorX="center" anchorY="middle">
              Hello world!
            </Text>
          </mesh>
        </Canvas>
      </div>
    </motion.div>
  );
}
