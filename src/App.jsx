import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login/Login.jsx";
import Wrapper from "./pages/layout/wrapper/Wrapper.jsx";
import Registration from "./pages/auth/registration/Registration.jsx";
import CreateProduct from "./pages/products/create_product/CreateProduct.jsx";
import ProductList from "./pages/products/product_list/ProductList.jsx";
import ProductDetails from "./pages/products/product_details/ProductDetails.jsx";
import ProductUpdate from "./pages/products/product_update/ProductUpdate.jsx";
import Profile from "./pages/auth/profile_details/Profile.jsx";
import toast from "react-hot-toast";

const Private_router = ({children}) => {
  const token = localStorage.getItem("token")
  return token != null || token != undefined ? (
    children
  ):(
    <>
      <Navigate to={'/'}/>
      {toast.success("Login First")}
    </>
  )
}

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
      path: "/profile",
      Component: <Profile />,
    },
    {
      path: "/create",
      Component: <CreateProduct />,
    },
    {
      path: "/list",
      Component: <ProductList  />,
    },
    {
      path: "/details/:id",
      Component: <ProductDetails/>,
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
                  <Route key={index} path={item.path} element={<Private_router>{item.Component}</Private_router>} />
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
