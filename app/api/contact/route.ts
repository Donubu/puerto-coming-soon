import {NextResponse} from 'next/server';
import {z} from 'zod';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9),
    message: z.string().min(10),
    recaptchaToken: z.string(),
});

const sesClient = new SESClient({
    region: 'sa-east-1',
    credentials: {
        accessKeyId: process.env.AWS_API_KEY || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

async function verifyRecaptcha(token: string) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
        throw new Error('reCAPTCHA secret key is not configured');
    }

    const params = new URLSearchParams({
        secret: secretKey,
        response: token
    });

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?${params}`, {
        method: 'POST'
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error('reCAPTCHA verification failed');
    }

    return data.success && data.score >= 0.5;
}

async function sendEmail(data: z.infer<typeof contactSchema>) {
    const {name, email, phone, message} = data;

    if (!process.env.SENDER_EMAIL || !process.env.RECIPIENT_EMAIL) {
        throw new Error('Email configuration is missing');
    }

    const emailParams = {
        Source: process.env.SENDER_EMAIL,
        Destination: {
            ToAddresses: [process.env.RECIPIENT_EMAIL],
        },
        Message: {
            Subject: {
                Data: `Nuevo contacto desde el sitio web - ${name}`,
                Charset: 'UTF-8',
            },
            Body: {
                Text: {
                    Data: `
Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Mensaje: ${message}
          `,
                    Charset: 'UTF-8',
                },
                Html: {
                    Data: `
<h2>Nuevo mensaje de contacto</h2>
<p><strong>Nombre:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Teléfono:</strong> ${phone}</p>
<p><strong>Mensaje:</strong></p>
<p>${message}</p>
          `,
                    Charset: 'UTF-8',
                },
            },
        },
    };

    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = contactSchema.parse(body);

        // Verify reCAPTCHA
        const isValidRecaptcha = await verifyRecaptcha(validatedData.recaptchaToken);

        if (!isValidRecaptcha) {
            return NextResponse.json(
                {message: 'Verificación de reCAPTCHA fallida'},
                {status: 400}
            );
        }

        // Send email using AWS SES
        await sendEmail(validatedData);

        return NextResponse.json(
            {message: 'Mensaje enviado correctamente'},
            {status: 200}
        );
    } catch (error) {
        console.error('Contact form error:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                {message: `Error: ${error.message}`},
                {status: 500}
            );
        }

        return NextResponse.json(
            {message: 'Error al procesar la solicitud'},
            {status: 500}
        );
    }
}