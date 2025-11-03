"use client";

import { useLogoutMutation } from "@/store/api/endpoints/auth";
import { clearUser } from "@/store/slices/auth";
import { setMode } from "@/store/slices/theme";
import { RootState } from "@/store/store";
import {
  FolderKanban,
  LogOut,
  Menu,
  Moon,
  Sun,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavOptions = [
  {
    label: "Clients",
    link: "/dashboard/clients",
    icon: UsersRound,
  },
  {
    label: "Projects",
    link: "/dashboard/projects",
    icon: FolderKanban,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutReq, { isLoading, isError, error, data }] = useLogoutMutation();
  const thememode = useSelector((store: RootState) => store.ui.themeMode.mode);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await logoutReq(undefined).unwrap();
    dispatch(clearUser());
    router.push("/login");
  };
  return (
    <div className={`${isOpen ? "md:w-32 min-w-14" : "min-w-14"}`}>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed md:hidden z-10 inset-0"
        ></div>
      )}

      <div
        className={`bg-sidebar transition-all duration-200 ${
          isOpen ? "w-32" : "w-14"
        } flex justify-between items-center flex-col text-sidebar-foreground fixed z-11 h-full border-sidebar-border border-1`}
      >
        <div className="w-full">
          <div
            className={`px-1 py-0.5 flex ${
              isOpen ? "justify-between" : "justify-center"
            } items-center border-b border-border`}
          >
            {isOpen && <div />}
            {isOpen ? (
              <X
                className="p-1 hover:bg-surface-3 rounded-sm"
                onClick={() => setIsOpen(false)}
                size={32}
              />
            ) : (
              <Menu
                className="p-1 hover:bg-surface-3 rounded-sm"
                onClick={() => setIsOpen(true)}
                size={32}
              />
            )}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {NavOptions.map((NavOption, i) => (
              <Link
                onClick={() => setIsOpen(false)}
                key={i}
                href={NavOption.link}
                className={`hover:bg-surface-3 rounded-sm px-2 py-1 flex ${
                  isOpen ? "" : "justify-center"
                }  items-center gap-2 `}
              >
                <NavOption.icon size={24} />
                {isOpen && <p className="font-semibold">{NavOption.label}</p>}
              </Link>
            ))}

            <div
              className={`hover:bg-surface-3 rounded-sm px-2 py-1 flex ${
                isOpen ? "" : "justify-center"
              }  items-center gap-2 `}
              onClick={() => {
                dispatch(setMode(thememode === "dark" ? "light" : "dark"));
              }}
            >
              {thememode === "dark" ? <Sun size={24} /> : <Moon size={24} />}

              {isOpen && (
                <p className="font-semibold">
                  {thememode === "dark" ? "Light Mode" : "Dark mode"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            handleLogout();
          }}
          className={`hover:bg-surface-3 w-full text-error-500 border border-border mb-6 rounded-sm px-2 py-1 flex ${
            isOpen ? "" : "justify-center"
          }  items-center gap-2 `}
        >
          <LogOut size={24} />
          {isOpen && <p className="font-semibold">Logout</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
