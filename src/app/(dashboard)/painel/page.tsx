"use client";

import { useAuth } from '@/ui/hooks/useAuth';

export default function PainelPage() {

    const { user } = useAuth();

    return (
        <div>
            <h1 className='text-2x1 font-bold text-zinc-900'>Painel de Controle</h1>
            <p className='mt-2 text-zinc-600'>
                Bem-vindo, {user?.name || 'Usuário'} ao painel de controle.</p>
        </div>
    );
}