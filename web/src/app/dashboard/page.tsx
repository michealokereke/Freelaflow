"use client";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/store/api/endpoints/auth";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const [logoutReq, { isLoading, isError, error, data }] = useLogoutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logoutReq(undefined).unwrap();
    router.push("/login");
    console.log(response);
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default page;
