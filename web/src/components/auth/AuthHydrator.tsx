"use client";
import { useAuthHydrator } from "@/utils/authHydrator";
import React from "react";

const AuthHydrator: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useAuthHydrator();
  return <div>{children}</div>;
};

export default AuthHydrator;
