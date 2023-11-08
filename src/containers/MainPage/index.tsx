import Link from 'next/link'

import GetArticlesResponseInterface from '@/src/interface/response/GetArticlesResponseInterface'
import { API_URL } from '@/src/constants/common'

const getArticles = async (): Promise<
  GetArticlesResponseInterface | undefined
> => {
  try {
    const res = await fetch(`${API_URL}/api/articles`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch articles')
    }

    return res.json()
  } catch (error) {
    console.log('Error loading articles:', error)
  }
}

const MainPage = async () => {
  const data = await getArticles()

  if (!data) return

  return (
    <main>
      {data.articles?.map(({ title, content, _id }, idx) => (
        <Link key={`${title}-${idx}`} href={`/${_id}`}>
          <div style={{ border: '1px solid black' }}>
            <div>{title}</div>
            <div>{content}</div>
          </div>
        </Link>
      ))}
    </main>
  )
}

export default MainPage
