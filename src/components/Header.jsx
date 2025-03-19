import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='relative bg-gradient-to-br from-[#e8f3ff] to-[#f9f9ff] overflow-hidden'>
      {/* Hexagon Pattern Background */}
      <div className='absolute inset-0 bg-[url("/path-to-hexagon-pattern.png")] opacity-20'></div>

      <div className='container mx-auto flex flex-col md:flex-row items-center px-6 md:px-10 lg:px-20 py-16'>
        {/* Left side */}
        <div className='md:w-1/2 flex flex-col items-start gap-6 z-10'>
          <h2 className='text-xl font-medium text-gray-900 animate-fade-in-up'>Best Medical Clinic</h2>
          
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up [animation-delay:200ms]'>
            <span className='text-[#0066ff]'>Bringing Health</span> To<br />
            Life For The Whole<br />
            Family...
          </h1>

          <NavLink to={"/doctors"} className='bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3 rounded-md text-sm font-medium transition duration-300 animate-fade-in-up [animation-delay:400ms] hover:scale-105'>
            Get Appointments →
          </NavLink>
        </div>


        {/* Right side */}
        <div className='md:w-1/2 relative animate-fade-in'>
          <div className='relative z-10 flex items-center justify-center'>
            {/* Floating Icons */}
            <div className='absolute top-10 left-10 w-16 h-16 bg-[#0066ff] rounded-full flex items-center justify-center animate-float-slow'>
              <img src={assets.heart_icon} alt="" className='w-8 h-8 text-white' />
            </div>
            <div className='absolute bottom-20  z-10 right-10 w-16 h-16 bg-[#4cd4c0] rounded-full flex items-center justify-center animate-float-delay'>
              <img src={assets.medical_file_icon} alt="" className='w-8 h-8 z-10 text-white' />
            </div>

            <div className='absolute top-1/2 right-20 z-10 w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center animate-float'>
              <img src={assets.plus_icon} alt="" className='w-5 h-5 z-10 text-white' />
            </div>
            
            {/* Main Image */}
            <img 
              src={assets.header_img} 
              alt="Medical Team" 
              className='w-full h-auto object-contain animate-fade-in-up [animation-delay:300ms]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header