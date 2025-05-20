import React from "react";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

function About() {
  return (
    <>
      <motion.div 
      variants={container(0)}
      initial="hidden"
      animate="visible"
      className="mt-10 p-5 flex flex-row items-center gap-5 ph:flex-wrap-reverse ">
        {/* Left Text Section */}
        <div className=" ph:text-lg ph:font-sans ph:font-light ph:w-full flex flex-col items-start justify-center p-2 border-neutral-300 shadow-lg font-sans">
          <motion.h1
            variants={container(0.1)}
            initial="hidden"
            animate="visible"
            className=" text-4xl sm:text-5xl font-sans font-thin text-slate-700 tracking-tight"
          >
            Shriya Pardeshi
          </motion.h1>

          <motion.strong
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="mt-5 mb-0"
          >
            Meet Shriya: A Heart for Animal Welfare
          </motion.strong>
          <br />
          <motion.p
            variants={container(0.9)}
            initial="hidden"
            animate="visible"
          >
            At just 25, Shriya has dedicated herself to animal welfare, a
            journey that began at 19 after rescuing Gabbar, an injured stray dog
            from a hit-and-run. His resilience inspired her to address the harsh
            realities faced by India’s street animals—lack of food, medical
            support, and constant hardship.
          </motion.p>

          <br />
          <motion.p
            variants={container(1.3)}
            initial="hidden"
            animate="visible"
          >
            Shriya started by volunteering with local NGOs, joining WhatsApp
            support groups, and learning about rescues, treatments, and resource
            coordination. Over the years, she built a strong network to help not
            just dogs but also cats, cows, birds, and other animals in distress.
          </motion.p>

          <br />
          <motion.p
            variants={container(1.7)}
            initial="hidden"
            animate="visible"
          >
            Today, Shriya’s compassion, hard work, and commitment to animal
            welfare have created lasting change, and her work has become a
            calling that is not only hers but also a cause she shares with
            others through SuperYuva Foundation.
          </motion.p>
        </div>

        {/* Right Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mx-auto relative flex justify-center"
        >
          <div className="ph:w-full w-96">
            <img
              className="w-1/2 ph:w-full  ph:object-cover ph:rounded-xl md:w-64 md:h-72 lg:w-72 lg:h-80 rounded-md shadow-lg ph:mx-auto "
              src="Cover.jpg"
              alt=""
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className=" ph:text-lg ph:font-sans ph:font-light ph:mt-1 mt-10 p-5 flex flex-row items-center gap-3 ph:flex-wrap">
        <motion.div
          variants={container(2.5)}
          initial="hidden"
          animate="visible"
          whileInView={{ opacity: 1 }} // Animate to visible & full size
          viewport={{ once: true, amount: 0.3 }} 
          className="mx-auto relative flex justify-center"
        >
          <div className="ph:w-full w-96">
            <img
              className="w-96 ml-10 ph:w-96 ph:h-96 ph:object-contain ph:mx-auto md:w-64 md:h-72 lg:w-72 lg:h-80 rounded-md shadow-lg  "
              src="logo.jpg"
              alt=""
            />
          </div>
        </motion.div>
        <div className=" flex flex-col items-start justify-center p-2 shadow-sky-200 shadow-lg bg-sky-50 font-sans">
          <motion.strong
            initial={{ x: 100, opacity: 0 }}
           
            transition={{ duration: 1, delay: 0.5 }}
            whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
            viewport={{ once: true, amount: 0.3 }} 
            className="mt-5 mb-0"
          >
            {" "}
            SuperYuva Foundation: Where Youth Meets Compassion!
          </motion.strong>
          <br />
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
            viewport={{ once: true, amount: 0.3 }} 
          >
            SuperYuva Foundation isn’t just any NGO—it’s a vibrant movement
            dedicated to animal welfare, the environment, and youth involvement!
            Founded by Shriya, who has been passionately working in animal
            welfare since 2018, SuperYuva is all about the power of young people
            coming together to create change. With “yuva” meaning youth, this
            foundation’s name captures the spirit of our mission perfectly.
          </motion.p>

          <br />
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
            viewport={{ once: true, amount: 0.3 }} 
          >
            <strong>Background: A Rescue that Sparked a Revolution</strong>
            <br />
            Our journey began with Gabbar, a brave stray dog who survived a
            hit-and-run but needed an amputation. With the help of friends and
            family, we raised the funds for his surgery. Gabbar’s resilience
            inspired Shriya to think bigger, realizing that so many animals out
            there need love, care, and a voice to stand up for them. That’s how
            SuperYuva was born!
          </motion.p>

          <br />
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
            viewport={{ once: true, amount: 0.3 }} 
            className="font-sans"
          >
            <strong className="font-sans">Our Mission: Making a Difference Together</strong>
            <br />
            Our mission goes beyond animal rescue. We’re here to spread
            awareness about why stray dogs matter, why adopting local breeds is
            crucial, and how we can all do our part in protecting our furry
            friends and the environment. We’re also committed to saving cattle,
            and our environmental initiatives focus on planting native trees
            like neem, peepal, and tamarind—creating a greener, kinder Bharat
            for all.
          </motion.p>
        </div>
      </motion.div>
    </>
  );
}

export default About;
