"use client";

import { useModal } from "@/ui/hooks/useModal";
import { UpdateTransactionModal } from "@ui/components/dashboard/UpdateTransactionModal"

export default function UpdateTransactionPage() {

  const updateTransactionModal = useModal();

    return (
    <UpdateTransactionModal 
      onClose={updateTransactionModal.close} />
    );
}