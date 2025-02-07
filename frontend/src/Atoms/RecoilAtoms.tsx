import { atom, selector } from "recoil";
import axios  from "axios";


export const Username=atom({
    key:"username",
    default:" "
})
export const Password=atom({
    key:"password",
    default:" "
})
 //force to refresh a state
export const refreshState=atom({
    key:"refreshstate",
    default:0
});

export const loadable=atom({
    key:"loadable",
    default:false
})
export const selectContent=atom({
    key:"selectContent",
    default:"all"
})
    export const sharedurl=atom({
        key:"sharedurl",
        default:" "
    })
 
export const fetchData=selector({
    key:"fetchdatauser",
    get:async({get})=>{
        get(refreshState)
        const type=get(selectContent)
      
        try{
            const url = type === "all" 
        ? `https://memorix.onrender.com/api/v1/content`
        : `https://memorix.onrender.com/api/v1/refresh?type=${type}`;

        const response=await axios.get(url,{
            headers:{
                "Authorization": localStorage.getItem("authorization"),
            }
           
        })
      
   
        return response.data.data
        }catch(error)
        {
            console.error("Error fetching users:", error);
            return [];
        }
    }
})
    
export const cardId=atom({
    key:"cardId",
    default:" "
})

 