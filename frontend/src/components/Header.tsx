import { PlusIcon } from "../icons/PlusIcon"
import { Shareicon } from "../icons/ShareIcon"
import { Button } from "./Button"


interface head {
    setIsOpen:any,
    setIsOpenShare:any
}
export function HeaderData({setIsOpen,setIsOpenShare}:head){

    return (
        <div >   
             <div className="flex gap-4 justify-center lg:justify-end  p-2 ">
                  <Button  onClick={()=>{
                    setIsOpenShare(true)
                  }} text="Share Brain "  variant="secondary" startIcon={<Shareicon size="md" />}/>
                <Button   onClick={()=>{setIsOpen(true)}}  text="Add Content"  variant="primary" startIcon={  <PlusIcon size="md"/>}/>
             
            
                  </div>
        </div>
    )
}