import { ArticleInterface } from '@/apis/articles'

export interface Props extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

export type NewTitleType = ArticleInterface['title']
export type NewContentType = ArticleInterface['content']

export type HandleChangeNewContentType = Pick<NewContentType, 'html' | 'text'>
