'use client'

import { useForm } from "react-hook-form";

import { SubmitEvent, useState } from 'react';
import Image from "next/image";
import Modal from "@/ui/modal";
import { User } from "@/infra/types/users";
import { createUser } from "@/app/services/users";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export interface RegisterProps {
    name: string,
    email: string,
    password: string,
    readedConfirm: boolean
}

export default function RegisterModal() {

    const notify = () => toast.success("Usuário criado com sucesso!");
    
    const { handleSubmit, register, formState: {errors}, setError } = useForm<RegisterProps>();
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const sendData = async (userEvent: SubmitEvent<HTMLFormElement>) => {

        userEvent.preventDefault()
        setLoading(true)
        const formData = new FormData(userEvent.currentTarget)

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        const readedConfirm = formData.get('readedConfirm')

        const userRequest: User = {
            name: name as string,
            email: email as string,
            password: password as string
        };

        if (readedConfirm) {
            throw new Error("Você deve confirmar a leitura da política de privacidade");
        }

        const response = await createUser(userRequest);
        const data = await response.user;

        // exibir mensagem de sucesso ou erro com base na resposta da API
        if (data) {
            notify();
        }

        setIsOpen(false)
        redirect("/")
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) || "Email inválido";
    }

    const hasError = Object.keys(errors).length > 0;

    return (
        <Modal isOpen={isOpen}>
            <div className="flex flex-col items-center p-4">
                <Image src="/IlustraLogin.svg" alt="Ilustração de login" width={220} height={220} preload={true} className="w-full h-auto" />
            </div>

            <h3>
                Preencha os campos abaixo para criar sua conta corrente!
            </h3>

            <form className="flex flex-col gap-4 p-4" onSubmit={sendData}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        id="name"
                        type="name"
                        {...register("name", { 
                            required: "Informe seu nome"
                        })}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Nome completo"
                    />
                    {errors.name&& <p className="mt-2 text-sm text-red-600">{errors.name?.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { 
                            required: "Forneca seu e-mail", 
                            validate: validateEmail
                        })}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="seu@exemplo.com"
                    />
                    {errors.email&& <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { 
                            required: "Forneca sua senha",
                            minLength: {
                                value: 6,
                                message: "Senha com 6 digitos"
                            }
                         })}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password?.message}</p>}
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="readedConfirm"
                        className="cursor-pointer border-gray-300 border rounded-sm shadow-sm"
                        {...register("readedConfirm", { required: "Você deve confirmar a leitura" })}
                    />


                    <label htmlFor="readedConfirm" className="ml-2 text-sm text-gray-600">
                        Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.
                    </label>
                    {errors.readedConfirm && <p className="mt-2 text-sm text-red-600">{errors.readedConfirm?.message}</p>}
                </div>

                <div className="flex justify-center mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="submit"
                        disabled={ hasError }
                        className="p-4 py-3 text-sm font-semibold min-w-[144] rounded-md bg-custom-red text-white shadow-sm hover:bg-custom-red-700 focus:outline-none focus:ring-2 focus:ring-custom-red-800 focus:ring-offset-2 sm:ml-3 sm:w-auto disabled:bg-custom-red-900 cursor-pointer">
                        Entrar
                    </button>
                </div>
            </form>
        </Modal>
    )
}