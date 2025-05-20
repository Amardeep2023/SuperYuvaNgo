import React from 'react'
import {motion} from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'


function Card({image,title,description,children}) {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }} // Initial state (invisible & scaled down)
      whileInView={{ opacity: 1, scale: 1 }} // Animate to visible & full size
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
      transition={{ duration: 0.9, ease: "easeOut" }}
    className='max-w-80 shadow-lg min-h-1/2 m-5 bg-blue-50 p-2 rounde-xl flex flex-col  justify-between ph:max-w-96 ph:min-h-1/2 '>
      <img 
      className='w-full p-2 h-60 rounded-3xl object-cover  '
      src={image} alt="" />
      <h1 className='text-xl p-2'>{title}</h1>
      <p className='text-lg ph:text-lg p-2'>{description}</p>
      <div className='mt-4'>{children}</div>

    </motion.div>
  )
}

export default Card
