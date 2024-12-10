import Link from 'next/link'
import { Icons } from '../icons'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/barcaca',
    icon: <Icons.gitHub className="size-6 " />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/luan-barcaça/',
    icon: <Icons.linkedin className="size-6" />,
  },
]

export function Footer() {
  return (
    <footer className="relative border-t bg-background">
      <div className='absolute inset-0 bg-[url("/ibrahim-rifath-unsplash.jpg?height=600&width=1920")] bg-center bg-cover' />
      <div className="bg-black/15 backdrop-blur-[2.7px]">
        <div className="container relative z-10 mx-auto">
          <div className="mt-64 flex items-center justify-between border-border border-t py-8 text-center">
            <div className="flex space-x-4">
              {socials.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-1 text-background transition-colors hover:bg-background/20 [&_svg]:shrink-0"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
            <p className="p-4 text-background text-sm">
              &copy; {new Date().getFullYear()} Destination Map. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
