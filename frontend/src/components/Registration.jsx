import signup from "../assets/illustrations/register.svg"
import loadingDot from "../assets/icons and logos/loading dots.gif";
import google_logo from "../assets/icons and logos/google_logo.svg";
import openEye from "../assets/icons and logos/eye_open.svg"
import closeEye from "../assets/icons and logos/eye_close.svg"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../slices/loginSlice";
import { userRegister } from "../services/apiCalls";
import {toast} from 'react-toastify'
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../slices/userSlice";
const Registration = () => {
 
  const [show,setShow]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const hamValue=useSelector(state=>state.ham.value)
  const {mutate,isPending}=useMutation({
    mutationFn: async (data)=>{
      return await userRegister({data})
    },
    onSuccess:(response)=>{
      dispatch(isLoggedIn(true))
      dispatch(setUser(response.data.user))
     
      navigate('/')
     
    },
    onError:(error)=>{
      toast.error(`${error.response.data.message}`)
    }
})

const registerUser=(data)=>{
  if(data.password!==data.confpassword){
  return  toast.error('Invalid Credentials!')
  }

  mutate(data)
}

  return (
    <div className=" w-full pb-6 register-page hero-gradient overflow-hidden flex flex-col items-center scroll-smooth">


    <div className="container border-3 border-white register-cont mx-auto w-3/4 mt-15 h-[86vh] rounded-2xl flex justify-center items-center p-4 bg-[#1f0c22] shadow-lg shadow-purple-500">
      <div className="w-1/2 h-full flex  flex-col register-cont-cred items-center justify-center  ">
        <span>
          <h1 className="font-roboto text-center text-white font-bold text-5xl mt-3">
            Signup
          </h1>
        </span>
        <div className="w-3/4 my-1">
          <form
            onSubmit={handleSubmit(registerUser)}
            className="flex flex-col "
          >
            <label htmlFor="fullname" className="text-white text-[15px]">
              Fullname:
            </label>
            <input
              type="fullname"
              id="fullname"
              name="fullname"
              className="mb-2 outline-2 rounded outline-purple-300 py-2 px-2 text-purple-300 focus:outline-purple-400"
              {...register("fullname", { required: true })}
              required={true}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
            <label htmlFor="email" className="text-white text-[15px]">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mb-2 outline-2 rounded outline-purple-300 py-2  px-2 text-purple-300 focus:outline-purple-400"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
              required={true}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <label htmlFor="password" className="text-white text-[15px]">
              Password:
            </label>
            <span className="flex items-center gap-2">
            <input
              type={show?"text":"password"}
              id="password"
              name="password"
              
              className="mb-2 outline-2 rounded outline-purple-300 py-2  px-2 text-purple-300 focus:outline-purple-400 w-[90%]"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
                      value
                    ) || "Password must be valid",
                  },
                })}
                required={true}
                />
                <span className="cursor-pointer mx-auto border-2 rounded border-purple-300 p-2 mb-2" onClick={()=>setShow(!show)}>
                  <img src={show?closeEye:openEye} alt="password eye" />
                </span>
                </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <label
              htmlFor="confpassword"
              className="text-white text-[15px]"
            >
              Confirm Password:
            </label>
            <input
              type={show?"text":"password"}
              id="confpassword"
              name="confpassword"
              className="mb-2 outline-2 rounded outline-purple-300 py-2 px-2 text-purple-300 focus:outline-purple-400"
              {...register("confpassword", { required: true })}
              required={true}
            />

            <span className="text-sm text-white">
              Already have an account?
              <button className="underline mx-1 font-bold">
                <Link to="/login">Login</Link>
              </button>
            </span>
            <button
              type="submit"
              className="bg-purple-700 text-[16px] my-2 w-1/2 flex rounded-lg mx-auto py-1 justify-center items-center mb-1 text-white hover:bg-purple-600"
            >
              {isPending ? (
                <img src={loadingDot} alt="loading" className="h-10 w-10" />
              ) : (
                <span className="py-2">Signup</span>
              )}
            </button>
          </form>
          <div className="text-sm text-center text-white">Or</div>
          <div className="flex justify-center my-1">
            <button className="p-3 rounded border-2 border-white text-white flex items-center gap-2 cursor-pointer">
              <img src={google_logo} alt="google logo" className="size-6 invert" />
              Continue With Google
            </button>
          </div>
        </div>
      </div>
          <div className={`bg-white p-3 absolute ${hamValue?"top-[55px] right-0 block transition-all duration-500 ease-in-out":"top-[-10%] hidden"}`}>
        <ul className="text-purple-900 font-semibold font-roboto text-xl w-[200px]">
          <li className="py-3 px-5"><Link to='/'>Home</Link></li>
          <li className="py-3 px-5"><Link to='/about'>About Us</Link></li>
          <li className="py-3 px-5"><Link to='/contact'>Contact</Link></li>
          <li className="py-3 px-5"><Link to='/login'>Login</Link></li>
          <li className="py-3 px-5"><Link to='/registration'>Sign Up</Link></li>
        </ul>
      </div>
      <div className="signup-video-cont w-123 h-full flex items-center">
       <img src={signup} alt="signup img" />
      </div>
    </div>
    </div>
  );
};

export default Registration;
