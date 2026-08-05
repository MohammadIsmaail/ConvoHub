import "dotenv/config"
import express from "express"
import helemt from "helmet"
import cors from "cors"
import connectdb from "./Connect/Conn"
import UserRouter from "./Router/userrouter"
const app = express()
app.use(helemt())
app.use(cors())
app.use(express.json())
connectdb()


app.use("/user", UserRouter)


app.use((err:any, req:any, res:any, next:any) => {
    res.json({ message: err.message, stack: err.stack })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})