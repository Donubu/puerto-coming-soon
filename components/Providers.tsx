'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function Providers({ children }: { children: React.ReactNode }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!reCaptchaKey) {
    console.error('reCAPTCHA site key is not defined');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}