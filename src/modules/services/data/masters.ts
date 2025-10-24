import { Master } from '@/common/types/masters'

export const masters: Master[] = [
  {
    id: 'm1',
    firstName: 'Эдуард',
    lastName: 'Суровый',
    services: ['1', '2', '3', '4', '5', '6', '7'], // может обслуживать сервисы с ID 1 и 2
    availableDates: [
      {
        date: '2025-10-31',
        times: [
          '9:00',
          '10:00',
          '11:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
        ],
      },
      { date: '2025-11-01', times: ['09:00', '14:00'] },
    ],
  },
  {
    id: 'm2',
    firstName: 'Тейлор',
    lastName: 'Свифт',
    services: ['1'],
    availableDates: [
      {
        date: '2025-10-31',
        times: ['10:00', '11:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
      },
    ],
  },
  {
    id: 'm3',
    firstName: 'Джон',
    lastName: 'Депп',
    services: ['3'],
    availableDates: [
      {
        date: '2025-11-01',
        times: ['10:00', '11:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
      },
    ],
  },
  {
    id: 'm4',
    firstName: 'Надежда',
    lastName: 'Дорофеева',
    services: ['1', '2', '3'],
    availableDates: [
      {
        date: '2025-10-31',
        times: [
          '9:00',
          '10:00',
          '11:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
        ],
      },
      { date: '2025-11-01', times: ['15:00'] },
    ],
  },
]

/* export type MasterSlot = {
  id: string
  name: string
  services: string[]
  availableSlots: { date: string; time: string }[]
}

export const masters: MasterSlot[] = [
  {
    id: 'm1',
    name: 'Иван Петров',
    services: ['1', '2'],
    availableSlots: [
      { date: '2025-10-31', time: '10:00' },
      { date: '2025-10-31', time: '11:00' },
      { date: '2025-10-31', time: '15:00' },
      { date: '2025-11-01', time: '09:00' },
      { date: '2025-11-01', time: '14:00' },
    ],
  },
  {
    id: 'm2',
    name: 'Анна Иванова',
    services: ['1'],
    availableSlots: [
      { date: '2025-10-31', time: '12:00' },
      { date: '2025-10-31', time: '16:00' },
    ],
  },
  {
    id: 'm3',
    name: 'Сергей Кузнецов',
    services: ['3'],
    availableSlots: [{ date: '2025-11-01', time: '10:00' }],
  },
  {
    id: 'm4',
    name: 'Мария Сидорова',
    services: ['1', '2', '3'],
    availableSlots: [
      { date: '2025-10-31', time: '11:00' },
      { date: '2025-10-31', time: '12:00' },
      { date: '2025-10-31', time: '13:00' },
      { date: '2025-11-01', time: '15:00' },
    ],
  },
] */
