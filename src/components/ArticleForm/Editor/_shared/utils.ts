import { TOOL_BARS } from './constants'

export const convertModules = (imageHandler: () => void) => ({
  toolbar: {
    container: TOOL_BARS,
    handlers: {
      image: imageHandler,
    },
  },
})
