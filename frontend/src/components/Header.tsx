
import { useRecoilState } from "recoil";
import { BrainLogo } from "../icons/Brainlogo"
import { PlusIcon } from "../icons/PlusIcon"
import { Shareicon } from "../icons/ShareIcon"
import { Button } from "./Button"
import { CiSearch } from "react-icons/ci";
import { query } from "../Atoms/RecoilAtoms";
import { useEffect, useState } from "react";


interface head {
    setIsOpen:any,
    setIsOpenShare:any
} 
export function HeaderData({setIsOpen,setIsOpenShare}:head){
  const[,setDebounceSearchQuery]=useRecoilState(query);
  const [searchquery,setSearchQuery]=useState(" ");

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setDebounceSearchQuery(searchquery)
  },400)
  return ()=>{
    clearInterval(timer);
  }
  },[searchquery])

    return (
 
           <div className="flex flex-col md:flex-row justify-between px-16  " > 
          <div className="hidden md:flex ml-2  items-center gap-2">
                    <BrainLogo />
                    <div className="hidden md:block text-2xl font-semibold">
                      Memorix
                    </div>
          </div>
       
             <div className=" flex   gap-2 md:gap-3">
         
<div className=" ">
<input type="text" onChange={(e)=>{
  setSearchQuery(e.target.value)
}} className="  p-2 h-8 w-56 lg:w-64 bg-white rounded-md" placeholder="Search..."/>
<div className=" hidden md:block  absolute text-xl  top-4  right-[350px] "><CiSearch />
</div>






</div>
<div className="flex gap-2">
                <Button 
                   onClick={()=>{
                    setIsOpenShare(true)  }} text="Share Brain "  variant="secondary" startIcon={<Shareicon size="md" />}/>
                <Button   onClick={()=>{setIsOpen(true)}}  text="Add Content"  variant="primary" startIcon={  <PlusIcon size="md"/>}/>
             
            </div>
                  </div>
        </div>
    )
}