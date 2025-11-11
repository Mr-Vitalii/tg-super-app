import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
export function formatDate(isoDate: string, pattern = 'dd.MM.yyyy г.') {
  const parsed = parseISO(isoDate)
  return format(parsed, pattern, { locale: ru })
}
