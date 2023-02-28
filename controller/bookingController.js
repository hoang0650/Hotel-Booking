const { model } = require("mongoose");
const Booking = require("../models/booking");
const Room = require("../models/room");

const bookRoom = async(req,res)=>{
    const {
        room,
        userid,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token } = req.body


        try {
            const customer = await stripe.customers.create({
                email : token.email,
                source : token.id
            })

            const payment = await stripe.charges.create(
                {

                    amount : totalAmount * 100,
                    customer : customer.id,
                    currency : 'inr',
                    receipt_email : token.email

                },{
                    idempotencyKey : uuidv4()
                }
            )

            if(payment)
            {

                
                    const newBooking = new Booking({
                        room: room.name,
                        roomid: room._id,
                        userid,
                        fromDate: moment(fromDate).format('DD-MM-YYYY'),
                        toDate: moment(toDate).format('DD-MM-YYYY'),
                        totalAmount,
                        totalDays,
                        transactionId: '1234'
                    })
            
                    const booking = await newBooking.save()
            
                    const roomTemp = await Room.findOne({ _id: room._id })
            
                    roomTemp.currentbookings.push({ 
                        bookingid: booking._id, 
                        fromDate: moment(fromDate).format('DD-MM-YYYY'),
                        toDate : moment(toDate).format('DD-MM-YYYY'),
                        userid : userid,
                        status : booking.status
                    });
            
                    await roomTemp.save()
            
                                         

            }

            res.send("Payment Successfully , Your Room is booked")

        } catch (error) {
            return res.status(400).json({ error });
        }
}

const getBookingsbyuserid = async(req,res)=>{
    const userid = req.body.userid

    try {
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }

}

const cancelBooking = async(req,res)=>{
    const {bookingid , roomid} = req.body

    try {

        const bookingItem = await Booking.findOne({_id : bookingid})

        bookingItem.status = 'cancelled'
        await bookingItem.save()

        const room = await Room.findOne({_id : roomid})

        const bookings = room.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        room.currentbookings = temp

        await room.save()

        res.send('Your booking cancelled successfully')

    } catch (error) {
        return res.status(400).json({ error })
    }

}

const getallBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }

}

module.exports = {bookRoom,getBookingsbyuserid,cancelBooking,getallBookings}