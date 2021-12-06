const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservasSchema = mongoose.Schema({
    descripcion: { 
        type: String,
        required: true
    },
    fecha:{
        type: Date,
    },
    alias:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    idPeluquero:{
        type: Schema.ObjectId,
        ref: 'Peluqueros',
        default:null
    }
})

module.exports = mongoose.model('Reservas', reservasSchema);