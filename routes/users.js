import express from "express";
import {  allUser, updateUserProfile, userDelete, userProfile } from "../controllers/userController.js";
import { verifyToken, verifyUser, verifAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("You are authenticated")
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("You are authenticated and you can do whatever you wish.")
})

router.get("/checkadmin/:id", verifAdmin, (req, res, next)=>{
    res.send("Welcome admin and you can do whatever you wish.")
})

// router.get("/", (req,res) =>{
//     res.send("Users Page")
// })

router.put("/user-profile-update/:id", updateUserProfile)
router.delete("/user-delete/:id", userDelete)
router.get("/user-profile/:id", userProfile)
router.get("/user-list/", allUser)


export default router