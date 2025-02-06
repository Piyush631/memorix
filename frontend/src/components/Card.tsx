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
            await axios.delete(`http://localhost:3000/api/v1/content?id=${id}`, {
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
        <div className="border border-gray-200 bg-white rounded-md shadow-md h-80 w-[229px] flex flex-col justify-between overflow-hidden">
            {/* Header */}
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
        <div className="  mb-24 overflow-hidden" style={{ maxHeight: "350px" }}>
            <YouTubeEmbed url={link} width={200} height={150} />
        </div>
    )}
    {type === "Twitter" && (
        <div className="mt-5 overflow-hidden" style={{ maxHeight: "350px" }}>
            <XEmbed url={link} width={200} height={380} />
        </div>
    )}
    {type === "Instagram" && (
        <div className="mt-5 overflow-hidden" style={{ maxHeight: "350px" }}>
            <InstagramEmbed url={link} width={200} />
        </div>
    )}
    {type === "Facebook" && (
        <div className="mt-5 overflow-hidden" style={{ maxHeight: "350px" }}>
            <FacebookEmbed url={link} width={200} />
        </div>
    )}
    {type === "Pinterest" && (
        <div className="mt-5 overflow-hidden" style={{ maxHeight: "350px" }}>
            <PinterestEmbed url={link} width={200} height={150} />
        </div>
    )}
</div>

        </div>
    );
}
