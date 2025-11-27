import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import RegisterEmployee from "./pages/RegisterEmployee";
import NotFound from "./pages/NotFound";
import EditEmployee from "./pages/EditEmpoyee";
import EmployeeDetails from "./pages/EmployeeDetail";
import EmployeeList from "./pages/EmployeeList";

import Navbar from "./components/Navbar";
import Trespasser from "./pages/Trespasser";

export default function AppRouter() {
  return (
    <BrowserRouter>
    
        <Navbar /> 

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />

          <Route path="/employees/list" element={<EmployeeList />} />
          <Route path="/register" element={<RegisterEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/trespasser" element={<Trespasser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    
    </BrowserRouter>
  );
}
