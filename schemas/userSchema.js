const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        select: false, //when you perform a query to retrieve documents from the collection, the field with select: false will be excluded from the results unless explicitly requested.
    },
    country: {
        type: String,
        default: 'India',
    }
})

module.exports = mongoose.model('user', userSchema)
