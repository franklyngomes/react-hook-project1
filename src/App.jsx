import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login.jsx";
import Wrapper from "./pages/layout/wrapper/Wrapper.jsx";
import Registration from "./pages/auth/registration/Registration.jsx";
import CreateProduct from "./pages/products/create_product/CreateProduct.jsx";
import ProductList from "./pages/products/product_list/ProductList.jsx";
import ProductUpdate from "./pages/products/product_update/ProductUpdate.jsx";
import ListProducts from "./pages/products/product_list/ListProducts.jsx";
function App() {
  let public_router = [
    {
      path: "/",
      Component: <Login />,
    },
    {
      path: "/register",
      Component: <Registration />,
    },
  ];
  let private_router = [
    {
      path: "/create",
      Component: <CreateProduct />,
    },
    {
      path: "/list",
      Component: <ProductList  />,
    },
    {
      path: "/update",
      Component: <ProductUpdate />,
    },
  ];
  return (
    <div className="App">
      <Router>
        <Wrapper>
          <Routes>
            {public_router.map((item,index) => {
              return (
                <>
                  <Route key={index} path={item.path} element={item.Component} />
                </>
              );
            })}
            {private_router.map((item, index) => {
              return (
                <>
                  <Route key={index} path={item.path} element={item.Component} />
                </>
              );
            })}
          </Routes>
        </Wrapper>
      </Router>
    </div>
  );
}

export default App;
