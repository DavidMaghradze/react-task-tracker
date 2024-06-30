import TasksEmpty from "../TasksEmpty"
import AddTaskModal from "../AddTaskModal"
import { useTasks } from "providers/TasksProvider"
import { Modal } from "providers/TasksProvider.types"
import TaskItem from "../TaskItem"
import Button from "components/ui/Button"
import { ButtonVariant } from "components/ui/Button/Button.types"
import styles from './TaskList.module.css'
import EditTaskModal from "../EditTaskModal"
import DeleteTaskConfirmModal from "../DeleteTaskConfirmModal"
import TasksFilters from "../TasksFilters"
import TasksSearch from "../TasksSearch"
import useDebounce from "hooks/useDebounce"

const TasksList = () => {
  const { tasks, modalsOpened, openModal, searchTerm } = useTasks()
  const searchValue = useDebounce(searchTerm, 300)

  const filteredTasks = tasks.filter(({ title, description }) =>
    title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  )

  return (
    <div className="container">
      {tasks.length === 0 && <TasksEmpty />}
      {modalsOpened[Modal.ADD_TASK] && <AddTaskModal />}
      {modalsOpened[Modal.EDIT_TASK] && <EditTaskModal />}
      {modalsOpened[Modal.DELETE_TASK] && <DeleteTaskConfirmModal />}
      {tasks.length > 0 && (
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={() => openModal(Modal.ADD_TASK)}
          className={styles.newTaskBtn}
        >
          Add new task
        </Button>
      )}
      {tasks.length > 0 && (
        <>
          <TasksFilters />
          <TasksSearch />
        </>
      )}
      <div className={styles.taskList}>
        {filteredTasks.length > 0 && filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TasksList