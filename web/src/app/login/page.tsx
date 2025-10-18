"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLoginMutation } from "@/store/api/endpoints/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/toast";

const Login = () => {
  const themeMode = useSelector((state: RootState) => state.ui.themeMode.mode);
  const [loginReq, { isLoading, isError, error, data }] = useLoginMutation();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = () =>
    formData.password.length >= 8 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!isValid()) {
      setErrorMessage(true);
      return;
    }

    try {
      const response = await loginReq(formData).unwrap();
      console.log(response);
      setErrorMessage(false);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An unexpected error occurred",
        themeMode
      );

      console.log(error);
    }
  };
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
          <CardAction>
            <Link
              href={"/register"}
              className="text-link hover:text-link-hover hover:underline"
            >
              Sign Up
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border-border"
                  onChange={(e) => updateField("email", e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={"/forgot-password"}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  className="border-border"
                  onChange={(e) => updateField("password", e.target.value)}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="mt-2 text-sm">
              {errorMessage && (
                <p className="text-error-500">
                  Enter a valid email and a valid password
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-6">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
