import {
  ArticleDetailInterface,
  DetailArticleCategoryIdInterface,
  DetailArticleCategoryNameInterface,
} from '@/apis/articles'

export interface Props extends DetailArticleCategoryNameInterface {
  onSubmit: (article: DetailArticleCategoryIdInterface) => Promise<void>
}

export type NewTitleType = ArticleDetailInterface['title']
export type NewContentType = ArticleDetailInterface['content']

export type HandleChangeNewContentType = Pick<NewContentType, 'html' | 'text'>
