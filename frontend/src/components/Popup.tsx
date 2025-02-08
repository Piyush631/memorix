import { useEffect, useState } from "react";
import { Closeicon } from "../icons/Closeicon";
import { SharedUrl } from "./GenerateShared";
import { useRecoilState } from "recoil";
import { sharedurl } from "../Atoms/RecoilAtoms";
import { toast } from "react-toastify";
import { StopSharing } from "./StopSharing";

interface Data {
    isOpenShare: boolean;
    onClose: () => void;
  }

export function Popup({ isOpenShare, onClose }: Data){
    const[isSharedUrl,setIsSharedUrl]=useRecoilState(sharedurl)
    const[copy,setcopy]=useState(false)
    const[stopshare,setStopshare]=useState(false)

useEffect(()=>{
    async function fetchUrl(){
        if (!isOpenShare) return;
        const {mainUrl}= await SharedUrl();
      
        setIsSharedUrl(mainUrl)
        console.log(mainUrl)
        toast.success("Brain Shared Successfully")
    }
    fetchUrl();
  
      
},[isOpenShare])
function handleCopy(){
    navigator.clipboard.writeText(isSharedUrl)
    toast.success("Url is Copy to Clipboard")
    setcopy(true)
    setStopshare(false)
    onClose();
}
function handleStopSharing(){
  StopSharing()
  setcopy(false)
  onClose();
  setStopshare(true)
}

function extractPath(url: any) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.slice(1); // Remove the leading '/' from pathname
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  }
  const url=extractPath(isSharedUrl)
  console.log(url)
    return (
      <div>
        {isOpenShare && (<div>
            <div className="h-screen w-full bg-gray-400 top-0 left-0 fixed flex items-center justify-center opacity-60"></div>

<div className="h-screen w-full top-0 left-0 z-10 fixed flex flex-col items-center justify-center">
  
  <div className="flex flex-col gap-2 justify-center items-center  rounded-lg bg-white  h-28 w-72 md:w-96  ">
  <div  className="ml-72 cursor-pointer" onClick={onClose}>
                  <Closeicon />
                </div>
  <input type="text"  value={isSharedUrl}   className="h-8 w-56 md:w-64  rounded-lg bg-gray-300"  readOnly></input>
<div className="flex  gap-2">
<button  onClick={handleCopy} className="bg-[#564bf0] text-white md:p-1 w-28 md:w-24  rounded-lg cursor-pointer ">
    {!copy ? "copy link" : "copied"}</button>
    {!stopshare ? <button  onClick={handleStopSharing} className="bg-[#564bf0] text-white md:p-1 w-28 md:w-24  rounded-lg cursor-pointer ">stop sharing</button>
    : " "}
</div>
 
  </div>
 
</div>
            
            
            
            
             </div>)}
         
      </div>
    )
}