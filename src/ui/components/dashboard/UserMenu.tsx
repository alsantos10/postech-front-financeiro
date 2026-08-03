"use client"

import { useAuth } from "@/ui/context/AuthContext";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserMenu() {
    const {user, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClientOutSide(event: MouseEvent) {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClientOutSide);
        return () => document.removeEventListener("mousedown", handleClientOutSide);
    }, []);

    async function handleLogout() {
        await logout();
        window.location.href = "/";
    }

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Menu do Usuário">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                        <User size={18}/>
                    </div>
                    <span className="hidden text-sm font-medium text-zinc-700 dark:text-zinc-300 md:block">
                        {user?.name || "Usuário"}
                    </span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-sm border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                    <Link
                        href="/painel/profile"
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        onClick={() => setIsOpen(false)}>
                            Perfil
                    </Link>
                    <Link
                        href="/painel/profile"
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        onClick={() => setIsOpen(false)}>
                            Configurações
                    </Link>
                    <Link
                        href="/"
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-zinc-100 dark:text-red-400 dark:hover:bg-zinc-800"
                        onClick={handleLogout}>
                            sair
                    </Link>

                </div>
            )}
        </div>
    )
}