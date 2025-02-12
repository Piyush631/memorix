
import { BrainLogo } from "../icons/Brainlogo"
import { PlusIcon } from "../icons/PlusIcon"
import { Shareicon } from "../icons/ShareIcon"
import { Button } from "./Button"


interface head {
    setIsOpen:any,
    setIsOpenShare:any
} 
export function HeaderData({setIsOpen,setIsOpenShare}:head){
 


    return (
        <div className="flex justify-between px-16 " > 
          <div className="flex ml-2  items-center gap-2">
                    <BrainLogo />
                    <div className="hidden md:block text-2xl font-semibold">
                      Memorix
                    </div>
          </div>
             <div className=" flex  gap-3">
                  <Button  onClick={()=>{
                    setIsOpenShare(true)
                  }} text="Share Brain "  variant="secondary" startIcon={<Shareicon size="md" />}/>
                <Button   onClick={()=>{setIsOpen(true)}}  text="Add Content"  variant="primary" startIcon={  <PlusIcon size="md"/>}/>
             
            
                  </div>
        </div>
    )
}