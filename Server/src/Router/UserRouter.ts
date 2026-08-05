import express from "express"
import { UserRegisterController } from "../Controller/UserAuth"
const UserRouter = express.Router()

UserRouter.get("/", UserRegisterController)


export default UserRouter