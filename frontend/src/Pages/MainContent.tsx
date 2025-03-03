import { useEffect, useState } from "react"
import { AddContent } from "../components/AddContent"

import { Card } from "../components/Card"

import { Sidebar } from "../components/Sidebar"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { fetchData, loadable, query } from "../Atoms/RecoilAtoms"
import { HeaderData } from "../components/Header"
import { Popup } from "../components/Popup"
import { LoadingPage } from "./LoadingPage"
import { FaInstagram, FaPlus } from "react-icons/fa6";
import { easeInOut, motion } from "motion/react"
import { CiFacebook, CiYoutube } from "react-icons/ci"
import { RiTwitterXFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

interface dataTypes {
  title?:any,
  link:string,
  type:string
  username?:string
  _id?:any
  isDeletable?: boolean
  createdAt?:any
}


export function MainContent() {
  const[isOpen,setIsOpen]=useState(false)
  const[isOpenShare,setIsOpenShare]=useState(false)
  const usersLoadable = useRecoilValueLoadable(fetchData);
  const[open,setOpen]=useState(false)
  const navigate=useNavigate();
  const[loading,setLoading]=useRecoilState(loadable)
const[debounceSearchQuery,]=useRecoilState(query)

 /* useEffect(()=>{

  const username = usersLoadable.state === "hasValue" && usersLoadable.contents.length > 0
   ? usersLoadable.contents[0].userId.username
    : " ";

    setUser(username)
 
  },[])*/

  const [greet,setGreet]=useState(" ")
  useEffect(()=>{
    const dynamicGreet= ()=>{
      const currentHours=new Date().getHours();
      if(currentHours > 5 && currentHours < 12)
      {
        setGreet("Good Morning")
      }
      else if(currentHours >12 && currentHours < 18)
      {
        setGreet("Good Afternoon")
      }
      else
      {
        setGreet("Good Evening")
      }

    }
    dynamicGreet();
    const interval=setInterval(dynamicGreet,60000)
    if(! localStorage.getItem("authorization"))
    {
      navigate("/signin")
    }
    console.log(localStorage.getItem("authorization"))
    return ()=>{
      clearInterval(interval)
    }

  },[])
 
 setTimeout(() => {
  setLoading(true)

 }, 4000);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 800) setOpen(open);
    
      else setOpen(open)
    };

    updateSize(); 
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  return (
    <motion.div  initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}  transition={{duration:1}}   className="min-h-screen bg-[#EBEBF5]    w-full  flex">

<div  className={` ${
        open ? "w-52" : "w-12"
      } fixed z-1  opacity-100  bg-white top-0 left-0  h-screen border-b-gray-300   border-r-gray-300 border-r-1 `}>
            <Sidebar open={open} setOpen={()=>{
              setOpen(!open)
            }}  />
         </div>

         <div className="flex flex-col   p-1 m-1  h-auto w-full">
      <div className={`${!open ? "-ml-28":"-ml-32  lg:ml-12 "} `}>
          <AddContent isOpen={isOpen} onClose={()=>{
            setIsOpen(false)
          }}/>
         </div>
         <div>
        <Popup isOpenShare={isOpenShare} onClose={()=>{
            setIsOpenShare(false)
          }}/>
         </div>
         <div className="p-1">
  <HeaderData setIsOpen={setIsOpen} setIsOpenShare={setIsOpenShare}/>
    </div>

    
 <div className={` left-4 md:left-6  ml-2 rounded-xl  mt-2 px-3 bg-[#F4F4FC] w-full   pl-9 md:pl-24`}>
    
     <motion.div   style={{overflow:"hidden", whiteSpace:"nowrap"}}
        initial={{width:0}}
        animate={{width:"100%"}}
        transition={{ease:easeInOut, duration:3,delay:1}}
     className="pl-3 pt-1 text-2xl  md:text-3xl font-semibold  inline-block  text-transparent  bg-clip-text bg-gradient-to-r from-blue-700 via-green-500 to-indigo-400" >
      {greet} <span
      
      
      >  { usersLoadable.state === "hasValue" && usersLoadable.contents.length > 0
    ? usersLoadable.contents[0].userId.username
    : " " }</span>
     </motion.div>
     <div className=" flex  items-center justify-center md:justify-normal md:items-start flex-wrap gap-7 pt-5">

     {loading && usersLoadable.state === "hasValue" ? (
  usersLoadable.contents
    .filter(({ title }: dataTypes) => {
 
      if (debounceSearchQuery===" ") return true;
      return title?.toLowerCase().includes(debounceSearchQuery);
    })
    .map(({ title, link, type, _id, createdAt }: dataTypes) => (
      <motion.div
        key={_id} 
        whileHover={{
          scale: 1.06,
          transition: { duration: 0.2 },
        }}
      >
        <Card title={title} link={link} type={type} id={_id} createdAt={createdAt} isDeletable={true} />
      </motion.div>
    ))
) : (
  <LoadingPage />
)}


<div onClick={()=>{setIsOpen(!isOpen)}} className="group h-44 w-64  cursor-pointer flex flex-col items-center justify-center bg-[#9B95FF] rounded-xl gap-2">
<div
          
            
          className=" transition-opacity duration-400 ease-linear  group-hover:opacity-100 opacity-0  h-9 w-36 flex items-center justify-center text-2xl gap-3 text-[#7871fa] bg-white rounded-lg ">
              
              <CiYoutube />
              <FaInstagram />
              <CiFacebook />
              <RiTwitterXFill />


          </div>
      <div className="text-2xl h-13 w-13  bg-white rounded-full flex items-center justify-center"><FaPlus  className="text-3xl "/> </div>
 <div className="text-xl font-semibold">
 Add Content
  </div> 
      </div>
  
     </div>
     </div>
      </div>  
    </motion.div>

  )
}


