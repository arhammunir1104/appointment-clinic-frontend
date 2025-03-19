import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets.js";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";

function MyProfile() {
  const {backendUrl, userData, setUserData, token, loadUserData} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Animation variants
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
      transition: { duration: 0.5 }
    }
  };

  const updateUserProfileData = async () => {
    try {
      setLoaderMessage("Updating Profile");
      setLoading(true);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const data = await axios.post(`${backendUrl}/api/user/updateProfile`, formData, {headers: {token}});
      if(data?.data?.status === "success") {
        toast.success(data?.data?.message);
        loadUserData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data?.response?.data?.message);
      }
    } catch(e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return userData && (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Profile Header */}
        <motion.div 
          variants={itemVariants}
          className="bg-[#0066ff] text-white p-8 relative"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              {isEdit ? (
                <label htmlFor="image" className="cursor-pointer block relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                    <img 
                      className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-50" 
                      src={image ? URL.createObjectURL(image) : userData.image} 
                      alt="Profile" 
                    />
                  </div>
                  {/* Edit overlay - always visible in edit mode, more visible on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                    <img className="w-8 h-8" src={assets.upload_icon} alt="Upload" />
                    <span className="text-white text-sm mt-1">Change Photo</span>
                  </div>
                  {/* Pulsing border effect */}
                  <div className="absolute -inset-1 rounded-full border-2 border-white/50 animate-pulse"></div>
                </label>
              ) : (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    className="w-full h-full object-cover" 
                    src={userData.image} 
                    alt="Profile" 
                  />
                </div>
              )}
              <input className="hidden" onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="text-center md:text-left"
            >
              {isEdit ? (
                <div className="relative group">
                  <input 
                    className="bg-transparent text-3xl font-bold border-b-2 border-white/50 px-2 py-1 focus:outline-none focus:border-white w-full md:w-auto placeholder-white/50"
                    type="text" 
                    onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))} 
                    value={userData.name}
                    placeholder="Enter your name"
                  />
                  {/* Edit indicator */}
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-white/70">
                    <img src={assets.edit_icon} alt="Edit" className="w-4 h-4" />
                  </div>
                  {/* Hint text */}
                  <span className="absolute left-2 -top-6 text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to edit name
                  </span>
                </div>
              ) : (
                <h1 className="text-3xl font-bold">{userData.name}</h1>
              )}
              <p className="text-white/80 mt-2">{userData.email}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Content */}
        <motion.div 
          variants={itemVariants}
          className="p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Contact Information
              </h2>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
                  {isEdit ? (
                    <input 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0066ff]" 
                      type="text" 
                      onChange={(e) => setUserData(prev => ({...prev, phone: e.target.value}))} 
                      value={userData.phone} 
                    />
                  ) : (
                    <p className="text-gray-900">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Address</label>
                  {isEdit ? (
                    <div className="space-y-2">
                      <input 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0066ff]" 
                        type="text" 
                        onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} 
                        value={userData.address.line1} 
                        placeholder="Address Line 1"
                      />
                      <input 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0066ff]" 
                        type="text" 
                        onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} 
                        value={userData.address.line2} 
                        placeholder="Address Line 2"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900">
                      {userData.address.line1}<br />
                      {userData.address.line2}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Basic Information */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Basic Information
              </h2>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Gender</label>
                  {isEdit ? (
                    <select 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0066ff]"
                      onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} 
                      value={userData.gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{userData.gender}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Date of Birth</label>
                  {isEdit ? (
                    <input 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0066ff]"
                      type="date" 
                      onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} 
                      value={userData.dob} 
                    />
                  ) : (
                    <p className="text-gray-900">{userData.dob}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex justify-center"
          >
            {isEdit ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0066ff] text-white px-8 py-3 rounded-full hover:bg-[#0052cc] transition-colors duration-300"
                onClick={updateUserProfileData}
              >
                Save Changes
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#0066ff] text-[#0066ff] px-8 py-3 rounded-full hover:bg-[#0066ff] hover:text-white transition-colors duration-300"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Loading Modal */}
      <Modal open={loading}>
        <Box className="fixed inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4"
          >
            <div className="flex flex-col items-center">
              <motion.img 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                src={assets.loader} 
                alt="Loading..." 
                className="w-32 mb-4" 
              />
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-900"
              >
                {loaderMessage}...
              </motion.h2>
            </div>
          </motion.div>
        </Box>
      </Modal>
    </motion.div>
  )
}

export default MyProfile