import jwt from "jsonwebtoken"
import createResponse from "./CreateResponse";

const middlewareToken = (req:any,res:any,next:any)=>{
    const header = req.headers.authorization;
    if(!header){
        return createResponse(res,false,400,"Token not found",[],true);
    }
    const token = header.split(" ")[1];
    try {
        jwt.verify(token,process.env.JWT_SECRET_TOKEN as string,(err:any,decode:any)=>{
            if(err){
                return createResponse(res,false,400,"Invalid Token",[],true);
            }
            req.user = decode;
            next();
        });
    }catch (error:any){
        return createResponse(res,false,500,error.message,[],true);
    }

}

export default middlewareToken