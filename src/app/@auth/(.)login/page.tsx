'use client'

import { redirect } from "next/navigation";
import { LoginModal} from '@/ui/components/public/LoginModal';
import { useModal } from "@/ui/hooks/useModal";

export default function AuthModal() {

  const loginModal = useModal();

    return (
        <>
        <LoginModal 
            onClose={loginModal.close}
            onOpenForgotPassword={() => {
                loginModal.close();
                redirect("/forgot-password")
            }} />
        </>
    );
}