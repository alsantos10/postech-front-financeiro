'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ onClose, title, children }: ModalProps) {

  const router = useRouter();

  function close() {
    router.back()
  }

  return (
    <>
      <Dialog open={true} onClose={close} className="relative z-10 focus:outline-none">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 transition-opacity data-closed:opacity-0.5 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative xl:min-w-[719] md:min-w-[597] min-w-[313] transform overflow-hidden min-h-screen bg-custom-gray text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    { title ? (
                      <DialogTitle as="h3" className="text-base text-center font-semibold text-gray-900">
                        {title}
                        <button onClick={close}
                          className="absolute top-4 right-4 z-10 rounded-full cursor-pointer p-2 transition-colors hover:bg-black/10">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </DialogTitle>
                    ): (
                      <div className="text-base font-semibold text-gray-900">
                        <button onClick={close}
                          className="absolute top-4 right-4 z-10 rounded-full cursor-pointer p-2 transition-colors hover:bg-black/10">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )
                    }
                    <div className="mt-2">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
