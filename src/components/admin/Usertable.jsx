import { useEffect, useState } from "react";
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
import { MoreHorizontal, Ban, Unlock } from "lucide-react";
import { useSelector } from "react-redux";
import { getDatabase, ref, update } from "firebase/database";
import { toast } from "sonner";

const UsersTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterUsers, setFilterUsers] = useState(companies);
  const db = getDatabase();

  useEffect(() => {
    const filtered =
      companies.length >= 0 &&
      companies.filter((user) => {
        if (!searchCompanyByText) return true;
        return user?.fullname
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterUsers(filtered);
  }, [companies, searchCompanyByText]);

  const toggleBlockUser = async (user) => {
    const isCurrentlyBlocked = user.status === "blocked";
    const newStatus = isCurrentlyBlocked ? "active" : "blocked";
    const newIsDeleted = isCurrentlyBlocked ? false : true;

    await update(ref(db, `users/${user.id}`), {
      status: newStatus,
      isDeleted: newIsDeleted,
    });

    setFilterUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: newStatus, isDeleted: newIsDeleted }
          : u
      )
    );

    toast(
      `User ${newStatus === "blocked" ? "Blocked" : "Unblocked"} Successfully!`
    );
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of registered company users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterUsers?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber || "N/A"}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status || "active"}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div
                      onClick={() => toggleBlockUser(user)}
                      className="flex items-center gap-2 w-fit cursor-pointer text-red-600"
                    >
                      {user.status === "blocked" ? (
                        <>
                          <Unlock className="w-4" />
                          <span>Unblock</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-4" />
                          <span>Block</span>
                        </>
                      )}
                    </div>
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

export default UsersTable;
