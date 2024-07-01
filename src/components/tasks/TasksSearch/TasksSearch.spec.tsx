import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TasksSearch from './TasksSearch'
import { useTasks } from 'providers/TasksProvider'

// Mock the useTasks hook
jest.mock('providers/TasksProvider', () => ({
  useTasks: jest.fn(),
}))

describe('TasksSearch', () => {
  it('renders the input with the correct default value', () => {
    const mockUseTasks = {
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
    }

    ;(useTasks as jest.Mock).mockReturnValue(mockUseTasks)

    render(<TasksSearch />)

    const input = screen.getByPlaceholderText('Search for tasks...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('test')
  })

  it('calls setSearchTerm on input change', () => {
    const mockUseTasks = {
      searchTerm: '',
      setSearchTerm: jest.fn(),
    }

    ;(useTasks as jest.Mock).mockReturnValue(mockUseTasks)

    render(<TasksSearch />)

    const input = screen.getByPlaceholderText('Search for tasks...')
    fireEvent.change(input, { target: { value: 'new task' } })

    expect(mockUseTasks.setSearchTerm).toHaveBeenCalledWith('new task')
  })
})
