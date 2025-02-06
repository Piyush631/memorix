import axios from "axios";

export  async function SharedUrl(){
    const FRONTEND_URL = window.location.origin;
    try{
        const response=await axios.post("http://localhost:3000/api/v1/brain/sharelink",{
            share:true
        },{
            headers:{
                "Authorization": localStorage.getItem("authorization"),
            }
        
        })
        const hash=response.data.msg
        const mainUrl=`${FRONTEND_URL}/share/${hash}`
        
        return {mainUrl,hash}
    }catch(error){
        console.log(error);
        throw(error)
    }

}