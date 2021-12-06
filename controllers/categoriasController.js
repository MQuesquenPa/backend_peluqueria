const Categorias = require('../models/Categorias');


// agrega una nueva Categoria
exports.nuevaCategoria = async (req,res) =>{
    try {
        let dataCategoria= new Categorias({nombre:req.body.nombre});
        let dataResponse=await dataCategoria.save();
        res.json({status:"success",data:dataResponse});
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"Error al crear Categoria"});
    }
}

// buscando una nueva Categoria
exports.buscarCategoria = async (req,res) =>{
    try {
        let dataCategoria=await Categorias.findOne({nombre:req.body.nombre});
        if(dataCategoria){
            res.json(dataCategoria);
        }else{
            res.json({status:"error", msg:"No hay categorias"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro la categoria"});
    }
}

// buscando todas Categoria
exports.selectCategoria = async (req,res) =>{
    try {
        let dataCategoria=await Categorias.find();
        if(dataCategoria){
            res.json({status:"success", dataCategoria});
        }else{
            res.json({status:"error", msg:"No hay categorias"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro la categoria"});
    }
}


// actualizar una nueva Categoria
exports.actualizarCategoria = async (req,res) =>{
    try {
        let dataCategoria=await Categorias.findOne({nombre:req.body.nombre});
        if(dataCategoria){
            await Categorias.findOneAndUpdate({_id : dataCategoria._id}, {nombre : req.body.nuevonombre})
            res.json({status: 'success', msg:"Se actualizo categoria"});
        }else{
            res.json({status:"error",msg:"No se actualizo categorias"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"No se actualizo la categoria"});
    }
}

// eliminar una nueva Categoria
exports.EliminarCategoria = async (req,res) =>{
    try {
        let dataCategoria=await Categorias.findOne({nombre:req.body.nombre});
        if(dataCategoria){
            await Categorias.findOneAndDelete({_id : dataCategoria._id})
            res.json({status: 'success', msg:"Se elimino categoria"});
        }else{
            res.json({status:"error",msg:"No se elimino las categorias"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"No se elimino la categoria"});
    }
}