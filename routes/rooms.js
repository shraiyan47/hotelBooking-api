import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/roomController.js";

import {verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

// Create Room

router.post("/:hotelId",verifyAdmin, createRoom) 

// Update Room

router.put("/:id",verifyAdmin, updateRoom) 

// Delete Room

router.delete("/:id/:hotelId",verifyAdmin, deleteRoom) 

// Single Room

router.get("/:id", getRoom) 

// All Room 

router.get("/", getAllRoom) 

export default router