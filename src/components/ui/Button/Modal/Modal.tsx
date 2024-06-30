import { createPortal } from "react-dom"
import styles from './Modal.module.css'

import type { ReactNode } from "react"
import { CloseIcon } from "icons"
import Button from "../Button"
import { ButtonVariant } from "../Button.types"
import { useTasks } from "providers/TasksProvider"
import { Modal as ModalType } from "providers/TasksProvider.types"
import useOutsideClick from "hooks/useOutsideClick"

interface ModalProps {
  children: ReactNode
  title: string
  modal: ModalType
  size?: 'small' | 'default'
}

const Modal = ({ children, title, modal, size = 'default' } : ModalProps) => {
  const { closeModal } = useTasks()

  const handleOnCloseClick = () => closeModal(modal)

  const ref = useOutsideClick(() => closeModal(modal))

  return createPortal(<div className={styles.modal}>
    <div ref={ref} className={`${styles.content} ${styles[size]}`}>
      <header className={styles.header}>
        <h3>{title}</h3>
        <Button variant={ButtonVariant.TRANSPARENT} onClick={handleOnCloseClick}>
          <CloseIcon />
        </Button>
      </header>
      <section>
        {children}
      </section>
    </div>
  </div>, document.body)
}

export default Modal