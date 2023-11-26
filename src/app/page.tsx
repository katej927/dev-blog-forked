import { GetArticlesResponseInterface, getArticles } from '@/apis/articles'
import Home from '@/containers/Home'

const HomePage = async () => {
  const loadedArticles = async (): Promise<
    GetArticlesResponseInterface | undefined
  > => {
    try {
      const res = await getArticles()

      if (!res.ok) {
        throw new Error('Failed to fetch articles')
      }

      return res.json()
    } catch (error) {
      console.log('Error loading articles:', error)
    }
  }
  const data = await loadedArticles()

  if (!data) return

  return <Home data={data} />
}

export default HomePage
