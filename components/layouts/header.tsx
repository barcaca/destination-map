import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full text-foreground">
      <div className="container mx-auto flex h-14 px-4 sm:px-6 lg:px-8">
        <nav className="flex w-full items-center justify-between gap-6">
          <Link
            href="/"
            className="font-heading font-medium text-sm transition-colors hover:text-primar"
          >
            Home
          </Link>
          <Link href="/" className="font-heading font-semibold">
            Destination Map
          </Link>
          <Button variant="default" size="sm" className="font-heading">
            + Novo Destino
          </Button>
        </nav>
      </div>
    </header>
  )
}
