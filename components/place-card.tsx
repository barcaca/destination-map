import { Button } from '@/components/ui/button'
import type { Place } from '@/types/place'
import { HeartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PlaceCardProps {
  place: Place
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="group relative flex w-full overflow-hidden rounded-xl shadow-shape">
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        aria-hidden="true"
      />
      <Button
        variant="ghost"
        size="icon"
        aria-label={
          place.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
        className={`group/favorite absolute top-2 right-2 z-40 h-8 w-8 rounded-full ${place.favorite ? 'bg-muted text-muted-foreground' : 'bg-muted/40 text-muted-foreground/50'} hover:bg-muted/90`}
      >
        <HeartIcon
          className={
            place.favorite
              ? 'text-red-500'
              : 'fill-current text-current group-hover/favorite:text-red-500'
          }
          aria-hidden="true"
        />
      </Button>
      <div className="relative aspect-[4/3] w-full rounded-md">
        <Image
          alt={`${place.title}, ${place.location.country}`}
          src={place.images[0]}
          fill
          className="h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-20 p-4">
        <h3 className="mt-2 font-semibold text-background text-lg">
          {place.title}
        </h3>
        <p className="text-background/80 text-sm">
          {place.location.country} , {place.location.state}
        </p>
        <p className="mt-2 line-clamp-2 text-background/50 text-sm">
          {place.description}
        </p>
      </div>
      <Link href={`/destino/${place.id}`} className="absolute inset-0 z-30">
        <span className="sr-only">Ver detalhes de {place.title}</span>
      </Link>
    </div>
  )
}
