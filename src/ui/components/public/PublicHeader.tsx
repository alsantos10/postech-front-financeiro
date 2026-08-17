"use client"

import Link from 'next/link';
import Button from '../shared/Button';
import { useAuth } from '@/ui/hooks/useAuth';
import { useState } from 'react';
import { redirect } from 'next/navigation';

interface PublicHeaderProps {
    onOpenLogin: () => void;
    onOpenRegister: () => void;
}

export function PublicHeader({onOpenLogin, onOpenRegister}: PublicHeaderProps) {
    const {isAuthenticated} = useAuth();
    let [isOpen, setIsOpen] = useState(false);

    const goToPanel = () => redirect(`/painel`);

    return (
        <header className='bg-black shadow-2xl'>
            <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:flex-row-reverse'>
                <Link href="/" className='text-xl font-bold text-zinc-900 dark:text-zinc-50'>
                    <img
                        src="/Logo.svg"
                        alt="Bytebank"
                        className="h-8 w-auto"
                        width={146}
                        height={32}
                    />
                </Link>
                

                <nav className='hidden items-center gap-6 md:flex'>
                    <Link
                        href="/about"
                        className="rounded-none bg-transparent px-0 py-0 text-[18px] font-semibold text-custom-green hover:bg-transparent hover:text-custom-green-500"
                    >
                    Sobre
                  </Link>
                  <Link
                    href="/services"
                    className="rounded-none bg-transparent px-0 py-0 text-[18px] font-semibold text-custom-green hover:bg-transparent hover:text-custom-green-500"
                  >
                    Serviços
                  </Link>
                </nav>

                <div className='flex items-center gap-2'>
                    {isAuthenticated ? (
                        <Button variant='primary' onClick={goToPanel}>
                            Painel de Controle
                        </Button>
                    ):(
                        <>
                            <Link href="/register" className="inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 bg-custom-green text-white hover:bg-custom-green-500 focus-visible:ring-custom-green h-12 w-45 rounded-lg px-4 py-2.5 text-sm">
                                Abrir sua Conta
                            </Link>

                            <Link href="/login" className="inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 border-2 border-custom-green bg-transparent text-custom-green hover:bg-custom-green/10 focus-visible:ring-custom-green h-12 w-45 rounded-lg px-4 py-2.5 text-sm">
                                Já tenho Conta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}