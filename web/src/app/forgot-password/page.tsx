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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const ForgotPassword = () => {
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
          <CardTitle>Forgotten Password</CardTitle>
          <CardDescription>
            Enter your email to reset your account
          </CardDescription>
          <CardAction>
            <Link
              href={"/login"}
              className="text-link hover:text-link-hover hover:underline"
            >
              Login
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border-border"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
