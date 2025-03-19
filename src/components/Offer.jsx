import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { motion } from 'framer-motion'

function Offer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-16 bg-[#f8f9fa]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12"
        variants={itemVariants}
      >
        <h3 className="text-[#4a4a4a] text-lg mb-1">We Are</h3>
        <h2 className="text-3xl font-bold">Offering Reliable Services</h2>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Family Health - Large Card */}
        <motion.div 
          className="lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row h-full">
            <motion.div 
              className="md:w-1/2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={assets.family_health}
                alt="Family Health" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2 p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3">Family Health Solutions</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Proced arain manu produc rather conve qurat maritan this conven multiscipari testin motin was procedue aaming proced arain manu produc rather conve qurat maritan this convenmultiscipari testineis motin was procedue amming.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Eye Care - Small Card */}
        <motion.div 
          className="bg-white rounded-lg overflow-hidden shadow-sm"
          variants={itemVariants}
        >
          <motion.div 
            className="h-48"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={assets.eye_care}
              alt="Eye Care" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-3">Eye Care Solutions</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Dolor lorem then andin the Public heath thow andin then Uabor ewers then andin mage Any value contin
            </p>
          </motion.div>
        </motion.div>

        {/* Children's Health - Small Card */}
        <motion.div 
          className="bg-white rounded-lg overflow-hidden shadow-sm"
          variants={itemVariants}
        >
          <motion.div 
            className="h-48"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={assets.children_health}
              alt="Children's Health" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-3">{"Children's Health"}</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Dolor lorem then andin the Public heath thow andin then Uabor ewers then andin mage Any value contin
            </p>
          </motion.div>
        </motion.div>

        {/* Dental Surgery - Large Card */}
        <motion.div 
          className="lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row h-full">
            <motion.div 
              className="md:w-1/2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={assets.dental_surgery}
                alt="Dental Surgery" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2 p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3">Dental Surgery</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Proced arain manu produc rather conve qurat maritan this conven multiscipari testin motin was procedue aaming proced arain manu produc rather convenmultiscipari testineis motin was procedue amming.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Offer