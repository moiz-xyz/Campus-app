import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { ref, get } from "firebase/database";
import { useSelector } from "react-redux";
import { db } from "@/utils/constant";
import { Loader2 } from "lucide-react";

const AppliedJobTable = () => {
  const { user } = useSelector((store) => store.auth);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const jobsRef = ref(db, "jobs");
        const snapshot = await get(jobsRef);
        if (!snapshot.exists()) {
          setAppliedJobs([]);
          return;
        }
        const jobsData = snapshot.val();

        const userAppliedJobs = Object.entries(jobsData)
          .filter(([jobId, job]) => {
            const appsArray = job.applications
              ? Object.values(job.applications)
              : [];
            return appsArray.some((app) => app.applicantId === user.uid);
          })
          .map(([jobId, job]) => ({ id: jobId, ...job }));

        const usersRef = ref(db, "users");
        const usersSnap = await get(usersRef);
        const usersData = usersSnap.val() || {};

        const jobsWithCompany = userAppliedJobs
          .map((job) => {
            const company = usersData[job.companyId];
            if (company && company.role === "company" && !company.isDeleted) {
              return { ...job, company };
            }
            return null;
          })
          .filter(Boolean); 
        setAppliedJobs(jobsWithCompany);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAppliedJobs();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div>
      <Table>
        {appliedJobs.length > 0 && (
          <TableCaption>A list of your applied jobs</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length === 0 ? (
            <tr>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't applied to any job yet.
              </TableCell>
            </tr>
          ) : (
            appliedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  {job?.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.companyName }</TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-gray-400">Pending</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
