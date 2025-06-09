import mongoose from 'mongoose'
mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id
    delete converted.__v
  }
})

const categorySchema = new mongoose.Schema({
  categoryName: String,
  imagePath: String
})

const productSchema = new mongoose.Schema({
  productName: String,
  imagePath: String,
  company: String,
  description: String,
  mssPath: String,
  mssPresent: Boolean,
  familyPath: String,
  categoryName: String,
  prodBlock: String
})

const Category = mongoose.model('category', categorySchema)
const Product = mongoose.model('product', productSchema)

export {
  Category,
  Product
}
