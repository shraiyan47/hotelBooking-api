import express from "express";
// import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotelController.js";

const router = express.Router();


// Create Hotel

router.post("/", createHotel) 

// Update Hotel

router.put("/:id", updateHotel) 

// Delete Hotel

router.delete("/:id", deleteHotel) 

// Single Hotel

router.get("/:id", getHotel) 

// All Hotel 

router.get("/", getAllHotel) 

// router.get("/", (req,res) =>{
//     res.send("Hotel Page")
// })


export default router