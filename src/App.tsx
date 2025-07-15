import './App.scss'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './layouts/Layout'
import { Home } from './pages/Home/Home'
import { FormPage } from './pages/FormPage/FormPage'
import { FormTest } from './components/FormTest/FormTest'

import PrivateRoute from './routes/PrivateRoute'
import { Services } from './pages/Services/Services'
import { ServiceDetailsPage } from './components/ServiceDetailsPage/ServiceDetailsPage'
import { ServiceCartPage } from './components/ServiceCartPage/ServiceCartPage'
import { CheckoutPage } from './components/CheckoutPage/CheckoutPage'
import { AdminRoute } from './routes/AdminRoute'
import { AdminDashboard } from './pages/Admin/AdminDashboard'

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path='/register'
          element={
            <Layout>
              <FormPage />
            </Layout>
          }
        />

        <Route
          path={'form'}
          element={
            <Layout>
              <FormTest />
            </Layout>
          }
        />

        <Route
          path='/admin'
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path='/services'
          element={
            <PrivateRoute>
              <Layout>
                <Services />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path='/services/:id'
          element={
            <PrivateRoute>
              <Layout>
                <ServiceDetailsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path='/services-cart'
          element={
            <PrivateRoute>
              <Layout>
                <ServiceCartPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path='/checkout'
          element={
            <PrivateRoute>
              <Layout>
                <CheckoutPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path='/about'
          element={
            <Layout>
              <span>Наша компания самая лучшая</span>
            </Layout>
          }
        />

        <Route
          path='/contacts'
          element={
            <Layout>
              <span>
                Если возникли какие-либо проблемы свяжитесь с нами по email:
                nampohuy@loxi.com
              </span>
            </Layout>
          }
        />
        {/* <Route  path="*" element={<Navigate to="/"/>}></Route> */}
      </Routes>
    </>
  )
}

export default App
