import { useRef, useState } from "react";
import { Closeicon } from "../icons/Closeicon";
import { InputField } from "./InputField";

import axios from "axios";
import { useRecoilState } from "recoil";
import { refreshState } from "../Atoms/RecoilAtoms";


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
    <div>
      {isOpen && (
        <div>
        
          <div className="h-screen w-full bg-gray-400 top-0 left-0 fixed flex items-center justify-center opacity-60"></div>

          {/* Modal container */}
          <div className="h-screen w-full top-0 left-0 z-10 fixed flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
              {/* Close button */}
              <div onClick={onClose}>
                <Closeicon />
              </div>

              {/* Form Content */}
              <div className="mt-1 flex px-6 flex-col items-center">
                <div className="text-3xl font-semibold">Add Content</div>

                {/* Title Input */}
                <InputField references={titleRef} placeholder="Title" />

                {/* Type Selection Dropdown */}
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="py-2 rounded-lg border-2 focus:outline-none border-gray-400 px-2 w-64 bg-gray-200 focus:border-blue-400"
                >
                  <option value="">None</option>
                  <option value="Youtube">YouTube</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="Facebook">Facebook</option>
                </select>

                {/* Link Input */}
                <InputField references={linkRef} placeholder="Link" />

                {/* Tag Input (Not yet functional) */}
                <input
                  type="text"
                  placeholder="Type and press Enter to add Tag"
                  className="py-2 rounded-lg border-2 focus:outline-none border-gray-400 px-2 w-64 bg-gray-200 focus:border-blue-400"
                />

                {/* Submit Button */}
                <button
                  className="py-2 rounded-lg focus:outline-none px-2 w-32 bg-[#6f65f1] cursor-pointer hover:bg-[#5a5692] text-white text-xl mt-3"
                  onClick={addContent}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
