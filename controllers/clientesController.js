const Clientes = require('../models/Clientes');

// agrega un nuevo Cliente
exports.nuevoCliente = async (req,res) =>{
    try {
        let dataCliente = new Clientes({nombre:req.body.nombre, apellido:req.body.apellido, direccion:req.body.direccion, telefono:req.body.telefono  });
        let dataResponse=await dataCliente.save();
        res.json({status:"success",data:dataResponse});
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"Error al crear Peluquero"});
    }
}

// buscando una nuevo Cliente
exports.buscarCliente = async (req,res) =>{
    try {
        let dataCliente=await Clientes.findOne({nombre:req.body.nombre});
        if(dataCliente){
            res.json({status:"success", dataCliente});
        }else{
            res.json({status:"error", msg:"No hay peluquero"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro el peluquero"});
    }
}

// buscando todos los Clientes
exports.selectCliente = async (req,res) =>{
    try {
        let dataCliente=await Clientes.find();
        if(dataCliente){
            res.json({status:"success", dataCliente});
        }else{
            res.json({status:"error", msg:"No hay Clientes"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontraron los Clientes"});
    }
}

// actualizar un Cliente
exports.actualizarCliente = async (req,res) =>{
    try {
        let dataCliente=await Clientes.findOne({nombre:req.body.nombre});
        if(dataCliente){
            await Clientes.findOneAndUpdate(
                {_id : dataCliente._id}, {nombre : req.body.nuevoNombre,
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


// eliminar un Cliente
exports.EliminarCliente = async (req,res) =>{
    try {
        let dataCliente=await Clientes.findOne({nombre:req.body.nombre});
        if(dataCliente){
            await Clientes.findOneAndDelete({_id : dataCliente._id})
            res.json({status: 'success', msg:"Se elimino Peluquero"});
        }else{
            res.json({status:"error",msg:"No se elimino las Peluquero"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"No se elimino la Peluquero"});
    }
}