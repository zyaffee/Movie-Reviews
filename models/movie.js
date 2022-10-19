// import mongoose
const mongoose = require("mongoose")

// import user model for populate
const User = require('./user')

// pull schema and model from mongoose
const { Schema, model } = mongoose

// model
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    lengthMinutes: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    }]
})

// make model
const Movie = model("Movie", movieSchema)

// export model
module.exports = Movie