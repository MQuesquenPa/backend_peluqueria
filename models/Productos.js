const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productoSchema = mongoose.Schema({
    nombre: { 
        type: String,
        required: true
    },
    descripcion:{
        type: String,
    },
    stock:{
        type: Number,
    },
    precio:{
        type: Number,
    },
    imagen:{
        type: String,
    },
    idCategoria:{
        type: Schema.ObjectId,
        ref: 'Categorias',
        default:null
    },
})
// buscar populey consulta
module.exports = mongoose.model('Productos', productoSchema);