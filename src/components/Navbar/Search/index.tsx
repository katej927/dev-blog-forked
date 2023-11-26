'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

import useDebounce from '@/hooks/useDebounce'

const Search = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    router.push(`/${debouncedSearchTerm ? `?q=${debouncedSearchTerm}` : ''}`)
  }, [debouncedSearchTerm, router])

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
