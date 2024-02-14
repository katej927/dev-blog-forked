import dayjs from 'dayjs'

import { GetCategoriesArticlesCountInterface } from '@/apis/categories'

interface Props {
  categories: GetCategoriesArticlesCountInterface[]
}

const Categories = ({ categories }: Props) => {
  return (
    <section>
      {categories.length ? (
        <div>
          {categories.map(
            ({ _id, categoryName, articleCount, latestArticleTimestamp }) => (
              <div key={_id}>
                <h4>{categoryName}</h4>
                <div>
                  <span>{articleCount}개의 포스트</span>
                  {latestArticleTimestamp && (
                    <span>
                      마지막 업데이트
                      {dayjs(latestArticleTimestamp).format('YYYY-MM-DD')}
                    </span>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div>아직 카테고리가 없습니다.</div>
      )}
    </section>
  )
}

export default Categories
