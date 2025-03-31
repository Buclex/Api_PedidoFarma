import express from "express";
import {crearProducto,obtenerProducto,obtenerProductos, eliminarProducto} from "../controller/productsController.js"
import { uploadFuntion,handleUpload } from "../controller/uploadController.js";

const router = express.Router()

// get all products
router.get('/catalogo', obtenerProductos)

// get id product
router.get('/:id', obtenerProducto)

// create product
router.post('/create', crearProducto)

// update product
// router.post('/:id')

// delete product
router.delete('/:id', eliminarProducto)


/* multer */
//  upload file
router.post('/upload', uploadFuntion, handleUpload)

export default router