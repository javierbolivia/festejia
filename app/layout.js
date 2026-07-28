import './globals.css'

export const metadata = {
  title: 'Festejia - Invitaciones Digitales Premium',
  description: 'Invitaciones web interactivas para bodas y eventos. Diseño elegante, confirmación de asistencia, QR de acceso y panel de gestión.',
  openGraph: {
    title: 'Festejia - Invitaciones Digitales Premium',
    description: 'Imagina el recuerdo, nosotros lo creamos. Invitaciones digitales exclusivas para bodas, XV años, graduaciones y bautizos.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Festejia',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0f0f0f" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
