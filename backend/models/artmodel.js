const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }

}, {timestamps: true})

module.exports = mongoose.model('Art', artSchema)

