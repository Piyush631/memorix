import { ReactElement } from "react"

export function NavIcon({icon,text,open}:{
    icon:ReactElement,
    text:string
    open:boolean
}){
    return (
        <div className="flex   gap-3 mt-2 pl-5 pt-2 items-center hover:bg-gray-300 rounded-md ">
            <div className={`${!open ? "-translate-x-2" :" "}  `}>
            {icon}
            </div>
           <div className={`${!open ? "-translate-x-32" :" "}   `}>
           {text}
           </div>
  
        </div>
    )
}