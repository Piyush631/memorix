import  { ReactElement } from "react"

interface buttonProps{
    variant:"primary" | "secondary",
    text:string,
 
    startIcon ?:ReactElement,
    endIcon?:ReactElement,
    onClick?:()=>void
}
const variantStyle={
    "primary":"bg-[#5046E4] text-white",
    "secondary":"bg-[#E1E8FF] text-[#5047C4]"
}

const defaultStyle="rounded-md flex gap-2 items-center justify-center";
export function Button(props:buttonProps){
    return (
        <div className="">
  <button className={`${variantStyle[props.variant]}  ${defaultStyle}  cursor-pointer px-1 py-0 text-sm md:px-2 md:py-1 md:text-md ` } onClick={props.onClick}>
           {props.startIcon} {props.text} 
        </button>
        </div>
      
    )
}