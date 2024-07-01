import { Modal as ModalType } from 'providers/TasksProvider.types'
import Button from '../../ui/Button'
import { ButtonVariant } from '../../ui/Button/Button.types'
import styles from './TasksEmpty.module.css'
import { useTasks } from 'providers/TasksProvider'

const TasksEmpty = () => {
  const { openModal } = useTasks()

  return (
    <div className={styles.tasksEmpty}>
      <span>No tasks found</span>
      <div>
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={() => openModal(ModalType.ADD_TASK)}
        >
          Add new task
        </Button>
      </div>
    </div>
  )
}

export default TasksEmpty
