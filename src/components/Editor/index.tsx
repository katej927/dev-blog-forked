'use client'

import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { formats, modules } from './_shared'

const Editor = () => {
  const [content, setContent] = useState('')
  const quillRef = useRef(null)
  // const quillRef = useRef()

  // const imageHandler = () => {
  //   const input = document.createElement('input')
  //   input.setAttribute('type', 'file')
  //   input.setAttribute('accept', 'image/*')
  //   input.click()
  //   input.addEventListener('change', async () => {
  //     const editor = quillRef.current.getEditor()
  //     const file = input.files[0]
  //     const range = editor.getSelection(true)
  //     try {
  //       // 파일명을 "image/Date.now()"로 저장
  //       const storageRef = ref(storage, `image/${Date.now()}`)
  //       // Firebase Method : uploadBytes, getDownloadURL
  //       await uploadBytes(storageRef, file).then((snapshot) => {
  //         getDownloadURL(snapshot.ref).then((url) => {
  //           // 이미지 URL 에디터에 삽입
  //           editor.insertEmbed(range.index, 'image', url)
  //           // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
  //           editor.setSelection(range.index + 1)
  //         })
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })
  // }

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
          ref={quillRef}
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
