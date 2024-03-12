import Link from 'next/link'
import dayjs from 'dayjs'

import { GetCategoriesArticlesCountInterface } from '@/apis/categories'

import styles from './index.module.css'
import classNames from 'classnames/bind'

interface Props {
  categories: GetCategoriesArticlesCountInterface[]
}

const cx = classNames.bind(styles)

const CategoryList = ({ categories }: Props) => {
  return (
    <section>
      {categories.length ? (
        <div>
          {categories.map(
            ({ _id, categoryName, articleCount, latestArticleTimestamp }) => (
              <Link key={_id} href={`/category/${_id}`}>
                <h4>{categoryName}</h4>
                <div>
                  <span>{articleCount}개의 아티클</span>
                  {latestArticleTimestamp && (
                    <>
                      <span className={cx('categoryItem', 'dot')}>·</span>
                      <span className={cx('categoryItem', 'lastUpdatedAt')}>
                        마지막 업데이트 &nbsp;
                        {dayjs(latestArticleTimestamp).format('YYYY.MM.DD')}
                      </span>
                    </>
                  )}
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div>아직 카테고리가 없습니다.</div>
      )}
    </section>
  )
}

export default CategoryList
