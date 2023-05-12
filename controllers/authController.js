import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";


export const register = async (req,res,next)=>{
    try {
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            isAdmin: req.body.isAdmin, // not require. default is false
            password: hash,
        })

        await newUser.save()
        res.status(200).json("User has been created")

    } catch (err) {
        next(err)
    }
}

export const Login = async (req,res,next)=>{
    try {
        
         const user = await User.findOne({username:req.body.username})

         if(!user){
            return next(createError(404, "User Not Found"))
         }
         else{
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordCorrect){
                return next(createError(400, "Wrong Password"))
            }
            else{
                const token = jwt.sign(
                    {
                        id: user._id, 
                        isAdmin: user.isAdmin
                    }, 
                        process.env.JWT_Secret
                );

                const {password, isAdmin, ...otherDetails} = user._doc;

                res
                .cookie("accessToken", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({...otherDetails,token})
            }
         }


    } catch (err) {
        next(err)
    }
}

