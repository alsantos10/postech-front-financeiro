"use client";

import { useModal } from "@/ui/hooks/useModal";
import { CreateTransactionModal } from "@/ui/components/dashboard/CreateTransactionModal";

export default function CreateTransactionPage() {

  const newTransactionModal = useModal();

    return (
    <CreateTransactionModal 
      onClose={newTransactionModal.close} />
    );
}