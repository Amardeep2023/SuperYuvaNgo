import axios from 'axios'
import { useState } from 'react'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Inspiration from './components/Inspiration'
import Hero from './components/Hero'
import Achieve from './components/Achieve'
import Navbar from './components/Navbar'
import Work from './components/Work'
import Login from './components/Login'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Addstory from './components/Addstory'
import Reels from './components/Reels';
import AddReel from './components/AddReel';


function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
    <Router>
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>

        <Route path='/' element={<Hero/>} />
        <Route path='/inspiration' element={<Inspiration/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/work' element={<Work/>}/>
        <Route path='/achieve'element={<Achieve/>}/>
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/addstory" element={isLoggedIn ? <Addstory/> : <Addstory/>} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/addreel" element={<AddReel />}/>
      
    
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
