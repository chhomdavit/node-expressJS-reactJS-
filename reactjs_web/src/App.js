import React from "react";
import {BrowserRouter,Routes,Route, Navigate } from "react-router-dom";

import './App.css';
import AdminUser from "./page/AdminUser"
import Dashboard from "./component/Dashboard";


import HomePage from "./page/HomePage";
import RootLayout from "./component/RootLayout";
import LoginPage from "./page/LoginPage";

 

function App() {
  const is_login = (localStorage.getItem("is_login") === "0")
  return (
    <BrowserRouter>

    {!is_login &&<Routes>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path={'dashboard/admin-user'} element={ <Navigate to="/login" /> }/>
        <Route path='*' element={<h1>Route Not Found!</h1>} />
      </Route>
    </Routes>}

      {is_login &&<Dashboard>
          <Routes>
            <Route path="dashboard/admin-user" element={<AdminUser/>}/>
            <Route path='*' element={<h1>Route Not Found!</h1>} />
          </Routes>
        </Dashboard>
      }
    </BrowserRouter>
  );
}

export default App;
