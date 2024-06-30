import { useState } from "react"
import { TaskFilters, TaskStatus } from "./TasksFilters.types"
import { useTasks } from "providers/TasksProvider"
import { getTasksByStatus } from "./TasksFilters.utils"
import { getItemFromLS } from "utils/localStorageUtils"
import { Task } from "types/tasks.types"

const useTasksFilters = () => {
  const { updateTasks } = useTasks()

  const [filters, setFilters] = useState<TaskFilters>({ status: { value: TaskStatus.ALL, label: 'All' } })

  const handleSubmit = () => {
    const allTasks: Task[] = Object.values(getItemFromLS('tasks'))
    const updatedTasks = getTasksByStatus(allTasks, filters.status.value!)
    updateTasks(updatedTasks)
  }

  return {
    filters,
    setFilters,
    handleSubmit
  }
  
}

export default useTasksFilters