const mongoose = require('mongoose');

const usuariosSchema =  mongoose.Schema({
    nombre: {
        type:String
    },
    correo:{
        type: String
    },
    password:{
        type:String
    },
})

module.exports = mongoose.model('Usuarios', usuariosSchema);