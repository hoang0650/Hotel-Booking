const Room = require('../models/room')

const getAllRooms = async(req,res)=>{
    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

const getRoomById = async(req,res)=>{
    const roomid = req.body.roomid
    try {
        const room = await Room.findOne({_id : roomid})
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

const addRoom = async(req,res)=>{
    try {
        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Room Added Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const deleteRoom = async(req,res)=>{
    try {
        
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Deleted successfull"})
    } catch (error) {
        return res.status(500).json({error});
    }
}

const updateRoom = async(req,res)=>{
    try {
        const update = req.body
        await Room.findByIdAndUpdate({_id: req.params.id},update)
        res.status(200).json({message: "Update successfull"})
    } catch (error) {
        return res.status(500).json({error});
    }
}


module.exports = {getAllRooms,getRoomById,addRoom,deleteRoom,updateRoom}
    



