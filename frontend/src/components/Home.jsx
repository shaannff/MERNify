import React, { useEffect, useRef } from 'react'

import Landingpage from '../assets/Landingpage.jpg'
import gsap from 'gsap'
import Navbar from './Navbar'
import Land from '../assets/Land.jpg'

const Home = () => {
  const textRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.fromTo(
        textRef.current,
        {
          x: '100vw',    // Start far right
          opacity: 0.2,  // Start dim
        },
        {
          x: 0,          // End in place
          opacity: 1,    // Brighten up
          duration: 1.5,
          ease: 'power3.out',
        }
      )
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <Navbar/>
      {/* Image Box */}
      <div className="w-[70%] h-[70%] mx-auto mt-20 rounded-xl overflow-hidden shadow-lg">
        <img
          src={Landingpage}
          alt="Landing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Text */}
      <div
        ref={textRef}
        className="absolute left-10 top-[30%] text-white text-3xl font-bold opacity-0"
      >
        finally you ggot it superb welcome
      </div>
    </div>
  )
}
export default Home