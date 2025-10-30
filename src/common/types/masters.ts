export type Master = {
  id: string
  firstName: string
  lastName: string
  services: string[]
  availableDates: { date: string; times: string[] }[]
}
