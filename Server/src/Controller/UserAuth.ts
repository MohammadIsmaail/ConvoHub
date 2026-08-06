import createResponse from "../Helper/CreateResponse";
import GenerateToken from "../Helper/Jwt";
import UserModel from "../Modules/UserModel";
import bcrypt from "bcrypt"

export const UserRegisterController = async (req: any, res: any) => {
  try {
    const { name, email, mobile, password } = req.body;
    // Process user registration logic here
    const isExist = await UserModel.findOne({ $or: [{ email }, { mobile }] });
    if (isExist) {
      return createResponse(res, false, 400, "User Already Exist!", isExist, true);
    }
    else{
        const hashPassword = await bcrypt.hash(password, 10);
       const data = new UserModel({name, email, mobile, password:hashPassword});
       const result = await data.save();
       createResponse(res, true, 200, "User registered successfully", result, false);
    }
  } catch (error:any) {
    return createResponse(res, false, 500, error.message, [], true);
  }
}


export const UserLoginController = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    // Process user login logic here
    const isExist = await UserModel.findOne({ email });
    if(isExist){
        const result = await bcrypt.compare(password, isExist.password);
        if(result){
            const payload = {email : isExist.email,id:isExist._1}
            const token = GenerateToken(payload);
            const { password, ...userWithoutPassword } = isExist.toObject();
            createResponse(res, true, 200, "User logged in successfully", {...userWithoutPassword, token}, false);
        }
        else{
            createResponse(res, false, 400, "Invalid credentials", [], true);
        }
    }
    else{
        createResponse(res, false, 400, "User not found", [], true);
    }
  } catch (error:any) {
    return createResponse(res, false, 500, error.message, [], true);
  }
}


