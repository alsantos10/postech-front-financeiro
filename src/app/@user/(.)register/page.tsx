'use client'

import { RegisterModal } from "@/ui/components/public/RegisterModal";
import { useModal } from "@/ui/hooks/useModal";

export default function CadastroModal() {

  const loginModal = useModal();
  const registerModal = useModal();

    return (
        <>
        <RegisterModal
            onClose={registerModal.close}
            onOpenLogin={() => {
                registerModal.close();
                loginModal.open();
            }} />
        </>
    );
}