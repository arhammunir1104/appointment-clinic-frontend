import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import { motion } from 'framer-motion';

function RelatedDoctors({docId, speciality}) {
    const {doctors} = useContext(AppContext);
    const navigate = useNavigate();
    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if(doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    },[doctors, speciality, docId])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            className='bg-white py-16'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className='container mx-auto px-4'>
                {/* Header Section */}
                <motion.div 
                    className='text-center max-w-2xl mx-auto mb-12'
                    variants={headerVariants}
                >
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Related Doctors in <span className='text-[#0066ff]'>{speciality}</span>
                    </h1>
                </motion.div>

                {/* Doctors Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {relDoc?.slice(0,4).map((item, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            onClick={() => { 
                                navigate(`/appointment/${item._id}`);
                                scrollTo(0,0);
                            }}
                            className='bg-white rounded-2xl group shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer p-4'
                        >
                            {/* Image and Availability */}
                            <motion.div 
                                className='relative mb-4'
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className='w-full h-full object-cover transition-transform duration-500' 
                                />
                                <motion.span 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className='absolute top-4 right-4 bg-[#e7f6ec] text-[#27c46f] 
                                               text-xs font-medium px-3 py-1 rounded-full'
                                >
                                    Available
                                </motion.span>
                            </motion.div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-2">
                                <Rating 
                                    value={item?.totalRating || 0} 
                                    readOnly 
                                    size="small"
                                    className="text-[#0066ff]"
                                />
                                <span className="text-gray-600 text-sm">
                                    {item?.totalRating?.toFixed(1) || "0.0"} ({item?.feedback?.length || 0})
                                </span>
                            </div>

                            {/* Doctor Info */}
                            <h3 className='text-[#0066ff] text-lg font-semibold mb-1'>
                                {item.name}
                            </h3>
                            <p className='text-gray-600 text-sm mb-4'>
                                {item.speciality}
                            </p>

                            {/* Available and Book Now */}
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className='text-gray-600 text-sm'>Available 24/7</span>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='text-[#0066ff] text-sm font-medium hover:underline'
                                >
                                    Book Now →
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default RelatedDoctors;