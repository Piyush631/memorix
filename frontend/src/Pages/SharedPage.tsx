import axios from 'axios';
import { useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';

import 'react-loading-skeleton/dist/skeleton.css'
import { LoadingPage } from './LoadingPage';
interface datatypes{
    title:string,
    type:string,
    link:string,
    _id:string
    isDeletable?: boolean;
}
interface userTypes{
    username:string
}

export function SharedPage(){
    const {sharelink}=useParams();
    const [data, setData] = useState<datatypes[]>([]); 
 const[username,setUsername]=useState(" ")
    const hasFetched=useRef(false)
    const[loading,setLoading]=useState(false)
    async function fetchData(){
        try{
            setLoading(true)
     
            const response =await axios.get(`http://localhost:3000/api/v1/brain?hash=${sharelink}`)
            if(response?.data?.content){
           
                setData(response.data.content)
                setUsername(response.data.user)
                setLoading(false)
               
            }else{
                console.log("no data found")
            }
        } catch(error)
        {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        if(sharelink && !hasFetched.current){
            hasFetched.current=true;
            fetchData();
        }
        const interval = setInterval(fetchData, 5 * 60 * 1000);

      
        return ()=>{
            clearInterval(interval)
            hasFetched.current=false;
        }
    },[sharelink])

    return (
        <div className='flex flex-col  bg-gray-300'>
            <div className='text-6xl font-semibold flex justify-center '>{username}</div>
    <div className='flex flex-wrap p-6 bg-gray-300 h-screen w-full gap-4'> 
       
        { !loading ?  data.map(({ link, type, title,_id }: datatypes) => (
   <Card title={title} link={link} type={type} id={_id}   isDeletable={false} />
 )) :  <LoadingPage/>   }
         </div>
        </div>
    
    )
}