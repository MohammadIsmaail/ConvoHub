import createResponse from "../Helper/CreateResponse";
import UserModel from "../Modules/UserModel";

export const UserProfileController = async (req:any,res:any)=>{
    try{

        // const userid= req.user.id;  or
        const {id} = req.user
        const user = await UserModel.findById(id); 
        if(!user){
            return createResponse(res,false,400,"User not found",[],true);
        }
        else{
            const userData:any = user.toObject();
            delete userData.password;
            return createResponse(res,true,200,"User profile fetched successfully",userData,false);
        }
       

    }catch(error:any){
        return createResponse(res,false,500,error.message,[],true);
    }
}