import React, { useContext } from 'react'
import {  useState } from "react";  // For managing component state
import { Button, FormControl } from "@mui/material";  // For Material-UI components
import "react-phone-number-input/style.css";  // Import phone input styles
import { MuiOtpInput } from "mui-one-time-password-input";
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

function EmailOtp({userData}) {
    let [openOtpBoxEmail, setOpenOtpBoxEmail] = useState(false);
    const [otp, setOtp] = useState("");
    const [loaderMessage, setLoaderMessage]= useState("");
    const [loading, setLoading] = useState(false);
  
      const {
        sendEmailOtpForgetPasswordPage,
        verifyEmailUser
  
      } = useContext(AppContext);



  const handleChange = (newValue) => {
    setOtp(newValue);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 4) return alert("Enter valid OTP");
        try {
            
            setLoaderMessage("Verify your OTP...");
            setLoading(true);
            const data = await verifyEmailUser(userData?.email, otp);
            if(data?.data?.status === "success") {
                toast.success("Email Verified Successfully.");  
                setLoading(false);
                window.location.reload();
            }
            else{
                toast.error(data?.response?.data?.message);  
                setLoading(false);
            }
        } catch (e) {
          toast.error("Some error Occur, please Try Again.");
        }
      };


      async function sendOtpEmail(e){
        try{
            e.preventDefault();
             const data = await sendEmailOtpForgetPasswordPage(userData?.email);
            
            
            if(data?.data?.status === "success") {
                toast.success("OTP sent.");  
                setLoading(false);
                setOpenOtpBoxEmail(true);
            }
            else{
                toast.error(data?.response?.data?.message);  
                setLoading(false);
            }
        }
        catch(e){
          toast.error("Some error Occur, please Try Again.");
        }
      }

      function handleBack(e){
        e.preventDefault();
        setOtp("");
        setOpenOtpBoxEmail(false);
      }
      
  return (
    <>
    
    <>
    <div className="w-[100vw]  h-[120vh]  ml-[-1vw] flex z-10 justify-center items-center fixed">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      <div style={{backgroundColor : "white",  borderRadius : "5px"}} className="p-[20px] lg:w-[40%] z-10 md:w-[45%] sm:w-[60%] w-[80%]">
      <h1 className="text-2xl sm:text-3xl font-bold text-center max-w-[450px]">
        Let&apos;s verify your details
      </h1>
      <form className="w-full px-4 md:px-12"
            onSubmit={sendOtpEmail}
       >
        <FormControl fullWidth>
          <label
            htmlFor="service"
            className="text-sm sm:text-lg font-bold mb-2 py-[5px]"
          >
            Enter Email Address
          </label>
          <input type="email" 
          placeholder="abc@gmail.com"
          value={userData?.email}
          disabled={true}
          className="[&_.PhoneInputCountry]:!p-3 h-[80px] [&_.PhoneInputCountry]:bg-gray-200 outline-none  [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input:hover]:border-dark [&_input]:p-2  [&:has(input:focus)]:border-secondary [&_input:focus]:outline-none border px-4 py-2 rounded-md border-b-4 border-b-secondary shadow-md"
          />
        </FormControl>

          <div className="flex flex-row items-center justify-end">
            <span>Got your OTP ?</span>
            <Button
            variant="text"
            className="h-[50px] w-[130px] rounded-sm flex ml-[-20px]"
            onClick={()=>{
              setOpenOtpBoxEmail(true)
            }}
          >
            <span className="font-bold">Verify Otp</span>
          </Button>
          
          </div>

        <div className="mt-4 flex w-full justify-between">
          <div></div>
          <Button
            variant="contained"
            className="h-[50px] w-[130px] rounded-sm flex gap-2 mt-4"
            type="submit"
          >
            <span className="font-bold">Send OTP</span>
          </Button>
        </div>
      </form>
      </div>
    </div>



    {/* Verify Modal */}
    {
      openOtpBoxEmail &&
    <div className="w-[100vw]  h-[120vh] sm:ml-[-10vw] ml-[-1vw] flex z-10 justify-center items-center fixed">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      <div style={{backgroundColor : "white",  borderRadius : "5px"}} className="p-[20px] lg:w-[40%] z-10 md:w-[45%] sm:w-[60%] w-[80%]">
      <h1 className="text-2xl font-bold text-center max-w-[450px] m-[5%]">
        Confirm Your Email Address
      </h1>
      <form className="flex flex-col gap-4 px-4 md:px-12"
       onSubmit={handleSubmit}
       >
        <MuiOtpInput
          autoFocus
          value={otp}
          length={4}
          className="[&_input]:h-8 [&>*>*]:!border-b-3 [&>*>*]:border-b-secondary [&>*]:shadow-medium font-bold text-xl"
          onChange={handleChange}
          />
          <div className="flex justify-between items-center">
          <p className="text-xs md:text-lg">Didn&apos;t receive a code?</p>
          <div className="text-xs sm:text-sm flex gap-2 sm:gap-3 items-center">
          <button
          className="text-secondary hover:text-main font-bold"
              onClick={sendOtpEmail}
              type="button"
              >
              Resend
              </button>
              <button
              className="text-secondary hover:text-main font-bold"
              onClick={handleBack}
              >
              Go Back
              </button>
              </div>
              </div>
              <div className="flex justify-end items-center">
              <Button
              variant="contained"
            className="h-[50px] w-[170px] rounded-sm flex gap-2 mt-4"
            type="submit"
            
            >
            <span className="font-bold">Confirm OTP</span>
            {/* <Image src={arrowRightIcon} alt="Arrow right" /> */}
            </Button>
            </div>
            </form>
            </div>
            </div> 
    
          }
    </>

    </>
  )
}

export default EmailOtp