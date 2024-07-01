import { useState } from 'react'
import styles from './TextArea.module.css'

interface TextAreaProps {
  name: string
  defaultValue?: string
  onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const TextArea = ({
  name,
  defaultValue,
  onChange,
  placeholder,
}: TextAreaProps) => {
  const [value, setValue] = useState(defaultValue)

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)

    if (onChange) onChange(e)
  }

  return (
    <textarea
      name={name}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={styles.textarea}
    />
  )
}

export default TextArea
