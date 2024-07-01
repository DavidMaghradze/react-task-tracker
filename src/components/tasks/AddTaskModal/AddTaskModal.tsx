import Modal from 'components/ui/Modal'
import { Modal as ModalType } from 'providers/TasksProvider.types'
import TaskForm from '../TaskForm'

const AddTaskModal = () => {
  return (
    <Modal title="Add new task" modal={ModalType.ADD_TASK} size="small">
      <TaskForm />
    </Modal>
  )
}

export default AddTaskModal
