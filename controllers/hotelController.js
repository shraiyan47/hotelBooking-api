import Hotel from "../models/Hotel.js"


export const createHotel = async (req,res,next) => {
    
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}


export const updateHotel = async (req,res,next) => {
    
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.status(200).json(updateHotel)
    }catch(err){
        next(err)
    }
}

export const deleteHotel = async (req,res,next) => {
    
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    }catch(err){
        next(err)
    }
}

export const getHotel = async (req,res,next) => {
    
    try{
        const hotelDesc = await Hotel.findById(req.params.id)
        res.status(200).json(hotelDesc)
    }catch(err){
        next(err)
    }
}

export const getAllHotel = async (req,res,next) => {
    
     // const failed = true 
    // if(failed) return next(createError(401, "You are not Authenticated!"))
    
    // return next()
    try{
        const allHotel = await Hotel.find()
        res.status(200).json(allHotel)
    }catch(err){
        next(err)
    }
}