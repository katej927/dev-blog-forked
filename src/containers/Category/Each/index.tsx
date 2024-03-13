import Link from 'next/link'
import dayjs from 'dayjs'
import classNames from 'classnames/bind'

import { GetCategoryByIdInterface } from '@/apis/categories'

import EachCategoryHeader from './Header'
import styles from './index.module.css'

interface Props {
  category: GetCategoryByIdInterface
}

const cx = classNames.bind(styles)

const EachCategory = ({ category: { _id, categoryName, articles } }: Props) => {
  return (
    <section>
      <EachCategoryHeader initCategoryName={categoryName} categoryId={_id} />

      {articles.length ? (
        <article>
          {articles.map(({ _id: articleId, title, createdAt }, idx) => (
            <Link
              key={articleId}
              href={`/article/${articleId}`}
              className={cx('articleWrapper')}
            >
              <h2 className={cx('article', 'title')}>{`${
                idx + 1
              }. ${title}`}</h2>
              <time dateTime={createdAt} className={cx('article', 'time')}>
                {dayjs(createdAt).format('YYYY.MM.DD')}
              </time>
            </Link>
          ))}
        </article>
      ) : (
        <div>글이 없습니다.</div>
      )}
    </section>
  )
}

export default EachCategory
