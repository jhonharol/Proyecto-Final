const mongoose = require('mongoose');

// Definición del esquema de Students
const StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true, 
        trim: true, 
        minlength: 2 
    },
    age: {
        type: Number,
        required: true, 
        min: 5, 
        max: 100 
    },
    grade: {
        type: String,
        required: true, 
        enum: ['Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Once'], 
        default: 'Sexto' 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Student', StudentSchema);