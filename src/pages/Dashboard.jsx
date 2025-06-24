import {useAuth} from "@/hooks/useAuth.js";
import CompanyDashboard from "./CompanyDashboard.jsx";
import StudentDashboard from "./StudentDashboard.jsx";

export default function Page() {
  const { user } = useAuth()

  return user.role === "company" ? <CompanyDashboard/> : <StudentDashboard/>;

}