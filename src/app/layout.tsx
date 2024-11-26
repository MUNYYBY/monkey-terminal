import type { Metadata } from "next";
import "./globals.css";
import { Jersey_15 } from "next/font/google";
import RootWrapper from "@/hoc/RootWrapper";

const Jersey_15_Font = Jersey_15({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "$MONKEYAI",
  description:
    "WHAT IF A MONKEY HAD ACCESS TO AI? EXPLORE THIS QUESTION WITH US. $MONKEYAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={Jersey_15_Font.className}
        suppressHydrationWarning={true}
      >
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
