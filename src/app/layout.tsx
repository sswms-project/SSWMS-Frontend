import { QueryProvider } from '@/providers/query-provider'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './index.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'vietnamese'],
})

export const metadata: Metadata = {
  title: 'SSWMS',
  description: 'Smart SaaS Warehouse Management System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
