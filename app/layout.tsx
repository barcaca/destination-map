import { HeroCarrousel } from '@/components/hero-carrousel'
import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Toaster } from '@/components/ui/sonner'
import { happy_monkey, montserrat } from '@/fonts/font'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Destination Map',
    default: 'Destination Map - Explore os Melhores Destinos',
  },
  description:
    'Descubra e planeje suas próximas aventuras com o Destination Map. Explore destinos incríveis, compartilhe experiências e crie memórias inesquecíveis.',
  keywords: [
    'viagem',
    'destinos',
    'turismo',
    'aventura',
    'planejamento de viagem',
  ],
  authors: [{ name: 'Destination Map Team' }],
  creator: 'Destination Map',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${happy_monkey.variable} ${montserrat.variable} h-full scroll-smooth`}
    >
      <body className="flex h-full w-full flex-col">
        <Header />
        <HeroCarrousel />
        {children}
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
