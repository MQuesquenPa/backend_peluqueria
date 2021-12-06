const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operacionesSchema =new Schema ({
    tipoOperacion: {
        type:String
    },
    datosOperacion:{
        type:{},
        default:{}
    },
    monto:{
        type:Number,
        default:{}
    },
    usuarios: { 
        type: [Schema.ObjectId],
        ref: 'Usuarios',
        default:[]
    },
    fechaCreacion:{
        type:Date
    },
    userCreate:{
        type:Schema.ObjectId,
        ref: 'Usuarios'
    },
    userSend:{
        type:Schema.ObjectId,
        ref: 'Usuarios'
    },
    estado:{
        type:String,
        default:1
    },
    codigoSended:{
        type:String
    }
});

module.exports = mongoose.model('Operaciones', operacionesSchema);