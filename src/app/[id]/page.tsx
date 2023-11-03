import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const getArticleById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`, { cache: 'no-store' })

    if (!res.ok) {
      throw new Error('Failed to fetch an article.')
    }

    return res.json()
  } catch (error) {
    console.log('error')
  }
}

export default async function ArticlePage({ params }: Params) {
  const { id } = params
  const data = await getArticleById(id)

  return <div>ArticlePage</div>
}
