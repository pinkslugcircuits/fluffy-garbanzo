import { Category } from '../models/database.js'

const getCategoryAll = () => Category.find()
const getCategoryById = id => Category.findById({ _id: id })
const createCategory = async (categoryName, imagePath) => {
  const category = new Category({ categoryName, imagePath })
  await category.save()
  return category
}
const updateCategoryById = async (id, categoryName, imagePath) => Category.findOneAndUpdate({ _id: id }, { categoryName, imagePath }, { new: false })
const deleteCategoryById = async (id) => Category.deleteOne({ _id: id })
export { getCategoryAll, getCategoryById, createCategory, updateCategoryById, deleteCategoryById }
