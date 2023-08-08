const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    published: {
        type: Number,
        maxlength: 4

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },

    genres: {
        type: [String]
    }
})


bookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', bookSchema)