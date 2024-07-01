import { Task } from 'types/tasks.types'
import { TaskStatus } from './TasksFilters.types'

export const getTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  switch (status) {
    case TaskStatus.ALL:
      return tasks
    case TaskStatus.COMPLETED:
      return tasks.filter((task) => task.completed)
    case TaskStatus.INCOMPLETE:
      return tasks.filter((task) => !task.completed)
  }
}
