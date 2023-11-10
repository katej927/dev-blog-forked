'use client'

import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { formats, modules } from './_shared'

const Editor = () => {
  const [content, setContent] = useState('')
  const quillRef = useRef(null)

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
