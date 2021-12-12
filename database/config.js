const mongoose = require('mongoose');

//const urlFinal="mongodb://localhost:27017/apiAngeles";

const dbConnection = async() =>{
    try {
        await mongoose.connect(urlFinal, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch (error){
        console.log(error);
        throw new Error("Error en la base de datos - Hable con el admin");
    }
}

module.exports = {
    dbConnection
}