import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AdminUser from "./page/AdminUser"
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Dashboard>
      <Routes>
        {/* <Route index element={<Dashboard />} /> */}
        <Route path='/adminUser' element={<AdminUser />} />
      </Routes>
    </Dashboard>
  </BrowserRouter>
  );
}

export default App;
