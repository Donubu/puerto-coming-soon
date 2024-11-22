import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  message: z.string().min(10),
  recaptchaToken: z.string(),
});

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data.success && data.score >= 0.5;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(validatedData.recaptchaToken);
    
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { message: 'Verificación de reCAPTCHA fallida' },
        { status: 400 }
      );
    }

    // Here you would typically send this data to your email service or database
    console.log('Contact form submission:', validatedData);

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Error al procesar la solicitud' },
      { status: 400 }
    );
  }
}