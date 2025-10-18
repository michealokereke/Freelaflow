import { toast as toaster } from "sonner";

type Thememode = "dark" | "light";
export const toast = {
  success: (title: string, themeMode?: Thememode, description?: string) =>
    toaster.success(title, {
      description,
      duration: 3000,
      style: {
        backgroundColor: themeMode === "dark" ? "#064E3B" : "#DCFCE7",
        color: themeMode === "dark" ? "#D1FAE5" : "#065F46",
        border: `1px solid ${themeMode === "dark" ? "#D1FAE5" : "#065f46"}}`,
      },
    }),

  error: (title: string, themeMode?: Thememode, description?: string) =>
    toaster.error(title, {
      description,
      duration: 3000,
      style: {
        backgroundColor: themeMode === "dark" ? "#7f1d1d" : "#fee2e2",
        color: themeMode === "dark" ? "#fca5a5" : "#991b1b",
        border: `1px solid ${themeMode === "dark" ? "#fca5a5" : "#991b1b"}}`,
      },
    }),
};
