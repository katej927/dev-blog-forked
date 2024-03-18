'use client'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { ArticleContentInterface } from '@/apis/articles'

interface Props {
  contentHtml: ArticleContentInterface['html']
  style?: {}
}

const ArticleContent = ({ contentHtml, style }: Props) => {
  return (
    <ReactQuill theme="bubble" value={contentHtml} readOnly style={style} />
  )
}

export default ArticleContent
