import express from 'express'
import { product, productPage, newProduct, processNewProduct, editProduct, processEditProduct, deleteProduct } from '../controllers/product-controller.js'
const route = express.Router()

route.get('/newProduct', newProduct)

route.post('/newProduct', processNewProduct)

route.get('/editProduct/:id', editProduct)

route.post('/editProduct/:id', processEditProduct)

route.get('/deleteProduct/:id', deleteProduct)

route.get('/:id', productPage)

route.get('/', product)

export { route as productRoute }
