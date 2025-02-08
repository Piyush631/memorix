import { useEffect, useState } from "react"
import { AddContent } from "../components/AddContent"

import { Card } from "../components/Card"

import { Sidebar } from "../components/Sidebar"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { fetchData, loadable } from "../Atoms/RecoilAtoms"
import { HeaderData } from "../components/Header"
import { Popup } from "../components/Popup"
import { LoadingPage } from "./LoadingPage"

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
    ? usersLoadable.contents[0].userId?.username
    : "";

    setUser(username)
  
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
    <div className={`bg-[#EBEBF5]    md:w-auto relative `}>

<div  className={` ${
        open ? "w-52" : "w-12"
      } fixed z-1  opacity-100  bg-white top-0 left-0  h-auto border-b-gray-300  transition-property: all duration-300 ease-in  border-r-gray-300 border-r-1 `}>
            <Sidebar open={open} setOpen={()=>{
              setOpen(!open)
            }} user={user} />
         </div>
         <div  className={ `absolute border-red-800   border-2 left-48    w-4/5 `}>
      <div>
          <AddContent isOpen={isOpen} onClose={()=>{
            setIsOpen(false)
          }}/>
         </div>
         <div>
        <Popup isOpenShare={isOpenShare} onClose={()=>{
            setIsOpenShare(false)
          }}/>
         </div>
      
       
    
     <div className={` ${!open ? "-ml-28":"-ml-32  lg:ml-12 "}  border-amber-300 border-2 transition-property: all duration-300 ease-in `}>
     {user && (
          <div className="p-2 text-4xl  font-bold">
            <span>Welcome, </span> <span className="text-[#5046E4]">{user}!!!</span>
          </div>
        )}
     </div>
      <div className={` ${!open ? "-ml-32":"-ml-44  lg:ml-12 "}  min-h-screen border-green-500 border-2   flex  gap-5 p-6 bg-[#F4F4FC] mr-auto rounded-3xl w-64 md:w-full  flex-wrap  `}>
     
      {loading ? usersLoadable.state==="hasValue" && usersLoadable.contents.map(({ title, link, type,_id}: dataTypes) => (
<Card title={title} link={link} type={type} id={_id}   isDeletable={true} />
)) : <LoadingPage/>}
   
      </div>
      </div>  
    </div>

  )
}


