import { toolbars } from './constants'

export const convertModules = (imageHandler: () => void) => ({
  toolbar: {
    container: toolbars,
    handlers: {
      image: imageHandler,
    },
  },
})
