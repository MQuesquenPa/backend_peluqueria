const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codigoSchema =new Schema ({
    codigo: {
        type:String
    },
    celular:{
        type:String
    },
    fechaCreation:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Codigos', codigoSchema);