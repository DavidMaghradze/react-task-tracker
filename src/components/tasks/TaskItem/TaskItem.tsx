import type { Task } from 'types/tasks.types'
import styles from './TaskItem.module.css'
import Button from 'components/ui/Button'
import { CheckIcon, EditIcon, TrashIcon } from 'icons'
import { ButtonVariant } from 'components/ui/Button/Button.types'
import Badge from 'components/ui/Badge'
import { useTasks } from 'providers/TasksProvider'
import { Modal } from 'providers/TasksProvider.types'

interface TaskItemProps {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { openModal, setCurrentTaskId, handleEditTaskClick } = useTasks()

  return (
    <div className={styles.taskItem}>
      <header className={styles.header}>
        <div className="flex">
          <h2 className={styles.title}>{task?.title}</h2>
          {task.completed && <Badge title="Completed" />}
        </div>
        <div className={styles.actions}>
          {!task.completed && (
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={() => {
                handleEditTaskClick({ ...task, completed: true }, task.id)
              }}
            >
              <CheckIcon />
              Mark as complete
            </Button>
          )}
          <Button
            onClick={() => {
              openModal(Modal.EDIT_TASK)
              setCurrentTaskId(task.id)
            }}
          >
            <EditIcon />
            Edit
          </Button>
          <Button
            variant={ButtonVariant.DANGER}
            onClick={() => {
              openModal(Modal.DELETE_TASK)
              setCurrentTaskId(task.id)
            }}
          >
            <TrashIcon />
            Delete
          </Button>
        </div>
      </header>
      <article>{task?.description}</article>
    </div>
  )
}

export default TaskItem
