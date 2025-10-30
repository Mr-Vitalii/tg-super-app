const pad = (n: string | number) => String(n).padStart(2, '0')

/**
 * Приводит время к формату "HH:mm"
 * Вход принимает: "9:00", "09:00", "9:0", "9", "09" и т.п.
 */
export const normalizeTime = (t: string) => {
  if (!t && t !== '') return t
  const trimmed = String(t).trim()
  if (trimmed === '') return '00:00'
  const parts = trimmed.split(':')
  const h = parts[0] ?? '0'
  const m = parts[1] ?? '00'
  return `${pad(parseInt(h, 10))}:${pad(parseInt(m, 10))}`
}

/**
 * Нормализует и сортирует массив временных слотов (строк) -> ["09:00","10:00",...]
 */
export const normalizeAndSortTimes = (times: string[] = []) =>
  Array.from(new Set(times.map(normalizeTime))).sort()
