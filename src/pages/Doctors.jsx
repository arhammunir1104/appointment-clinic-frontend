import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from '../context/AppContext';
import { BsFilterLeft } from "react-icons/bs";
import { Rating, Typography } from "@mui/material";
import {assets} from "../assets/assets_frontend/assets.js"

function Doctors() {
  const {speciality} = useParams();
  let {doctors} = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [loading, setLoading] = useState(true);


  let navigate = useNavigate();

const applyFilter = ()=>{
  if(speciality){
    let data = doctors.filter((val)=>{
      return(val.speciality == speciality)
    });
    setFilterDoc(data);
  }
  else{
    setFilterDoc(doctors)
  }
};

useEffect(()=>{
  setLoading(true);
  applyFilter();
  setLoading(false);
  scrollTo(0,0);
}, [doctors, speciality]);
const [showFilter, setShowFilter] = useState(false);
  return (
    <>
    {
      loading ?
      <>
      <div className="flex justify-center items-center h-screen">
        <img src={assets.loader} alt="" />
      </div>
      </>
      :
      <>
         <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`flex gap-1 py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`} onClick={()=>{setShowFilter(prev => !prev)}}> <BsFilterLeft className={"mt-0.5"} /> Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={()=>{speciality === "General physician" ? navigate(`/doctors`) : navigate(`/doctors/General physician`) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100" :  "text-black"}`}>General physician</p>
          <p onClick={()=>{speciality === "Gynecologist" ? navigate(`/doctors`) : navigate(`/doctors/Gynecologist`) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100" :  "text-black"}`} >Gynecologist</p>
          <p onClick={()=>{speciality === "Dermatologist" ? navigate(`/doctors`) : navigate(`/doctors/Dermatologist`) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Dermatologist" ? "bg-indigo-100" :  "text-black"}`}>Dermatologist</p>
          <p onClick={()=>{speciality === "Pediatricians" ? navigate(`/doctors`) : navigate(`/doctors/Pediatricians`) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Pediatricians" ? "bg-indigo-100" :  "text-black"}` }>Pediatricians</p>
          <p onClick={()=>{speciality === "Neurologist" ? navigate(`/doctors`) : navigate(`/doctors/Neurologist`) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Neurologist" ? "bg-indigo-100" :  "text-black"}`}>Neurologist</p>
          <p onClick={()=>{speciality === "Gastroenterologist" ? navigate(`/doctors`) : navigate(`/doctors/Gastroenterologist`) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Gastroenterologist" ? "bg-indigo-100" :  "text-black"}`}>Gastroenterologist</p>
        </div>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
        {
                    filterDoc?.map((item, index)=>{                 
                       return(
                        <>
                            
                            <div onClick={()=>{navigate(`/appointment/${item._id}`)}} key={index} className='bg-white group ease-out hover:-translate-y-2 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden w-full max-w-[320px] mx-auto'>
                                <div className='relative w-full h-[300px] bg-white p-4'>
                                    <span className='absolute right-8 top-8 bg-[#E8F5ED] text-[#2AC275] px-4 py-1.5 rounded-full text-sm font-medium z-10'>
                                        {item.available ? "Available" : "Not Available"}
                                    </span>
                                    <img src={item.image} alt={item.name}  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'  />
                                </div>
                                <div className='p-8'>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Rating value={item?.totalRating || 0} readOnly size="medium" className="text-[#0066ff]" />
                                        <span className="text-gray-600">
                                            {item?.totalRating?.toFixed(1) || "0.0"} ({item?.feedback?.length || 0})
                                        </span>
                                    </div>
                                    <h3 className='text-[#0066ff] text-[22px] font-bold mb-2'>
                                        {item.name}
                                    </h3>
                                    <p className='text-gray-600 text-base mb-6'>
                                        {item.speciality}
                                    </p>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className='text-gray-600'>Available 24/7</span>
                                        </div>
                                        
                                        <div className='flex items-center gap-2 text-[#0066ff]'>
                                            <span className='font-medium'>Book Now</span>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                       )
                    })
            }
      </div>
      </div>
    </div>
      </>
      

    }
    </>
   
  )
}

export default Doctors