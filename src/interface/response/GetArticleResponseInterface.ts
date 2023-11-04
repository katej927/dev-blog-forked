export interface GetArticleInterface {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  __v: number
}

export default interface GetArticleResponseInterface {
  article: GetArticleInterface
}
