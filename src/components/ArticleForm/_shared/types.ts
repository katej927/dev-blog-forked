import { ArticleInterface } from '@/apis/articles'

export type ArticleTitleContentType = Pick<
  ArticleInterface,
  'title' | 'content'
>

export interface ArticleFormProps extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

export type NewTitleType = ArticleInterface['title']
export type NewContentType = ArticleInterface['content']

export type HandleChangeNewContentType = Pick<NewContentType, 'html' | 'text'>
