import {useAuth} from "@/hooks/useAuth.js";
import CompanyProfile from "./CompanyProfile.jsx";
import StudentProfile from "./StudentProfile.jsx";

export default function Page() {
  const { user, isLoading } = useAuth()

  return user.role === "company" ? <CompanyProfile/> : <StudentProfile/>;

}