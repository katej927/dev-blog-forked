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
    <main className={cx('wrapper')}>
      <Search />
      {articles ? (
        <ul className={cx('articlesWrapper')}>
          {articles.map(({ title, _id, createdAt }) => (
            <li key={_id} style={{ border: '1px solid black' }}>
              <Link href={`/article/${_id}`}>
                <h2>{title}</h2>
                <time dateTime={createdAt}>{createdAt}</time>
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
