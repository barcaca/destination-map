import { happymonkey, montserrat } from '@/fonts/font'
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
      lang="pt-BR"
      className={`${montserrat.variable} ${happymonkey.variable} h-full scroll-smooth`}
    >
      <body className="h-full">{children}</body>
    </html>
  )
}
