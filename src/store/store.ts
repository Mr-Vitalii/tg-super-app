import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '@/services/authApi'
import authReducer from '@/features/auth/authSlice'
import cartReducer from '@/features/cart/cartSlice'
import { ordersApi } from '@/services/ordersApi'
import { productsApi } from '@/services/productsApi'
import { categoriesApi } from '@/services/categoriesApi'
import { companiesApi } from '@/services/companiesApi'
import { mastersApi } from '@/services/mastersApi'
import { ordersHistoryApi } from '@/services/ordersHistoryApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [mastersApi.reducerPath]: mastersApi.reducer,
    [ordersHistoryApi.reducerPath]: ordersHistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ordersApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      companiesApi.middleware,
      mastersApi.middleware,
      ordersHistoryApi.middleware
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
