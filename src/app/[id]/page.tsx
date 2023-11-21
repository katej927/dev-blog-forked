import { notFound } from 'next/navigation'

import { getArticleById } from '@/apis/articles'
import Article from '@/containers/Article'

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const getArticle = async () => {
    try {
      const res = await getArticleById(id)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const data = await getArticle()
  if (!data) return notFound()

  const { article } = data

  return <Article article={article} />
}
export default ArticlePage
