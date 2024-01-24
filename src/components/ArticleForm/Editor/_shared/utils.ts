import { ImageResize } from 'quill-image-resize-module-ts'
import { Quill } from 'react-quill'

import { TOOL_BARS } from './constants'
Quill.register('modules/ImageResize', ImageResize)

export const convertModules = (imageHandler: () => void) => ({
  toolbar: {
    container: TOOL_BARS,
    handlers: {
      image: imageHandler,
    },
  },
  ImageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
})
