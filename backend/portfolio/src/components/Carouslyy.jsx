import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "cats.jpeg",
  "di2.jpg",
  "dogs.jpeg",
  "di.jpeg",
  "cow.jpg",
  "cow2.jpg",
  "ox.jpg",
];

function Carouselyy() {
  // Framer Motion variants for animation
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="max-w-screen mx-auto px-4 ">
      <Carousel className="relative w-full">
        {/* Previous Button */}
        <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10" />

        {/* Carousel Content */}
        <CarouselContent className="flex items-center">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
            >
              <motion.img
                className="w-full h-[200px] object-cover rounded-lg"
                src={src}
                alt={`Slide ${index + 1}`}
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.3 }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Next Button */}
        <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}

export default Carouselyy;
