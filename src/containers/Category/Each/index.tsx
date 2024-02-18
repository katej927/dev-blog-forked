import Link from 'next/link'
import dayjs from 'dayjs'

import { GetCategoryByIdInterface } from '@/apis/categories'

import EachCategoryHeader from './Header'

interface Props {
  category: GetCategoryByIdInterface
}

const EachCategory = ({ category: { _id, categoryName, articles } }: Props) => {
  return (
    <section>
      <h1>{categoryName}</h1>
      <EachCategoryHeader categoryId={_id} />

      {articles.length ? (
        <div>
          {articles.map(({ _id: articleId, title, createdAt }, idx) => (
            <Link key={articleId} href={`/article/${_id}`}>
              <h2>{`${idx + 1}. ${title}`}</h2>
              <div>{dayjs(createdAt).format('YYYY-MM-DD')}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div>글이 없습니다.</div>
      )}
    </section>
  )
}

export default EachCategory
