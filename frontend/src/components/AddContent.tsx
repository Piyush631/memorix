import { useRef, useState } from "react";
import { Closeicon } from "../icons/Closeicon";
import { InputField } from "./InputField";

import axios from "axios";
import { useRecoilState } from "recoil";
import { refreshState } from "../Atoms/RecoilAtoms";
import { motion } from "motion/react"

interface Data {
  isOpen: boolean;
  onClose: () => void;
}

export function AddContent({ isOpen, onClose }: Data) {
    const [, setRefreshKey] = useRecoilState(refreshState);
//  const refreshSelector = useRecoilRefresher_UNSTABLE(fetchdata("all"));

  // References for input fields
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("");

  // ✅ Function to handle adding new content
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    // Validation check
    if (!title || !link || type.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        `https://memorix.onrender.com/api/v1/content`,
        { link, type, title },
        { headers: { Authorization: localStorage.getItem("authorization") } }
      );

      await refreshContent();

      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content.");
    }
  }

  //  Function to fetch the latest content and update Recoil state
  async function refreshContent() {
    try {
      const response = await axios.get(`https://memorix.onrender.com/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });

   
      response.data.data
      setRefreshKey((prev) => prev + 1);
      
    } catch (error) {
      console.error("Error fetching content:", error);
      alert("Failed to refresh content.");
    }
  }

  return (
    <motion.div  >
        
      {isOpen && (
        <div >
        
          <div className="h-full w-full bg-gray-400 top-0 left-0 fixed flex items-center justify-center opacity-60"></div>

          {/* Modal container */}
          <motion.div initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}  transition={{duration:0.8}} className="h-screen w-full top-0 left-0 z-10 fixed flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
        
              <div className="flex justify-end " onClick={onClose}>
                <Closeicon />
              </div>

        
              <div className="mt-1 flex px-3 md:px-6 flex-col items-center">
                <div className="text-2xl md:text-3xl font-semibold">Add Content</div>

        
                <InputField references={titleRef} placeholder="Title" />

              
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="py-2 rounded-lg border-2 focus:outline-none border-gray-400 px-2  w-56 md:w-64 bg-gray-200 focus:border-blue-400"
                >
                  <option value="">None</option>
                  <option value="Youtube">YouTube</option>
            
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="Facebook">Facebook</option>
                </select>

                {/* Link Input */}
                <InputField references={linkRef} placeholder="Link" />

           

           
                <button
                  className="py-2 rounded-lg focus:outline-none px-2 w-32 bg-[#6f65f1] cursor-pointer hover:bg-[#5a5692] text-white text-xl mt-3"
                  onClick={addContent}
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
