'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import useDebounce from '@/hooks/useDebounce'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultSearchTerm = searchParams.get('q')

  const [searchTerm, setSearchTerm] = useState<string>(defaultSearchTerm ?? '')
  const debouncedSearchTerm = useDebounce(searchTerm)

  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

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
        value={searchTerm}
      />
    </div>
  )
}

export default Search
