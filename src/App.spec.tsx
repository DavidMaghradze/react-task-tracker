import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const headerElement = screen.getByTestId('header')
  const mainElement = screen.getByTestId('main')

  expect(headerElement).toBeInTheDocument()
  expect(mainElement).toBeInTheDocument()
})
