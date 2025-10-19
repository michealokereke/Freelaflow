"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/store/api/endpoints/auth";
import { toast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ApiError } from "@/types/apiError";
import { Spinner } from "../ui/spinner";

const steps = ["Basic Info", "Account Security"];

const RegisterForm = () => {
  const themeMode = useSelector((state: RootState) => state.ui.themeMode.mode);
  const [registerReq, { isLoading, isError, error, data }] =
    useRegisterMutation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    orgName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.fullName.trim() !== "" &&
          formData.orgName.trim() !== "" &&
          /\S+@\S+\.\S+/.test(formData.email)
        );
      case 1:
        return (
          formData.password.length >= 8 &&
          formData.password === formData.confirmPassword
        );
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!isStepValid()) {
      setErrorMessage(true);
      return;
    }

    if (currentStep === steps.length - 1) {
      try {
        const response = await registerReq(formData).unwrap();

        console.log(response);

        router.push("/dashboard");
      } catch (error) {
        const err = error as ApiError;
        toast.error(
          err?.data?.message ?? "An unexpected error occurred",
          themeMode
        );

        console.log(error);
      }
    } else {
      setErrorMessage(false);
      nextStep();
    }
  };

  return (
    <form>
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentStep * 100}%)` }}
        >
          {/*==================================== step 0============================== */}
          <div className="flex flex-col gap-6 w-full flex-shrink-0">
            <div className="grid gap-2">
              <Label htmlFor="orgName">Organization:</Label>
              <Input
                className="border-border"
                id="orgName"
                type="text"
                placeholder="organization mame"
                required
                onChange={(e) => {
                  updateField("orgName", e.target.value);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name:</Label>
              <Input
                className="border-border"
                id="fullName"
                type="text"
                placeholder=""
                onChange={(e) => {
                  updateField("fullName", e.target.value);
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                className="border-border"
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => {
                  updateField("email", e.target.value);
                }}
                required
              />
            </div>
          </div>

          {/*==================================== step 0============================== */}
          <div className="flex flex-col gap-6 w-full flex-shrink-0">
            {" "}
            <div className="grid gap-2">
              <Label htmlFor="password">Password:</Label>

              <Input
                className="border-border"
                id="password"
                type="password"
                onChange={(e) => {
                  updateField("password", e.target.value);
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword"> Confirm Password:</Label>

              <Input
                className="border-border"
                id="confirmPassword"
                type="password"
                onChange={(e) => {
                  updateField("confirmPassword", e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm">
          {ErrorMessage && (
            <p className="text-error-500">
              {currentStep === 0 && "All the field above are required"}
              {currentStep === 1 &&
                "Password must be greater than 8 characters and also be same with Confirm Password"}{" "}
            </p>
          )}
        </div>
        <div className="flex justify-between mt-6">
          {currentStep > 0 ? (
            <Button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-secondary text-buttonText hover:bg-secondaryButtonHover transition"
            >
              Previous
            </Button>
          ) : (
            <div />
          )}
          <Button
            disabled={isLoading}
            variant={isLoading || !isStepValid() ? "outline" : "default"}
            className={`${
              !isStepValid() || isLoading
                ? "bg-button-disabled-bg text-white hover:bg-button-disabled-bg"
                : ""
            }`}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {isLoading && <Spinner />}
            {currentStep === steps.length - 1 ? "Create Account" : "Next"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
