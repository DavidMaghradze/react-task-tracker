import Modal from "components/ui/Button/Modal"
import { Modal as ModalType } from "providers/TasksProvider.types"
import TaskForm from "../TaskForm"
import { useTasks } from "providers/TasksProvider"
import type { Task } from "types/tasks.types"

const EditTaskModal = () => {
  const { currentTaskId, getTaskById } = useTasks()

  const task = getTaskById(currentTaskId) as Task

  return (
    <Modal
      title="Edit task" 
      modal={ModalType.EDIT_TASK}
      size="small"
    >
      <TaskForm initialValues={{ title: task?.title || '', description: task?.description || '' }} />
    </ Modal>
  )
}

export default EditTaskModal