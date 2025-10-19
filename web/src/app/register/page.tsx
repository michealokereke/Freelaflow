import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Freelaflow</CardTitle>
          <CardDescription className="text-center text-lg">
            Freelance workflow management app
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <CardTitle>Register an Organization account</CardTitle>
          <CardDescription>
            Enter your the required data to register an account
          </CardDescription>
          <CardAction>
            <Link
              href={"/login"}
              className="text-link hover:text-link-hover hover:underline"
            >
              login
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
