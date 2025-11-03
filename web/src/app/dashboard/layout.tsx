import Sidebar from "@/components/utils/Sidebar";
import TopBar from "@/components/utils/TopBar";
import NotifyUnverified from "@/components/utils/NotifyUnverified";
import React, { Children } from "react";
import AuthHydrator from "@/components/auth/AuthHydrator";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
  modal: React.ReactNode;
}> = ({ children, modal }) => {
  return (
    <AuthHydrator>
      {" "}
      <div className="flex gap-4">
        <Sidebar />
        <div className="flex-1 space-y-4 pr-4">
          <TopBar />
          <NotifyUnverified />
          {modal}
          {children}
        </div>
      </div>
    </AuthHydrator>
  );
};

export default DashboardLayout;
