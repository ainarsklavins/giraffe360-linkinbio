import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giraffe360 Link-in-Bio Prototypes",
  description: "Prototype showcase for real estate agent link-in-bio pages. Explore different design variations.",
  openGraph: {
    title: "Giraffe360 Link-in-Bio Prototypes",
    description: "Prototype showcase for real estate agent link-in-bio pages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
