const Usuarios= require('../models/Usuarios');

// agrega un nuevo USUARIO
exports.nuevoUsuario = async (req,res) =>{
    try {
        let dataCorreo=await Usuarios.findOne({correo:req.body.correo});
        if(dataCorreo)
        {
            res.json({status:"error", msg:"Correo ya existente"});
        }else{
            let dataUsuario= new Usuarios({nombre:req.body.nombre, correo:req.body.correo, password:req.body.password});
            let dataResponse=await dataUsuario.save();
            res.json({status:"success",data:dataResponse});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"Error al registrar al Usuario"});
    }
}
// buscando el usuario
exports.validandoUsuario = async (req,res) =>{
    try {
        let dataUsuario=await Usuarios.findOne({correo:req.body.correo, password:req.body.password});
        if(dataUsuario){
            res.json({status:"success", dataUsuario});
        }else{
            res.json({status:"error", msg:"Correo o Contraseña Incorrecta"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se pudo validar el usuario"});
    }
}

