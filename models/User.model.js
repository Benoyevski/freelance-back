const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: String,

    name: String, 
    surname: String,
    phone: Number,
    mail: String,
    login: String,
    password: String,
    followOrders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order"
    }],
    acceptOrders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order"
    }],
    wallet: Number,
})

const User = mongoose.model('User', userSchema)

module.exports = User
