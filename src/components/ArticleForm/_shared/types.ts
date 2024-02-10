import { ArticleDetailInterface } from '@/apis/articles'

export type ArticleTitleContentType = Pick<
  ArticleDetailInterface,
  'title' | 'content'
>

export interface ArticleFormProps extends ArticleDetailInterface {
  onSubmit: (article: ArticleDetailInterface) => Promise<void>
}

export type NewTitleType = ArticleDetailInterface['title']
export type NewContentType = ArticleDetailInterface['content']

export type HandleChangeNewContentType = Pick<NewContentType, 'html' | 'text'>
