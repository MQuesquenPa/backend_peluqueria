const Reservas = require('../models/Reservas');

// agrega un nuevo Reservas
exports.nuevoReserva = async (req,res) =>{
    try {
        let dataReserva= new Reservas({descripcion:req.body.descripcion,fecha:req.body.fecha, alias:req.body.alias,precio:req.body.precio,idPeluquero:req.body.idPeluquero});
        let dataResponse=await dataReserva.save();
        res.json({status:"success",data:dataResponse});
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"Error al realizar la Reserva"});
    }
}

// buscando una nuevo Reserva
exports.buscarReserva = async (req,res) =>{
    try {
        let dataReserva=await Reservas.findOne({alias:req.body.alias});
        if(dataReserva){
            res.json(dataReserva);
        }else{
            res.json({status:"error", msg:"No hay Reserva"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro el Reserva"});
    }
}

// buscando todos los Reservas
exports.selectReserva = async (req,res) =>{
    try {
        let dataReserva=await Reservas.find();
        if(dataReserva){
            res.json({status:"success", dataReserva});
        }else{
            res.json({status:"error", msg:"No hay Reservas"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro el Reserva"});
    }
}

// actualizar un Reserva
exports.actualizarReserva = async (req,res) =>{
    try {
        let dataReserva=await Reservas.findOne({alias:req.body.alias});
        if(dataReserva){
            await Reservas.findOneAndUpdate(
                {_id : dataReserva._id}, {
                    descripcion:req.body.descripcion, 
                    fecha:req.body.fecha, alias:req.body.alias,
                    precio:req.body.precio,  idPeluquero:req.body.idPeluquero 
                }
            )
            res.json({status: 'success', msg:"Se actualizo correctamente el Reserva"});
        }else{
            res.json({status:"error",msg:"Hubo un error al actualizar el Reserva"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"ERROR No se actualizo el Reserva"});
    }
}


// eliminar un Reserva
exports.EliminarReserva = async (req,res) =>{
    try {
        let dataReserva=await Reservas.findOne({alias:req.body.alias});
        if(dataReserva){
            await Reservas.findOneAndDelete({_id : dataReserva._id})
            res.json({status: 'success', msg:"Se elimino Reserva"});
        }else{
            res.json({status:"error",msg:"No se elimino las Reserva"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"No se elimino el Reserva"});
    }
}