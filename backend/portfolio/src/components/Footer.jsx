import React from 'react'
import { IoIosCall } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className='w-full ph:w-full ph:flex-col ph:gap-5 ph:mx-auto bg-slate-100 text-black p-2 flex flex-row h-16 gap-2 items-center '>
      <img className='object-cover  h-full' src="logooo.png" alt="" />
      <a className="text-lg text-blue-700 hover:text-blue-500" href="mailto:shripardeshi123@gmail.com" target="_blank">
     shripardeshi123@gmail.com
     </a>

      <a className='text-lg text-blue-700 hover:text-blue-500' href="mailto:superyuvafoundation@gmail.com" target='_blank'>superyuvafoundation@gmail.com</a>
      <a className='flex gap-1 items-center  text-blue-700 hover:text-blue-500' href="tel:+91 97626 39241"><IoIosCall />+91 97626 39241</a>
     <div className='flex items-center gap-2 ph:flex-wrap-reverse ph:justify-center'>
       <span className='font-bold font-sans '>Super Yuva Foundation NGO 2024 </span>
      <div className='ml-auto ph:mx-auto flex gap-6 mr-2 '>
      <a href="https://wa.me/919762639241?text=Hi,%20I%20found%20your%20contact%20and%20would%20like%20to%20connect.
        " target="_blank"rel="noopener noreferrer">
        <FaWhatsapp  className='text-3xl text-green-500'/>
        </a>
        <a href="mailto:superyuvafoundation@gmail.com" target='_blank'><SiGmail className='text-3xl text-red-600' /></a>
        <a href="https://www.instagram.com/superyuva?igsh=amNoNGRqeWdqZzVw" target="_blank"
        rel="noopener noreferrer"><FiInstagram className='text-3xl text-pink-600'/></a>
        <a href="https://www.linkedin.com/in/shriya-pardeshi-72831b2a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"target="_blank"
        rel="noopener noreferrer"><FaLinkedin className='text-3xl text-blue-700'/></a>
        
      </div>
      </div>
      
    </div>
  )
}
export default Footer;