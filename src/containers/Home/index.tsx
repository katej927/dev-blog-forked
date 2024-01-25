import Link from 'next/link'

import { GetArticleInterface } from '@/apis/articles'

import Search from './Search'

interface Props {
  articles: GetArticleInterface[] | undefined
}

const Home = ({ articles }: Props) => {
  return (
    <main>
      <Search />
      {articles ? (
        articles.map(({ title, _id }) => (
          <Link key={_id} href={`/article/${_id}`}>
            <div style={{ border: '1px solid black' }}>
              <div>{title}</div>
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
