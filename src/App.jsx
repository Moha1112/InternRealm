import { Routes, Route } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';

import ProtectedRoute from "@/components/routes/protected-route.jsx";
import GuestRoute from "@/components/routes/guest-route.jsx";

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import NotFound from "@/pages/NotFound.jsx";

function App() {
  return (
    <>
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
        </Route>

        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;