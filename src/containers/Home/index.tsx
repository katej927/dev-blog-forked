import Link from 'next/link'

import { GetArticlesResponseInterface } from '@/apis/articles'

interface Props {
  data: GetArticlesResponseInterface
}

const Home = ({ data }: Props) => {
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
