import { useState } from 'react'
import styles from './Input.module.css'

interface InputProps {
  name: string
  defaultValue?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

const Input = ({
  name,
  defaultValue = '',
  onChange,
  placeholder = '',
  className,
}: InputProps) => {
  const [value, setValue] = useState(defaultValue)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)

    if (onChange) onChange(e)
  }

  return (
    <input
      name={name}
      value={value}
      onChange={handleInputChange}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
      autoFocus
    />
  )
}

export default Input
