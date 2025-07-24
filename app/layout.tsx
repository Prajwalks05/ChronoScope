import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chronoscope',
  icons:{
    icon:"/chronoscope-logo.ico"
  },
  description: 'Timeline Generator',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
