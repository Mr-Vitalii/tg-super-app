import './App.scss'

import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import PrivateRoute from '@/routes/PrivateRoute'
import AdminRoute from '@/routes/AdminRoute'

// ✅ ЛЕНИВАЯ ЗАГРУЗКА
const Home = lazy(() => import('@/pages/Home/Home'))
const FormPage = lazy(() => import('@/pages/FormPage/FormPage'))
const AdminDashboard = lazy(() => import('@/pages/Admin/AdminDashboard'))
const CategoriesPage = lazy(
  () => import('@/modules/services/pages/CategoriesPage/CategoriesPage')
)
const CompaniesPage = lazy(
  () => import('@/modules/services/pages/CompaniesPage/CompaniesPage')
)
const CompanyLayout = lazy(
  () => import('@/modules/services/components/CompanyLayout/CompanyLayout')
)
const CompanyServicesPage = lazy(
  () =>
    import('@/modules/services/pages/CompanyServicesPage/CompanyServicesPage')
)
const CompanyContactsPage = lazy(
  () =>
    import('@/modules/services/pages/CompanyContactsPage/CompanyContactsPage')
)
/* const CompanyContactsPage2 = lazy(
  () =>
    import('@/modules/services/pages/CompanyContactsPage/CompanyContactsPage2')
) */
const CompanyMastersPage = lazy(
  () => import('@/modules/services/pages/CompanyMastersPage/CompanyMastersPage')
)
const ServiceDetailsPage = lazy(
  () => import('@/modules/services/pages/ServiceDetailsPage/ServiceDetailsPage')
)
const ServiceCartPage = lazy(
  () => import('@/modules/cart/pages/ServiceCartPage/ServiceCartPage')
)
const CheckoutPage = lazy(
  () => import('@/modules/checkout/pages/CheckoutPage/CheckoutPage')
)
const OrdersHistoryPage = lazy(
  () => import('@/modules/ordersHistory/pages/OrdersHistoryPage')
)
const About = lazy(() => import('@/pages/About/About'))
const Contacts = lazy(() => import('@/pages/Contacts/Contacts'))
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'))

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        {/* ✅ Главный Layout */}
        <Route path='/' element={<Layout />}>
          {/* --- Публичные страницы --- */}
          <Route index element={<Home />} />
          <Route path='register' element={<FormPage />} />
          <Route path='about' element={<About />} />
          <Route path='contacts' element={<Contacts />} />

          {/* --- Admin Dashboard (защищён отдельной ролью) --- */}
          <Route
            path='admin'
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* --- Services / Categories / Companies --- */}
          <Route path='services'>
            {/* /services -> список категорий */}
            <Route
              index
              element={
                <PrivateRoute>
                  <CategoriesPage />
                </PrivateRoute>
              }
            />

            {/* /services/:categoryId -> список компаний */}
            <Route
              path=':categoryId'
              element={
                <PrivateRoute>
                  <CompaniesPage />
                </PrivateRoute>
              }
            />

            {/* /services/:categoryId/:companyId -> CompanyLayout */}
            <Route path=':categoryId/:companyId' element={<CompanyLayout />}>
              {/* index -> услуги компании */}
              <Route
                index
                element={
                  <PrivateRoute>
                    <CompanyServicesPage />
                  </PrivateRoute>
                }
              />

              {/* /masters -> мастера */}
              <Route
                path='masters'
                element={
                  <PrivateRoute>
                    <CompanyMastersPage />
                  </PrivateRoute>
                }
              />
              {/* /contacts -> контакты комапнии */}
              <Route
                path='contacts'
                element={
                  <PrivateRoute>
                    <CompanyContactsPage />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* /services/:categoryId/:companyId/:serviceId -> конкретная услуга */}
            <Route
              path=':categoryId/:companyId/:serviceId'
              element={
                <PrivateRoute>
                  <ServiceDetailsPage />
                </PrivateRoute>
              }
            />
          </Route>

          {/* --- Корзина --- */}
          <Route
            path='services-cart'
            element={
              <PrivateRoute>
                <ServiceCartPage />
              </PrivateRoute>
            }
          />
          {/* ---  Чекаут --- */}
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          {/* ---  История заказов --- */}
          <Route
            path='orders-history'
            element={
              <PrivateRoute>
                <OrdersHistoryPage />
              </PrivateRoute>
            }
          />

          {/* ✅ 404 страница */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
