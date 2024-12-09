import { Happy_Monkey, Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})
export const happymonkey = Happy_Monkey({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-happymonkey',
})
