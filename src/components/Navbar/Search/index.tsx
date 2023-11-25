'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

const Search = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    router.push(`/?q=${searchTerm}`)
  }, [searchTerm, router])

  const handleChangeSearchTerm = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setSearchTerm(value)

  return (
    <div>
      Search:
      <input
        placeholder="search article..."
        onChange={handleChangeSearchTerm}
      />
    </div>
  )
}

export default Search
