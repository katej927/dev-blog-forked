import mongoose, { Schema } from 'mongoose'

const articleContentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
})

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: {
      type: Schema.Types.ObjectId,
      ref: 'ArticleContent',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
)

const ArticleContent =
  mongoose.models.ArticleContent ||
  mongoose.model('ArticleContent', articleContentSchema)

const Article =
  mongoose.models.Article || mongoose.model('Article', articleSchema)

export { Article, ArticleContent }
