import React from "react";
import { motion } from "framer-motion";
import { HashLink } from 'react-router-hash-link';

import { Button } from "@/components/ui/button";
import Card from "./Card";
import Carouselyy from "./Carouslyy";
import Contact from "./Contact";

const Cardy = {
  image: "harnya.jpg",
  title: "Harnya's Story: A Bull of Strength and Grace",
  description:
    "Harnya, a legendary bull, is known across Maharashtra for his unmatched running ability and speed. Throughout his 7 years, he has only lost two races,",

  image2: "Gori.jpg",
  title2: "Gori's Story: A Tale of Love and Loyalty",
  description2:
    "Gori, a joyful dog, has been with us for over 10 years. Born to a street dog named Dholli, she became part of our family from day one. ",

  image3: "Moti.jpg",
  title3: "Moti: A Story of Loyalty and Love",
  description3:
    "Moti, our beloved dog, has been a part of our lives for the past eight years. Just like other stray dogs, Moti joins me on my daily walks, spreading joy ",
};

const variants = {
  hidden: { opacity: 0, scale: 0.8 }, // Initial state: invisible and scaled down
  visible: { opacity: 1, scale: 1 }, // Final state: fully visible and scaled up
};

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

function Hero() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }} // Initial state (invisible & scaled down)
        whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mt-4 text-4xl font-sans font-bold text-center flex flex-col justify-center items-center ph:mx-1 ph:text-3xl"
      >
        <img className="w-32" src="logooo.png" alt="" />
        Super Yuva Foundation !!{" "}
      </motion.h1>
      <div className="flex gap-2 ">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
          className=" flex mt-2 items-center gap-5"
        >
          <motion.div
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto relative flex justify-center ph:flex-wrap"
          >
            <img
              className=" ph:w-96 ph:rounded-2xl ph:mx-5  w-36 rounded-lg shadow-lg "
              src="logo.jpg"
              alt=""
            />

            <div className="flex flex-col ml-2 ">
              <motion.strong
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
                className="mt-5 mb-2 text-xl ph:text-2xl font-sans ph:mx-5"
              >
                {" "}
                SuperYuva Foundation: Where Youth Meets Compassion!
              </motion.strong>

              <motion.p
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 1 }}
                className="text-xl font-sans ph:text-lg ph:mx-5"
              >
                SuperYuva Foundation isn’t just any NGO—it’s a vibrant movement
                dedicated to animal welfare, the environment, and youth
                involvement! Founded by Shriya, who has been passionately
                working in animal welfare since 2018, SuperYuva is all about the
                power of young people coming together to create change. With
                “yuva” meaning youth, this foundation’s name captures the spirit
                of our mission perfectly.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="mx-auto relative mt-8">
        <Carouselyy className="shadow-md" />
      </div>

      <div className="text-center flex-col  m-1">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }} // Initial state (invisible & scaled down)
          whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-3xl ph:text-4xl mt-5 flex flex-col justify-center items-center"
        >
          <img className="w-20 ph:w-32" src="goal.png" alt="" />
          Our Mission
        </motion.h1>
        <div className="mt-1">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }} // Initial state (invisible & scaled down)
            whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
            viewport={{ once: true, amount: 0.1 }} // Trigger animation when 30% of the section is visible
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-xl font-bold font-sans"
          >
            Making a Difference Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }} // Initial state (invisible & scaled down)
            whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
            viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-sans text-xl text-justify ph:text-lg ph:mx-5"
          >
            Our mission goes beyond animal rescue. We’re here to spread
            awareness about why stray dogs matter, why adopting local breeds is
            crucial, and how we can all do our part in protecting our furry
            friends and the environment. We’re also committed to saving cattle,
            and our environmental initiatives focus on planting native trees
            like neem, peepal, and tamarind—creating a greener, kinder Bharat
            for all.
          </motion.p>
        </div>
      </div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }} // Initial state (invisible & scaled down)
        whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-3xl justify-center items-center gap-2 mt-4 flex flex-col ph:text-4xl "
      >
        {" "}
        <img className="w-20 ph:w-32" src="work.png" alt="" />
        Our Work
      </motion.h1>

      <div className="flex  justify-around  mt-2 ph:flex ph:flex-wrap ">
        <Card
          image={Cardy.image}
          title={Cardy.title}
          description={Cardy.description}
        >
           <HashLink to="/work#harnya" smooth>
            <div className="flex justify-center mt-auto">
              <Button className="bg-red-200 hover:bg-red-400" variant="outline">
                Read More
              </Button>
            </div>
          </HashLink >
          </Card>
        <Card
          image={Cardy.image2}
          title={Cardy.title2}
          description={Cardy.description2}
        >
          <HashLink to="/work#gori" smooth >
            <div className="flex justify-center mt-auto">
              <Button className="bg-red-200 hover:bg-red-400" variant="outline">
                Read More
              </Button>
            </div>
          </HashLink >
        </Card>

        <Card
          image={Cardy.image3}
          title={Cardy.title3}
          description={Cardy.description3}
        >
           <HashLink to="/work#moti" smooth >
            <div className="flex justify-center mt-auto">
              <Button className="bg-red-200 hover:bg-red-400" variant="outline">
                Read More
              </Button>
            </div>
          </HashLink >
          </Card>
      </div>
      <div className=""></div>
      <div className="flex flex-col justify-center items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }} // Initial state (invisible & scaled down)
          whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
          transition={{ duration: 0.9, ease: "easeOut" }}
        ></motion.span>
        <Contact className="ph:mx-5" />
      </div>
    </>
  );
}

export default Hero;
