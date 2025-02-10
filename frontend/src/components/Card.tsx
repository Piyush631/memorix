import axios from "axios";
import { Shareicon } from "../icons/ShareIcon";
import { RiDeleteBin5Line } from "react-icons/ri";

import { FacebookEmbed, InstagramEmbed ,PinterestEmbed,XEmbed,YouTubeEmbed} from 'react-social-media-embed';
import { useRecoilState } from "recoil";
import {  refreshState} from "../Atoms/RecoilAtoms";

import { toast } from "react-toastify";
interface CardProps {
    title:string,
    link:string,
    type:any 
    username?:string
    id?:string
    isDeletable?: boolean;
}

export function Card({ title, link, type, id,  isDeletable }: CardProps) {
   
    const [, setRefreshKey] = useRecoilState(refreshState);

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

  
        <div className="border border-gray-200 bg-white rounded-md shadow-md min-h-48 max-h-auto  min-w-64 max-w-auto flex flex-col justify-between ">
        
            <div className="flex justify-between text-gray-500 p-2">
                <div className="text-black font-medium">{title}</div>
                <div className="flex gap-3 items-center">
                    <a href={link} target="_blank">
                        <Shareicon size="sm" />
                    </a>
                    <div className="cursor-pointer" onClick={handleDelete}>
                        <RiDeleteBin5Line />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-2 h-full flex justify-center items-center mt-3">
    {type === "Youtube" && (
        <div className="overflow-hidden" >
            <YouTubeEmbed url={link}  />
        </div>
    )}
    {type === "Twitter" && (
        <div className="overflow-hidden" >
            <XEmbed url={link} />
        </div>
    )}
    {type === "Instagram" && (
        <div className=" overflow-hidden" >
            <InstagramEmbed url={link}  />
        </div>
    )}
    {type === "Facebook" && (
        <div className=" overflow-hidden" >
            <FacebookEmbed url={link}  />
        </div>
    )}
    {type === "Pinterest" && (
        <div className=" overflow-hidden">
            <PinterestEmbed url={link}  />
        </div>
    )}
</div>

        </div>
        </div>
    );
}
