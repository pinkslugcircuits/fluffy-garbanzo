import { Product } from '../models/database.js'

const getProductAll = () => Product.find()
const getProductById = id => Product.findById({ _id: id })
const createProduct = async (productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName) => {
  const product = new Product({ productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName })
  await product.save()
  return product
}
const updateProductById = async (id, productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName) => Product.findOneAndUpdate({ _id: id }, { productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName }, { new: false })
const deleteProductById = async (id) => Product.deleteOne({ _id: id })

export { getProductAll, getProductById, createProduct, updateProductById, deleteProductById }
