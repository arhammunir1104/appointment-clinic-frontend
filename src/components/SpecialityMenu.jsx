import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function SpecialityMenu() {
  return (
    <>
      <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl font-medium'
        >
          Find by Speciality
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='sm:w-1/3 text-center text-sm'
        >
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </motion.p>

        {/* Scrollable container with hidden scrollbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto whitespace-nowrap custom-scrollbar'
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          {specialityData?.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
            >
              <Link
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to={`/doctors/${item.speciality}`}
                className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-transform duration-500'
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className='w-16 sm:w-24 mb-2' 
                  src={item.image} 
                  alt='' 
                />
                <p>{item.speciality}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default SpecialityMenu;
