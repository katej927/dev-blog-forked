import dayjs from 'dayjs'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getArticleByIdAPI } from '@/services/articles'

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const data = await getArticleByIdAPI(id)

  if (!data) return notFound()
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
