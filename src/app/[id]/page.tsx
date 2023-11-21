import { notFound } from 'next/navigation'

import { fetchArticleById } from '@/apis/articles'
import Article from '@/containers/Article'

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const getArticleById = async () => {
    try {
      const res = await fetchArticleById(id)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const data = await getArticleById()
  if (!data) return notFound()

  const { article } = data

  return <Article article={article} />
}
export default ArticlePage
