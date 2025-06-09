import { getProductAll, getProductById, createProduct, updateProductById, deleteProductById } from '../models/model-product.js'

const getAllProduct = async (req, res, next) => {
  const products = await getProductAll()
  res.json(products)
}

const getOneProduct = async (req, res, next) => {
  const id = req.params.id
  const storedProduct = await getProductById(id)
  if (!storedProduct) {
    res.sendStatus(404)
  } else {
    res.json(storedProduct)
  }
}

const newProduct = async (req, res, next) => {
  const { productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName, prodBlock } = req.body
  if (!productName) {
    res.sendStatus(400)
    return
  }
  const newProduct = await createProduct(productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName, prodBlock)
  res.status(201).json(newProduct)
}

const updateOneProduct = async (req, res, next) => {
  const { productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName, prodBlock } = req.body
  const id = req.params.id
  if (!productName) {
    res.sendStatus(400)
    return
  }
  const storedProduct = await getProductById(id)
  if (!storedProduct) {
    res.sendStatus(404)
    return
  }
  await updateProductById(id, productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName,  prodBlock)
  res.status(200)
}

const deleteOneProduct = async (req, res, next) => {
  const id = req.params.id
  console.log(id)
  const storedProduct = await getProductById(id)
  if (!storedProduct) {
    res.sendStatus(404)
    return
  }
  await deleteProductById(id)
  res.status(200)
}

export { getAllProduct, getOneProduct, newProduct, updateOneProduct, deleteOneProduct }
