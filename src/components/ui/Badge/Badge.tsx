import styles from './Badge.module.css'

interface BadgeProps {
  title: string
}

const Badge = ({ title }: BadgeProps) => (
  <div className={styles.badge}>
    {title}
  </div>
)

export default Badge