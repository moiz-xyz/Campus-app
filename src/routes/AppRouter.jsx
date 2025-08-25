import AdminJobs from "@/components/admin/AdminJobs";
import Applicants from "@/components/admin/Applicants";

import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Browse from "@/components/Browse";
import Companies from "@/components/company/Companies";
import CompanyCreate from "@/components/company/CompanyCreate";
import CompanyJobs from "@/components/company/CompanyJobs";
import CompanySetup from "@/components/company/CompanySetup";
import PostJob from "@/components/company/PostJob";
import ProtectedComapnyRoute from "@/components/company/ProtectedComapnyRoute";
import Home from "@/components/Home";
import JobDescription from "@/components/JobDescription";
import Jobs from "@/components/Jobs";
import Profile from "@/components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/description/:id" element={<JobDescription />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />

        {/* company routes */}
         <Route
          path="/companies"
          element={
            <ProtectedComapnyRoute>
              <Companies />
            </ProtectedComapnyRoute>
          }
        />
        <Route
          path="/companies/create"
          element={
            <ProtectedComapnyRoute>
              <CompanyCreate />
            </ProtectedComapnyRoute>
          }
        />
        <Route
          path="/companies/:id"
          element={
            <ProtectedComapnyRoute>
              <CompanySetup />
            </ProtectedComapnyRoute>
          }
        />
        <Route
          path="/company/jobs"
          element={
            <ProtectedComapnyRoute>
              <CompanyJobs />
            </ProtectedComapnyRoute>
          }
        />
        <Route
          path="/jobs/create"
          element={
            <ProtectedComapnyRoute>
              <PostJob />
            </ProtectedComapnyRoute>
          }
        />
        <Route
          path="/jobs/:id/applicants"
          element={
            <ProtectedComapnyRoute>
              <Applicants />
            </ProtectedComapnyRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
