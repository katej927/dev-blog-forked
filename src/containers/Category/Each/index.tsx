import Link from 'next/link'
import dayjs from 'dayjs'

import { GetCategoryByIdInterface } from '@/apis/categories'

import EachCategoryHeader from './Header'

import styles from './index.module.css'
import classNames from 'classnames/bind'

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
              <h2>{`${idx + 1}. ${title}`}</h2>
              <time dateTime={createdAt}>
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
