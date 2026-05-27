import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Samarth Sharma — Frontend Engineer',
  description:
    'Founding member and lead of Design Stack at BrowserStack. Frontend engineer specialising in design systems, developer tooling, and large-scale React infrastructure.',
  openGraph: {
    title: 'Samarth Sharma — Frontend Engineer',
    description: 'Design systems, developer tooling, React infrastructure.',
    url: 'https://samarthsharma.dev',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ds-bg text-ds-text min-h-screen relative">
        {children}
      </body>
    </html>
  )
}
