import express from "express";
import {  allUser, updateUserProfile, userDelete, userProfile } from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("You are authenticated")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("You are authenticated and you can do whatever you wish.")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("Welcome admin and you can do whatever you wish.")
// })

// router.get("/", (req,res) =>{
//     res.send("Users Page")
// })

router.put("/user-profile-update/:id", verifyUser, updateUserProfile)
router.delete("/user-delete/:id",verifyUser, userDelete)
router.get("/user-profile/:id",verifyUser, userProfile)
router.get("/user-list/",verifyAdmin, allUser)


export default router