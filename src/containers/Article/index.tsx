'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import { GetArticleInterface } from '@/apis/articles'

import DeleteButton from './DeleteButton'
import ArticleContent from '@/components/ArticleContent'

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
      <Link href={`article/edit/${_id}`}>수정</Link>
      <DeleteButton id={_id} />
      <div>수정 일자: {dayjs(updatedAt).format('YYYY-MM-DD')}</div>
      <div>
        내용: <ArticleContent contentHtml={html} />
      </div>
    </div>
  )
}

export default Article
