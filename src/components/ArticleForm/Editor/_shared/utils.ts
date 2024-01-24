import { ImageResize } from 'quill-image-resize-module-ts'
import ReactQuill, { Quill } from 'react-quill'
import { storage } from '@/Firebase'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

import { TOOL_BARS } from './constants'
import { MutableRefObject } from 'react'
Quill.register('modules/ImageResize', ImageResize)

const imageHandler = (quillRef: MutableRefObject<ReactQuill | undefined>) => {
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

export const convertModules = (
  quillRef: MutableRefObject<ReactQuill | undefined>,
) => ({
  toolbar: {
    container: TOOL_BARS,
    handlers: {
      image: () => imageHandler(quillRef),
    },
  },
  ImageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
})
