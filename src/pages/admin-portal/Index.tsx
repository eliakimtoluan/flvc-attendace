import { useProfileStore } from "@/store/profile.store";
import AdminNav from "./AdminNav";
import EmployeeTable from "./EmployeeTable";
import Settings from "./Settings";
import { useState } from "react";

export const enum Nav {
  DASHBOARD = "dashboard",
  SETTING = "setting",
}

const AdminPortal = () => {
  const { profile } = useProfileStore();
  const [nav, setNav] = useState<Nav>(Nav.DASHBOARD);
  return (
    <>
      <AdminNav profile={profile} nav={nav} setNav={setNav} />
      {nav === Nav.DASHBOARD && <EmployeeTable />}
      {nav === Nav.SETTING && <Settings />}
    </>
  );
};

export default AdminPortal;
