const express = require('express');
const router = express.Router();

//controllers Api
const usuariosController = require('../controllers/usuariosController');

const categoriasController = require('../controllers/categoriasController');
const peluquerosController = require('../controllers/peluquerosController');
const productosController = require('../controllers/productosController');
const reservasController = require('../controllers/reservasController');
const clientesController = require('../controllers/clientesController');


module.exports = function() {
    
    //**********************/
        //RUTAS USUARIO
    //**********************/
    //Agregar Usuario 
    router.post('/new-usuario-data', usuariosController.nuevoUsuario);

    //validando Usuario 
    router.get('/join-usuario-data', usuariosController.validandoUsuario);


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

