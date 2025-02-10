import loginIllustration from "../assets/illustrations/login_illustration.mp4";
import google_logo from "../assets/icons and logos/google_logo.svg";
import  loadingDot from "../assets/icons and logos/loading dots.gif";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../slices/loginSlice";

const Login = () => {
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
    setLoading(true);
   await setTimeout(()=>{
     console.log(data)
     setLoading(false);
      dispatch(isLoggedIn(true))
      navigate("/")
    },3000)
   
  } 
  
  return (
    <div className="container border mx-auto w-3/4 my-3 h-[86vh] rounded-2xl flex justify-center items-center p-4 bg-white">
    <div className="w-1/2 h-full flex  flex-col items-center justify-center  ">
      <span>
        <h1 className="font-roboto text-center text-purple-800 font-bold text-4xl mt-3">
          Login
        </h1>
      </span>
      <div className="w-3/4 my-1">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col "
        >
          <label htmlFor="email" className="text-purple-950 text-[15px]">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mb-2 outline-2 rounded outline-purple-500 py-2  px-2 text-purple-900 focus:outline-purple-800"
            {...register("email", {
              required: true,
              validate:{
                matchPattern:(value)=>
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                  .test(value) || "Email address must be a valid address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <label htmlFor="password" className="text-purple-950 text-[15px]">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mb-2 outline-2 rounded outline-purple-500 py-2  px-2 text-purple-900 focus:outline-purple-800"
            {...register("password", {
              required: true,
              validate:{
                matchPattern:(value)=>/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(value) || "Password must be valid",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}        
          <span className="text-sm">
            Don't have an account?
            <button className="underline mx-1 font-bold">
              <Link to="/registration">Signup</Link>
            </button>
          </span>
          <button
            type="submit"
            className="bg-purple-700 py-1 text-[16px] my-2 w-1/2 flex items-center justify-center rounded-lg mx-auto mb-1 text-white hover:bg-purple-600"
          >
            {loading?<img src={loadingDot} alt="loading" className="h-10 w-10"/>:<span className="py-2">Login</span>}
          </button>
        </form>
        <div className="text-sm text-center">Or</div>
        <div className="flex justify-center my-1">
          <button className="p-3 rounded border flex items-center gap-2 cursor-pointer">
            <img src={google_logo} alt="google logo" className="size-6" />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
    <div className="signup-video-cont w-123 h-full flex items-center">
      <video src={loginIllustration} autoPlay muted loop></video>
    </div>
  </div>
  )
}

export default Login