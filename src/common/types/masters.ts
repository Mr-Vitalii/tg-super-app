export interface Master {
  id: string
  firstName: string
  lastName: string
  services: string[] // какие услуги может выполнять (по serviceId)
  availableDates: {
    // доступность по датам
    date: string // формат YYYY-MM-DD
    times: string[] // список свободных слотов времени в формате HH:mm
  }[]
}
