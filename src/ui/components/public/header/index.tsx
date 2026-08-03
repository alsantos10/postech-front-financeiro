'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

export function Header() {
  return (
    <nav className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between py-6">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6 in-aria-expanded:hidden"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6 not-in-aria-expanded:hidden"
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  src="/Logo.svg"
                  alt="Bytebank"
                  className="size-8 rounded-full h-auto bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                    >
                      Your profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                    >
                      Settings
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                    >
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <img
                src="/Logo.svg"
                alt="Bytebank"
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:justify-end sm:flex-1">
              <div className="flex flex-1 items-center space-x-4">
                <div className="flex items-center space-x-4">
                  {/* <Link href="/" aria-current="page" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                    Home
                  </Link> */}
                  <Link
                    href="/transactions"
                    className="rounded-none bg-transparent px-0 py-0 text-[18px] font-semibold text-custom-green hover:bg-transparent hover:text-custom-green-500"
                  >
                    Sobre
                  </Link>
                  <Link
                    href="/projects"
                    className="rounded-none bg-transparent px-0 py-0 text-[18px] font-semibold text-custom-green hover:bg-transparent hover:text-custom-green-500"
                  >
                    Serviços
                  </Link>
                </div>

                <div className="ml-auto flex items-center space-x-4">

                  <Link href="/register" className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 bg-custom-green text-white hover:bg-custom-green-500 focus-visible:ring-custom-green h-12 w-45 rounded-lg px-4 py-2.5 text-sm">
                    Abrir sua Conta
                  </Link>

                  <Link href="/login" className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 border-2 border-custom-green bg-transparent text-custom-green hover:bg-custom-green/10 focus-visible:ring-custom-green h-12 w-45 rounded-lg px-4 py-2.5 text-sm">
                    Já tenho Conta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}