const { response } = require("express");
const express = require("express");
const router = express.Router();

const Room = require('../models/room')
const {getAllRooms,getRoomById,addRoom,deleteRoom,updateRoom} = require('../controller/roomController')

router.get("/getallrooms", getAllRooms )

router.post("/getroombyid", getRoomById)

router.post("/addroom", addRoom)

router.delete('/deleteroom/:id', deleteRoom)

router.put('/updateroom/:id', updateRoom)

module.exports = router;