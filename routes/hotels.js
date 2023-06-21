import express from "express";
// import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHolelRooms, getHotel, updateHotel } from "../controllers/hotelController.js";

import {verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();


// Create Hotel

router.post("/", verifyAdmin, createHotel) 

// Update Hotel

router.put("/:id", verifyAdmin, updateHotel) 

// Delete Hotel

router.delete("/:id", verifyAdmin, deleteHotel) 

// Single Hotel

router.get("/find/:id", getHotel) 

// All Hotel 
router.get("/", getAllHotel) 


router.get("/countByCity", countByCity)  
router.get("/countByType", countByType)  
router.get("/rooms/:id", getHolelRooms)  

// router.get("/", (req,res) =>{
//     res.send("Hotel Page")
// })


export default router