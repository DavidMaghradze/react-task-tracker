import { addItemToLS, getItemFromLS } from './localStorageUtils'

describe('localStorageUtils', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should add item to localStorage', () => {
    const key = 'testKey'
    const value = JSON.stringify({ data: 'testData' })

    addItemToLS(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })

  it('should get item from localStorage', () => {
    const key = 'testKey'
    const value = { data: 'testData' }

    localStorage.setItem(key, JSON.stringify(value))

    const result = getItemFromLS(key)

    expect(result).toEqual(value)
  })

  it('should return undefined if item is not in localStorage', () => {
    const key = 'nonExistentKey'

    const result = getItemFromLS(key)

    expect(result).toBeUndefined()
  })
})
