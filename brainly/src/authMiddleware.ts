import {Request,Response, NextFunction } from 'express'
import jwt=require('jsonwebtoken')
import { USER_SECRET_PASSWORD } from './config';


export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const header=req.headers["authorization"]
    const decoded=jwt.verify(header as string,USER_SECRET_PASSWORD)
    if(decoded)
    {
         //@ts-ignore   
        req.userId=decoded.id;
        next();
    }else{
        res.json({
            msg:"error in connection"
        })
    }
 
}