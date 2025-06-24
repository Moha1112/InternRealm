import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/routes/protected-route.jsx";
import GuestRoute from "@/components/routes/guest-route.jsx";
import { NavBar } from "@/components/navbar.jsx";

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Logout from './pages/Logout.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import NotFound from "@/pages/NotFound.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import Applications from "./pages/Applications.jsx";
import ApplicationsC from "./pages/Applicationsc.jsx";
import SavedInternships from "./pages/SavedInternships.jsx";
import InternshipCreate from "./pages/InternshipCreate.jsx";
import InternshipDetails from "./pages/InternshipDetails.jsx";
import Internships from "./pages/Internships.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Cv from "./pages/Cv.jsx";

function App() {
  return (
    <>
      <NavBar className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"/>
      <div className="min-h-screen bg-gray-50"> {/* Add padding top to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:internshipId" element={<InternshipDetails />} />
          <Route path="/internships/create" element={<InternshipCreate />} />

          {/* Guest-only routes */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cv" element={<Cv/>}/>
            <Route path="/applications" element={<Applications />} />
            <Route path="/applicationsc" element={<ApplicationsC />} />
            <Route path="/saved-internships" element={<SavedInternships />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
