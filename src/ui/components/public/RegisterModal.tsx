import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@ui/modal";
import { Input } from "../shared/Input";
import Button from "../shared/Button";
import { useAuth } from "@/ui/context/AuthContext";
import { RegisterFormData, registerSchema } from "@/ui/schemas/registerSchema";

interface RegisterModalProps {
    onClose: () => void;
    onOpenLogin: () => void;
}

export function RegisterModal({
    onClose,
    onOpenLogin
}: RegisterModalProps) {
    const { register: registerUser } = useAuth();
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterFormData) {
        try {
            setError(null);
            setSuccess(null);
            await registerUser(data.name, data.email, data.password);
            setSuccess("Cadastro realizado com sucesso!")
            reset();
            setTimeout(() => {
                onClose();
                onOpenLogin();
            }, 1500)
        } catch(err) {
            setError(err instanceof Error ? err.message : "Erro ao cadastrar");
        }
    }

    return (
        <Modal onClose={onClose} title="Cadastro">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input 
                    label="Nome" 
                    type="name" 
                    placeholder="Seu Nome" 
                    {...register("name")}
                    error={errors.name?.message} />
                <Input 
                    label="E-mail" 
                    type="email" 
                    placeholder="seu@email.com" 
                    {...register("email")}
                    error={errors.email?.message} />
                <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="******" 
                    {...register("password")}
                    error={errors.password?.message} />

                {success && <span className="text-sm text-green-600">{success}</span>}
                {error && <span className="text-sm text-red-500">{error}</span>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </form>
        </Modal>
    )
}