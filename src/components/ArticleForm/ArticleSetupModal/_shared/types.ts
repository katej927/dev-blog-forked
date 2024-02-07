import { CategoryInterface } from '@/apis/categories'

export type SelectedCategoryType = Pick<
  CategoryInterface,
  '_id' | 'categoryName'
> | null
