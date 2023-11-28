'use client'

import React, { useEffect, useRef } from 'react'

const Comments = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')

    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', 'katej927/dev-blog-forked')
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKg1Esw')
    scriptElem.setAttribute('data-category', 'Comments')
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKg1Es84CbSIt')
    scriptElem.setAttribute('data-mapping', 'pathname')
    scriptElem.setAttribute('data-strict', '0')
    scriptElem.setAttribute('data-reactions-enabled', '1')
    scriptElem.setAttribute('data-emit-metadata', '1')
    scriptElem.setAttribute('data-input-position', 'top')
    scriptElem.setAttribute('data-theme', 'preferred_color_scheme')
    scriptElem.setAttribute('data-lang', 'en')

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
