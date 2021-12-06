const express = require('express');
const router = express.Router();

//controllers Api
const usuarioController = require('../controllers/usuariosController');
const codigoController = require('../controllers/codigosController');
const operacionesController = require('../controllers/operacionesController');
const categoriasController = require('../controllers/categoriasController');
const peluquerosController = require('../controllers/peluquerosController');
const productosController = require('../controllers/productosController');
const reservasController = require('../controllers/reservasController');



module.exports = function() {
    //**********************/
        //RUTAS USUARIO
    //**********************/
    //Agregar Usuarios registro normal
    router.post('/crear-cuenta',usuarioController.nuevoUsuario);
    
    //Autenticar Usuarios
    router.post('/autenticar',usuarioController.autenticarUsuario);

    //Recuperar Contraseña Usuarios
    router.post('/recover-password',usuarioController.recoverPassword);

    //Válidar Codigo de Recuperación
    router.post('/verify-code-data',usuarioController.verifyCodeRecover);
    
    //Actualizar Contraseña del Usuario
    router.post('/update-password-with-code',usuarioController.UpdatePasswordRecover);

    //Crear Nuevo Código
    router.post('/new-code-register',codigoController.nuevoCodigo);

    //Obtener Data Usuario
    router.get('/get-data-saldo/:idUsuario',usuarioController.traerPerfilUsuario);

    //Verificar Contacos con el aplicativo
    router.post('/get-user-verify-app',usuarioController.verifyUsersExists);

    //Verificar Contacos con el aplicativo
    router.post('/get-user-by-phone',usuarioController.traerPerfilUsuarioTelefono);
    
    //Se Genera el Código y validación
    router.post('/create-code-user-send',usuarioController.crearMetodoMensajeTransferencia);

    //Nueva Operación
    router.post('/new-operation-send',operacionesController.nuevoEnvio);

    //**********************/
        //RUTAS CATEGORIA
    //**********************/

    //Agregar Categoría 
    router.post('/new-category-data',categoriasController.nuevaCategoria);

    //Obtener Categoría
    router.post('/get-category-by-name',categoriasController.buscarCategoria);

    //Actualizar Categoría
    router.post('/update-category-by-name',categoriasController.actualizarCategoria);

    //Eliminar Categoría
    router.post('/delete-category-by-name',categoriasController.EliminarCategoria);

    //seleccionar all Categoría
    router.get('/select-category-by-name',categoriasController.selectCategoria);
    
    //**********************/
        //RUTAS PELUQUERO
    //**********************/

     //Agregar PELUQUERO 
     router.post('/new-peluquero-data',peluquerosController.nuevoPeluquero);

     //Obtener PELUQUERO
     router.post('/get-peluquero-by-name', peluquerosController.buscarPeluquero);
 
     //Actualizar PELUQUERO
     router.post('/update-peluquero-by-name', peluquerosController.actualizarPeluquero);
 
     //Eliminar PELUQUERO
     router.post('/delete-peluquero-by-name', peluquerosController.EliminarPeluquero);
 
     //seleccionar all PELUQUERO
     router.get('/select-peluquero-by-name', peluquerosController.selectPeluquero);
  
     //**********************/
        //RUTAS CLIENTES
    //**********************/

     //Agregar CLIENTES 
     router.post('/new-cliente-data', clientesController.nuevoCliente);

     //Obtener CLIENTES
     router.post('/get-cliente-by-name', clientesController.buscarCliente);
 
     //Actualizar CLIENTES
     router.post('/update-cliente-by-name', clientesController.actualizarCliente);
 
     //Eliminar CLIENTES
     router.post('/delete-cliente-by-name', clientesController.EliminarCliente);
 
     //seleccionar all CLIENTES
     router.get('/select-cliente-by-name', clientesController.selectCliente);
  
   //**********************/
        //RUTAS PRODUCTOS
    //**********************/

     //Agregar PRODUCTO 
     router.post('/new-producto-data',productosController.nuevoProducto);

     //Obtener PRODUCTO
     router.post('/get-producto-by-name', productosController.buscarProducto);
 
     //Actualizar PRODUCTO
     router.post('/update-producto-by-name', productosController.actualizarProducto);
 
     //Eliminar PRODUCTO
     router.post('/delete-producto-by-name', productosController.EliminarProducto);
 
     //seleccionar all PRODUCTOS
     router.get('/select-producto-by-name', productosController.selectProducto);


   //**********************/
        //RUTAS RESERVAS
    //**********************/

     //Agregar RESERVA 
     router.post('/new-reserva-data', reservasController.nuevoReserva);

     //Obtener RESERVA
     router.post('/get-reserva-by-name', reservasController.buscarReserva);
 
     //Actualizar RESERVA
     router.post('/update-reserva-by-name', reservasController.actualizarReserva);
 
     //Eliminar RESERVA
     router.post('/delete-reserva-by-name', reservasController.EliminarReserva);
 
     //seleccionar all RESERVA
     router.get('/select-reserva-by-name', reservasController.selectReserva);


    return router;
}

