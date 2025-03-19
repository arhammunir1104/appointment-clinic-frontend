import React, { useContext, useEffect, useState } from 'react'
import {assets} from "../assets/assets_frontend/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import EmailOtp from './EmailOtp';

function Navbar() {

    let navigate = useNavigate();

    const {token,setToken, userData} = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    // const [token, setToken] = useState(true);

    const logout = () =>{
        setToken(false);
        localStorage.removeItem("token");
    }


  return (
    
    <>
        <div className="bg-[#0066ff] text-white py-1.5 px-4">
            <div className="container mx-auto flex md:flex-row flex-col justify-between items-center text-xs">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src={assets.phone_icon} alt="" className="w-3.5 h-3.5" />
                        <span>+92 301 2865 213</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={assets.email_icon} alt="" className="w-3.5 h-3.5" />
                        <span>arhammunir1104@gmail.com</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <img src={assets.location_icon} alt="" className="w-3.5 h-3.5" />
                    <span>12 North West New York 100</span>
                </div>
            </div>
        </div>

        <div className="relative">
            {!userData?.isEmailVerify && userData !== false && (
                <div className='fixed inset-0 w-[100vw] bg-black/50 backdrop-blur-sm z-50'>
                    <div className='mx-[-3%] w-[100vw] sm:mx-[0%]'>
                        <EmailOtp className={"absolute"} userData={userData} />
                    </div>
                </div>
            )}

            <div className='bg-white px-2 my-2 '>
                <div className='container mx-auto flex relative items-center justify-between py-3'>
                    <img onClick={()=>{navigate("/");}} src={assets.logo} alt="" className='w-36 cursor-pointer' />
                    
                    <ul className='hidden md:flex items-start gap-8 font-medium text-sm'>
                        <NavLink to={"/"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                            <li className='py-1'>HOME</li>
                        </NavLink>
                        <NavLink to={"/doctors"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                            <li className='py-1'>ALL DOCTORS</li>
                        </NavLink>
                        <NavLink to={"/about"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                            <li className='py-1'>ABOUT</li>
                        </NavLink>
                        <NavLink to={"/contact"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                            <li className='py-1'>CONTACT</li>
                        </NavLink>
                    </ul>

                    <div className='flex items-center gap-4'>
                        {
                            token
                            ?
                            <>
                            <div className='flex items-center gap-2 cursor-pointer group relative'>
                                <img className='w-8 rounded-full' src={userData?.image} alt="" />
                                <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                        <p onClick={()=>{navigate("/my-profile")}} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={()=>{navigate("/my-appointments")}} className='hover:text-black cursor-pointer'>My Appointments</p>
                                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            <button 
                                onClick={()=>{navigate("/login")}} 
                                className='bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3 rounded-full font-medium hidden md:block transition duration-300'
                            >
                                Create Account
                            </button>
                        }

                        <img src={assets.menu_icon} onClick={()=>{setShowMenu(true)}} className='w-6 md:hidden' alt="" />

                        <div className={`${showMenu ? "fixed w-full h-full" : "hidden"} md:hidden right-0 top-0 bottom-0 z-50 bg-white`}>
                            <div className='flex items-center justify-between px-5 py-6'>
                                <img src={assets.logo} className='w-36' alt="" />
                                <img src={assets.cross_icon} className='w-7' onClick={()=>{setShowMenu(false)}} alt="" />
                            </div>

                            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                                <NavLink onClick={()=>{setShowMenu(false)}} to={"/"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                                    <p className={"px-4 py-2 rounded-full inline-block"}>HOME</p>
                                </NavLink>
                                <NavLink onClick={()=>{setShowMenu(false)}} to={"/doctors"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                                    <p className={"px-4 py-2 rounded-full inline-block"}>ALL DOCTORS</p>
                                </NavLink>
                                <NavLink onClick={()=>{setShowMenu(false)}} to={"/about"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                                    <p className={"px-4 py-2 rounded-full inline-block"}>ABOUT</p>
                                </NavLink>
                                <NavLink onClick={()=>{setShowMenu(false)}} to={"/contact"} className={({isActive}) => isActive ? "text-[#0066ff]" : "text-gray-700 hover:text-[#0066ff]"}>
                                    <p className={"px-4 py-2 rounded-full inline-block"}>CONTACT</p>
                                </NavLink>
                            </ul>

                            <div className="fixed bottom-0 left-0 right-0 bg-[#0066ff] text-white py-4 px-5">
                                <div className="flex flex-col gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <img src={assets.phone_icon} alt="" className="w-3.5 h-3.5" />
                                        <span>+88012345678</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={assets.email_icon} alt="" className="w-3.5 h-3.5" />
                                        <span>info@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={assets.location_icon} alt="" className="w-3.5 h-3.5" />
                                        <span>12 North West New York 100</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar