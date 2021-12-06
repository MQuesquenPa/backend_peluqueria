const mongoose = require('mongoose');

//const urlFinal="mongodb://localhost:27017/apiAngeles";
// const urlFinal="mongodb+srv://root:root@cluster0.gobb5.mongodb.net/apiBilleteraMorris?retryWrites=true&w=majority";
const urlFinal="mongodb+srv://mquesquenpa3:Martin123456@cluster0.jw2qw.mongodb.net/Peluqueria?retryWrites=true&w=majority";

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