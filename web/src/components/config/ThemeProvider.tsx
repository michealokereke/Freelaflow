"use client";

import { setMode, setSystemMode } from "@/store/slices/theme";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const appThemeMode = useSelector((state: RootState) => state.ui.themeMode);
  const dispatch = useDispatch();
  const THEME_STORAGE_KEY = "freelaflow.theme";

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      dispatch(setSystemMode(parsed.system));

      if (!parsed.system) {
        dispatch(setMode(parsed.mode));
      }
    } catch (error) {
      console.error("Invalid theme in localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(appThemeMode));
  }, [appThemeMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (appThemeMode.system)
        media.matches ? dispatch(setMode("dark")) : dispatch(setMode("light"));
    };

    media.addEventListener("change", handleChange);
    handleChange();

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [appThemeMode.system]);

  useEffect(() => {
    const root = document.documentElement;
    appThemeMode.mode === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [appThemeMode.mode]);

  return <div>{children} </div>;
};

export default ThemeProvider;
