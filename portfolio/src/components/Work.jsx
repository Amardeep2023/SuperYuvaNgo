import React from "react";
import axios from "axios"
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import Stories from "./Stories";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});
const variants = {
  hidden: { opacity: 0, scale: 0.8 }, // Initial state: invisible and scaled down
  visible: { opacity: 1, scale: 1 }, // Final state: fully visible and scaled up
};



function Work() {
  
  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stories");
        setStories(response.data);
        localStorage.setItem("stories", JSON.stringify(response.data)); // Store locally
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    // Load from localStorage if available, otherwise fetch
    const savedStories = localStorage.getItem("stories");
    if (savedStories) {
      setStories(JSON.parse(savedStories));
    } else {
      fetchStories();
    }
  }, []);

  return (
    <>
      <div  
      className="flex gap-3 mt-2 ph:flex ph:flex-wrap ph:mt-5 ph:justify-center">
        <motion.div
         variants={container(0.1)}
         initial="hidden"
         animate="visible"
         className="shrink-0"
        ><img
          id="harnya"
          className="w-96 h-96 ph:w-80 object-cover  rounded-lg "
          src="harnya.jpg"
          alt=""
        />
        </motion.div>

        <div className="flex flex-col my-auto text-xl font-sans  ph:text-lg ph:justify-center ph:mx-7">
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Harnya, a legendary bull, is known across Maharashtra for his
            unmatched running ability and speed. Throughout his 7 years, he has
            only lost two races, competing with both horses and other bulls. His
            incredible skill made him a vital asset to the Gaushala, where he
            once fed and cared for over 200 cattle.
          </motion.p>
          <br />
          <motion.p
           initial={{ x: 100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 1, delay: 0.4 }}
          >
            When I first met Harnya, I saw the special care and love he needed.
            Recognizing his condition, I took it upon myself to ensure his
            treatment, spending over two lakh rupees on his care. At first,
            Harnya was cautious, not allowing me to touch or approach him. But
            over time, as he saw my dedication, he began to trust me. Now, he
            lets me scratch and pet him, a bond forged through love and
            patience.
          </motion.p>
          <br />
          <motion.p
           id="gori"
           initial={{ x: 100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
          >
            I’m incredibly grateful for the opportunity to care for such a
            kind-hearted bull, who has given so much to others in his long life.
            It’s an honor to help him in return.
          </motion.p>
        </div>
      </div>
      <br />
      <br />
      <div className="flex gap-3  ph:flex ph:flex-wrap-reverse ph:justify-center ">
        <div 
        
        className="flex flex-col text-xl font-sans my-auto ph:text-lg ph:justify-center ph:mx-8">
          <motion.p
          initial={{opacity:0,x:-100}}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{opacity:1,x:0}}
          transition={{ duration: 1, delay: 0.2 }}
          >
              
        
            
            Gori, a joyful dog, has been with us for over 10 years. Born to a
            street dog named Dholli, she became part of our family from day one.
            Gori spends her days around the workshop, her tail always wagging,
            and at night, she sleeps peacefully in the parking area. Our bond
            with Gori is special.
          </motion.p>
          <br />
          <motion.p
          initial={{opacity:0,x:-100}}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{opacity:1,x:0}}
          transition={{ duration: 1, delay: 0.2 }}
          >
            {" "}
            Seeing her each day fills my heart with warmth and happiness. Gori
            reminds us of the simple joys in life and the power of unconditional
            love. She's not just a dog—she’s family.
          </motion.p>
        </div>
        <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="shrink-0 ">
          <img
            className=" m-auto w-96 h-96 ph:w-80  rounded-lg object-cover "
            src="Gori.jpg"
            alt=""
          />
        </motion.div>
      </div>
      <br />
      <br />

      <div 
     
      className="flex gap-3 mx-auto mb-2 ph:flex ph:flex-wrap ph:justify-center ph:mx-auto">
        <motion.div 
         
         variants={container(0.1)}
       
         animate="visible"
         
         viewport={{ once: true, amount: 0.3 }}
         whileInView={{opacity:1,x:0}}
       
        className="shrink-0 my-auto ">
          <img 
          id="moti"
          className="w-96 h-full ph:w-80  rounded-lg object-cover " src="Moti.jpg" alt="" />
        </motion.div>

        <div className="flex flex-col text-xl font-sans my-auto  ph:text-lg ph:justify-center ph:mx-8">
          <motion.p
                initial={{ x: 100, opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{opacity:1,x:0}}
                transition={{ duration: 1, delay: 0.2 }}
          >
            Moti, our beloved dog, has been a part of our lives for the past
            eight years. Just like other stray dogs, Moti joins me on my daily
            walks, spreading joy wherever he goes. He’s a playful, naughty soul
            who loves spending time with my other pets, and can often be found
            sleeping beside them in the parking area.
          </motion.p>
          <br />
          <motion.p
                initial={{ x: 100, opacity: 0 }}
              
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{opacity:1,x:0}}
          >
            Since he was just six months old, Moti was found abandoned in our
            neighborhood, and from that moment, he became a part of our family.
            We take care of his vaccinations, deworming, and all his health
            needs, ensuring he's well-cared for. His playful nature and warm
            heart have made him my loyal companion.
          </motion.p>
          <br />
          <motion.p
                initial={{ x: 100, opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{opacity:1,x:0}}
                transition={{ duration: 1, delay: 0.4 }}
          >
            Every morning, before I leave for work, Moti waits for me. I always
            take a moment to say goodbye to him, and when I return, he’s there,
            running behind my vehicle, eager to greet me again. Moti is more
            than just a dog; he’s a true friend and a constant reminder of the
            love and loyalty animals bring into our lives.
          </motion.p>
          <br />
          <motion.p
                
                initial={{ x: 100, opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{opacity:1,x:0}}
                transition={{ duration: 1, delay: 0.5 }}
          >
            For the past eight years, Moti has been by my side, a testament to
            the deep bond we share, and a reminder of why it's so important to
            care for stray animals in need.
          </motion.p>
        </div>
      </div>
      
      <Stories/>
     
    </>
  );
}

export default Work;
