import Link from 'next/link'

import { getArticlesAPI } from '@/apis/articles'

const MainPage = async () => {
  const data = await getArticlesAPI()

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
