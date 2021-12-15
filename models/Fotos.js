const mongoose = require('mongoose')

const fotoSchema = mongoose.Schema({
    imagen:{
        type: String,
    }
   
})
// buscar populey consulta
module.exports = mongoose.model('Fotos', fotoSchema);