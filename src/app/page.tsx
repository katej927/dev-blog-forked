import {
  GetArticlesResponseInterface,
  getArticles,
} from '@/apis/articles/route'
import Home from '@/containers/Home'

const HomePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { q: searchTerm } = searchParams

  const loadedArticles = async (): Promise<
    GetArticlesResponseInterface | undefined
  > => {
    try {
      const res = await getArticles(searchTerm)

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
