const mongoose = require('mongoose');

var mongoURL = "mongodb+srv://hoang0650:Kobiet123@cluster0.jz1sw.mongodb.net/Hotel?retryWrites=true&w=majority";

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})

var connection = mongoose.connection;

connection.on('error', () => {
    console.log("MongoDB Connection Failed");
})

connection.on('connected', () => {
    console.log("MongoDB Connected Successfully");
})

module.exports = mongoose