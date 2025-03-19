import React, { useContext } from 'react'
import { useEffect,  useRef } from "react";
import { useLocation, useNavigate,  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

function ConfirmPayment() {

    
      const {confirmPayment} = useContext(AppContext)

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const hasFetched  = useRef(false);
    const navigate = useNavigate();

    useEffect(()=>{
        async function confirmSubs(){
            if (hasFetched?.current) {return};
            try{
                
                const sessionId = query.get("sessionId"); // Fetch the 'id' query parameter

                let data = await confirmPayment(sessionId);
                if(data?.data?.status === "success"){
                    toast.success("Payment Successfull.");
                    navigate("/my-appointments")
                }
                else{
                    toast.success("Payment Unuccessfull.");
                    navigate("/my-appointments")
                }
            }
            catch(e){
                toast.error("Payment Unuccessfull.");
            }
        }
        confirmSubs();
    },[query.get("sessionId")])


  return (
    <div>Confirming Payment...</div>
  )
}

export default ConfirmPayment