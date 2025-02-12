import axios from "axios";
import { Shareicon } from "../icons/ShareIcon";
import { RiDeleteBin5Line } from "react-icons/ri";

import { FacebookEmbed, InstagramEmbed ,PinterestEmbed,XEmbed,YouTubeEmbed} from 'react-social-media-embed';
import { useRecoilState } from "recoil";
import {  refreshState} from "../Atoms/RecoilAtoms";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";


interface CardProps {
    title:string,
    link:string,
    type:any 
    username?:string
    id?:string
    isDeletable?: boolean;
    createdAt?:any
}

export function Card({ title, link, type, id, createdAt, isDeletable }: CardProps) {
   
    const [, setRefreshKey] = useRecoilState(refreshState);

    const [create,setCreate]=useState(" ")
 useEffect(()=>{
    const timesplit=createdAt.split("T")[0];
    setCreate(timesplit);
 },[])
    async function handleDelete() {
        if( isDeletable)
        {
            await axios.delete(`https://memorix.onrender.com/api/v1/content?id=${id}`, {
                headers: {
                    "Authorization": localStorage.getItem("authorization"),
                }
            });
            toast.success("Card is deleted successfully");
         
            setRefreshKey((prev) => prev + 1);
        }else{
            toast.error("you dont have permission to delete");
        }
       
    }

    return (
     
           
        <div>

  
        <div className=" border border-gray-200 bg-white rounded-xl shadow-md min-h-48 max-h-auto    flex flex-col justify-between  ">
        
            <div  className="flex  justify-between text-gray-500 p-2">
             
                <div className="text-black font-medium">{title}</div>

                <div 
                className="flex gap-3 items-center">
                    <a href={link} target="_blank">
                        <Shareicon size="sm" />
                    </a>
                    <div className="cursor-pointer" onClick={handleDelete}>
                        <RiDeleteBin5Line />
                    </div>
                </div>
            </div>
        <div className="px-2  -mt-3 text-gray-400">Creation Date:- {create} </div>
            {/* Content */}
            <div  className="p-2 h-full flex justify-center items-center mt-3">
    {type === "Youtube" && (
       <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
       <YouTubeEmbed url={link}  className="rounded-xl" width={230} height={200} />
     </div>
    )}
    {type === "Twitter" && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <XEmbed url={link} width={230} />
      </div>
    )}
    {type === "Instagram" && (
      <div className="rounded-xl"  style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed url={link}  className="rounded-xl" width={320} />
    </div>
    )}
    {type === "Facebook" && (
       <div style={{ display: 'flex', justifyContent: 'center' }}>
       <FacebookEmbed url={link} width={220} />
     </div>
    )}
    {type === "Pinterest" && (
          <PinterestEmbed 
          url={link}
          width={345}
          height={467}
        />
    )}
</div>

        </div>
        </div>
       
    );
}
