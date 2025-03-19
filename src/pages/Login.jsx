import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets_frontend/assets";
import Cookies from 'js-cookie';

function Login() {

  const {backendUrl, token, setToken} = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) =>{
    event.preventDefault();

      try{
        if(state === "Sign Up"){ //signup
          const data = await axios.post(`${backendUrl}/api/user/register`, {
            name,
            email,
            password
          });
    
          if(data?.data?.status === "success"){
            Cookies.set("token", data?.data?.token, { secure: true, sameSite: 'None',expires: 30 });
            // localStorage.setItem("token", data?.data?.token);
            setToken(data?.data?.token);
    
            toast.success(data?.data?.message);
          }
          else{
            toast.error(data?.responese?.data?.message);
          }
        }
        else{ //login
          const data = await axios.post(`${backendUrl}/api/user/login`, {
            email,
            password
          });
    
          if(data?.data?.status === "success"){
            Cookies.set("token", data?.data?.token, { secure: true, sameSite: 'None',expires: 30 });
            // localStorage.setItem("token", data?.data?.token);
            setToken(data?.data?.token);
            toast.success(data?.data?.message);
          }

          else{
            toast.error(data?.response?.data?.message);
          }
        }
      }
      catch(e){
        toast.error(e?.response?.data?.message); 
      }

  };

  useEffect(()=>{
    scrollTo(0,0);
    if(token){
      navigate("/");
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Side - Brand/Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left"
        >
          <img 
            src={assets.group_profiles} 
            alt="Healthcare Team" 
            className="w-32 mb-8 drop-shadow-xl"
          />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {state === "Sign Up" ? "Join Our Healthcare Community" : "Welcome Back!"}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {state === "Sign Up" 
              ? "Create an account to book appointments and manage your healthcare journey."
              : "Sign in to access your appointments and medical records."}
          </p>
        </motion.div>

        {/* Right Side - Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full max-w-md"
        >
          <form 
            onSubmit={onSubmitHandler}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {state === "Sign Up" ? "Create Account" : "Login"}
              </h2>
              <p className="text-gray-600 mb-6">
                Please {state === "Sign Up" ? "sign up" : "login"} to book appointments
              </p>

              {state === "Sign Up" && (
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="space-y-2 mt-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {state === "Sign Up" ? "Create Account" : "Login"}
              </motion.button>

              <div className="mt-6 space-y-2">
                {state === "Sign Up" ? (
                  <p className="text-gray-600 text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setState("Login")}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      Login here
                    </button>
                  </p>
                ) : (
                  <>
                    <p className="text-center">
                      <button
                        type="button"
                        onClick={() => navigate("/forget-password")}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        Forgot password?
                      </button>
                    </p>
                    <p className="text-gray-600 text-center">
                      Create a new account?{" "}
                      <button
                        type="button"
                        onClick={() => setState("Sign Up")}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        Sign up here
                      </button>
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login