import './App.scss'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './layouts/Layout'
import { Home } from './pages/Home/Home'
import { FormPage } from './pages/FormPage/FormPage'
import { FormTest } from './components/FormTest/FormTest'

import PrivateRoute from './routes/PrivateRoute'
import { Services } from './pages/Services/Services'

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
        {/*         <Route
          path='/product'
          element={
            <PrivateRoute>
              <Layout>
                <ProductsPage />
              </Layout>
            </PrivateRoute>
          }
        /> */}

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
