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
        required: false
    },

    status: {
        type: String,
        required: true,
        enum: ['Unpublished', 'Published'],
        default: 'Unpublished'
    },
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true  
    }
},{
    timestamps: true
});

// Exporting our book model
module.exports = mongoose.model('Book', BookSchema);