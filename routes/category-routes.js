import express from 'express'
import { category, newCategory, processNewCategory, editCategory, processEditCategory, deleteCategory, showCategory } from '../controllers/category-controller.js'
const route = express.Router()

route.get('/newCategory', newCategory)

route.post('/newCategory', processNewCategory)

route.get('/editCategory/:id', editCategory)

route.post('/editCategory/:id', processEditCategory)

route.get('/deleteCategory/:id', deleteCategory)

route.get('/:id', showCategory)

route.get('/', category)

export { route as categoryRoute }
