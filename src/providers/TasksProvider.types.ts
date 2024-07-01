import type { Task, TaskInput } from 'types/tasks.types'

export interface TasksState {
  [key: string]: Task
}

export enum Modal {
  ADD_TASK = 'addTask',
  EDIT_TASK = 'editTask',
  DELETE_TASK = 'deleteTask',
}

export interface ModalsState {
  [Modal.ADD_TASK]: boolean
  [Modal.EDIT_TASK]: boolean
  [Modal.DELETE_TASK]: boolean
}

export interface TasksContextResponse {
  tasks: Task[]
  modalsOpened: ModalsState
  closeModal: (modal: Modal) => void
  openModal: (modal: Modal) => void
  handleAddTaskClick: (taskInput: TaskInput) => void
  handleEditTaskClick: (taskInput: TaskInput, taskId: string) => void
  handleDeleteTaskClick: (taskId: string) => void
  currentTaskId: string
  setCurrentTaskId: (taskId: string) => void
  getTaskById: (id: string) => Task | {}
  updateTasks: (tasks: Task[]) => void
  searchTerm: string
  setSearchTerm: (value: string) => void
}
