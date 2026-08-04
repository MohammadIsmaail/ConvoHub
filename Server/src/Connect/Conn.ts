import mongoose from "mongoose";

const connectdb = async ()=>{
    const conn =await mongoose.connect(`${process.env.mongodb_variable}`)
    if(conn){
        console.log(`DataBase Connected Successfully!`)
    }
} 

export default connectdb