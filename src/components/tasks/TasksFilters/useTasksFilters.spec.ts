import { renderHook, act } from '@testing-library/react-hooks'
import useTasksFilters from './useTasksFilters'
import { useTasks } from 'providers/TasksProvider'
import { getItemFromLS } from 'utils/localStorageUtils'
import { getTasksByStatus } from './TasksFilters.utils'
import { TaskStatus } from './TasksFilters.types'
import { Task } from 'types/tasks.types'

// Mock the dependencies
jest.mock('providers/TasksProvider')
jest.mock('utils/localStorageUtils')
jest.mock('./TasksFilters.utils')

const mockUseTasks = useTasks as jest.MockedFunction<typeof useTasks>
const mockGetItemFromLS = getItemFromLS as jest.MockedFunction<
  typeof getItemFromLS
>
const mockGetTasksByStatus = getTasksByStatus as jest.MockedFunction<
  typeof getTasksByStatus
>

describe('useTasksFilters', () => {
  const mockUpdateTasks = jest.fn()

  beforeEach(() => {
    mockUseTasks.mockReturnValue({
      tasks: [],
      modalsOpened: {
        addTask: false,
        editTask: false,
        deleteTask: false,
      },
      closeModal: jest.fn(),
      openModal: jest.fn(),
      handleAddTaskClick: jest.fn(),
      handleEditTaskClick: jest.fn(),
      handleDeleteTaskClick: jest.fn(),
      currentTaskId: '',
      setCurrentTaskId: jest.fn(),
      getTaskById: jest.fn(),
      updateTasks: mockUpdateTasks,
      searchTerm: '',
      setSearchTerm: jest.fn(),
    })

    // Reset mocks before each test
    jest.clearAllMocks()
  })

  it('should initialize filters correctly', () => {
    const { result } = renderHook(() => useTasksFilters())

    expect(result.current.filters).toEqual({
      status: { value: TaskStatus.ALL, label: 'All' },
    })
  })

  it('should update filters correctly', () => {
    const { result } = renderHook(() => useTasksFilters())

    act(() => {
      result.current.setFilters({
        status: { value: TaskStatus.COMPLETED, label: 'Completed' },
      })
    })

    expect(result.current.filters).toEqual({
      status: { value: TaskStatus.COMPLETED, label: 'Completed' },
    })
  })

  it('should call updateTasks with filtered tasks on handleSubmit', () => {
    const mockTasks: Task[] = [
      { id: '1', completed: true, order: 1, title: 'Task 1', description: '' },
      { id: '2', completed: false, order: 2, title: 'Task 2', description: '' },
    ]

    mockGetItemFromLS.mockReturnValueOnce({
      '1': mockTasks[0],
      '2': mockTasks[1],
    })

    mockGetTasksByStatus.mockReturnValueOnce([mockTasks[0]])

    const { result } = renderHook(() => useTasksFilters())

    act(() => {
      result.current.setFilters({
        status: { value: TaskStatus.COMPLETED, label: 'Completed' },
      })
    })

    act(() => {
      result.current.handleSubmit()
    })

    expect(mockGetItemFromLS).toHaveBeenCalledWith('tasks')
    expect(mockGetTasksByStatus).toHaveBeenCalledWith(
      mockTasks,
      TaskStatus.COMPLETED,
    )
    expect(mockUpdateTasks).toHaveBeenCalledWith([mockTasks[0]])
  })
})
