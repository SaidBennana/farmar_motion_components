"use client";
import { motion, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
const imag = [
  "/img/1 (2).JPEG",
  "/img/1 (2).jpg",
  "/img/1 (5).jpg",
  "/img/1 (6).jpg",
  "/img/1 (7).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
  "/img/1 (8).jpg",
];
export default function Draggable_Carousel() {
  const [imageIndax, setImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [widthImage, setWidthImage] = useState(0);
  const dragX = useMotionValue(0);
  const dragStart = () => {
    setIsDragging(true);
  };
  const dragEnd = () => {
    setIsDragging(false);
    if (dragX.get() <= 100 && imageIndax < imag.length - 1) {
      setImageIndex((pri) => pri + 1);
    } else if (dragX.get() >= 100 && imageIndax > 0) {
      setImageIndex((pri) => pri - 1);
    }
    console.log(widthImage * imageIndax);
  };

  useEffect(() => {
    const imageCaru = document
      .getElementById("image_carousel")
      ?.getBoundingClientRect().width;
    if (imageCaru) setWidthImage(imageCaru);
  }, []);

  return (
    <div className="h-[100vh] w-full overflow-hidden">
      <motion.div
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          translateX: `-${widthImage * imageIndax}px`,
          x: dragX,
        }}
        className="flex cursor-grab active:cursor-grabbing gap-3"
      >
        <Images />
      </motion.div>
    </div>
  );
}

const Images = ({ ref }: { ref?: RefObject<any> }) => {
  return (
    <>
      {imag.map((img, index) => {
        return (
          <div
            id="image_carousel"
            key={index}
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="aspect-video w-full md:w-[400px] shrink-0 bg-center object-cover bg-cover rounded-md"
          />
        );
      })}
    </>
  );
};
