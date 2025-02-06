import express =require('express')
import mongoose=require('mongoose')
import jwt=require('jsonwebtoken')
import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config();
import { contentModel, linkModel, userModel } from './db';
import  bcrypt = require('bcrypt');
import {Request,Response } from 'express'
import { authMiddleware } from './authMiddleware';
import { random } from './utils';

import cors from 'cors'
import { USER_SECRET_PASSWORD } from './config';
const JWT_SECRET="piyush12345"
const app=express();
app.use(express.json())
app.use(cors())
app.post("/api/v1/signup",async (req,res)=>{
    
    const{username,password}=req.body;
    //create a zod validation
    const userValidation= z.object({
        username:z.string().min(3).max(30),
        password:z.string().min(5,{message:"password is too short"}).max(20)
    })
    const parseData=userValidation.safeParse(req.body);
    if(!parseData.success){
         res.status(400).json({
            msg:parseData.error
        })
        return 
    }
else{


 //hasing a password
 const hashedPassword=await bcrypt.hash(password,5)
 //storing a data  in a database 
 try{
         await userModel.create({
             username:username,
             password:hashedPassword
         })
     res.json({
             msg:"user is successfully signup"
         })
         return  
 }catch(err)
 {
      res.status(402).json(
         {
             msg:"user is already exist"
         }
     )
     return
 }
    
}
    

})                          
app.post("/api/v1/signin",async (req:Request,res:Response)=>{
    const {username,password}=req.body
    const userValidation=z.object({
        username:z.string().min(3).max(30),
        password:z.string().min(5).max(30)
    })
const parseData=userValidation.safeParse(req.body)

if(!parseData.success)
{
   
 res.json({
        msg:parseData.error
    });
    return ;
}
try { 
    const  response:any=await userModel.findOne({
        username:username
    })

    if(!response.username){
        res.status(400).json({
            msg:"user doest not exist"
        });
        return ;
    }                                                 
    const  passwordmatch=await bcrypt.compare(password,response.password) 
    if(!passwordmatch){
        res.json({
            msg:"password does not match"
   
        })
    return ;
    }

    if(response && passwordmatch)
    {
        const token=jwt.sign({
            id:response._id
        }, USER_SECRET_PASSWORD)
        res.json({
            token:token
        })
        return ;
        
    }
}catch(error){
    res.json({
        msg:"invalid details"
    })
  
}


})

app.post("/api/v1/content",authMiddleware,async (req,res)=>{

    const {link,type,title,tag}=req.body
    try{
      const data=  await contentModel.create ({
            link:link,
            type:type,
            title:title,
            tag:tag,
             //@ts-ignore
            userId:req.userId


        })
        res.json({
            data
        })
    }catch(error){
        res.json({
            error
        })
    }

})
app.get("/api/v1/content",authMiddleware,async(req,res)=>{

    try{
      const  data=  await contentModel.find({
            //@ts-ignore
            userId:req.userId

        }).populate("userId","username")
        res.json({
            data
        })
    } catch(e){
        res.json({
            msg:"content not found"
        })
    }


  
})
app.get("/api/v1/refresh",authMiddleware,async(req,res)=>{

    try{
        const {type}=req.query

if (!type || typeof type !== "string") {
    res.status(400).json({ message: "Type is required and must be a string!" });
    return; // Ensure no further code is executed after sending a response
}
      const  data=  await contentModel.find({
            //@ts-ignore
            userId:req.userId,
            type:type.toString()


        }).populate("userId","username")
        res.json({
            data
        })
    } catch(e){
        res.json({
            msg:"content not found"
        })
    }


  
})
app.delete("/api/v1/content",authMiddleware,async(req,res)=>{
   
    const {id}=req.query
    try{
        await contentModel.deleteOne({
                //@ts-ignore
            userId:req.userId,
            _id:id
        })
        res.json({
                msg:"content delete successfully"
    
        })
    }catch(e){
        res.json({
            msg:"content is not found"
        })
    }

})
app.post("/api/v1/brain/sharelink",authMiddleware,async(req,res)=>{
    const share=req.body.share
    if(share===true)
    {
        const existingLink=await linkModel.findOne({
            //@ts-ignore
            userId:req.userId
        })
        if(existingLink){
            res.json({
                msg:existingLink.hash
            })
            return
        }
        const hash=random(10)
            await linkModel.create({
                hash:hash,
                //@ts-ignore
                userId:req.userId
            })
            res.json({
                msg:hash
            })
            return 
        
    }else{
        if(share===false)
        {
            await linkModel.deleteOne({
                //@ts-ignore
                userId:req.userId
            })
            res.json({
                message:"Link is removed"
            })
        }

        return 

    }

})

app.get("/api/v1/brain",async(req,res)=>{
    const {hash}=req.query

        const link=await linkModel.findOne({
            hash
        })
    if(!link)
    {
        res.json({
            msg:"link is not found"
        })
        return;
    }
    const content=await contentModel.find({
        userId:link.userId
    })
    const user=await userModel.findOne({
        _id:link.userId
    })
    if(!user){
        res.json({
            msg:"user is not found"
        })
        return
    }
    res.json({
        user:user.username,
        content
    })
    
})



async  function main (){

    const url : any=process.env.MONGO_URL;
    mongoose.connect(url)
    app.listen(3000)
    console.log("you are connected to database")

}
   main();




   