import Link from 'next/link'
import dayjs from 'dayjs'
import { MdArrowForwardIos } from 'react-icons/md'
import classNames from 'classnames/bind'

import { GetCategoriesArticlesCountInterface } from '@/apis/categories'

import styles from './index.module.css'

interface Props {
  categories: GetCategoriesArticlesCountInterface[]
}

const cx = classNames.bind(styles)

const CategoryList = ({ categories }: Props) => {
  return (
    <section>
      {categories.length ? (
        <div className={cx('categoriesWrapper')}>
          {categories.map(
            ({ _id, categoryName, articleCount, latestArticleTimestamp }) => (
              <Link
                key={_id}
                href={`/category/${_id}`}
                className={cx('categoryItemLinkWrapper')}
              >
                <div className={cx('categoryItemWrapper')}>
                  <h4 className={cx('categoryItem', 'name')}>{categoryName}</h4>
                  <div>
                    <span>{articleCount}개의 아티클</span>
                    {latestArticleTimestamp && (
                      <>
                        <span className={cx('categoryItem', 'dot')}>·</span>
                        <time
                          className={cx('categoryItem', 'lastUpdatedAt')}
                          dateTime={latestArticleTimestamp}
                        >
                          마지막 업데이트 &nbsp;
                          {dayjs(latestArticleTimestamp).format('YYYY.MM.DD')}
                        </time>
                      </>
                    )}
                  </div>
                </div>
                <MdArrowForwardIos className={cx('arrow')} />
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
