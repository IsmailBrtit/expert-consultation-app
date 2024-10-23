import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import autRoute from './routes/auth.js'
import userRoute from "./routes/user.js"
import ExpertRoute from "./routes/expert.js"
import ReviewRoute from "./routes/review.js"
import BookingRoute from "./routes/booking.js"


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
        await mongoose.connect(process.env.MONGO_URL);//process.env.MONGO_URL
         
        console.log("MongoDB is connected");
    } catch (err) {
        console.log("MongoDB is connection failed");
    }
}; 
   
//midlleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors(corsOptions));

//routes
app.use('/api/v1/auth',autRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/experts',ExpertRoute);
app.use('/api/v1/reviews',ReviewRoute);
app.use('/api/v1/bookings',BookingRoute);





app.listen(port,()=> {
    connectDB();
    console.log("Server is runing on port "+ port);
});