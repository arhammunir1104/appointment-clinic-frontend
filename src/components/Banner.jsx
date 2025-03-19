import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Banner() {
  let navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12"
    >
      <div className='relative bg-[#0066FF] rounded-2xl overflow-hidden'>
        <div className='flex flex-col md:flex-row items-center'>
          {/* Left side content */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='w-full md:w-1/2 p-6 md:p-12 lg:p-16 relative z-10'
          >
            <div className='max-w-xl'>
              <motion.span 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-4 md:mb-6"
              >
                Schedule Your Visit
              </motion.span>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight'>
                Book Your Dental Appointment Today
              </h2>
              <p className='text-white/90 mb-6 md:mb-8 text-base md:text-lg leading-relaxed'>
                Take the first step towards a healthier smile with our expert dental care services
              </p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='flex flex-col sm:flex-row gap-4'
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate("/login");
                    scrollTo(0,0);
                  }}
                  className='inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-white text-[#0066FF] rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg'
                >
                  Create Account
                  <svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side image - Universal for both mobile and desktop */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='w-full md:w-1/2 h-[200px] md:h-[600px] relative'
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0066FF]/80 via-transparent to-transparent md:bg-gradient-to-l z-10" />
            <img 
              src={assets.appointment_img} 
              alt="Dental Appointment" 
              className='md:w-full md:h-full object-cover object-center'
            />
          </motion.div>
        </div>

        {/* Decorative elements with animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/10 blur-[60px] rounded-full" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white/10 blur-[60px] rounded-full" 
        />
      </div>
    </motion.div>
  )
}

export default Banner