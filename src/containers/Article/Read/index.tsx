import dayjs from 'dayjs'

import { GetDetailArticleInterface } from '@/apis/articles'

import EditButtons from './EditButtons'
import ArticleContent from '@/components/ArticleContent'
import Comments from './Comments'

interface Props {
  article: GetDetailArticleInterface
}

const Article = ({
  article: {
    title,
    _id,
    createdAt,
    updatedAt,
    content: { html },
  },
}: Props) => {
  return (
    <div>
      <h2>제목: {title}</h2>
      <EditButtons id={_id} />
      <div>생성 일자: {dayjs(createdAt).format('YYYY-MM-DD')}</div>
      <div>수정 일자: {dayjs(updatedAt).format('YYYY-MM-DD')}</div>
      <div>
        내용: <ArticleContent contentHtml={html} />
      </div>
      <Comments />
    </div>
  )
}

export default Article
