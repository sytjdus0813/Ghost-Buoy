import { useState } from 'react'
import iconSearch from '../assets/save/icon-search.svg'
import iconArrow from '../assets/save/icon-arrow.svg'
import styles from './SearchBar.module.css'

type Props = { placeholder: string; onSearch?: (q: string) => void }

/** Figma: search (18:11227) */
export default function SearchBar({ placeholder, onSearch }: Props) {
  const [q, setQ] = useState('')
  return (
    <form
      className={styles.search}
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.(q)
      }}
    >
      <img src={iconSearch} width={20} height={20} alt="" />
      <input
        className={styles.input}
        value={q}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => {
          setQ(e.target.value)
          onSearch?.(e.target.value)
        }}
      />
      <button type="submit" className={styles.go} aria-label="검색">
        <img src={iconArrow} width={18} height={18} alt="" />
      </button>
    </form>
  )
}
