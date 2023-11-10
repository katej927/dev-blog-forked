import dayjs from 'dayjs'

import { GetArticleInterface } from '@/apis/articles'

import DeleteButton from './DeleteButton'

interface Props {
  article: GetArticleInterface
}

const Article = ({ article: { title, _id, updatedAt, content } }: Props) => {
  return (
    <div>
      <h2>제목: {title}</h2>
      <DeleteButton id={_id} />
      <div>수정 일자: {dayjs(updatedAt).format('YYYY-MM-DD')}</div>
      <div>내용: {content}</div>
    </div>
  )
}

export default Article
