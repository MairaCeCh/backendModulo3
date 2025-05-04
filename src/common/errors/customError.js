import { json } from "express";
import { logger } from "../utils/logger.js"



export const customError = async (err, req, res, next)=>{

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal server error" : err.message;
    const stack = err.stack.split("\n")
    const error = {
        statusCode,
        files: stack,
        message: err.message,
        path: req.originalUrl,
        method: req.method
    }
    
  
 if(statusCode === 500){
     
  logger.error(`status:${statusCode} [${req.method}] ${req.originalUrl} - msg:${err.message}`);
  
  console.log(JSON.stringify(error, null, 2));


  
 return res.status(statusCode).json({ statusCode, message });
  }


logger.debug(JSON.stringify(error, null, 2))   
 return res.status(statusCode).json({ statusCode, message });
 }