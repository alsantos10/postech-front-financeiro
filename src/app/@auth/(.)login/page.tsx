'use client'

import { LoginModal} from '@/ui/components/public/LoginModal';
import { useModal } from "@/ui/hooks/useModal";

export default function AuthModal() {

  const loginModal = useModal();
  const forgotPasswordModal = useModal();
  const registerModal = useModal();

    return (
        <>
        <LoginModal 
            onClose={loginModal.close}
            onOpenForgotPassword={() => {
                loginModal.close();
                forgotPasswordModal.open();
            }}
            onOpenRegister={() => {
                loginModal.close();
                registerModal.open();
            }} />
        </>
    );
}