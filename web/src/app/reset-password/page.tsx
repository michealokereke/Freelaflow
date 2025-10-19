import React from "react";
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

const ResetPassword = () => {
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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Provide new pssword to use for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>

                <Input
                  className="border-border"
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>

                <Input
                  className="border-border"
                  id="confirmPassword"
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
