import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ravindu Ariyarathne - Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // CHANGE 1: Force dark mode and browser color scheme
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        // CHANGE 2: Add dark background (fallback) and white text
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-slate-950 text-white`}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/background-video4.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay*/}
        <div className="fixed inset-0 bg-black/40 -z-10"></div>

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}