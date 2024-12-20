import { PlaceCard } from '@/components/place-card'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { fetchUserPlaces } from '@/lib/data/places-api'
import type { User } from '@/types/place'
import { UserCircle2 } from 'lucide-react'
import Link from 'next/link'

interface UserPlacesProps {
  user: Pick<User, 'id' | 'email'>
}

export async function UserPlaces({ user }: UserPlacesProps) {
  const userPlaces = await fetchUserPlaces(user.id)
  return (
    <section
      aria-labelledby="user-places-heading"
      className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2
            id="user-places-heading"
            className="inline-flex items-center gap-2 font-bold text-3xl tracking-tight sm:text-4xl"
          >
            <UserCircle2 className="size-6" aria-hidden="true" />
            Meus lugares
          </h2>
          {userPlaces.length > 2 && (
            <Button asChild>
              <Link href={`/meus-lugares/${user.id}`}>Ver todos lugares</Link>
            </Button>
          )}
        </div>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground leading-8">
          {userPlaces.length === 0
            ? 'Você ainda não adicionou nenhum lugar.'
            : 'O Destinos que você já visitou, ou que você gostaria de visitar.'}
        </p>
      </div>
      <BentoGrid>
        {userPlaces.slice(0, 4).map((place, index) => {
          const colSpan =
            index === 1 || index === 2 ? 'lg:col-span-2' : 'lg:col-span-4'
          return (
            <BentoCard key={place.id} className={colSpan}>
              <PlaceCard place={place} isUser />
            </BentoCard>
          )
        })}
      </BentoGrid>
    </section>
  )
}
