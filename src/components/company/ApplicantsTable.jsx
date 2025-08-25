import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { db } from "@/utils/constant";
import { ref, get, update } from "firebase/database";
import { setAllApplicants } from "@/redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ jobId }) => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  // Function to fetch applicants from DB
  const fetchApplicants = async () => {
    try {
      const jobRef = ref(db, `jobs/${jobId}`);
      const snapshot = await get(jobRef);

      if (snapshot.exists()) {
        const jobData = snapshot.val();
        dispatch(setAllApplicants(jobData));
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error("Failed to fetch applicants");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  // Update status in DB and refresh list
const statusHandler = async (status, applicantId) => {
  try {
    const jobRef = ref(db, `jobs/${jobId}`);
    const snapshot = await get(jobRef);

    if (!snapshot.exists()) return;

    const jobData = snapshot.val();
    const applications = jobData.applications || [];

    const index = applications.findIndex(a => a.applicantId === applicantId);
    if (index === -1) return;

    const applicantRef = ref(db, `jobs/${jobId}/applications/${index}`);
    await update(applicantRef, { status });

    toast.success(`Status updated to ${status}`);
    fetchApplicants(); // refresh list
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status");
  }
};


  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(applicants?.applications) &&
            applicants.applications.map((item) => (
              <TableRow key={item.applicantId}>
                <TableCell>{item.fullname || "NA"}</TableCell>
                <TableCell>{item.email || "NA"}</TableCell>
                <TableCell>{item.phoneNumber || "NA"}</TableCell>
                <TableCell>
                  {item.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item.appliedAt
                    ? new Date(item.appliedAt).toLocaleDateString()
                    : "NA"}
                </TableCell>
                <TableCell>{item.status || "Pending"}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() =>
                            statusHandler(status, item.applicantId)
                          }
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
