import Button from "components/ui/Button"
import { ButtonVariant } from "components/ui/Button/Button.types"
import Modal from "components/ui/Button/Modal"
import { useTasks } from "providers/TasksProvider"
import { Modal as ModalType } from "providers/TasksProvider.types"
import styles from './DeleteTaskConfirmModal.module.css'

const DeleteTaskConfirmModal = () => {
  const { closeModal, handleDeleteTaskClick, currentTaskId } = useTasks()

  return (
    <Modal
      modal={ModalType.DELETE_TASK}
      title="Are you sure you want to delete this post?"
      size="small"
    >
      <div className={styles.footer}>
        <Button onClick={() => closeModal(ModalType.DELETE_TASK)}>
          Cancel
        </Button>
        <Button variant={ButtonVariant.DANGER} onClick={() => {
          handleDeleteTaskClick(currentTaskId)
          closeModal(ModalType.DELETE_TASK)
        }}>
          Yes, Delete
        </Button>
      </div> 
    </Modal>
  )
}

export default DeleteTaskConfirmModal