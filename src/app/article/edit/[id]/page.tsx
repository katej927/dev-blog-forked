import { notFound } from 'next/navigation'

import { getArticleById, GetArticleResponseInterface } from '@/apis/articles'
import ArticleEdit from '@/containers/Article/Edit'

const ArticleEditPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const loadedArticle = async (): Promise<
    GetArticleResponseInterface | undefined
  > => {
    try {
      const res = await getArticleById(id)

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const data = await loadedArticle()
  if (!data) return notFound()

  const { article } = data

  return <ArticleEdit article={article} />
}
export default ArticleEditPage
