// We will need our mongoose library
const mongoose = require(`mongoose`);

// Your schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['Unpublished', 'Published'],
        default: 'Unpublished'
    }
    
});

// Exporting our book model
module.exports = mongoose.model('Book', BookSchema);