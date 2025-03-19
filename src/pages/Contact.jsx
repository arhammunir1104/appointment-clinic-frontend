import React from "react"
import {assets} from "../assets/assets_frontend/assets.js"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from "framer-motion";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: assets.location_icon,
  iconUrl: assets.location_icon,
  shadowUrl: "",
});

function Contact() {
  // Sample office locations - replace with actual coordinates
  const offices = [
    {
      position: { lat: 40.7128, lng: -74.0060 },
      title: "New York Office",
      address: "123 Broadway, New York, NY",
      phone: "(212) 555-0123",
      email: "ny@prescripto.com"
    },
    {
      position: { lat: 34.0522, lng: -118.2437 },
      title: "Los Angeles Office",
      address: "456 Sunset Blvd, Los Angeles, CA",
      phone: "(310) 555-0123",
      email: "la@prescripto.com"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Get in touch with our team. We're here to help and answer any questions you might have.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <img 
            className="w-full h-full object-cover" 
            src={assets.contact_image} 
            alt="Contact Us" 
          />
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-8"
        >
          {offices.map((office, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="text-xl font-bold text-gray-800 mb-4"
              >
                {office.title}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                className="space-y-3 text-gray-600"
              >
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {office.address}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {office.phone}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {office.email}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Replace Google Maps Section with OpenStreetMap */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="rounded-lg overflow-hidden shadow-lg h-[400px]"
      >
        <MapContainer 
          center={[37.0902, -95.7129]} 
          zoom={4} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {offices.map((office, index) => (
            <Marker 
              key={index} 
              position={[office.position.lat, office.position.lng]}
            >
              <Popup>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-bold">{office.title}</h3>
                  <p>{office.address}</p>
                  <p>{office.phone}</p>
                </motion.div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>

      {/* Careers Section */}
     
    </motion.div>
  )
}

export default Contact