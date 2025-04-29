import express from 'express'
import { getAllProduct, getOneProduct, newProduct, updateOneProduct, deleteOneProduct } from '../controllers/product-API-controller.js'
const route = express.Router()

route.get('/', getAllProduct)

route.get('/:id', getOneProduct)

route.post('/', newProduct)

route.put('/:id', updateOneProduct)

route.delete('/:id', deleteOneProduct)

export { route as productAPIRoute }
