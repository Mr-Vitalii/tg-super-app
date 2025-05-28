export const formatTime = (date: Date): string =>
  date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

export const isTimeAvailable = (
  date: Date,
  busySchedule: Record<string, string[]>
): boolean => {
  const dateKey = date.toISOString().split('T')[0]
  const time = formatTime(date)
  const busyTimes = busySchedule[dateKey]
  return !busyTimes?.includes(time)
}
