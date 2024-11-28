"use client";

import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";
import { Inter } from "next/font/google";
import clsx from "clsx";
import Login from "../Login/Login";
import CreateAccount from "../CreateAccount/CreateAccount";

const InterFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function LandingWelcomeButton({
  isNormalButton,
}: {
  isNormalButton: boolean;
}) {
  //** states */
  const [open, setOpen] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  //** auth */
  const auth = useAuth();

  return (
    <div className={InterFont.className}>
      <Dialog
        open={open}
        onClose={setOpen}
        className={clsx("relative z-10", InterFont.className)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-950 px-4 py-12 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {isCreateAccount ? (
                <CreateAccount
                  setIsCreateAccount={setIsCreateAccount}
                  setOpen={setOpen}
                />
              ) : (
                <Login
                  setIsCreateAccount={setIsCreateAccount}
                  setOpen={setOpen}
                />
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className={clsx(!isNormalButton && "absolute right-0 top-5")}>
        {!auth.user ? (
          <button
            className="w-32 rounded-lg bg-primary py-2 text-xl text-black"
            onClick={() => setOpen(true)}
          >
            Login
          </button>
        ) : (
          <div className="flex w-32 items-center justify-center rounded-lg bg-primary py-2 text-lg text-black">
            {auth?.user?.name}
          </div>
        )}
      </div>
    </div>
  );
}
