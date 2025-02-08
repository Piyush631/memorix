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
    <div className="bg-[#EBEBF5] relative min-h-screen">
    <div
      className={`${
        open ? "w-52" : "w-12"
      } fixed z-10 bg-white top-0 left-0 h-screen border-r border-gray-300 transition-all duration-300 ease-in-out`}
    >
      <Sidebar
        open={open}
        setOpen={() => setOpen(!open)}
        user={user}
      />
    </div>
  
    <div
      className={`${
        open ? "ml-52" : "ml-12"
      } w-full transition-all duration-300 ease-in-out`}
    >
      <div className="p-4">
        <AddContent
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <Popup
          isOpenShare={isOpenShare}
          onClose={() => setIsOpenShare(false)}
        />
      </div>
  
      <div className="flex justify-end p-4">
        <HeaderData
          setIsOpen={setIsOpen}
          setIsOpenShare={setIsOpenShare}
        />
      </div>
  
      <div className="p-4">
        {user && (
          <div className="text-2xl font-bold">
            <span>Welcome, </span>
            <span className="text-[#5046E4]">{user}!!!</span>
          </div>
        )}
      </div>
  
      <div className="p-6 flex flex-wrap gap-5 bg-[#F4F4FC] rounded-3xl">
        {loading ? (
          usersLoadable.state === "hasValue" &&
          usersLoadable.contents.map(({ title, link, type, _id }: dataTypes) => (
            <Card
              key={_id}
              title={title}
              link={link}
              type={type}
              id={_id}
              isDeletable={true}
            />
          ))
        ) : (
          <LoadingPage />
        )}
      </div>
    </div>
  </div>
  

  )
}


