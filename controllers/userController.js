import User from "../models/User.js"


export const userProfile = async (req,res,next)=>{
    try {
        const userById = await User.findById(req.params.id)
        res.status(200).json(userById)

    } catch (err) {
        next(err)
    }
}

export const updateUserProfile = async (req,res,next) => {
    
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.status(200).json(updateUser)
    }catch(err){
        next(err)
    }
}

export const allUser = async (req,res,next)=>{
    try {
        const usersList = await User.find()
        res.status(200).json(usersList)

    } catch (err) {
        next(err)
    }
}

export const userDelete = async (req,res,next)=>{
    try {
        const UserDelete = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(UserDelete)

    } catch (err) {
        next(err)
    }
}