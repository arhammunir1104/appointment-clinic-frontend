import React from "react"
import { assets } from "../assets/assets_frontend/assets"
import TopDoctors from "../components/TopDoctors"
import { motion } from "framer-motion"

function About() {
  const features = [
    {
      title: "EFFICIENCY",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
      icon: assets.efficiency_icon 
    },
    {
      title: "CONVENIENCE",
      description: "Access to a network of trusted healthcare professionals in your area.",
      icon: assets.convenience_icon
    },
    {
      title: "PERSONALIZATION",
      description: "Tailored recommendations and reminders to help you stay on top of your health.",
      icon: assets.personalization_icon 
    }
  ]

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h4 className="text-[#0066ff] font-medium mb-2">ABOUT US</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Transforming Healthcare Through Technology
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your trusted partner in managing healthcare needs conveniently and efficiently.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src={assets.about_image} 
                alt="Healthcare" 
                className="w-full rounded-2xl shadow-lg"
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#0066ff]/10 p-3 rounded-lg">
                    <img src={assets.doctor_icon} alt="" className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                    <p className="text-gray-600">Expert Doctors</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:w-1/2 space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              Welcome to Prescripto, where we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. Our platform is designed to make healthcare management simple, efficient, and accessible.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>

            <div className="bg-[#0066ff]/5 p-6 rounded-xl border border-[#0066ff]/10">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why <span className="text-[#0066ff]">Choose Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-xl transition-all duration-300 hover:bg-[#0066ff] hover:shadow-lg"
              >
                <div className="mb-6 inline-block p-4 rounded-lg bg-[#0066ff]/10 group-hover:bg-white/10">
                  <img src={feature.icon} alt="" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0066ff] py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "500+", label: "Daily Patients" },
              { value: "100+", label: "Expert Doctors" },
              { value: "10+", label: "Years Experience" },
              { value: "99%", label: "Patient Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div>
        <TopDoctors />
      </div>

      {/* Awards & Achievements Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h4 className="text-[#0066ff] font-medium mb-2">RECOGNITION</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Awards & Achievements
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Recognition of our commitment to excellence in healthcare services and technological innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#0066ff]/10 p-4 rounded-lg group-hover:bg-[#0066ff] transition-colors duration-300">
                    <img src={assets.award_icon} alt="" className="w-16" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Best Healthcare Platform 2023
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Recognized for exceptional healthcare service delivery and patient satisfaction
                    </p>
                    <div className="flex items-center gap-2 text-[#0066ff]">
                      <span className="text-sm font-medium">Healthcare Tech Awards</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default About