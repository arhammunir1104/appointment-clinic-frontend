import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {AppContext} from "../context/AppContext"
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors'; 
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Modal, Rating, Typography } from '@mui/material';
import Calender from './Calender';
import PhoneInput from "react-phone-number-input";


function Appointment() {
  const {docId} = useParams();
  const {doctors,currencySymbol,backendUrl, token, getDoctorsData, updateProfile} = useContext(AppContext);
  const dasyOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();

  let [loaderMessage, setLoaderMessage]= useState("");
  const [loading, setLoading] = useState(false);


  const fetchDocInfo = async () =>{
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  }; 

  const [userDetails, setUserDetails] = useState({
    name : "",
    email : "",
    phone : "",
    address : {
      line1 : "",
      line2 : ""
    },
    gender : "",
    dob : ""
  });

  const [showUserDetModal, setShowUserDetModal] = useState(false);

  const getAvailableSlots = async () =>{
    setDocSlots([]);

    //getting current date;
    let today = new Date();

    for(let i=0; i<7; i++){
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate()+i);

      //setting end time of the time with index
      let endTime = new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);

      //setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      };

      let timeSlots = [];
      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour : "2-digit", minute : "2-digit"});



        // Logic for removing the time slots if booked , we are hiding it because in general we don't need it
          // because a doctor can complete the appointment of multiple paitients within an half an hour

        // ----------------------------------------------------------------------------------
        // let day = currentDate.getDate();
        // let month = currentDate.getMonth()+1;
        // let year = currentDate.getFullYear();

        // const slotDate = `${day}_${month}_${year}`;

        // const slotTime = formattedTime;


        // const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        // console.log(isSlotAvailable)

        // if(isSlotAvailable){
        //   //add slots to array
        // timeSlots.push({
        //   dateTime : new Date(currentDate),
        //   time : formattedTime
        // });
        // }
        
        // ----------------------------------------------------------------------------------


        //add slots to array
        timeSlots.push({
          dateTime : new Date(currentDate),
          time : formattedTime
        });

        //Intcrement current time by 30 minutes.
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      };


      setDocSlots(prev => ([...prev, timeSlots]));
    }
  };


  const bookAppointment = async () =>{

    if(!token){
      toast.warn("Login to Book Appointment");
      return navigate("/login") ;
    }


    try{
      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();

      const slotDate =`${day}_${month}_${year}`;

      if(!slotDate || !slotTime){
        return toast.error("Please select an Schedule.");
      }
      
      
      setLoaderMessage("Confirming Appointment");
      setLoading(true);
      const data = await axios.post(`${backendUrl}/api/user/bookAppointment`, {docId, slotDate, slotTime}, {headers : {token}});

      if(data?.data?.status === "success"){
        toast.success(data?.data?.message);
        getDoctorsData();
        navigate("/my-appointments")
        setLoading(false);
    }
    else{
      setLoading(false);
        toast.error(data?.response?.data?.message);
    }
    }
    catch(e){
      // console.log(e);
      toast.error(e?.response?.data?.message);
    }


  };


  useEffect(()=>{
    fetchDocInfo();
    scrollTo(0,0);
  }, [doctors, docId]);

  useEffect(()=>{
    getAvailableSlots();
  }, [docInfo]);

  useEffect(()=>{
  }, [docSlots]);


  async function updateUserProfile(e){
    try{
      e.preventDefault();
      const data = await updateProfile(userDetails?.phone, JSON.stringify(userDetails?.address), userDetails?.gender, userDetails?.dob);

      if(data?.data?.status === "success"){
        toast.success(data?.data?.message);
        setShowUserDetModal(false);
      }
      else{
        toast.error(data?.response?.data?.message);
      }
    }
    catch(e){
      toast.error(e.message)
    }
  }


  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {!docInfo ? (
        <div className='min-h-[60vh] flex items-center justify-center'>
          <img src={assets.loader} className='w-20 h-20' alt="Loading..." />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Doctor Profile Section */}
          <div className='grid md:grid-cols-2 gap-8'>
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden w-[90vw] md:w-full shadow-lg">
              <img 
                className='w-full h-[400px] object-cover' 
                src={docInfo.image} 
                alt={docInfo.name} 

              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className='text-white text-2xl font-semibold flex items-center gap-2'>
                  {docInfo.name}
                  <img className='w-5' src={assets.verified_icon} alt="verified" />
                </h1>
                <div className="flex items-center gap-2 text-white/90 mt-1">
                  <Rating 
                    precision={0.1} 
                    value={docInfo?.totalRating} 
                    readOnly 
                    size="small"
                  />
                  <span className="text-sm">
                    ({docInfo?.feedback.length} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-white  w-[90vw] md:w-full overflow-x-hidden rounded-2xl shadow-lg p-6">
              <Calender 
                setUserDetails={setUserDetails}
                showModal={setShowUserDetModal}
                docId={docId}
                doctorAvailability={docInfo?.availability}
                doctorData={docInfo}
                setLoaderMessage={setLoaderMessage}
                setLoading={setLoading}
              />
            </div>
          </div>

          {/* Details/Reviews Tab Section */}
          <div className='bg-white rounded-2xl shadow-lg'>
            {/* Tab Headers */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 px-6 text-center transition-colors ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-primary text-primary font-medium' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Doctor Details
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-primary text-primary font-medium' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Patient Reviews
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {docInfo.degree}
                    </span>
                    <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {docInfo.speciality}
                    </span>
                    <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {docInfo.experience}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">About</h3>
                    <p className="text-gray-600 mt-2">{docInfo.about}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="text-xl font-semibold text-primary">
                      {currencySymbol}{docInfo.fees}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Reviews</h3>
                  <div className="mt-3 space-y-4">
                    {/* Dummy Review 1 */}

                    {
                      docInfo?.feedback?.length > 0 ?
                      docInfo?.feedback?.map((val)=>{
                        return(
                          <>
                               <div className="flex items-start gap-3 border-b pb-3 w-full">
                            <img className="w-12 h-12 rounded-full" src={val?.userData?.image} alt="Reviewer" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <Rating precision={0.1} value={val?.rating} readOnly className="text-yellow-400 text-[2px]" style={{ fontSize: "15px" }} />
                                <Typography className="text-[0.6rem] text-gray-600" style={{ fontSize: ".6rem" }} ml={1}>
                                  {val?.rating.toFixed(1)}
                                </Typography>
                              </div>
                              <p className="font-medium text-gray-900">{val?.userData?.name}</p>
                              
                              {/* Review Text Container */}
                              <div className="p-2 w-full break-words whitespace-pre-wrap overflow-hidden">
                                <p className="text-sm text-gray-600 break-words">
                                  {val?.review}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          </>
                        )
                      })
                      :
                      <p>No Reviews</p>
                    }   
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Doctors Section */}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      )}

      {/* Loader  */}
      <Modal open={loading}>
        <Box className="w-full h-full flex justify-center items-center">
          <Box className="p-4 bg-white rounded-md shadow-md w-[60%] max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
            <img src={assets.loader} alt="Loading..." className="w-40" />
            <h1 className="text-center font-bold text-xl ml-2">{loaderMessage}...</h1>
          </Box>
        </Box>
      </Modal>

      {/* Account Details */}
      <Modal open={showUserDetModal} className="p-2 backdrop-blur-md overflow-y-auto">
        <Box className="w-full min-h-screen flex justify-center items-center py-4">
          <Box className="bg-white rounded-xl shadow-lg w-[95%] md:w-[70%] lg:w-[50%] max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header - Fixed at top */}
            <div className="bg-primary/5 p-4 rounded-t-xl border-b sticky top-0 z-10">
              <h2 className="text-xl md:text-2xl font-semibold text-primary">Complete Your Profile</h2>
              <p className="text-gray-600 text-sm mt-1">Please provide your details for a better experience</p>
            </div>

            {/* Scrollable content area */}
            <div className="w-full px-4 md:px-[10%] py-4 overflow-y-auto flex-1">
              <form onSubmit={updateUserProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="form-group">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                    <input
                      required
                      type="text"
                      disabled
                      value={userDetails?.name}
                      name="name"
                      id="name"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 disabled:opacity-75"
                      placeholder="Arham Munir"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                    <input
                      required
                      type="text"
                      disabled
                      value={userDetails?.email}
                      name="email"
                      id="email"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 disabled:opacity-75"
                      placeholder="arham***@gmail.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">Contact No</label>
                    <input
                      required
                      type="text"
                      name="phone"
                      value={userDetails?.phone}
                      onChange={(e) => {
                        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
                      }}
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20"
                      placeholder="+1 (212)-123-123"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="form-group">
                    <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
                    <div className="space-y-2">
                      <input
                        required
                        type="text"
                        value={userDetails?.address?.line1}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            address: { ...userDetails.address, line1: e.target.value },
                          });
                        }}
                        name="line1"
                        id="address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20"
                        placeholder="Address Line 1"
                      />
                      <input
                        required
                        type="text"
                        name="line2"
                        id="address"
                        value={userDetails?.address.line2}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            address: { ...userDetails.address, line2: e.target.value },
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20"
                        placeholder="Address Line 2"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1 block">Gender</label>
                    <select
                      required
                      value={userDetails?.gender}
                      onChange={(e) => {
                        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
                      }}
                      id="gender"
                      name="gender"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1 block">Date of Birth</label>
                    <input
                      required
                      id="dob"
                      value={userDetails?.dob}
                      onChange={(e) => {
                        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
                      }}
                      name="dob"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20"
                      type="date"
                    />
                  </div>
                </div>

                {/* Full Width Button */}
                <div className="md:col-span-2 flex justify-center items-center mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Appointment