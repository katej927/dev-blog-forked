import GetArticleResponseInterface from '@/src/interface/response/GetArticleResponseInterface'
import Article from '@/src/containers/Article'

const getArticleById = async (
  id: string,
): Promise<GetArticleResponseInterface | undefined> => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch an article.')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const data = await getArticleById(id)

  if (!data) return
  const { article } = data

  return <Article article={article} />
}
export default ArticlePage
