import React from "react";
import { motion } from "framer-motion";

function Achieve() {
  return (
    <div className="grid grid-cols-2 gap-5 p-3 items-center ph:flex ph:flex-wrap ">
      {/* Left Column with Two Image-Text Sections */}
      <div className="flex flex-col gap-8 ph:flex ph:flex-wrap">
        {/* First Section */}
        <motion.div
          className="flex flex-row items-center gap-4 ph:flex ph:flex-wrap ph:justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="achive1.jpg"
            alt="Achievement 1"
            className="rounded-xl shadow-lg w-80 flex-shrink-0 ph:w-96"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="w-full ph:flex ph:flex-wrap ph:mx-2 "
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-2">Mahila Gaurakshak !</h2>
            <p className="text-gray-600 text-lg font-sans  ph:text-lg ">
              Shriya's efforts in supporting animal welfare, including rescuing
              cows from slaughter and providing care for them, have greatly
              benefited many Gawalis (cow caretakers). In recognition of her
              contributions, they invited her to their largest event, where she
              was honored for her dedication to animal welfare.
            </p>
          </motion.div>
        </motion.div>

        {/* Second Section */}
        <motion.div
          className="flex flex-row items-center gap-4 ph:flex ph:flex-wrap ph:justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="achieve2.jpg"
            alt="Achievement 2"
            className="rounded-xl shadow-lg w-80 flex-shrink-0 ph:w-96"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div
            className="w-full ph:mx-2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-2">Hindu Maratha Sang!</h2>
            <p className="text-gray-600 text-lg font-sans ph:text-lg ">
              Shriya's exceptional work in animal welfare has also been
              recognized by the Vishwa Hindu Maratha Sangh, Maharashtra Rajya
              Organisation, who felicitated her for her remarkable efforts in
              supporting and caring for animals.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column - Full Height Section */}
      <motion.div
        className="bg-gray-100 p-6 rounded-xl shadow-lg flex items-center justify-center h-full ph:flex ph:flex-col ph:justify-center "
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center"></h2>
        <div className=" ph:flex ph:flex-col ph:gap-6">
          <img className="mt-0 rounded-xl w-11/12 object-contain  " src="pic2.jpg" alt="" />
          <img className=" w-96 object-contain rounded-xl " src="pic1.jpg" alt="" />
         
          <p className="text-gray-600 text-lg font-sans font-semibold ph:mt-5"><strong className="text-3xl">The Gau Seva Samajik Sanstha</strong><br />
           Maharashtra Rajya, felicitated Shriya
          for her dedicated work as a women cow saver and helper, acknowledging
          her exceptional contributions at such a young age.</p>
          </div>
      </motion.div>
    </div>
  );
}

export default Achieve;
