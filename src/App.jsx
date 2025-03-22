import React, { useContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer } from 'react-toastify';
import ConfirmPayment from "./pages/ConfirmPayment";
import ForgetPassword from "./pages/ForgetPassword";
import Calender from "./pages/Calender";
import { AppContext } from "./context/AppContext";

function App() {

      const {token,setToken, userData} = useContext(AppContext);

 

  return (
    <>
      <div className="mx-4 overflow-x-hidden sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointment />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/pay/success" element={<ConfirmPayment />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/calender" element={<Calender />} />
        </Routes>
        <Footer />

      </div>
    </>
  )
}

export default App
