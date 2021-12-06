const Codigos= require('../models/Codigos');
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
exports.nuevoCodigo = async (req,res) =>{
    const codigoData= new Codigos(req.body);
    codigoData.codigo =makeid(5);
    try {
        await Codigos.deleteMany({celular:req.body.celular});
        const codigoResponse = await codigoData.save();
        let MessageFinalNotification="Tú codigo de registro es "+codigoResponse.codigo;

        await twilio.messages.create({
            to: "+51"+req.body.celular,
            from:twilio_number,
            body:MessageFinalNotification
        });
        res.json(codigoResponse);
    }catch(err){
        if(err.status==400){
            res.json({status:"error",msg:"El celular ingresado no es válido."});
        }else{
            res.json({status:"error",msg:"Error al crear código, intentalo nuevamente"});
        }
    }
}