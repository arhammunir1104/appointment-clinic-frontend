import React, { useContext } from 'react'
// import {doctors} from "../assets/assets_frontend/assets"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Rating, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function TopDoctors() {
    let navigate = useNavigate();
    let {doctors} = useContext(AppContext);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
        }
    };

    return (
        <div className='bg-gradient-to-b from-white to-[#f9f9ff] py-20'>
            <motion.div 
                className='container mx-auto flex flex-col items-center gap-4 px-4'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/* Header Section */}
                <motion.div 
                    variants={itemVariants}
                    className='text-center max-w-2xl mx-auto mb-8'
                >
                    <motion.h2 
                        variants={itemVariants}
                        className='text-[#0066ff] text-sm font-semibold uppercase tracking-wider mb-3'
                    >
                        Our Medical Experts
                    </motion.h2>
                    <motion.h1 
                        variants={itemVariants}
                        className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'
                    >
                        Top Doctors to Book
                    </motion.h1>
                    <motion.p 
                        variants={itemVariants}
                        className='text-gray-600 text-sm md:text-base'
                    >
                        Simply browse through our extensive list of trusted doctors and book your appointment today.
                    </motion.p>
                </motion.div>

                {/* Doctors Grid */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5'
                >
                    {doctors?.slice(0,8).map((item, index) => (
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            key={index}
                            onClick={() => { navigate(`/appointment/${item._id}`) }}
                            className='group bg-white rounded-2xl overflow-hidden cursor-pointer
                                     shadow-md hover:shadow-xl transition-all duration-500 ease-out'
                        >
                            {/* Image Container */}
                            <div className='relative overflow-hidden aspect-[4/3]'>
                                <motion.img 
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                    src={item.image} 
                                    alt={item.name}
                                    className='w-full h-full object-cover' 
                                />
                                <motion.div 
                                    variants={itemVariants}
                                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium
                                               ${item.available 
                                                 ? "bg-green-100 text-green-600" 
                                                 : "bg-red-100 text-red-600"}`}
                                >
                                    {item.available ? "Available" : "Not Available"}
                                </motion.div>
                            </div>

                            {/* Content Section */}
                            <div className='p-6'>
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex items-center gap-2 mb-3"
                                >
                                    <Rating 
                                        precision={0.1} 
                                        value={item?.totalRating} 
                                        readOnly 
                                        size="small"
                                        className="text-[#0066ff]"
                                    />
                                    <Typography className="text-sm text-gray-600">
                                        {item?.totalRating?.toFixed(1)} ({item?.feedback.length})
                                    </Typography>
                                </motion.div>

                                <motion.h3 
                                    variants={itemVariants}
                                    className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#0066ff] transition-colors duration-300'
                                >
                                    {item.name}
                                </motion.h3>
                                <motion.p 
                                    variants={itemVariants}
                                    className='text-gray-600 text-sm mb-4'
                                >
                                    {item.speciality}
                                </motion.p>

                                <motion.div 
                                    variants={itemVariants}
                                    className='flex items-center justify-between text-sm'
                                >
                                    <div className='flex items-center gap-2'>
                                        <svg className="w-4 h-4 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className='text-gray-600'>Available 24/7</span>
                                    </div>
                                    <div className='flex items-center gap-1 text-[#0066ff]'>
                                        Book Now 
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View More Button */}
                <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { navigate("/doctors"); scrollTo(0,0); }}
                    className='mt-12 px-8 py-3 rounded-full bg-[#0066ff] text-white font-medium
                             hover:bg-[#0052cc] transform transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-opacity-50'
                >
                    View All Doctors
                </motion.button>
            </motion.div>
        </div>
    )
}

export default TopDoctors