import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/app/components/theme-provider"
import { Header } from './components/Header'
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/app/components/Toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Health Monitor',
  description: 'Health Monitor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="mx-auto py-2 px-1 md:px-4 md:py-6">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
      </body>
    </html>
  )
}
