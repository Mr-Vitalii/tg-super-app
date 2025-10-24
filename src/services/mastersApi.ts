import { createApi /* fetchBaseQuery */ } from '@reduxjs/toolkit/query/react'
import { Master } from '@/common/types/masters'
import { masters } from '@/modules/services/data/masters'

export const mastersApi = createApi({
  reducerPath: 'mastersApi',
  baseQuery: async () => ({ data: null }), // пока не ходим на сервер
  endpoints: (builder) => ({
    getAvailableMasters: builder.query<
      Master[],
      { serviceId: string; date: string; time: string }
    >({
      queryFn: async ({ serviceId, date, time }) => {
        try {
          const filtered = masters.filter(
            (m) =>
              m.services.includes(serviceId) &&
              m.availableDates.some(
                (d) => d.date === date && d.times.includes(time)
              )
          )
          return { data: filtered }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),
  }),
})

export const { useGetAvailableMastersQuery, useLazyGetAvailableMastersQuery } =
  mastersApi
