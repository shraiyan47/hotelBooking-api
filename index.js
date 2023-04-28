import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; 
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = async() => {

    try {
        await mongoose.connect(process.env.MONGO)
        console.log("COnnected to MDB");
    } catch (error) {
        throw error;    
    }
}

mongoose.connection.on("Dissconnected", ()=> {
    console.log("MongoDb Disconnected");
})

mongoose.connection.on("Connected", ()=> {
    console.log("MongoDb Connected");
})

/// /// Routes

// app.get("/", (req,res) =>{
//     res.send("Hello First Req")
// })

////// middlewares
app.use(cookieParser())
app.use(express.json())
 
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 500
    return res.status(errorStatus).json(
        {
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack,
        }
    )
})


app.listen(8080, ()=>
{
    connect()
    console.log("Backend Connected!")
})