import Link from 'next/link'
import classNames from 'classnames/bind'

import { GetArticlesResponseInterface } from '@/apis/articles'

import Search from './Search'
import styles from './index.module.css'
import dayjs from 'dayjs'

const cx = classNames.bind(styles)

interface Props {
  articles: GetArticlesResponseInterface['articles'] | undefined
}

const Home = ({ articles }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('searchWrapper')}>
        <Search />
      </div>
      {articles ? (
        <ul className={cx('articlesWrapper')}>
          {articles.map(({ title, _id, createdAt }) => (
            <li key={_id} className={cx('articleWrapper')}>
              <Link href={`/article/${_id}`}>
                <h2 className={cx('articleTitle')}>{title}</h2>
                <time dateTime={createdAt} className={cx('articleTime')}>
                  {dayjs(createdAt).format('YYYY.MM.DD')}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>작성된 글이 없습니다.</div>
      )}
    </div>
  )
}

export default Home
