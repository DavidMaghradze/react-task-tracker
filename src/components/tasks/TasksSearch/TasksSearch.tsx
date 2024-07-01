import Input from 'components/ui/Input'
import styles from './TasksSearch.module.css'
import { useTasks } from 'providers/TasksProvider'

const TasksSearch = () => {
  const { searchTerm, setSearchTerm } = useTasks()

  return (
    <div className={styles.container}>
      <Input
        name="tasks-search"
        placeholder="Search for tasks..."
        className={styles.input}
        defaultValue={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
      />
    </div>
  )
}

export default TasksSearch
