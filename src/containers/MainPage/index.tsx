import GetArticlesResponseInterface from '@/src/interface/response/GetArticlesResponseInterface'

const getArticles = async (): Promise<GetArticlesResponseInterface | undefined> => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch articles')
    }

    return res.json()
  } catch (error) {
    console.log('Error loading articles:', error)
  }
}

export default async function MainPage() {
  const data = await getArticles()

  if (!data) return

  return (
    <main>
      {data.articles?.map(({ title, content }, idx) => (
        <div key={`${title}-${idx}`} style={{ border: '1px solid black' }}>
          <div>{title}</div>
          <div>{content}</div>
        </div>
      ))}
    </main>
  )
}
