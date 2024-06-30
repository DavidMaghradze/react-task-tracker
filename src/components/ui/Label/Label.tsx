import styles from './Label.module.css'

interface LabelProps {
  text: string
}

const Label = ({ text }: LabelProps) => (
  <span className={styles.label}>{text}</span>
)

export default Label