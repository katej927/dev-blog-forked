import { MetadataRoute } from 'next'

import { DOMAIN } from '@/constants/common'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/src/app/article/edit/', '/src/app/article/write/'],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  }
}
