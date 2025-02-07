import axios from "axios";
import { BACKEND_URL } from "../config";

export  async function StopSharing(){

    try{
        await axios.post(`https://memorix.onrender.com/api/v1/brain/sharelink`,{
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