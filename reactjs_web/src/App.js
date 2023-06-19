import { useEffect } from "react";
import {BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import './App.css';

// Admin Page
import AdminUser from "./admin-page/admin-user/AdminUserPage"
import CategoryPage from "./admin-page/category/CategoryPage";
import ProductPage from "./admin-page/product/ProductPage";
import Dashboard from "./component/Dashboard";
import LoginPage from "./admin-page/LoginPage";

//Home Page
import HomePage from "./page/HomePage";
import RootLayout from "./component/RootLayout";
import CarouselSwiperPage from "./admin-page/carousel-swiper/CarouselSwiperPage";
import CustomerUserPage from "./admin-page/customer-user/CustomerUserPage";




 

function App() {
  const isLogin = localStorage.getItem("is_login") === "1";
 
  useEffect(()=>{
   console.log(window.location.pathname)
  },[window.location.pathname])

  const is_dashboard = window.location.pathname.includes("dashboard")
  return (
    <BrowserRouter basename="/">
      {!is_dashboard && <Routes>
            <Route path="/" element={<RootLayout/>}>
              <Route index element={<HomePage/>} />
              <Route path="*" element={<h1>Route Not Found!</h1>} />
            </Route>
        </Routes>
      }

      {is_dashboard &&
        <div>
          {!isLogin ? (
            <Routes>
              <Route path="dashboard" element={<LoginPage />}>
                <Route path="*" element={<Navigate to="/dashboard/login" />} />
                <Route path='login' element={<LoginPage />} />
              </Route>
            </Routes>
          ) : (
            <Dashboard>
              <Routes>
                <Route path="dashboard" >
                  <Route path="admin-user" element={<AdminUser />} />
                  <Route path="category" element={<CategoryPage />} />
                  <Route path="product" element={<ProductPage />} />
                  <Route path="carouselSwiper" element={<CarouselSwiperPage />} />
                  <Route path="customerUser" element={<CustomerUserPage />} />
                  <Route path="*" element={<h1>Route Not Found!</h1>} />
                </Route>
              </Routes>
            </Dashboard>
          )
          }
        </div>
      }
    </BrowserRouter>
  );
}

export default App;
