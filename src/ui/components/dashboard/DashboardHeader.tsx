"use client"

import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";
import { FeatureNav } from "./FeatureNav";

export function DashboardHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="border-b border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/painel" className="text-xl font-bold text-zinc-900">
                    Painel
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/painel" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                        Painel
                    </Link>
                    <Link href="/painel/transactions" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                        Transações
                    </Link>
                    <Link href="/painel/settings" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                        Configurações
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <UserMenu />
                    <button className="md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Menu">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
                    <FeatureNav />
                </div>
            )}
        </header>
    )
}