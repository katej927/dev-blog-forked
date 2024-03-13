import dayjs from 'dayjs'

import { GetDetailArticleInterface } from '@/apis/articles'
import classNames from 'classnames/bind'

import EditButtons from './EditButtons'
import ArticleContent from '@/components/ArticleContent'
import Comments from './Comments'

import styles from './index.module.css'

interface Props {
  article: GetDetailArticleInterface
}

const cx = classNames.bind(styles)

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
    <article>
      <header>
        <h1 className={cx('title')}>{title}</h1>
        <section className={cx('infoWrapper')}>
          <time dateTime={createdAt} className={cx('createdAt')}>
            {dayjs(createdAt).format('YYYY.MM.DD')}
          </time>
          <EditButtons id={_id} />
        </section>
      </header>
      <div className={cx('contentWrapper')}>
        <ArticleContent contentHtml={html} />
      </div>
      <Comments />
    </article>
  )
}

export default Article
