"use client";

import React from "react";
import store, { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const NotifyUnverified = () => {
  const user = useSelector((store: RootState) => store.auth.user);
  return (
    <div>
      {user?.emailVerified || undefined ? null : (
        <div className="text-center mt-3 mr-2">
          <p className="text-sm">
            Your account has not been verifield yet,{" "}
            <span className=" hover:cursor-pointer text-text-warning hover:underline">
              Click me
            </span>{" "}
            to verify
          </p>
        </div>
      )}{" "}
    </div>
  );
};

export default NotifyUnverified;
