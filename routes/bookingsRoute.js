const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe') ('pk_test_51KEzOVEjkcbYfqiKANmGBUrGB8y6pMcc53DM7efS99iR8SGrfGWbZ5ifk4kZIt35Goch547AU5Q8ABqs23S0Weqf00jY4oKo6W')
const {bookRoom,getBookingsbyuserid,cancelBooking,getallBookings} = require('../controller/bookingController')

router.post("/bookroom", bookRoom)

router.post("/getbookingsbyuserid", getBookingsbyuserid)

router.post("/cancelbooking", cancelBooking)

router.get("/getallbookings", getallBookings)

module.exports = router;



