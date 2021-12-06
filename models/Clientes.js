const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    nombre: { 
        type: String,
        required: true
    },
    apellido:{
        type: String,
    },
    direccion:{
        type: String,
    },
    telefono:{
        type: Number,
    }
    
})

module.exports = mongoose.model('Clientes', clienteSchema);