import Link from 'next/link'

import { GetArticleInterface } from '@/apis/articles'

import Search from './Search'

interface Props {
  data: GetArticleInterface[] | undefined
}

const Home = ({ data }: Props) => {
  return (
    <main>
      <Search />
      {data ? (
        data.map(({ title, content, _id }, idx) => (
          <Link key={`${title}-${idx}`} href={`/article/${_id}`}>
            <div style={{ border: '1px solid black' }}>
              <div>{title}</div>
              <div>{content?.text}</div>
            </div>
          </Link>
        ))
      ) : (
        <div>작성된 글이 없습니다.</div>
      )}
    </main>
  )
}

export default Home
