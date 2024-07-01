import React, { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { v4 as uuidv4 } from 'uuid'
import { addItemToLS, getItemFromLS } from 'utils/localStorageUtils'
import TasksProvider, { useTasks } from './TasksProvider'
import { Modal } from './TasksProvider.types'

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

// Mock localStorageUtils
jest.mock('utils/localStorageUtils', () => ({
  addItemToLS: jest.fn(),
  getItemFromLS: jest.fn(),
}))

interface WrapperProps {
  children: ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <TasksProvider>{children}</TasksProvider>
)

describe('TasksProvider', () => {
  beforeEach(() => {
    ;(getItemFromLS as jest.Mock).mockReturnValue({})
    ;(uuidv4 as jest.Mock).mockReturnValue('mock-uuid')
  })

  it('provides default values', () => {
    const { result } = renderHook(() => useTasks(), { wrapper: Wrapper })

    expect(result.current.tasks).toEqual([])
    expect(result.current.modalsOpened).toEqual({
      addTask: false,
      editTask: false,
      deleteTask: false,
    })
    expect(result.current.searchTerm).toBe('')
  })

  it('opens and closes modals', () => {
    const { result } = renderHook(() => useTasks(), { wrapper: Wrapper })

    act(() => {
      result.current.openModal(Modal.ADD_TASK)
    })

    expect(result.current.modalsOpened.addTask).toBe(true)

    act(() => {
      result.current.closeModal(Modal.ADD_TASK)
    })

    expect(result.current.modalsOpened.addTask).toBe(false)
  })

  it('handles adding a task', () => {
    const { result } = renderHook(() => useTasks(), { wrapper: Wrapper })

    const taskInput = { title: 'New Task', description: 'Description' }

    act(() => {
      result.current.handleAddTaskClick(taskInput)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toMatchObject(taskInput)
    expect(result.current.tasks[0].id).toBe('mock-uuid')
    expect(addItemToLS).toHaveBeenCalledWith('tasks', expect.any(String))
  })

  it('handles editing a task', () => {
    const initialTask = {
      id: '1',
      title: 'Old Task',
      description: 'Old Description',
      completed: false,
      order: 1,
    }

    ;(getItemFromLS as jest.Mock).mockReturnValue({ '1': initialTask })

    const { result } = renderHook(() => useTasks(), { wrapper: Wrapper })

    const taskInput = {
      title: 'Updated Task',
      description: 'Updated Description',
    }

    act(() => {
      result.current.handleEditTaskClick(taskInput, '1')
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toMatchObject(taskInput)
    expect(result.current.tasks[0].id).toBe('1')
    expect(addItemToLS).toHaveBeenCalledWith('tasks', expect.any(String))
  })

  it('handles deleting a task', () => {
    const initialTask = {
      id: '1',
      title: 'Task to be deleted',
      description: 'Description',
      completed: false,
      order: 1,
    }

    ;(getItemFromLS as jest.Mock).mockReturnValue({ '1': initialTask })

    const { result } = renderHook(() => useTasks(), { wrapper: Wrapper })

    act(() => {
      result.current.handleDeleteTaskClick('1')
    })

    expect(result.current.tasks).toHaveLength(0)
    expect(addItemToLS).toHaveBeenCalledWith('tasks', expect.any(String))
  })

  it('handles updating tasks', () => {
    const { result } = renderHook(() => useTasks(), { wrapper: Wrapper })

    const tasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        order: 1,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        completed: false,
        order: 2,
      },
    ]

    act(() => {
      result.current.updateTasks(tasks)
    })

    expect(result.current.tasks).toHaveLength(2)
    expect(result.current.tasks).toEqual(expect.arrayContaining(tasks))
  })
})
