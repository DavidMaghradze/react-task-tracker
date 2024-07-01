export const addItemToLS = (key: string, value: string) =>
  localStorage.setItem(key, value)

export const getItemFromLS = (key: string) => {
  const item = localStorage.getItem(key)

  if (item) return JSON.parse(item)

  return undefined
}
