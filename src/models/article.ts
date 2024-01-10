import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema(
  {
    title: String,
    content: { text: String, html: String },
  },
  { timestamps: true },
)

const Article =
  mongoose.models.Article || mongoose.model('Article', articleSchema)

export default Article
