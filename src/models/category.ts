import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
})

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
