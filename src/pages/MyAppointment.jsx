import { useContext, useEffect, useState } from "react"
import {AppContext} from "../context/AppContext"
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Tabs, Tab } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {assets} from "../assets/assets_frontend/assets.js";
import DoctorFeedbackModal from "../components/DoctorFeedbackModal.jsx";
import DownloadSlipt from "../components/DownloadSlipt.jsx";
import { motion } from "framer-motion";

function MyAppointment() { 
  const {getDoctorsData ,backendUrl, token} = useContext(AppContext)
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
  const navigate = useNavigate();
  
  let [loaderMessage, setLoaderMessage]= useState("");
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentApp, setCurrentApp] = useState({});
  
  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split("_");
    return(dateArray[0]) + " " +months[Number(dateArray[1])] + " " + dateArray[2];
  }

  const [appointments, setAppointments]  =useState([]);
  const [tabValue, setTabValue] = useState(0);
  
  const filterAppointments = (appointments) => {
    
    if (!Array.isArray(appointments)) {
      return { upcoming: [], completed: [], cancelled: [] };
    }
    
    const upcoming = appointments.filter(app => app && !app.isCompleted && !app.cancelled);
    const completed = appointments.filter(app => app && app.isCompleted);
    const cancelled = appointments.filter(app => app && app.cancelled);
    
    return { upcoming, completed, cancelled };
  };

  // Function to check if the feedback submission time has passed (more than 30 days)
  const isFeedbackAllowed = (appointmentDate) => {
    const currentDate = new Date();
    const appointmentDateObj = new Date(appointmentDate);

    // Calculate the difference in days between the current date and appointment date
    const diffTime = Math.abs(currentDate - appointmentDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return diffDays <= 30; // Return true if within 30 days, otherwise false
  };

  
  const getUserAppointments = async () =>{
    try{
      const data = await axios.get(`${backendUrl}/api/user/appointments`, {headers: {token}});
      
      if(data?.data?.status === "success"){
        setAppointments(data?.data?.data);
      }
      else{
        toast.error(data?.response?.data?.message);
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(()=>{
    scrollTo(0,0);
    if(!token){
      return navigate("/login")
    }
    getUserAppointments();
  }, [token]);

  const cancelAppointment = async (appointmentId) =>{
    try{
      setLoaderMessage("Cancelling Appointment");
      setLoading(true);
      const data = await axios.post(`${backendUrl}/api/user/cancelAppointment`, {appointmentId}, {headers : {token}});
      if(data?.data?.status === "success"){
        toast.success(data?.data?.message);
        getUserAppointments();
        getDoctorsData();
        setLoading(false);
      }
      else{
        setLoading(false);
        toast.error(data?.response?.data?.message);
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
    }
  };

  const payForAppointment = async (appointmentId) =>{
    try{
      setLoaderMessage("Redirecting");
      setLoading(true);
      const data = await axios.post(`${backendUrl}/api/user/paymentAppointment`, {appointmentId}, {headers : {token}});
      if(data?.data?.status === "success"){
        setLoading(false);
        window.open(data?.data?.session?.url, "_blank", "noopener,noreferrer");
      }
      else{
        setLoading(false);
        toast.error(data?.response?.data?.message);
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
    }
  };


  function stringconvert(string){
    let a = JSON.parse(string);
    if(typeof(a) === Object){
      return(a);
    }
    let b = JSON.parse(a);
    return(b)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {token ? (
        <div className="space-y-6">
          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4"
          >
            <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
            <div className="mt-4 sm:mt-0">
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
                className="bg-white rounded-lg shadow-sm"
              >
                <Tab label="Upcoming" />
                <Tab label="Completed" />
                <Tab label="Cancelled" />
              </Tabs>
            </div>
          </motion.div>

          {/* Appointments list */}
          <div className="space-y-6">
            {appointments.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <img src={assets.no_data} alt="No appointments" className="w-48 mx-auto mb-4" />
                <p className="text-gray-500">No appointments found</p>
              </motion.div>
            ) : (
              <>
                {filterAppointments(appointments)[
                  tabValue === 0 ? 'upcoming' : 
                  tabValue === 1 ? 'completed' : 'cancelled'
                ]?.map((item, index) => (
                  item && item.docData && (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_200px] gap-6">
                        {/* Doctor Image */}
                        <div className="flex items-center justify-center">
                          <img 
                            src={item.docData.image} 
                            alt={item.docData.name} 
                            className="w-32 h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                          />
                        </div>

                        {/* Appointment Details */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {item.docData.name}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {item.docData.speciality}
                          </p>
                          <div className="text-gray-600 space-y-2">
                            <p className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {stringconvert(item.docData.address).line1}, {stringconvert(item.docData.address).line2}
                            </p>
                            <p className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 justify-center">
                          <DownloadSlipt id={item._id} />
                          
                          {/* Payment Status */}
                          {item.payment && !item.isCompleted && (
                            <div className="flex items-center justify-center bg-green-50 text-green-600 py-2 px-4 rounded-md">
                              <TaskAltIcon className="w-4 h-4 mr-2" />
                              Paid
                            </div>
                          )}

                          {/* Payment Button */}
                          {!item.cancelled && !item.payment && !item.isCompleted && (
                            <button 
                              onClick={() => payForAppointment(item._id)}
                              className="flex items-center justify-center bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                              Pay Online
                            </button>
                          )}

                          {/* Cancel Button */}
                          {!item.cancelled && !item.isCompleted && (
                            <button 
                              onClick={() => cancelAppointment(item._id)}
                              className="flex items-center justify-center border border-red-600 text-red-600 py-2.5 px-4 rounded-md hover:bg-red-50 transition-colors"
                            >
                              Cancel
                            </button>
                          )}

                          {/* Completed Status */}
                          {item.isCompleted && (
                            <>
                              <div className="flex items-center justify-center bg-green-50 text-green-600 py-2.5 px-4 rounded-md">
                                <TaskAltIcon className="w-4 h-4 mr-2" />
                                Completed
                              </div>
                              
                              {/* Feedback Button */}
                              {isFeedbackAllowed(item.appointmentDate) && !item.isFeedback && (
                                <button
                                  onClick={() => {
                                    setCurrentApp(item);
                                    setShowFeedback(true);
                                  }}
                                  className="flex items-center justify-center bg-blue-50 text-blue-600 py-2.5 px-4 rounded-md hover:bg-blue-100 transition-colors"
                                >
                                  Submit Feedback
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <img src={assets.login_required} alt="Login required" className="w-48 mx-auto mb-4" />
          <p className="text-gray-500">Please login to see your appointments</p>
          <button 
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-600 text-white py-2.5 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </motion.div>
      )}

      {/* Loader Modal */}
      <Modal open={loading}>
        <Box className="flex h-full w-full items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
          >
            <motion.img 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              src={assets.loader} 
              alt="Loading..." 
              className="w-32 mx-auto mb-4" 
            />
            <p className="text-center text-gray-700 text-lg">{loaderMessage}...</p>
          </motion.div>
        </Box>
      </Modal>

      {/* Feedback Modal */}
      {showFeedback && (
        <DoctorFeedbackModal 
          getUserAppointments={getUserAppointments} 
          showFeedback={showFeedback}  
          setShowFeedback={setShowFeedback} 
          appDat={currentApp}  
        />
      )}
    </div>
  )
}

export default MyAppointment