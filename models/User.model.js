const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: String,

    name: String, 
    surname: String,
    phone: Number,
    mail: String,

    login: String,
    password: String,

    wallet: {
        type:Number,
        default:0
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
