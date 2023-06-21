import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"


export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;

    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }

        res.status(200).json(savedRoom)

    } catch (err) {
        next(err)
    }
}


export const updateRoom = async (req, res, next) => {

    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    } catch (err) {
        next(err)
    }
}

export const updateAvailableRoom = async (req, res, next) => {

    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDate": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const roomId = req.params.id
    try {
        await Room.findByIdAndDelete(roomId)

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } })
        } catch (err) {
            next(err)
        }

        res.status(200).json("Room Deleted")
    } catch (err) {
        next(err)
    }
}

export const getRoom = async (req, res, next) => {

    try {
        const RoomDesc = await Room.findById(req.params.id)
        res.status(200).json(RoomDesc)
    } catch (err) {
        next(err)
    }
}

export const getAllRoom = async (req, res, next) => {

    // const failed = true 
    // if(failed) return next(createError(401, "You are not Authenticated!"))

    // return next()
    try {
        const allRoom = await Room.find()
        res.status(200).json(allRoom)
    } catch (err) {
        next(err)
    }
}