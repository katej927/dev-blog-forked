'use client'

import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

import { ArticleInterface } from '@/apis/articles'
import { storage } from '@/Firebase'

import { FORMATS, convertModules } from './_shared'
import { HandleChangeNewContentType } from '../_shared'

interface Props {
  contentHtml: ArticleInterface['content']['html']
  onChangeContent: (content: HandleChangeNewContentType) => void
}

const Editor = ({ contentHtml, onChangeContent }: Props) => {
  const quillRef = useRef<ReactQuill>()

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.addEventListener('change', () => {
      ;(async () => {
        if (!quillRef?.current || input.files === null) return

        const editor = quillRef.current.getEditor()
        const file = input.files[0]
        const range = editor.getSelection(true)

        try {
          /**
           * 파일명을 "image/Date.now()"로 저장
           */
          const storageRef = ref(storage, `image/${Date.now()}`)

          /**
           * Firebase Method : uploadBytes, getDownloadURL
           */

          const snapShot = await uploadBytes(storageRef, file)
          const url = await getDownloadURL(snapShot.ref)

          /**
           * 이미지 URL 에디터에 삽입
           */
          editor.insertEmbed(range.index, 'image', url)
          /**
           * URL 삽입 후 커서를 이미지 뒷 칸으로 이동
           */
          editor.setSelection(range.index + 1, 0)
        } catch (error) {
          console.log(error)
        }
      })()
    })
  }

  const modules = useMemo(() => convertModules(imageHandler), [])

  return (
    <ReactQuill
      theme="snow"
      style={{ height: '600px' }}
      onChange={(value, delta, source, editor) =>
        onChangeContent({
          text: editor.getText(),
          html: editor.getHTML(),
        })
      }
      modules={modules}
      formats={FORMATS}
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
