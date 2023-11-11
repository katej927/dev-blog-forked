'use client'

import { useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

import { storage } from '@/src/Firebase'

import { formats, convertModules } from './_shared'

const Editor = () => {
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>()

  const imageHandler = () => {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', async () => {
      if (!quillRef.current || !input.files) {
        throw new Error('quillRef.current or input.files has no value')
      }

      const editor = quillRef.current.getEditor()
      const file = input.files[0]
      const range = editor.getSelection(true)
      try {
        // TODO: 이거 정리하기
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(storage, `image/${Date.now()}`)
        // // Firebase Method : uploadBytes, getDownloadURL
        // await uploadBytes(storageRef, file).then((snapshot) => {
        //   getDownloadURL(snapshot.ref).then((url) => {
        //     // 이미지 URL 에디터에 삽입
        //     editor.insertEmbed(range.index, 'image', url)
        //     // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
        //     editor.setSelection(range.index + 1)
        //   })
        // })

        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)

        // 이미지를 현재 커서 위치에 삽입
        editor.insertEmbed(editor.getSelection()?.index || 0, 'image', url)
      } catch (error) {
        console.log(error)
      }
    })
  }

  const modules = useMemo(() => convertModules(imageHandler), [])

  return (
    <>
      <button onClick={() => console.log(content)}>value</button>
      <div style={{ display: 'flex' }}>
        <ReactQuill
          theme="snow"
          style={{ height: '600px' }}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          ref={(element) => {
            if (element !== null) {
              quillRef.current = element
            }
          }}
          placeholder="내용을 입력해주세요."
        />
        <ReactQuill
          theme="bubble"
          readOnly
          value={content}
          style={{ width: '50%', height: '600px' }}
        />
      </div>
    </>
  )
}

export default Editor
