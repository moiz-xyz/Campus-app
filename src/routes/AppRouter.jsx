import AdminJobs from "@/components/admin/AdminJobs";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Applicants from "@/components/company/Applicants";
import CompanyJobs from "@/components/company/CompanyJobs";
import JobUpdate from "@/components/company/Jobupdate";
import PostJob from "@/components/company/PostJob";
import ProtectedComapnyRoute from "@/components/company/ProtectedComapnyRoute";
import Home from "@/components/Home";
import JobDescription from "@/components/JobDescription";
import Jobs from "@/components/Jobs";
import Profile from "@/components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "@/components/admin/Users";

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
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/company/jobs"
          element={
            <ProtectedComapnyRoute>
              <CompanyJobs />
            </ProtectedComapnyRoute>
          }
        />
        <Route
          path="/company/jobs/:id"
          element={
            <ProtectedComapnyRoute>
              <JobUpdate />
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
        {/* Admin Routes */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
          <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
