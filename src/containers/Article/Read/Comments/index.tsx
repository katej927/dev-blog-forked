'use client'

import React, { useEffect, useRef } from 'react'

import { COMMENT_ATTRIBUTES } from './_shared'

const Comments = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')

    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    for (const [type, value] of Object.entries(COMMENT_ATTRIBUTES)) {
      scriptElem.setAttribute(type, value)
    }

    ref.current.appendChild(scriptElem)
  }, [])

  return (
    <section>
      Comments
      <section ref={ref} />
    </section>
  )
}

export default Comments
