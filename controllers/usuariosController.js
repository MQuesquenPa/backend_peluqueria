const Usuarios= require('../models/Usuarios');
const Codigos= require('../models/Codigos');
const bcrypt = require('bcrypt');
var accountSid = "ACc2573987a3c3a0dc1c0fd9e32fd11686";
var authToken = "e9f1cc1bafd9a94f6693cd0ab45e8f97";
var twilio_number = "+14387939107";
var twilio = require('twilio')(accountSid,authToken);

//Generar un Código Aleatorio
const makeid=(lengthd)=>{
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < lengthd; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
  charactersLength)));
   }
   return result.join('');
}

// agrega un nuevo Usuario
exports.nuevoUsuario = async (req,res) =>{
    try {
        let codigoVerify= await Codigos.findOne({codigo:req.body.codigo,celular:req.body.telefono});
        if(codigoVerify){
            const userVerify= await Usuarios.findOne({telefono:req.body.telefono});
            req.body.password_reform=req.body.password;
            if(!userVerify){
                const usuario = new Usuarios(req.body);
                usuario.password = await bcrypt.hash(req.body.password, 8);
                
                const first = await usuario.save();
                res.json(first);
            }else{
                res.json({status:"error",msg:"El telefono ingresado esta siendo usado por otro usuario"});
            }
        }else{
            res.json({status:"error",msg:"El código ingresado no es válido"});
        }
    }catch(error){
        res.json({status:"error",msg:"Error al crear Usuario"});
    }
}

//autenticarUsuario
exports.autenticarUsuario = async(req,res) =>{
    //buscar el usuario
    const {email,password} = req.body;
    const usuario = await Usuarios.findOne({telefono: email});
    if(!usuario){
        res.json({status:"error",msg:"El telefono ingresado no esta asociado a ningun usuario."});
    }else{
        // el usuario existe, verifircar si el passoword es correcto o incorrecto
        if(!bcrypt.compareSync(password, usuario.password)){
            res.json({status:"error",msg:"La contraseña ingresada no es correcta."});
        }else{  
            res.json(usuario);
        }
    }
}

exports.recoverPassword = async(req,res) =>{
    try{
    //buscar el usuario
    const {email} = req.body;
    const usuario = await Usuarios.findOne({telefono: email});
    if(!usuario){
        res.json({status:"error",msg:"El teléfono ingresado no esta asociado a ningun usuario."});
    }else{
        let codigoGenerated=makeid(7);
        await Usuarios.findOneAndUpdate({_id : usuario._id}, {codigo_recuperacion:codigoGenerated}, {
            new: true
        });

        let MessageFinalNotification="Tú codigo de recuperación para restablecer tu contraseña es "+codigoGenerated;
  
        await twilio.messages.create({
            to: "+51"+usuario.telefono,
            from:twilio_number,
            body:MessageFinalNotification
        });

      res.json({status:"success",msg:"Se envio el código al usuario."});
    }
    }catch(e){
        if(e.status==400){
            res.json({status:"success",msg:"Se envio el código al usuario por correo, pero su teléfono no es válido."});
        }else{
            res.json({status:"error",msg:"Ocurrió un error interno intentalo nuevamente más tarde."});
        }  
    }
}

exports.verifyCodeRecover=async(req,res)=>{
    let codigo=req.body.code;
    let email=req.body.email;
    try{
        const usuario = await Usuarios.findOne({telefono: email,codigo_recuperacion:codigo});
        if(usuario){
          res.json({status:"success",msg:"El Código ingresado es correcto."});
        }else{
          res.json({status:"error",msg:"El código ingresado es incorrecto."});
        }
    }catch(e){
    res.json({status:"error",msg:"Ocurrió un error interno intentalo nuevamente más tarde."});
    }
}

exports.UpdatePasswordRecover=async(req,res)=>{
    let clave=req.body.password;
    let email=req.body.email;
    try{
        clave = await bcrypt.hash(clave, 8); 
        await Usuarios.findOneAndUpdate({telefono : email}, {password:clave}, {
            new: true
        });
        res.json({status:"success",msg:"La Contraseña fue actualizada correctamente."});
    }catch(e){
        res.json({status:"error",msg:"Ocurrió un error interno intentalo nuevamente más tarde."});
    }
}

//Actualizar los datos del usuario
exports.actualizarDatosUsuario = async(req, res)=>{
    try{
       const usuarios = await Usuarios.findOneAndUpdate({_id : req.params.idUsuario}, req.body, {
        new: true
       });
        if(usuarios){
            res.json({status:"success"});
        }else{
            res.json({status:"error"});
        }
    }catch(error){
        res.json({status:"error"});
    }
}

//Actualizar contraseña del usuario
exports.actualizarPassword = async(req, res)=>{
    //buscar el usuario
    const {passwordAntigua,passwordNueva} = req.body;
    const usuario = await Usuarios.findOne({_id: req.params.idUsuario});
    if(!bcrypt.compareSync(passwordAntigua, usuario.password)){
        res.json(2);
    }else{
        usuario.password=await bcrypt.hash(passwordNueva, 8);
        await usuario.save();
        res.json(1);  
    }
}

//Devolver Usuario por id
exports.traerPerfilUsuario = async(req,res)=>{
    try{
        const usuario = await Usuarios.findOne({_id : req.params.idUsuario}).select('saldo ganancias');
        if(usuario){
            res.json(usuario);
        }else{
            res.json({saldo:0});
        }
    }catch{
        res.json({saldo:0});
    }
}

//Devolver Datos de Configuración Usuario
exports.traerPerfilUsuarioConfiguracion = async(req,res)=>{
    try{
        const usuario = await Usuarios.findOne({_id : req.params.idUsuario}).select('dataInfo ganancias');
        if(usuario){
            res.json(usuario);
        }else{
            res.json({dataInfo:null});
        }
    }catch{
        res.json({dataInfo:null});
    }
}

//Mostar Usuarios Celular
exports.verifyUsersExists = async(req,res)=>{
    try{
        let usuarios = await Usuarios.find({telefono: {$in: req.body.telefonos}}).select('telefono');
        res.json(usuarios);
    }catch(e){
        console.log(e);
        res.json([]);
    }
}

//Devolver Usuario por celular
exports.traerPerfilUsuarioTelefono = async(req,res)=>{
    try{
        const usuario = await Usuarios.findOne({telefono : req.body.telefono}).select('nombres');
        res.json(usuario);
    }catch{
        res.json({status:"error"});
    }
}

//Crear Cpodigo
exports.crearMetodoMensajeTransferencia= async(req, res)=>{
    try{
        let codigoGenerated=makeid(5);
        let usuarioData= await Usuarios.findOne({_id:req.body.id});
        if(usuarioData){
            if(usuarioData.saldo>=req.body.monto){
                await Usuarios.findOneAndUpdate({_id : req.body.id},{password_reform:codigoGenerated});
                let MessageFinalNotification="Tú codigo de confirmación para la operación es "+codigoGenerated;
  
                await twilio.messages.create({
                    to: "+51"+usuarioData.telefono,
                    from:twilio_number,
                    body:MessageFinalNotification
                });
                res.json({status:"success",msg:"El Mensaje fue enviado al celular"})
            }else{
                res.json({status:"error",msg:"El Monto ingresado es mayor al tuyo."});
            }
        }else{
            res.json({status:"error",msg:"El usuario enviado no se encuentra disponible"});
        }
    }catch(error){
        console.log(error);
        res.json({status:"error",msg:"Ocurrió un error interno, inténtalo nuevamente."});
    }
}