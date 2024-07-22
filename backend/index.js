import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import autRoute from './routes/auth.js'

dotenv.config()

const app=express()
const port=process.env.PORT || 8000

const corsOptions = {
    origin: true,
};

app.get("/",(req,res)=>{
    res.send("API is working");
})
//database conection 
mongoose.set('strictQuery', false) 
const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
         
        console.log("MongoDB is connected");
    } catch (err) {
        console.log("MongoDB is connection failed");
    }
};

//midlleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',autRoute)

app.listen(port,()=> {
    connectDB();
    console.log("Server is runing on port "+ port);
});