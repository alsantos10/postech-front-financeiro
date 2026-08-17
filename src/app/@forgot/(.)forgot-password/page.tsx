'use client'

import { redirect } from "next/navigation";
import { useModal } from "@/ui/hooks/useModal";
import { ForgotPasswordModal } from '@/ui/components/public/ForgotPasswordModal';

export default function CadastroModal() {

  const forgotPasswordModal = useModal();

    return (
        <>
        <ForgotPasswordModal
            onClose={forgotPasswordModal.close}
            onOpenLogin={() => {
                forgotPasswordModal.close();
                redirect("/login");
            }} />
        </>
    );
}