'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import styles from './index.module.css'
import classNames from 'classnames/bind'

import useDebounce from '@/hooks/useDebounce'

const cx = classNames.bind(styles)

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
    <search className={cx('wrapper')}>
      Search:
      <input
        placeholder="search article..."
        onChange={handleChangeSearchTerm}
        value={searchTerm}
      />
    </search>
  )
}

export default Search
