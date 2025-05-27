import { Routes, Route } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';

import ProtectedRoute from "@/components/routes/protected-route.jsx";
import GuestRoute from "@/components/routes/guest-route.jsx";
import { NavBar } from "@/components/navbar.jsx";

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import NotFound from "@/pages/NotFound.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <>
      <NavBar className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"/>
      <div className="min-h-screen bg-gray-50"> {/* Add padding top to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Guest-only routes */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </>
  )
}

export default App;
