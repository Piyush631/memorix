import { useEffect, useState } from "react";
import { BrainLogo } from "../icons/Brainlogo";
import { Twitter } from "../icons/Twitter";
import { Youtube } from "../icons/Youtube";
import { NavIcon } from "./NavIcon";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiGalleryView2 } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { Insta } from "../icons/Insta";
import { Facebook } from "../icons/Facebook";
import { Pinterest } from "../icons/Pintrest";
import { fetchData, loadable, refreshState, selectContent } from "../Atoms/RecoilAtoms";

export function Sidebar({ open, setOpen ,user}: { open: any; setOpen: any,user:any }) {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useRecoilState(selectContent);
  const [, setRefreshKey] = useRecoilState(refreshState);
  const[,setLoading]=useRecoilState(loadable)
   const usersLoadable = useRecoilValueLoadable(fetchData);
   const[newuser,setNewuser]=useState(" harsh")
  // Trigger refresh when selectedType changes
  useEffect(() => {
    setLoading(true)
    setRefreshKey((prev) => prev + 1);
    const username = usersLoadable.state === "hasValue" && usersLoadable.contents.length > 0
    ? usersLoadable.contents[0].userId.username
    : " ";
    setNewuser("paras")
    
    setLoading(false)

  }, [selectedType, setRefreshKey]);
  

  function logout() {
    localStorage.removeItem("authorization");
    toast.success("You are logged out");
    navigate("/signin");
  }

  return (
    <div>
      <div className="flex gap-2 mt-2 p-3 items-center  h-auto">
        <div className={!open ? "-translate-x-32" : " "}>
          <BrainLogo />
        </div>

        <span className={`${!open ? "-translate-x-46" : ""}   font-semibold text-2xl`}>
          Memorix
        </span>
        <div
          onClick={() => setOpen(!open)}
          className={`cursor-pointer pl-2 pt-1 text-2xl flex items-center justify-center ${
            !open ? "-translate-x-40" : ""
          }`}
        >
          <IoMdMenu />
        </div>
      </div>

      <div className={` ${!open ? "hidden" : "flex"} flex-col justify-center items-center mt-1`}>
        <img
          className="h-14 w-14 rounded-full"
          src="https://img.freepik.com/premium-vector/male-character-social-network-concept_24877-17897.jpg?w=740"
          alt="Profile"
        />
        <div className="font-semibold text-2xl">{newuser}fsdfgsdg</div>
      </div>

      <div className="flex flex-col gap-3  ">
        <button onClick={() => setSelectedType("all")}>
          <NavIcon icon={<RiGalleryView2 />} text="All" open={open} />
        </button>
        <button onClick={() => setSelectedType("Youtube")}>
          <NavIcon icon={<Youtube />} text="Youtube" open={open} />
        </button>
        <button onClick={() => setSelectedType("Twitter")}>
          <NavIcon icon={<Twitter />} text="Twitter" open={open} />
        </button>
        <button onClick={() => setSelectedType("Instagram")}>
          <NavIcon icon={<Insta />} text="Instagram" open={open} />
        </button>
        <button onClick={() => setSelectedType("Facebook")}>
          <NavIcon icon={<Facebook />} text="Facebook" open={open} />
        </button>
        <button onClick={() => setSelectedType("Pinterest")}>
          <NavIcon icon={<Pinterest />} text="Pinterest" open={open} />
        </button>
      </div>

      <div className="flex cursor-pointer ml-3 mt-24 gap-4 hover:bg-gray-300 hover:rounded-md">
        <button className="text-2xl" onClick={logout}>
          <IoIosLogOut />
        </button>
        <div onClick={logout} className={`rounded-lg p-0.5 text-lg ${  !open ? "-translate-x-40" : ""} `}>
          Log out
        </div>
      </div>
    </div>
  );
}
