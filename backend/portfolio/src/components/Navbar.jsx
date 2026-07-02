import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp, FaRegUser } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoIosAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [Cookies.get("token")]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const icon = (duration) => ({
    initial: { y: -10 },
    animate: {
      y: [4, -4],
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  });

  return (
    <>
      {/* Top Navbar */}
      <div className="ph:flex ph:text-sm flex justify-between p-0 shadow-lg bg-gradient-to-r from-white via-slate-100 to-slate-200 rounded-sm px-5">
        <Link to="/">
          <img className="w-20" src="logooo.png" alt="Logo" />
        </Link>
        <ul className="ph:flex ph:gap-5 flex flex-shrink-0 items-center gap-8">
          {[
            {
              href: "https://wa.me/919762639241?text=Hi,%20I%20found%20your%20contact%20and%20would%20like%20to%20connect.",
              icon: (
                <FaWhatsapp className="text-4xl ph:text-3xl text-green-500" />
              ),
              duration: 0.5,
            },
            {
              href: "mailto:superyuvafoundation@gmail.com",
              icon: <SiGmail className="text-4xl ph:text-3xl text-red-600" />,
              duration: 2,
            },
            {
              href: "https://www.instagram.com/superyuva?igsh=amNoNGRqeWdqZzVw",
              icon: (
                <FiInstagram className="text-4xl ph:text-3xl text-pink-600" />
              ),
              duration: 1.5,
            },
            {
              href: "https://www.linkedin.com/in/shriya-pardeshi-72831b2a2",
              icon: (
                <FaLinkedin className="text-4xl ph:text-3xl text-blue-700" />
              ),
              duration: 2,
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.li
                variants={icon(link.duration)}
                initial="initial"
                animate="animate"
              >
                {link.icon}
              </motion.li>
            </a>
          ))}
          <button onClick={() => setIsOpen(true)} className="md:hidden flex">
            <Menu className="w-8 h-8 text-gray-700" />
          </button>
        </ul>
      </div>

      {/* Main Navbar */}
      <div className="mt-5 flex justify-around p-0 shadow-lg bg-gradient-to-r from-white via-slate-100 to-slate-200 rounded-sm hidden md:flex">
        <ul className="flex flex-shrink-0 items-center gap-14 text-xl">
          {["about", "inspiration", "work", "achieve", "contact", "reels"].map(
            (item) => (
              <Link key={item} to={`/${item}`} onClick={() => setIsOpen(false)}>
                <li
                  className={`${
                    location.pathname === `/${item}`
                      ? "bg-red-100"
                      : "hover:bg-red-100"
                  } px-2 py-1 rounded-md capitalize`}
                >
                  {item.replace("-", " ")}
                </li>
              </Link>
            )
          )}
        </ul>

        {/* Admin & Add Buttons */}
        <div className="flex items-center space-x-6">
          {!isLoggedIn ? (
            <Link to="/Login">
              <span className="flex gap-2 items-center text-xl rounded-lg hover:bg-red-100 p-2">
                <FaRegUser /> Admin
              </span>
            </Link>
          ) : (
            <>
              <Link to="/addstory">
                <span className="flex gap-2 items-center text-xl rounded-lg hover:bg-red-100 p-2">
                  <IoIosAdd /> Add Story
                </span>
              </Link>
              <Link to="/addreel">
                <span className="flex gap-2 items-center text-xl rounded-lg hover:bg-blue-100 p-2">
                  <IoIosAdd /> Add Reel
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-8 h-8 text-gray-700" />
        </button>
        <ul className="flex flex-col items-center gap-5 pt-20 text-xl">
          {["about", "inspiration", "work", "achieve", "contact", "reels"].map(
            (item) => (
              <Link key={item} to={`/${item}`} onClick={() => setIsOpen(false)}>
                <li
                  className={`${
                    location.pathname === `/${item}`
                      ? "bg-red-100"
                      : "hover:bg-red-100"
                  } px-2 py-1 rounded-md capitalize`}
                >
                  {item.replace("-", " ")}
                </li>
              </Link>
            )
          )}
          {isLoggedIn ? (
            <>
              <Link to="/addstory" onClick={() => setIsOpen(false)}>
                <span className="flex gap-2 items-center text-xl rounded-lg hover:bg-red-100 p-2">
                  <IoIosAdd /> Add Story
                </span>
              </Link>
              <Link to="/addreel" onClick={() => setIsOpen(false)}>
                <span className="flex gap-2 items-center text-xl rounded-lg hover:bg-blue-100 p-2">
                  <IoIosAdd /> Add Reel
                </span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                Admin Login
              </button>
            </Link>
          )}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;