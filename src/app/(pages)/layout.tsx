"use client";

import { ForgotPasswordModal } from "@/ui/components/public/ForgotPasswordModal";
import { Header } from "@/ui/components/public/header"
import { LoginModal } from "@/ui/components/public/LoginModal";
import { PublicFooter } from "@/ui/components/public/PublicFooter";
import { PublicHeader } from "@/ui/components/public/PublicHeader"
import { RegisterModal } from "@/ui/components/public/RegisterModal";
import { useModal } from "@/ui/hooks/useModal";

export default function PagesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const loginModal = useModal();
  const forgotPasswordModal = useModal();
  const registerModal = useModal();

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader onOpenLogin={loginModal.open} onOpenRegister={registerModal.open} />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
      <PublicFooter />
      {/* <LoginModal 
        isOpen={loginModal.isOpen} onClose={loginModal.close}
        onOpenForgotPassword={() => {
          loginModal.close();
          forgotPasswordModal.open();
        }}
        onOpenRegister={() => {
          loginModal.close();
          registerModal.open();
        }} /> */}
      <ForgotPasswordModal 
        isOpen={forgotPasswordModal.isOpen} 
        onClose={forgotPasswordModal.close}
         onOpenLogin={() => {
          registerModal.close();
          loginModal.open();
        }} />
      <RegisterModal isOpen={registerModal.isOpen} onClose={registerModal.open}
        onOpenLogin={() => {
          registerModal.close();
          loginModal.open();
        }} />
    </div>
  );
}
