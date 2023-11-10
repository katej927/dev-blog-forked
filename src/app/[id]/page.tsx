import { notFound } from 'next/navigation'

import Article from '@/containers/Article'
import { getArticleByIdAPI } from '@/apis/articles'

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const data = await getArticleByIdAPI(id)

  if (!data) return notFound()
  const { article } = data

  return <Article article={article} />
}
export default ArticlePage
