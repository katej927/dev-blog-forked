'use client'

import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = () => {
  const [content, setContent] = useState('')

  return (
    <div>
      <ReactQuill
        theme="snow"
        style={{ height: '600px' }}
        value={content}
        onChange={setContent}
      />
    </div>
  )
}

export default Editor
