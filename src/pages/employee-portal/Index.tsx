import { useProfileStore } from "@/store/profile.store";
import AttendanceTable from "./AttendanceTable";
import React, { useCallback } from "react";
import EmployeeNav from "./Nav";

const EmployeePortal = () => {
  const { profile } = useProfileStore();

  const TableCallback = useCallback(() => {
    return <AttendanceTable employeeId={profile.id} />;
  }, [profile]);

  return (
    <>
      <EmployeeNav profile={profile} />
      <TableCallback />
    </>
  );
};

export default React.memo(EmployeePortal);
