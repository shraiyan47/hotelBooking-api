import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}


export const updateHotel = async (req, res, next) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    } catch (err) {
        next(err)
    }
}

export const getHotel = async (req, res, next) => {

    try {
        const hotelDesc = await Hotel.findById(req.params.id)
        res.status(200).json(hotelDesc)
    } catch (err) {
        next(err)
    }
}

export const getAllHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    let limit = parseInt(req.query.limit, 10);

    console.log("limits type =>", typeof limit)
    console.log("limits =>", limit)
    try {
        const allHotel = await Hotel.find({
            ...others,
            cheepestPrice: { $gte: Number(min) || 1, $lte: Number(max) || 999999 },
        });

        console.log("HOTELS ->>", allHotel)
        
        res.status(200).json(allHotel)
    } catch (err) {
        next(err)
    }

}

export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(",")

    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({ city: city })
        }))
        //    const allHotel = await Hotel.find()
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}


export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })


        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])
    } catch (err) {
        next(err)
    }
}

export const getHolelRooms = async(req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
             return Room.findById(room);
        }))
        console.log("Room --> ",list)
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}