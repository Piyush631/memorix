import axios from "axios";
import { BACKEND_URL } from "../config";

export  async function StopSharing(){

    try{
        await axios.post(`${BACKEND_URL}/api/v1/brain/sharelink`,{
            share:false
        },{
            headers:{
                "Authorization": localStorage.getItem("authorization"),
            }
        
        })
     
        
      
    }catch(error){
        console.log(error);
        throw(error)
    }

}