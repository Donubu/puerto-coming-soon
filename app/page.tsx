'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Toaster } from 'sonner';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Toaster position="top-center" />
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
        poster="https://static.puer.to/sitio-2025/poster.png"
      >
        <source
          src="https://static.puer.to/sitio-2025/agency_1.mp4"
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0 w-full h-full bg-black/60 tv-overlay" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center text-center">
              <h1 style={{textIndent: "-9999px"}} className="text-5xl md:text-7xl font-bold text-white tracking-tight [text-shadow:_0_1px_0_rgb(0_0_0_/_100%),_0_4px_12px_rgb(0_0_0_/_50%)]">
                Agencia de publicidad Puerto
              </h1>

               <Image 
                  src="https://static.puer.to/sitio-2025/logo-blanco.png" 
                  alt="Logo Agencia Puerto" 
                  width="320" 
                  height="78"
                  className="h-16 w-auto"
                />
              
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/90 text-lg font-medium">Work in progress</span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}