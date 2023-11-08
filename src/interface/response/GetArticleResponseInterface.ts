import { ArticleInterface } from '../article'

export interface GetArticleInterface extends ArticleInterface {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export default interface GetArticleResponseInterface {
  article: GetArticleInterface
}
