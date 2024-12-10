import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { happy_monkey, montserrat } from '@/fonts/font'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destination Map',
  description:
    'Destination Map is a tool to help you find the best travel routes. Simply enter your destination and we will provide you with a list of the best routes to get there, including the distance, time required, and the cost of each route. We also provide information on the best modes of transportation, such as flying, driving, or taking the train or bus.',
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
      <body className="h-full">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
