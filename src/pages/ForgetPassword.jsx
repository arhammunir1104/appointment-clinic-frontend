import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { MuiOtpInput } from "mui-one-time-password-input";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Modal } from '@mui/material';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function ForgetPassword() {
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPasswordBtn, setShowPasswordBtn] = useState(true);
    const [showCPasswordBtn, setCShowPasswordBtn] = useState(true);

    
    const [loaderMessage, setLoaderMessage]= useState("");
    const [loading, setLoading] = useState(false);

    const {
      sendEmailOtpForgetPasswordPage,
      verifyOtpForgetPasswordPage,
      changePasswordForgetPasswordPage

    } = useContext(AppContext);

    const [email, setEmail ]= useState("");
    const [otp, setOtp ]= useState("");
    const [password, setPassword ]= useState("");
    const [cPassword, setCPassword ]= useState("");

    const navigate = useNavigate();


    async function sendOTP(e){
      try{
        e.preventDefault();
        setLoaderMessage("Sending OTP...");
        setLoading(true);

        if(!email){
          setShowEmailModal(true);
          return toast.error("Please Enter Email.");
        }

        const data = await sendEmailOtpForgetPasswordPage(email);


        if(data?.data?.status === "success") {
          toast.success("OTP sent.");  
          setLoading(false);
          setShowEmailModal(false);
          setShowOTPModal(true);
        }
        else{
          toast.error(data?.response?.data?.message);  
          setLoading(false);
        }

      }
      catch(e){
        toast.error(e?.response?.data?.message); 
        setLoading(false);
      }
    }


    async function verifyOTP(e){
      try{

        e.preventDefault();
        setLoaderMessage("Verifying OTP...");
        setLoading(true);

        if(otp.length < 4) {
          return toast.error("Please Enter valid OTP.")
        }

        const data = await verifyOtpForgetPasswordPage(email, otp);


        if(data?.status === 200 || data?.data?.status === "success") {
          toast.success("OTP verified.");  
          setLoading(false);
          setShowOTPModal(false);
          setShowPasswordModal(true);
        }
        else{
          toast.error(data?.response?.data?.message);  
          setLoading(false);
        }


        
      }
      catch(e){
        toast.error(e?.response?.data?.message); 
        setLoading(false);
      }
    }

    async function changePassword(e){
      try{
        
        e.preventDefault();
        if(password !== cPassword){
          return toast.error("Password don't match.")
        }
        if(password.length<8 && cPassword.length<8){
          return toast.error("Password should be greater than 8 characters.")
        }

        
        setLoaderMessage("Changing Password...");
        setLoading(true);


        if(!email){
          setShowEmailModal(true); 
          setShowPasswordModal(false);
          return;
        }

        const data = await changePasswordForgetPasswordPage(email, password);


        if(data?.status === 200 || data?.data?.status === "success") {
          toast.success("Password Changed Successfully.");  
          navigate("/login");
        }
        else{
          toast.error(data?.response?.data?.message);  
          setLoading(false);
        }
      }
      catch(e){
        toast.error(e?.response?.data?.message); 
      }
    }

  return (
    <>
    {
        showEmailModal && 
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12"
        >
            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Left Side - Illustration */}
                <div className="flex-1 text-center lg:text-left">
                 
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Forgot Your Password?
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Don't worry! Enter your email and we'll send you a verification code.
                    </p>
                </div>

                {/* Right Side - Email Form */}
                <div className="flex-1 w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={sendOTP} method="post" className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Send OTP
                                </motion.button>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    }
   {
  showOTPModal && (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12"
    >
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter OTP</h2>
            <form onSubmit={verifyOTP} method="post" className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-4">
                        We've sent a code to {email}
                    </label>
                    <MuiOtpInput
                        autoFocus
                        length={4}
                        value={otp}
                        onChange={(e) => setOtp(e)}
                        className="gap-4 [&_input]:h-12 [&_input]:w-12 [&_input]:text-center [&_input]:text-lg [&_input]:font-bold [&_input]:border-2 [&_input]:border-gray-300 [&_input]:rounded-lg [&_input]:focus:border-blue-500"
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                    Verify OTP
                </motion.button>
                <div className="text-center">
                    <button
                        type="button"
                        onClick={sendOTP}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                        Resend OTP
                    </button>
                </div>
            </form>
        </div>
    </motion.div>
  )
}

{
        showPasswordModal && 
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12"
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Set New Password</h2>
                <form onSubmit={changePassword} method="post" className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-2">New Password</label>
                            <input
                                type={showPasswordBtn ? "password" : "text"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordBtn(!showPasswordBtn)}
                                className="absolute right-3 top-[38px]"
                            >
                                {showPasswordBtn ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                            <input
                                type={showCPasswordBtn ? "password" : "text"}
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setCShowPasswordBtn(!showCPasswordBtn)}
                                className="absolute right-3 top-[38px]"
                            >
                                {showCPasswordBtn ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">Password should be at least 8 characters long</p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                        Change Password
                    </motion.button>
                </form>
            </div>
        </motion.div>
    }

                <Modal  open={loading}>
                <Box className="flex h-full w-full items-center justify-center">
                  <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                    <img src={assets.loader} alt="Loading..." className="w-32 mx-auto mb-4" />
                    <p className="text-center text-gray-700 text-lg">{loaderMessage}</p>
                  </div>
                </Box>
              </Modal>
   
    </>
  )
}

export default ForgetPassword