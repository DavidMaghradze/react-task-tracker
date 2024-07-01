import TasksEmpty from '../TasksEmpty'
import AddTaskModal from '../AddTaskModal'
import { useTasks } from 'providers/TasksProvider'
import { Modal } from 'providers/TasksProvider.types'
import TaskItem from '../TaskItem'
import Button from 'components/ui/Button'
import { ButtonVariant } from 'components/ui/Button/Button.types'
import styles from './TaskList.module.css'
import EditTaskModal from '../EditTaskModal'
import DeleteTaskConfirmModal from '../DeleteTaskConfirmModal'
import TasksFilters from '../TasksFilters'
import TasksSearch from '../TasksSearch'
import useDebounce from 'hooks/useDebounce'
import { useMemo } from 'react'

const TasksList = () => {
  const { tasks, modalsOpened, openModal, searchTerm } = useTasks()
  const searchValue = useDebounce(searchTerm, 300)

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        ({ title, description }) =>
          title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          description
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()),
      ),
    [searchValue, tasks],
  )

  return (
    <div className={`container ${styles.taskListContainer}`}>
      {modalsOpened[Modal.ADD_TASK] && <AddTaskModal />}
      {modalsOpened[Modal.EDIT_TASK] && <EditTaskModal />}
      {modalsOpened[Modal.DELETE_TASK] && <DeleteTaskConfirmModal />}
      {tasks.length > 0 && (
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={() => openModal(Modal.ADD_TASK)}
          className={styles.addNewTaskBtn}
        >
          Add new task
        </Button>
      )}
      <TasksFilters />
      <TasksSearch />
      <div className={styles.taskList}>
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)}
        {tasks.length === 0 && <TasksEmpty />}
      </div>
    </div>
  )
}

export default TasksList
