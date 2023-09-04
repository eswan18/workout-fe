import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@flaticon/flaticon-uicons/css/all/all.css";
import React from "react";
import NavBar from "@/components/navBar/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flex of Gold",
  description: "A bespoke workout-tracking app",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen relative`}>
        <NavBar />
        <div className="flex flex-row justify-center dark:bg-gray-700">
          <div className="content-container w-[48rem] flex-shrink">
            {props.children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
