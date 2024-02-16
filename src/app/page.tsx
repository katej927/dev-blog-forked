import { GetArticlesResponseInterface, getArticles } from '@/apis/articles'
import Home from '@/containers/Home'

const HomePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { q: searchTerm } = searchParams

  const loadedArticles = async (): Promise<
    GetArticlesResponseInterface['articles'] | undefined
  > => {
    try {
      const res = await getArticles(searchTerm)

      if (!res.ok) {
        throw new Error('Failed to fetch articles')
      }

      const { articles }: GetArticlesResponseInterface = await res.json()

      if (!articles.length) return undefined

      return articles
    } catch (error) {
      console.log('Error loading articles:', error)
    }
  }
  const articles = await loadedArticles()

  return <Home articles={articles} />
}

export default HomePage
