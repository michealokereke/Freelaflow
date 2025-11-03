"use client";

import store, { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const TopBar = () => {
  const user = useSelector((store: RootState) => store.auth.user);

  return (
    <div className="border-b p-2 pr-5 flex justify-between items-center">
      <div>
        <p className="font-bold text-xl">Freelaflow</p>
      </div>
      <div>
        <p className="font-semibold text-lg">{user?.organizationName}</p>
        <p className="text-secondary-muted-foreground text-sm font-semibold">
          {user?.fullName}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
