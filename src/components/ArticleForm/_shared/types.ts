import {
  DetailArticleCategoryIdInterface,
  DetailArticleCategoryNameInterface,
} from '@/apis/articles'

export interface Props extends DetailArticleCategoryNameInterface {
  onSubmit: (article: DetailArticleCategoryIdInterface) => Promise<void>
}

export type NewTitleType = DetailArticleCategoryNameInterface['title']
export type NewContentType = DetailArticleCategoryNameInterface['content']

export type HandleChangeNewContentType = Pick<NewContentType, 'html' | 'text'>
