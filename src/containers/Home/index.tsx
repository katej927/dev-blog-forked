import Link from 'next/link'
import classNames from 'classnames/bind'

import { GetArticlesResponseInterface } from '@/apis/articles'

import Search from './Search'
import styles from './index.module.css'

const cx = classNames.bind(styles)

interface Props {
  articles: GetArticlesResponseInterface['articles'] | undefined
}

const Home = ({ articles }: Props) => {
  return (
    <main>
      <Search />
      {articles ? (
        <ul className={cx('articlesWrapper')}>
          {articles.map(({ title, _id }) => (
            <li style={{ border: '1px solid black' }}>
              <Link key={_id} href={`/article/${_id}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>작성된 글이 없습니다.</div>
      )}
    </main>
  )
}

export default Home
