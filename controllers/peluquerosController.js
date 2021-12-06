const Peluqueros = require('../models/Peluqueros');

// agrega un nuevo peluquero
exports.nuevoPeluquero = async (req,res) =>{
    try {
        let dataPeluquero= new Peluqueros({nombre:req.body.nombre, apellido:req.body.apellido, direccion:req.body.direccion, telefono:req.body.telefono  });
        let dataResponse=await dataPeluquero.save();
        res.json({status:"success",data:dataResponse});
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"Error al crear Peluquero"});
    }
}

// buscando una nuevo peluquero
exports.buscarPeluquero = async (req,res) =>{
    try {
        let dataPeluquero=await Peluqueros.findOne({nombre:req.body.nombre});
        if(dataPeluquero){
            res.json({status:"success",dataPeluquero});
        }else{
            res.json({status:"error", msg:"No hay peluquero"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro el peluquero"});
    }
}

// buscando todos los Peluqueros
exports.selectPeluquero = async (req,res) =>{
    try {
        let dataPeluquero=await Peluqueros.find();
        if(dataPeluquero){
            res.json({status:"success", dataPeluquero});
        }else{
            res.json({status:"error", msg:"No hay Peluqueros"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontraron los peluqueros"});
    }
}

// actualizar un peluquero
exports.actualizarPeluquero = async (req,res) =>{
    try {
        let dataPeluquero=await Peluqueros.findOne({nombre:req.body.nombre});
        if(dataPeluquero){
            await Peluqueros.findOneAndUpdate(
                {_id : dataPeluquero._id}, {nombre : req.body.nuevoNombre,
                apellido : req.body.nuevoApellido,
                direccion: req.body.nuevoDireccion,
                telefono : req.body.nuevoTelefono}
            )
            res.json({status: 'success', msg:"Se actualizo el peluquero"});
        }else{
            res.json({status:"error",msg:"No se pudo actualizar el peluquero"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"ERROR al actualizar el peluquero"});
    }
}


// eliminar un Peluquero
exports.EliminarPeluquero = async (req,res) =>{
    try {
        let dataPeluquero=await Peluqueros.findOne({nombre:req.body.nombre});
        if(dataPeluquero){
            await Peluqueros.findOneAndDelete({_id : dataPeluquero._id})
            res.json({status: 'success', msg:"Se elimino Peluquero"});
        }else{
            res.json({status:"error",msg:"No se elimino las Peluquero"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"No se elimino la Peluquero"});
    }
}