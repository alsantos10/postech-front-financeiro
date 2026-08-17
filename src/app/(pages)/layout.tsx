"use client";

import { PublicFooter } from "@/ui/components/public/PublicFooter";
import { PublicHeader } from "@/ui/components/public/PublicHeader"
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
    </div>
  );
}
