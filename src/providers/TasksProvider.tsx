import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addItemToLS, getItemFromLS } from 'utils/localStorageUtils'

import type {
  Modal,
  ModalsState,
  TasksContextResponse,
  TasksState,
} from './TasksProvider.types'
import type { Task, TaskInput } from 'types/tasks.types'

const TasksContext = createContext<TasksContextResponse>({
  tasks: [],
  modalsOpened: {
    addTask: false,
    editTask: false,
    deleteTask: false,
  },
  closeModal: () => {},
  openModal: () => {},
  handleAddTaskClick: () => {},
  handleEditTaskClick: () => {},
  handleDeleteTaskClick: () => {},
  currentTaskId: '',
  setCurrentTaskId: () => {},
  getTaskById: () => ({}),
  updateTasks: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
})

export const useTasks = () => useContext<TasksContextResponse>(TasksContext)

interface TasksProviderProps {
  children: ReactNode
}

const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<TasksState>(getItemFromLS('tasks') || {})
  const [modalsOpened, setModalsOpened] = useState<ModalsState>({
    addTask: false,
    editTask: false,
    deleteTask: false,
  })
  const [currentTaskId, setCurrentTaskId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const tasksList = useMemo(() => Object.values(tasks), [tasks])

  const openModal = (modal: Modal) => {
    setModalsOpened((currentModalsOpened) => ({
      ...currentModalsOpened,
      [modal]: true,
    }))
  }

  const closeModal = (modal: Modal) =>
    setModalsOpened((currentModalsOpened) => ({
      ...currentModalsOpened,
      [modal]: false,
    }))

  const handleAddTaskClick = useCallback(
    (taskInput: TaskInput) => {
      const taskId = uuidv4()
      const updatedTasks = {
        [taskId]: {
          id: taskId,
          completed: false,
          order: tasksList.length + 1,
          ...taskInput,
        },
        ...tasks,
      }
      setTasks(updatedTasks)
      addItemToLS('tasks', JSON.stringify(updatedTasks))
    },
    [tasks, tasksList.length],
  )

  const handleEditTaskClick = useCallback(
    (taskInput: TaskInput, taskId: string) => {
      const updatedTasks = { ...tasks }
      const taskToUpdate = updatedTasks[taskId]
      updatedTasks[taskId] = {
        ...taskToUpdate,
        ...taskInput,
      }
      setTasks(updatedTasks)
      addItemToLS('tasks', JSON.stringify(updatedTasks))
    },
    [tasks],
  )

  const handleDeleteTaskClick = useCallback(
    (taskId: string) => {
      const updatedTasks = { ...tasks }

      if (updatedTasks[taskId]) {
        delete updatedTasks[taskId]
      }

      setTasks(updatedTasks)
      addItemToLS('tasks', JSON.stringify(updatedTasks))
    },
    [tasks],
  )

  const updateTasks = useCallback((tasks: Task[]) => {
    const updatedTasks: TasksState = {}

    tasks.forEach((task) => {
      updatedTasks[task.id] = task
    })
    setTasks(updatedTasks)
  }, [])

  const getTaskById = (id: string) => tasks[id]

  const value = {
    tasks: tasksList,
    modalsOpened,
    openModal,
    closeModal,
    handleAddTaskClick,
    handleEditTaskClick,
    handleDeleteTaskClick,
    currentTaskId,
    setCurrentTaskId,
    getTaskById,
    updateTasks,
    searchTerm,
    setSearchTerm,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export default TasksProvider
