import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";


import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home/Home";
import { FormPage } from "./pages/FormPage/FormPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";


function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={
            <Layout>
                <Home/>
            </Layout>
          } />
            <Route path="/register" element={
            <Layout>
                <FormPage/>
              </Layout>} />
          <Route path="/product" element={
            <Layout>
                <ProductsPage/>
            </Layout>} />
          <Route path="/about" element={
            <Layout>
            <span>Наша компания самая лучшая</span>
            </Layout>} />
          <Route  path="*" element={<Navigate to="/"/>}></Route>
        </Routes>
    </>
  );
}

export default App;



