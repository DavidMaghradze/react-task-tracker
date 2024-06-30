export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  due_date?: Date
  order: number
}

export interface TaskInput {
  title: string
  description: string
  completed?: boolean
}