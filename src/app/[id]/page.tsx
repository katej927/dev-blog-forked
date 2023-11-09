import dayjs from 'dayjs'
import Link from 'next/link'

import { getArticleById } from '@/services/articles'

import NotFound from '../not-found'

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const data = await getArticleById(id)

  if (!data) return <NotFound />
  const {
    article: { _id, title, content, updatedAt },
  } = data

  return (
    <div>
      <h2>제목: {title}</h2>
      <Link href={`editArticle/${_id}`}>수정</Link>
      <div>수정 일자: {dayjs(updatedAt).format('YYYY-MM-DD')}</div>
      <div>내용: {content}</div>
    </div>
  )
}
export default ArticlePage
