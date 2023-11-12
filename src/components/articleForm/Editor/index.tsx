'use client'

import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

import { storage } from '@/Firebase'
import { ArticleInterface } from '@/apis/articles'

import { formats, convertModules } from './_shared'

interface Props {
  contentHtml: ArticleInterface['content']['html']
  onChangeContent: (value: ArticleInterface['content']) => void
}

const Editor = ({ contentHtml, onChangeContent }: Props) => {
  const quillRef = useRef<ReactQuill>()

  const imageHandler = () => {}

  const modules = useMemo(() => convertModules(imageHandler), [])

  return (
    <ReactQuill
      theme="snow"
      style={{ height: '600px' }}
      onChange={(value, delta, source, editor) =>
        onChangeContent({ text: editor.getText(), html: editor.getHTML() })
      }
      modules={modules}
      formats={formats}
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element
        }
      }}
      placeholder="내용을 입력해주세요."
      value={contentHtml}
    />
  )
}

export default Editor
