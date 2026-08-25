'use client'

import { RegisterModal } from "@/ui/components/public/RegisterModal";
import { useModal } from "@/ui/hooks/useModal";
import { redirect } from "next/navigation";

export default function CadastroModal() {

  const loginModal = useModal();
  const registerModal = useModal();

    return (
        <>
        <RegisterModal
            onClose={registerModal.close}
            onOpenLogin={() => {
                registerModal.close();
                redirect("/login");
            }} />
        </>
    );
}