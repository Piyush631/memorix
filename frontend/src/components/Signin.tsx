import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from "recoil";
import { Password, Username } from "../Atoms/RecoilAtoms";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "motion/react"
const FormSchema=z.object({
    username:z.string().min(5,"Username must be at least 4 characters long").max(20),
    password:z.string().min(6,"Password must be at least 6 characters long")
})
type FormData=z.infer<typeof FormSchema>
export function Signin(){
 const[username,setUsername]=useRecoilState(Username)   
 const [password,setPassword]=useRecoilState(Password)
   const [loading,setLoading]=useState(true)
 const navigate=useNavigate();
const{register,
    handleSubmit,
    formState:{errors} ,
}=useForm<FormData>(
    {
        resolver:zodResolver(FormSchema)
    }
)
 const onSubmit=(data:FormData)=>{
    console.log(data)

   
}
async  function fetchUser(){
   
    try {
        setLoading(false)
        const response: any = await axios.post(`https://memorix.onrender.com/api/v1/signin`,{
        username,
        password
    })
   const jwt=response.data.token;
   
if(jwt)
{
    console.log(jwt)
    localStorage.setItem("authorization",jwt)
    toast.success("You are login Successfully")
    navigate("/dashboard")
    setLoading(true)
}else{
    toast.error("invalid username and password")
    setLoading(true)
}
    
   
   
}catch(error)
{
    toast.error("invalid username and password")
    setLoading(true)
}


}
function getUser(e:any)
{
    setUsername(e.target.value)
   
}
function getPassword(e:any)
{
    setPassword(e.target.value)
}
return (
    <motion.div  initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}  transition={{duration:1}}  className="fixed h-screen w-full flex  justify-center items-center gap-12 bg-slate-100 ">
 <div className=" hidden h-screen  lg:flex flex-col  justify-center  ">
    <motion.div   animate={{ scale: [1, 1.05, 1] }} // Scale up to 1.1 and back to 1
  transition={{
    duration: 2,          // Duration of the entire animation cycle
    ease: "easeInOut",    // Smooth easing for a more natural feel
    repeat: Infinity,     // Repeat infinitely
    repeatType: "mirror", // Plays the animation back and forth
  }} className="text-7xl font-bold  text-[#5046E4] ">Memorix</motion.div>
    <div className="text-xl font-normal leading-6  mt-7 w-[600px]">
    A powerful tool designed to help you store, organize, and revisit the resources that matter to you. Stay productive and focused.
    </div>
 </div>
        <div className="bg-white pr-12 pl-12 pb-10 pt-8 lg:px-10 lg:py-8  rounded-lg border-[1px] shadow border-gray-200 ">
      <div className=" lg:hidden block text-center text-5xl font-semibold text-[#5046E4] font-mono">  Memorix </div>   
      <div className="text-center lg:mt-0 mt-3 text-3xl font-semibold">Welcome Back</div>
      <div className="text-center  mt-3 text-sm lg:mt-1 text-gray-400">Login to continue managing your resources</div>
        <form className="lg:mt-6 mt-8  text-black" onSubmit={handleSubmit(onSubmit)}>
            <input className="py-2 w-80 border-2 text-black font-medium text-md border-gray-300 shadow-md rounded-md" type="text" {...register('username')} onChange={getUser} placeholder="Username"  />
            {errors.username && <p className="text-red-600">{errors.username.message} </p>} <br/>
            <input className="py-2  text-black font-medium text-md w-80 border-2 mt-3 border-gray-300 shadow-md rounded-md" type="password" {...register('password')} onChange={getPassword} placeholder="Password"/>
            {errors.password && <p className="text-red-600">{errors.password.message} </p>}<br/>

  
            <button onClick={fetchUser} className="py-2 mt-5 w-80 rounded-md  border-gray-200 bg-[#5046E4] text-white" >
                {loading ? "login": "Loading..."}
                
                 </button>
        </form>
        <div className="mt-4 flex justify-center text-gray-700">Did not have an account?  <a href="/signup"> <span className="text-[#5046E4]">&nbsp; Sign up</span></a></div>
        </div>
   
    </motion.div>
   
  
)
}