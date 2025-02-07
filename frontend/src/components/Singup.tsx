import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { useState } from "react";

import {  toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const FormSchema=z.object({
    username:z.string().min(5,"Username must be at least 4 characters long").max(20),
    password:z.string().min(6,"Password must be at least 6 characters long")
})
type FormData=z.infer<typeof FormSchema>
export function Signup(){
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

const [username,setUsername]=useState(" ")
const [password,setPassword]=useState(" ")

const onSubmit=(data:FormData)=>{
    console.log(data)
 
}
function getuser(event:any ){
    setUsername(event.target.value)
    


}
function getpassword(event:any ){
    setPassword(event.target.value)


}
async function submitdata() {
    try {
        setLoading(true)
        const response = await axios.post(`https://memorix.onrender.com/api/v1/signup`, {
            username, // Ensure these variables are defined
            password
        });
        console.log(response)
      
            toast.success("Successfull Sign up") // Logs the data property of the response
         
            setLoading(false)
            navigate("/signin")
        
       
    } catch (error:any) {      
        if(error.status==402)
        {
            toast.error("user already exist")
        }
        else{
            toast.error("plesae enter the valid details") 

        }
    }
}


    return (
        <div className="fixed h-screen w-full flex  justify-center items-center gap-12 bg-slate-100 ">
     <div className=" hidden h-screen  lg:flex flex-col  justify-center  ">
        <div className="text-7xl font-bold  text-[#5046E4] ">Memorix</div>
        <div className="text-xl font-normal leading-6  mt-7 w-[600px]">
        A powerful tool designed to help you store, organize, and revisit the resources that matter to you. Stay productive and focused.
        </div>
     </div>
            <div className="bg-white pr-10 pl-10 pb-8 pt-6  rounded-lg border-[1px] shadow border-gray-200 ">
          <div className=" lg:hidden block text-center text-5xl font-semibold text-[#5046E4] font-mono">  Memorix </div>   
            <div className="text-center text-xl font-regular mt-4 text-gray-600">  Sign up to add Links Images <br/> and documents </div> 
            <form className="mt-6 text-black" onSubmit={handleSubmit(onSubmit)}>
                <input  className="py-2 w-80 border-2 text-black font-medium text-md border-gray-300 shadow-md rounded-md" type="text" {...register('username')} onChange={getuser} placeholder="Username"  />
                {errors.username && <p className="text-red-600">{errors.username.message} </p>} <br/>
                <input className="py-2  text-black font-medium text-md w-80 border-2 mt-3 border-gray-300 shadow-md rounded-md" type="password" {...register('password')} onChange={getpassword} placeholder="Password"/>
                {errors.password && <p className="text-red-600">{errors.password.message} </p>}<br/>

                <div className="text-sm text-gray-600 text-center mt-3">  
                By signing up, you agree to our <span className="text-blue-950">Terms</span> ,<span className="text-blue-950">Privacy Policy</span> <br/> and <span className="text-blue-950">Cookies Policy</span> .</div>
                <button onClick={submitdata} className="py-2  cursor-pointer
 mt-5  w-80 rounded-md  border-gray-200 bg-[#5046E4] text-white hover:bg-[#3d31df]">
    
    {loading ? "signup" : "Loading..."}
    </button>
            </form>
            <div className="mt-4 flex justify-center">Already have a account?  <a href="/signin"> <span className="text-[#5046E4]"> Log in</span></a> </div>
            </div>
       
        </div>
       
      
    )
}