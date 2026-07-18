import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Desenvolvido para ativide de Postech",
};

export default function RootLayout({
  auth,
  user,
  children,
}: Readonly<{
  auth: React.ReactNode;
  user: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
    <div className="flex min-h-screen flex-col">
        {/* <Demos /> */}
        <Header />
        {children}
        {auth}
        {user}
        <Footer />
        </div>
      </body>
    </html>
  );
}
