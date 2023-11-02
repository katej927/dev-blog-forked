export default function MainPage() {
  const getArticles = async () => {
    const res = await fetch(`http://localhost:3000/api/articles`, {
      method: 'GET',
    })
  }

  return <main>MainPage</main>
}
