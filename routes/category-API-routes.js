import express from 'express'
import { getAllCategory, getOneCategory, newCategory, updateOneCategory, deleteOneCategory } from '../controllers/category-API-controller.js'
const route = express.Router()

route.get('/:id', getOneCategory)

route.put('/:id', updateOneCategory)

route.delete('/:id', deleteOneCategory)

route.post('/', newCategory)

route.get('/', getAllCategory)

export { route as categoryAPIRoute }
