import { useEffect, useState } from "react"
import { AddContent } from "../components/AddContent"

import { Card } from "../components/Card"

import { Sidebar } from "../components/Sidebar"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { fetchData, loadable } from "../Atoms/RecoilAtoms"
import { HeaderData } from "../components/Header"
import { Popup } from "../components/Popup"
import { LoadingPage } from "./LoadingPage"
import { FaPlus } from "react-icons/fa6";

interface dataTypes {
  title?:any,
  link:string,
  type:string
  username?:string
  _id?:any
  isDeletable?: boolean;
}


export function MainContent() {
  const[isOpen,setIsOpen]=useState(false)
  const[isOpenShare,setIsOpenShare]=useState(false)
  const usersLoadable = useRecoilValueLoadable(fetchData);
  const[open,setOpen]=useState(true)
  const[user,setUser]=useState(" ")
  const[loading,setLoading]=useRecoilState(loadable)
  useEffect(()=>{

    const username = usersLoadable.state === "hasValue" && usersLoadable.contents.length > 0
    ? usersLoadable.contents[0].userId.username
    : " ";

    setUser(username)
  console.log(user)
  },[])
 
 setTimeout(() => {
  setLoading(true)
 }, 6000);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 800) setOpen(!open);
    
      else setOpen(open)
    };

    updateSize(); 
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  return (
    <div   className="min-h-screen bg-[#EBEBF5]    w-full  flex">

<div  className={` ${
        open ? "w-52" : "w-12"
      } fixed z-1  opacity-100  bg-white top-0 left-0  h-screen border-b-gray-300   border-r-gray-300 border-r-1 `}>
            <Sidebar open={open} setOpen={()=>{
              setOpen(!open)
            }} user={user} />
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
         <div className="">
  <HeaderData setIsOpen={setIsOpen} setIsOpenShare={setIsOpenShare}/>
    </div>
       
    <div className=" text-2xl  md:text-4xl pl-28 ">
          Welcome <span className="text-blue-600">{user}!!!</span>
    </div>
 <div className={` left-6  ml-2 rounded-xl  p-4 flex flex-wrap bg-[#F4F4FC] w-full  gap-6 pl-16`}>
     
     {loading ? usersLoadable.state==="hasValue" && usersLoadable.contents.map(({ title, link, type,_id}: dataTypes) => (
<Card title={title} link={link} type={type} id={_id}   isDeletable={true} />
)) : <LoadingPage/>}
<div className="h-44 w-64  flex flex-col items-center justify-center bg-gray-300 rounded-xl gap-4">
      <div className="text-3xl"><FaPlus  className="text-3xl"/> </div>
      <div onClick={()=>{setIsOpen(true)}} className="text-xl">Click to Add a Content</div>
      </div>
  
     </div>
   
      </div>  
    </div>

  )
}


