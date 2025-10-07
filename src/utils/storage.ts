export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error(`Ошибка чтения ${key}`, err)
    return null
  }
}

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Ошибка сохранения ${key}`, err)
  }
}

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.error(`Ошибка удаления ${key}`, err)
  }
}

export const loadCachedServices = () => {
  try {
    const data = sessionStorage.getItem('services')
    return data ? JSON.parse(data).services || [] : []
  } catch {
    return []
  }
}
