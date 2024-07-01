import { ReactNode } from 'react'
import styles from './Button.module.css'
import { ButtonVariant } from './Button.types'

interface ButtonProps {
  children: ReactNode
  onClick: (e: React.FormEvent) => void
  variant?: ButtonVariant
  className?: string
}

const Button = ({
  children,
  onClick,
  variant = ButtonVariant.DEFAULT,
  className = '',
}: ButtonProps) => {
  const variantClassNames = styles[variant] || ''

  return (
    <button
      className={`${styles.button} ${variantClassNames} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
