'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';

export function ContactModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-colors hover:bg-white/20">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/90 text-lg font-medium">Work in progress</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-black/90 rounded-lg p-6 z-50 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold text-white">
              Contáctanos
            </Dialog.Title>
            <Dialog.Close className="text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          
          <ContactForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}