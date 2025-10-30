import { Master } from '@/common/types/masters'

export const masters: Master[] = [
  {
    id: 'm1',
    firstName: 'Эдуард',
    lastName: 'Суровый',
    services: ['1', '2', '3', '4', '5', '6', '7'],
    availableDates: [
      {
        date: '2025-10-31',
        times: [
          '09:00',
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
          '09:00',
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
