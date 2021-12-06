const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema =new Schema ({
    nombres: {
        type:String
    },
    saldo:{
        type:Number,
        default:0
    },
    ganancias:{
        type:Number,
        default:0
    },
    dataInfo:{
        type:{},
        default:null
    },
    dni:{
        type: String,
        trim:true,
        default:""
    },
    ruc:{
        type: String,
        trim:true,
        default:""
    },
    codigo_recuperacion:{
        type:String,
        default:"0"
    },
    correo:{
        type: String
    },
    telefono:{
        type: String,
        unique: true
    },
    password:{
        type:String
    },
    state:{
        type:String,
        default:1
    },
    fechaCreation:{
        type:Date,
        default: Date.now
    },
    foto:{
        type:String,
        default:"https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png"
    },
    tokenPhone:{
        type:String,
        default:"not-token"
    },
    user_create:{
        // este es el foraneo
        type: Schema.ObjectId,
        ref: 'Usuarios',
        default:null
    },
    password_reform:{
        type:String
    },
    tienda_saldo:{
        type:Number,
        default:0
    },
    tienda_ganancia:{
        type:Number,
        default:0
    },
    empresa_saldo:{
        type:Number,
        default:0
    },
    empresa_ganancia:{
        type:Number,
        default:0
    },
    accesos:{
        type:[],
        default:[]
    },
    codigo:{
        type:String
    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);