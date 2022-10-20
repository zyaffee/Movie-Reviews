///////////////////////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////////////////////
const commentSchema = require('./comment')
const mongoose = require('./connection')
const Movie = require('./movie')
const User = require('./user')

const { Schema, model } = mongoose

// review schema
const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

const Review = model('Review', reviewSchema)

//////////////////////////////////////////////////
// Export our schema
//////////////////////////////////////////////////
module.exports = Review