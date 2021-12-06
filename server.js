const express = require('express');
const routes = require('./routes');
const app = express();

//Cors permite que un cliente acceda para el intercambio de recursos
const cors = require('cors');

//conectar mongo
require('./database/config').dbConnection(); 

// habilitar bodyparser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// habilitar cors
app.use(cors());

//llamamos al router
app.use('/', routes());

// Carpeta publica
app.use(express.static('uploads'));

// Node Server
const server = require('http').createServer(app);

//Servidor Ejecución
server.listen(process.env.PORT || 5000, (err) => {
    console.log('Esta funcionando',5000);
})