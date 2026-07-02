import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Format WhatsApp message
    const phoneNumber = "919762639241"; // Replace with receiver's WhatsApp number (including country code)
    const message = `Hello, my name is ${formData.name}. My email is ${formData.email}. Message: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
  
    // Open WhatsApp chat
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };
  
  return (
    <motion.div
      className="w-full  mx-auto mt-10 p-5 shadow-md border rounded-lg ph:mb-20 ph:mt-20 "
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold -mt-12 mb-4 text-center flex flex-col justify-center items-center gap-6">
        <img className="w-16 mt-4 -mb-5 ph:w-28" src="chat.png" alt="" />Contact Us
      </h2>
      {submitted && (
        <p className="text-green-500 text-center mb-4">
          Thank you! Your message has been sent.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 ph:h-full ">
        <div>
          <label className="block text-gray-700 font-medium mb-1 ph:text-lg">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 ph:text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 ph:text-lg">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your message here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}

export default Contact;
