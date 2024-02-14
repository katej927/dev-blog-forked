import { GetCategoryByIdInterface } from '@/apis/categories'
import Link from 'next/link'
import dayjs from 'dayjs'

interface Props {
  category: GetCategoryByIdInterface
}

const EachCategory = ({ category: { categoryName, articles } }: Props) => {
  return (
    <section>
      <h1>{categoryName}</h1>
      {articles.length ? (
        <div>
          {articles.map(({ _id, title, createdAt }, idx) => (
            <Link key={_id} href={`/article/${_id}`}>
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
