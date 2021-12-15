const Productos = require('../models/Productos');
const Fotos = require('../models/Fotos');
const multer = require('multer');
const shortid = require('shortid');

const URL_SERVER_BASE="http://192.168.1.3:5000/";
//Configuración Multer
const configuracionMulter = {
    storage : fileStorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file ,cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    })
}

//pasar la configuracion y el campo 
const upload = multer(configuracionMulter).single('foto');

//Sube un Archivo
exports.subirArchivo = (req, res ,next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error});
        }
        return next();
    })
}

// agrega una nueva foto
exports.nuevoFoto = async (req,res) =>{
    try{
        let dataFoto= new Fotos({ imagen:URL_SERVER_BASE+req.file.filename});
        let dataResponse=await dataFoto.save();
        res.json({status:"success",data:dataResponse});
    }catch(e){  
        console.log(e);
        res.json({status:"error",msg:"Error al agregar la Foto"});
    }
}

// Seleccionando todas las fotos
exports.selectFotos  = async (req,res) =>{
    try {
        let dataFoto=await Fotos.find();
        if(dataFoto){
            res.json({status:"success", dataFoto});
        }else{
            res.json({status:"error", msg:"No hay Fotos"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontraron las fotos"});
    }
}

// agrega un nuevo producto
exports.nuevoProducto = async (req,res) =>{
    try{
        let dataProducto= new Productos({nombre:req.body.nombre, 
            descripcion:req.body.descripcion, stock:req.body.stock,
             precio:req.body.precio, imagen:URL_SERVER_BASE+req.file.filename, idCategoria:req.body.categoria});
        let dataResponse=await dataProducto.save();
        res.json({status:"success",data:dataResponse});
    }catch(e){  
        console.log(e);
        res.json({status:"error",msg:"Error al crear el Producto"});
    }
}

// buscando una nuevo producto
exports.buscarProducto = async (req,res) =>{
    try {
        let dataProducto=await Productos.findOne({nombre:req.body.nombre});
        if(dataProducto){
            res.json(dataProducto);
        }else{
            res.json({status:"error", msg:"No hay Producto"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro el Producto"});
    }
}

// buscando todos los productos
exports.selectProducto = async (req,res) =>{
    try {
        let dataProducto=await Productos.find();
        if(dataProducto){
            res.json({status:"success", dataProducto});
        }else{
            res.json({status:"error", msg:"No hay Productos"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error", msg:"No se encontro el Producto"});
    }
}

// actualizar un Producto
exports.actualizarProducto = async (req,res) =>{
    try {
        let dataProducto=await Productos.findOne({nombre:req.body.nombre});
        if(dataProducto){
            await Productos.findOneAndUpdate(
                {_id : dataProducto._id},
                {
                nombre : req.body.nuevoNombre,
                descripcion : req.body.nuevoDescripcion,
                stock: req.body.nuevoStock,
                precio: req.body.nuevoPrecio,
                imagen: req.body.nuevoImagen,
                idCategoria:req.body.nuevoidCategoria
                }
            )
            res.json({status: 'success', msg:"Se actualizo correctamente el producto"});
        }else{
            res.json({status:"error",msg:"Hubo un error al actualizar el producto"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"ERROR No se actualizo el producto"});
    }
}


// eliminar un Producto
exports.EliminarProducto = async (req,res) =>{
    try {
        let dataProducto=await Productos.findOne({nombre:req.body.nombre});
        if(dataProducto){
            await Productos.findOneAndDelete({_id : dataProducto._id})
            res.json({status: 'success', msg:"Se elimino Producto"});
        }else{
            res.json({status:"error",msg:"No se elimino las Producto"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"No se elimino el Producto"});
    }
}