import { getCategoryAll, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } from '../models/model-category.js'

const getAllCategory = async (req, res, next) => {
  const categories = await getCategoryAll()
  res.json(categories)
}

const getOneCategory = async (req, res, next) => {
  const id = req.params.id
  const storedCategory = await getCategoryById(id)
  if (!storedCategory) {
    res.sendStatus(404)
  } else {
    res.json(storedCategory)
  }
}

const newCategory = async (req, res, next) => {
  const { categoryName, imagePath } = req.body
  if (!categoryName) {
    res.sendStatus(400)
    return
  }
  const newCategory = await createCategory(categoryName, imagePath)
  res.status(201).json(newCategory)
}

const updateOneCategory = async (req, res, next) => {
  const { categoryName, imagePath } = req.body
  const id = req.params.id
  if (!categoryName) {
    res.sendStatus(400)
    return
  }
  const storedCategory = await getCategoryById(id)
  if (!storedCategory) {
    res.sendStatus(404)
    return
  }
  await updateCategoryById(id, categoryName, imagePath)
  res.status(200)
}

const deleteOneCategory = async (req, res, next) => {
  const id = req.params.id
  const storedCategory = await getCategoryById(id)
  if (!storedCategory) {
    res.sendStatus(404)
    return
  }
  await deleteCategoryById(id)
  res.status(200)
}

export { getAllCategory, getOneCategory, newCategory, updateOneCategory, deleteOneCategory }
