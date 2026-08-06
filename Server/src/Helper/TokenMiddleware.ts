import jwt from "jsonwebtoken"
import createResponse from "./CreateResponse";

const middlewareToken = (req:any,res:any,next:any)=>{
    const header = req.token.authorization;
    if(!header){
        return createResponse(res,false,400,"Token not found",[],true);
    }
    const token

}