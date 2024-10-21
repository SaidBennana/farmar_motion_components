"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function SliderNavBar() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <div
      className="z-20 fixed top-6"
      onMouseLeave={() => {
        setPosition((pri: any) => ({
          ...pri,
          opacity: 0,
        }));
      }}
    >
      <ul className="p-4 py-4 rounded-full border items-center flex justify-between w-fit gap-7 relative">
        <Tab setPosition={setPosition} name="Home" />
        <Tab setPosition={setPosition} name="about" />
        <Tab setPosition={setPosition} name="Contact" />
        <Tab setPosition={setPosition} name="blog" />
        <Cursor position={position} />
      </ul>
    </div>
  );
}
const Tab = ({ name, setPosition }: { name: string; setPosition: any }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        // @ts-ignore
        const data = ref?.current?.getBoundingClientRect();
        setPosition((pri: any) => ({
          // @ts-ignore
          left: ref?.current?.offsetLeft!,
          width: data.width,
          opacity: 1,
        }));
      }}
      className="uppercase z-10 px-1 cursor-pointer text-white mix-blend-difference"
    >
      {name}
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      layout
      style={{ ...position }}
      className="absolute h-9 w-20 rounded-full bg-white"
    />
  );
};
