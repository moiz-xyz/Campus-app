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
import {  ref, get } from "firebase/database";
import { useSelector } from "react-redux";
import { db } from "@/utils/constant";

const AppliedJobTable = () => {
  const { user } = useSelector((store) => store.auth);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const jobsRef = ref(db, "jobs");
      const snapshot = await get(jobsRef);
      if (snapshot.exists()) {
        const jobsData = snapshot.val();

        const userAppliedJobs = Object.entries(jobsData)
          .filter(([ job]) =>
            job.applications?.some((app) => app.applicantId === user.uid)
          )
          .map(([jobId, job]) => ({
            id: jobId,
            ...job,
          }));

        const companiesRef = ref(db, "companies");
        const companiesSnap = await get(companiesRef);
        const companiesData = companiesSnap.val() || {};

        const jobsWithCompany = userAppliedJobs.map((job) => ({
          ...job,
          company: companiesData[job.companyId] || null,
        }));

        setAppliedJobs(jobsWithCompany);
      }
    };

    if (user) fetchAppliedJobs();
  }, [user]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <span>You haven't applied any job yet.</span>
          ) : (
            appliedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  {job?.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company?.name || "Unknown"}</TableCell>
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
