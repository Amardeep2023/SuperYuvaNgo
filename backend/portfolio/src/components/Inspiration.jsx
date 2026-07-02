import React from 'react';
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

function Inspiration() {
  return (
    <>
    <div className=" p-4 flex  items-start gap-4 mt-5 ph:flex ph:flex-wrap ph:justify-center">
      {/* Image */}
     <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay:0.6 }}
        className='shrink-0 ph:w-full'
        >
        
       
       <img
        className="w-96 h-96 rounded-md flex-shrink-0 mt-5 ph:w-full ph:h-1/2  "
        src="Gabbar.jpg"
        alt="Gabbar"
      />
       </motion.div>
      

      {/* Text */}
     <div className='flex flex-col gap-5 '> 
      
      <motion.p className="text-justify font-sans ph:text-lg"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay:1 }}
      
      >
        <strong>Meet Gabbar: A Story of Courage, Care, and Inspiration</strong>
        <br />
        
        Gabbar, a seven-year-old dog, holds a special place in the hearts of many, 
        especially in the life of Shriya Pardeshi, the founder of Super Yuva. Gabbar’s 
        journey began when he was just one month old. On a fateful night in 2018, he 
        was hit by a vehicle on the streets of Nana Peth, leaving him with severe 
        injuries that left his entire body paralyzed.
        </motion.p>
        
       
        <motion.p 
        initial={{ x: 100, opacity: 0 }}
         // Animate to visible & full size
        viewport={{ once: true, amount: 0.6 }}
        whileInView={{ opacity: 1, x:0 }}
        transition={{ duration: 1, delay:1.2 }}
        className='font-sans ph:text-lg'> But Gabbar wasn’t ready to give up. When Shriya found him on the streets, he 
        was weak, helpless, and in immense pain. Seeing his will to survive, Shriya and 
        her family took him in, offering the love and care he so desperately needed. His 
        fighter spirit earned him his name—Gabbar—after the legendary warrior.
        </motion.p>
        
        
       <motion.p 
       initial={{ x: 100, opacity: 0 }}
       whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
       viewport={{ once: true, amount: 0.6 }}
       transition={{ duration: 1, delay:1.4 }}
       className='font-sans ph:text-lg'> Thanks to the unwavering support and expert medical care he received, Gabbar’s 
        three legs gradually began to regain strength. However, his right front leg did 
        not respond to treatment and had to be amputated. The procedure was difficult 
        for Gabbar, who was terrified and in pain. But with patience, love, and reassurance 
        from Shriya and her family, Gabbar found the courage to heal. Slowly but surely, he 
        regained his confidence and began to walk again, even with just three legs.
        </motion.p>
        
        
        <motion.p  
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay:0.1 }}
        className='font-sans ph:text-lg'>Gabbar’s story didn’t just change his life—it changed Shriya’s as well. Inspired 
        by the incredible transformation she witnessed in Gabbar and Akira, and fueled by 
        her desire to help other animals in need, Shriya founded Super Yuva. Her NGO is 
        dedicated to rescuing, rehabilitating, and providing loving homes to injured and 
        abandoned animals, just like Gabbar.
        </motion.p>
       
        </div>
        
      </div>
        
      <div>  <motion.p className="text-justify p-4  font-sans ph:text-lg"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay:0.2 }}>
          Shriya’s journey is a testament to the healing power of compassion and the strength 
        of the bond between humans and animals. With the support of her family and friends, 
        Shriya continues her mission to create a better world for those who cannot speak for 
        themselves. 
        </motion.p >
        
        
        <motion.p
        className='text-justify p-4  font-sans ph:text-lg'
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ opacity: 1, x:0 }} // Animate to visible & full size
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay:0.2 }}
        >Gabbar, now a happy and healthy dog, is not just a survivor—he is an inspiration. 
        His story reminds us that with love, care, and a little bit of courage, anything is 
        possible. And through Super Yuva, Shriya hopes to share that message with the world, 
        one rescued animal at a time.
        </motion.p>
        </div>
       
        </>
   
  );
}

export default Inspiration;
