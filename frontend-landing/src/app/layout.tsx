import React from "react";
import type { Metadata, Viewport } from "next";
import "../styles/tailwind.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ledger — Social Media for Accounting Firms",
  description:
    "Ledger turns overlooked CPA firms into discoverable, trusted voices on LinkedIn, Instagram, and Google Business — we write the content you never have time to post.",
  icons: {
    icon: [{ url: "/assets/images/app_logo.png", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fledger1789381back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20"
        />
        <script
          type="module"
          defer
          src="https://static.rocket.new/rocket-shot.js?v=0.0.2"
        />
      </body>
    </html>
  );
}
