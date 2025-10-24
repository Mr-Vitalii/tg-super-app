import './App.scss'
/* import { Route, Routes } from 'react-router-dom'

import { Layout } from './layouts/Layout'
import { Home } from './pages/Home/Home'
import { FormPage } from './pages/FormPage/FormPage'

import PrivateRoute from './routes/PrivateRoute' */

/* import { Services } from './pages/Services/Services' */

/* import { ServiceDetailsPage } from './modules/services/pages/ServiceDetailsPage/ServiceDetailsPage'
import { ServiceCartPage } from './components/ServiceCartPage/ServiceCartPage'
import { CheckoutPage } from './components/CheckoutPage/CheckoutPage'
import { AdminRoute } from './routes/AdminRoute'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { CategoriesPage } from './modules/services/pages/CategoriesPage/CategoriesPage'
import { CompaniesPage } from './modules/services/pages/CompaniesPage/CompaniesPage'
import { CompanyServicesPage } from './modules/services/pages/CompanyServicesPage/CompanyServicesPage'
import { CompanyLayout } from './modules/services/components/CompanyLayout/CompanyLayout'
import { CompanyMastersPage } from './modules/services/pages/CompanyMastersPage/CompanyMastersPage' */

// App.tsx
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

          {/* ✅ 404 страница */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
