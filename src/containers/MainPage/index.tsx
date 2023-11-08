import Link from 'next/link'

import { getArticles } from '@/src/services/articles'

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
