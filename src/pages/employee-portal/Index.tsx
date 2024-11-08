import { useProfileStore } from "@/store/profile.store";
import EmployeeTable from "./EmployeeTable";
import { useCallback, useEffect } from "react";
import { supabase } from "@/App";
import EmployeeNav from "./Nav";

const EmployeePortal = () => {
  const { profile } = useProfileStore();

  const TableCallback = useCallback(() => {
    return <EmployeeTable />;
  }, []);

  return (
    <>
      <EmployeeNav profile={profile} />
      <TableCallback />
    </>
  );
};

export default EmployeePortal;
