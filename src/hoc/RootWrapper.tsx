"use client";

import React from "react";
import { AppProgressBar } from "next-nprogress-bar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootWrapper({ children }: any) {
  const getLayout = children;
  return (
    <>
      <AppProgressBar
        height="3px"
        color="#26b83d"
        options={{ showSpinner: false }}
      />
      <AuthProvider>{getLayout}</AuthProvider>
    </>
  );
}
