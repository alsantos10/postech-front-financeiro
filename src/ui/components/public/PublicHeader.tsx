"use client"

import Link from 'next/link';
import Button from '../shared/Button';
import { useAuth } from '@/ui/hooks/useAuth';
import { useState } from 'react';

interface PublicHeaderProps {
    onOpenLogin: () => void;
    onOpenRegister: () => void;
}

export function PublicHeader({onOpenLogin, onOpenRegister}: PublicHeaderProps) {
    const {isAuthenticated} = useAuth();
    let [isOpen, setIsOpen] = useState(false);

    function AbrirModal() {
        setIsOpen(true);
    } 

    return (
        <header className='border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg--zinc-950'>
            <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
                <Link href="/" className='text-xl font-bold text-zinc-900 dark:text-zinc-50'>
                    Demo
                </Link>

                <nav className='hidden items-center gap-6 md:flex'>
                    <Link href="/" className='text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'>
                        Home
                    </Link>
                    <Link href="/about" className='text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'>
                        Sobre nós
                    </Link>
                </nav>

                <div className='flex items-center gap-2'>
                    {isAuthenticated ? (
                        <Button variant='primary' onClick={() => (window.location.href = "/painel")}>
                            Painel de Controle
                        </Button>
                    ):(
                        <>
                            <Button variant='primary' onClick={onOpenLogin}>
                                Login
                            </Button>
                            <Button variant='primary' onClick={onOpenRegister}>
                                Abrir sua conta
                            </Button>
                            
                            <Link href="/login" onClick={AbrirModal} className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 border-2 border-custom-green bg-transparent text-custom-green hover:bg-custom-green/10 focus-visible:ring-custom-green h-12 w-45 rounded-lg px-4 py-2.5 text-sm">
                                Já tenho Conta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}