import jwt from "jsonwebtoken"

const GenerateToken = (payload:any)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET_TOKEN as string,{expiresIn:"1h"})
    return token;
}

export default GenerateToken