import dayjs from 'dayjs'
import Link from 'next/link'

import { GetArticleInterface } from '@/apis/articles'

import EditButtons from './EditButtons'
import ArticleContent from '@/components/ArticleContent'
import Comments from './Comments'

interface Props {
  article: GetArticleInterface
}

const Article = ({
  article: {
    title,
    _id,
    updatedAt,
    content: { html },
  },
}: Props) => {
  return (
    <div>
      <h2>제목: {title}</h2>
      <EditButtons id={_id} />
      <div>수정 일자: {dayjs(updatedAt).format('YYYY-MM-DD')}</div>
      <div>
        내용: <ArticleContent contentHtml={html} />
      </div>
      <Comments />
    </div>
  )
}

export default Article
