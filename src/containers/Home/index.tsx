import Link from 'next/link'

import { getArticles, GetArticlesResponseInterface } from '@/apis/articles'

const Home = async () => {
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

  return (
    <main>
      {data.articles?.map(({ title, content, _id }, idx) => (
        <Link key={`${title}-${idx}`} href={`/${_id}`}>
          <div style={{ border: '1px solid black' }}>
            <div>{title}</div>
            <div>{content?.text}</div>
          </div>
        </Link>
      ))}
    </main>
  )
}

export default Home
