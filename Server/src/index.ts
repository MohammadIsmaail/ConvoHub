import "dotenv/config"
import express from "express"
const app = express()
import helemt from "helmet"
import cors from "cors"
import connectdb from "./Connect/Conn"
import userRouter from "./Router/userrouter"


app.use(helemt())
app.use(cors())
app.use(express.json())
connectdb()

app.use("/user", userRouter);




// Error Handler
app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})