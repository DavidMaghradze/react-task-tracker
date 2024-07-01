import { getTasksByStatus } from './TasksFilters.utils'
import { Task } from 'types/tasks.types'
import { TaskStatus } from './TasksFilters.types'

describe('getTasksByStatus', () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      completed: true,
      order: 1,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      completed: false,
      order: 2,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      completed: true,
      order: 3,
    },
    {
      id: '4',
      title: 'Task 4',
      description: 'Description 4',
      completed: false,
      order: 4,
    },
  ]

  it('returns all tasks when status is ALL', () => {
    const result = getTasksByStatus(tasks, TaskStatus.ALL)
    expect(result).toEqual(tasks)
  })

  it('returns only completed tasks when status is COMPLETED', () => {
    const result = getTasksByStatus(tasks, TaskStatus.COMPLETED)
    const expectedTasks = tasks.filter((task) => task.completed)
    expect(result).toEqual(expectedTasks)
  })

  it('returns only incomplete tasks when status is INCOMPLETE', () => {
    const result = getTasksByStatus(tasks, TaskStatus.INCOMPLETE)
    const expectedTasks = tasks.filter((task) => !task.completed)
    expect(result).toEqual(expectedTasks)
  })
})
