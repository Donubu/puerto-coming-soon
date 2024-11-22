'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import IMask, { InputMask, FactoryArg } from 'imask';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(15, 'Teléfono inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<InputMask<FactoryArg> | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  useEffect(() => {
    if (phoneInputRef.current) {
      maskRef.current = IMask(phoneInputRef.current, {
        mask: '+56 0 0000 0000',
        definitions: {
          '0': /[0-9]/
        },
        lazy: true,
        prepare: (str: string) => {
          if (str === '') return '';
          return str;
        }
      });

      phoneInputRef.current.addEventListener('focus', () => {
        if (phoneInputRef.current?.value === '') {
          phoneInputRef.current.value = '+56 ';
        }
      });

      phoneInputRef.current.addEventListener('blur', () => {
        if (phoneInputRef.current?.value === '+56 ') {
          phoneInputRef.current.value = '';
        }
      });
    }

    return () => {
      maskRef.current?.destroy();
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!executeRecaptcha) {
      toast.error('reCAPTCHA no está disponible');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await executeRecaptcha('contact_form');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: token
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al enviar el formulario');
      }

      toast.success('Mensaje enviado correctamente');
      reset();
      
      if (phoneInputRef.current) {
        phoneInputRef.current.value = '';
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al enviar el mensaje');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('name')}
            placeholder="Nombre completo"
            className="w-full px-4 py-2 text-sm rounded-md bg-black/80 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-sm transition-all"
          />
          {errors.name && (
            <p className="mt-1 text-[10px] text-[#ff4444]">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 text-sm rounded-md bg-black/80 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-sm transition-all"
          />
          {errors.email && (
            <p className="mt-1 text-[10px] text-[#ff4444]">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('phone')}
            ref={phoneInputRef}
            type="tel"
            placeholder="Teléfono"
            className="w-full px-4 py-2 text-sm rounded-md bg-black/80 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-sm transition-all"
          />
          {errors.phone && (
            <p className="mt-1 text-[10px] text-[#ff4444]">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register('message')}
            placeholder="Mensaje"
            rows={3}
            className="w-full px-4 py-2 text-sm rounded-md bg-black/80 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-sm transition-all resize-none"
          />
          {errors.message && (
            <p className="mt-1 text-[10px] text-[#ff4444]">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full px-4 py-2 text-sm font-medium text-white bg-black/90 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm overflow-hidden group"
        >
          <span className="relative z-10">
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Enviar mensaje'
            )}
          </span>
          <div className="absolute inset-0 w-0 bg-red-600 transition-all duration-300 ease-out group-hover:w-full" />
        </button>
      </form>
    </>
  );
}