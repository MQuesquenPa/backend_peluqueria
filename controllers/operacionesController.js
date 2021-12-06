const Operaciones= require('../models/Operaciones');
const Usuarios= require('../models/Usuarios');
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

// agrega un nuevo Código
exports.nuevoEnvio = async (req,res) =>{
    try {
        let userCreate=await Usuarios.findOne({_id:req.body.userCreate});
        let userSend=await Usuarios.findOne({_id:req.body.userSend});

        if(userCreate.password_reform==req.body.codigoSended){
            let dataOperacion= new Operaciones(req.body);
            let dataResponseFinal=await dataOperacion.save();
            await Usuarios.findByIdAndUpdate({_id:req.body.userCreate},{$inc: {saldo: -req.body.monto}});
            await Usuarios.findByIdAndUpdate({_id:req.body.userSend},{$inc: {saldo: req.body.monto}});
            
            let MessageFinalNotification=userCreate.nombres+" te realizo un envío de S/ "+req.body.monto+".";
    
            await twilio.messages.create({
                to: "+51"+userSend.telefono,
                from:twilio_number,
                body:MessageFinalNotification
            });
            res.json({status:"success",dataSend:dataResponseFinal});
        }else{
            res.json({status:"error",msg:"El código de confirmación no es válido"});
        }
    }catch(err){
        if(err.status==400){
            res.json({status:"success",msg:"Operación realizada correctamente."});
        }else{
            res.json({status:"error",msg:"Error al crear código, intentalo nuevamente"});
        }
    }
}