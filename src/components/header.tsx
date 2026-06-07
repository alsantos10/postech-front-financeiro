'use client'

import Link from "next/link"

export function Header() {
    return (
        <nav className="relative bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6 not-in-aria-expanded:hidden">
                    <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="h-8 w-auto" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">

                    <Link href="/" aria-current="page" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</Link>
                    <Link href="/transactions" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                        Transações
                    </Link>
                    <Link href="/projects" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                        Projects
                    </Link>
                     
                    <button className="rounded-md px-3 right-0 text-sm font-medium text-gray-900 bg-amber-300 hover:bg-amber-400 cursor-pointer">
                        Criar Transação
                    </button>

                    
                </div>
                </div>
            </div>
           
            </div>
        </div>

       
        </nav>

    )
}