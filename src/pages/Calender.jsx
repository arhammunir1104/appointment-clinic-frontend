import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// Doctor availability with time ranges
// const doctorAvailability = [
//   { day: 'Monday', slots: ['10:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
//   { day: 'Tuesday', slots: ['10:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
//   { day: 'Wednesday', slots: ['10:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
//   { day: 'Friday', slots: ['2:00 PM - 8:00 PM'] },
//   { day: 'Saturday', slots: ['10:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
// ];

const Calender = ({setUserDetails, showModal ,docId ,doctorData, setLoaderMessage, setLoading , doctorAvailability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSlotSelected, setIsSlotSelected] = useState(false);
  const [startIndex, setStartIndex] = useState(0);



  
    const {verifyAccount, backendUrl, getDoctorsData, token} = useContext(AppContext);




  const convertTo24Hour = (time) => {
    const [hourString, minuteString] = time
      .slice(0, -3)
      .split(":")
      .map(Number);
    const period = time.slice(-2); // "AM" or "PM"
    let hour24 = hourString % 12; // Convert 12 to 0 for AM
    if (period === "PM") hour24 += 12;
    return hour24 * 60 + (minuteString || 0); // Total minutes since 00:00
  };
  
  const generateTimeSlots = (startTime, endTime) => {
    const start = convertTo24Hour(startTime);
    const end = convertTo24Hour(endTime);
    const slots = [];
  
  
    // Loop to generate slots
    for (let time = start; time <= end; time += 30) {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 || 12; // Convert 0 hour to 12
      const displayMinute = minute < 10 ? `0${minute}` : minute;
      slots.push(`${displayHour}:${displayMinute} ${period}`);
    }
  
  
    return slots;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr); // Convert the input string to a Date object
    const day = date.getDate(); // Get the day of the month
    const month = date.getMonth() + 1; 
    const year = date.getFullYear(); // Get the year
  
    return `${day}_${month}_${year}`; // Return the formatted string
  };

  // Handle date selection

  const handleDateSelect = (date) => {
    const dayName = new Date(date).toLocaleString('en-us', { weekday: 'long' });
  
    // Find the selected day's availability
    const availability = doctorAvailability?.find((day) => day.day === dayName);
  
    if (availability) {
      setSelectedDate(date);
      if (!availability.slots.includes(selectedSlot)) {
        setStartIndex(0);
        setSelectedSlot(null); // Reset only if the selected slot is not available for the new date
        setIsSlotSelected(false); // Disable the button until a valid slot is selected
      }
    } else {
      alert('This day is unavailable for appointments');
      setSelectedDate(null);
      setSelectedSlot(null);
      setIsSlotSelected(false);
    }
  }

  // Get available slots for the selected day
  const getAvailableSlots = () => {
    if (selectedDate) {
      const dayName = new Date(selectedDate).toLocaleString('en-us', { weekday: 'long' });
      const availability = doctorAvailability?.find((day) => day.day === dayName);
      if (availability) {
        return availability.slots.flatMap((slot) => {
          const [startTime, endTime] = slot.split(' - ');
          return generateTimeSlots(startTime, endTime);
        });
      }
    }
    return [];
  };

  // Handle time slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsSlotSelected(true); // Enable the booking button once a slot is selected
  };

  const navigate   = useNavigate();

  // Handle booking appointment
  const handleBooking = async () => {

        try{ 

          if(!token){
            navigate("/login")
          }

          const verify = await verifyAccount();
          if(!verify?.data?.userVerify){
            showModal(true);
            setUserDetails({
              name : verify?.data?.user?.name,
              email : verify?.data?.user?.email,
              phone : verify?.data?.user?.phone,
              address : {
                line1 : verify?.data?.user?.address?.line1,
                line2 : verify?.data?.user?.address?.line2,
              },
              gender : verify?.data?.user?.gender,
              dob : verify?.data?.user?.dob
            })
          }
          else{
            
            const slotDate = formatDate(new Date(selectedDate).toLocaleDateString());
            const slotTime = selectedSlot;
            

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

            
        }
        catch(e){
          setLoading(false);
            toast.error(e?.response?.data?.message);
        }
  };

  // Move slider to next/previous set of slots
  const handleSlider = (direction) => {
    if (direction === 'left' && startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else if (direction === 'right' && startIndex + 6 < getAvailableSlots().length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div>
      <h1 className='font-medium text-gray-700 py-3'>Book Slots</h1>

      {/* Render the small calendar */}
      <Calendar
        onChange={handleDateSelect}
        value={selectedDate}
        minDate={new Date()}
        tileClassName={({ date }) => {
          const dayName = new Date(date).toLocaleString('en-us', { weekday: 'long' });
          return doctorAvailability.some((day) => day.day === dayName) ? '' : 'disabled-day';
        }}
        tileDisabled={({ date }) => {
          const dayName = new Date(date).toLocaleString('en-us', { weekday: 'long' });
          return !doctorAvailability.some((day) => day.day === dayName);
        }}
      />

      {/* Display available slots if a date is selected */}
      {selectedDate && (
        <div>
          {/* <h2>Available Time Slots for {new Date(selectedDate).toLocaleDateString()}</h2> */}
          
          {/* Time slots slider for mobile and desktop */}
          <div style={{ display: 'flex', overflowX: 'hidden', gap: '10px', scrollBehavior: 'smooth', margin: "5px 0px" }}>
            <button 
              onClick={() => handleSlider('left')} 
              disabled={startIndex === 0}
              className={`px-4 py-2 ${startIndex === 0 ? 'bg-gray-400' : 'bg-primary'} text-white border-none rounded-md cursor-pointer`}
            >
              &lt;
            </button>

          <div style={{ display: 'flex', overflowX: 'hidden', gap: '10px', scrollBehavior: 'smooth', margin: "5px 0px" }}>
            {getAvailableSlots().slice(startIndex, startIndex + 6).map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className={`px-2 py-1 ${selectedSlot === slot ? 'bg-primary text-white' : 'bg-white '} text-primary border-[1px] border-primary  rounded-md cursor-pointer`}
              >
                {slot}
              </button>
            ))}
          </div>

            <button 
              onClick={() => handleSlider('right')} 
              disabled={startIndex + 6 >= getAvailableSlots().length}
              className={`px-4 py-2 ${startIndex + 6 >= getAvailableSlots().length ? 'bg-gray-500' : 'bg-primary'} text-white border-none rounded-md cursor-pointer`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {/* Display the "Book Appointment" button */}
      <div style={{ marginTop: '20px' }}>
        {/* <h3>Selected Slots: {new Date(selectedDate).toLocaleDateString()},  {selectedSlot || 'Not Selected'}</h3> */}
        <button
          onClick={handleBooking}
          disabled={!isSlotSelected}
          className={`py-[10px] px-[20px] ${ isSlotSelected ? 'bg-primary' : ' bg-gray-500'} text-white border-none rounded-[5px] ${isSlotSelected ? 'cursor-pointer' : 'cursor-not-allowed'}`}        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Calender;
