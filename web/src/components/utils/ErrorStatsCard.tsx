"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft, Ban } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

interface ErrorStateCardProps {
  /** Short error heading (e.g., “Client not found”) */
  title?: string;
  /** Optional detailed explanation */
  message?: string;
  /** Optional Lucide icon, defaults to Ban */
  icon?: React.ReactNode;
  /** Optional href for back navigation */
  backHref?: string;
  /** Optional text for back link */
  backText?: string;
  /** Optional height (useful for inline cards) */
  fullHeight?: boolean;
  /** Optional className to style container */
  className?: string;
}

const ErrorStateCard = ({
  title = "Something went wrong",
  message = "We couldn’t complete your request. Please try again later.",
  icon = <Ban size={80} className="text-tag-text-error" />,
  backHref,
  backText,
  fullHeight = true,
  className = "",
}: ErrorStateCardProps) => {
  return (
    <div
      className={`flex items-center justify-center p-4 ${
        fullHeight ? "h-[70vh]" : ""
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-tag-bg-error/10 border border-tag-bg-error/30 backdrop-blur-sm flex flex-col items-center text-center p-10 shadow-sm">
          <div className="mb-4">{icon}</div>

          <h2 className="text-xl font-semibold text-tag-text-error mb-2">
            {title}
          </h2>

          {message && (
            <p className="text-sm text-muted-foreground mb-6">{message}</p>
          )}

          {backHref && backText && (
            <Link
              href={backHref}
              className="flex items-center gap-2 text-sm font-medium text-link hover:underline hover:text-link/80 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>{backText}</span>
            </Link>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ErrorStateCard;
