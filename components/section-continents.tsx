import { Icons } from '@/components/icons'
import { PlaceCard } from '@/components/place-card'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { fetchContinents } from '@/lib/data/data'
import Link from 'next/link'
import type { JSX } from 'react'
import { Button } from './ui/button'

interface Continent {
  description: string
  icons: JSX.Element
}

const sectionContinent: { [key: string]: Continent } = {
  Africa: {
    description:
      'A África é conhecida por sua rica diversidade cultural, fauna selvagem e vastos desertos como o Saara.',
    icons: <Icons.earthAfrica className="size-6" aria-hidden="true" />,
  },
  America: {
    description:
      'A América é composta por três regiões principais: América do Norte, Central e do Sul, com paisagens variadas e culturas vibrantes.',
    icons: <Icons.earthAmerica className="size-6" aria-hidden="true" />,
  },
  Asia: {
    description:
      'A Ásia é o maior continente, conhecido por sua diversidade cultural, tecnológica e paisagens impressionantes, como os Himalaias.',
    icons: <Icons.earthAsia className="size-6" aria-hidden="true" />,
  },
  Europa: {
    description:
      'A Europa é um continente de rica história, cultura influente e belas cidades, como Paris, Roma e Londres.',
    icons: <Icons.earthEurope className="size-6" aria-hidden="true" />,
  },
  Oceania: {
    description:
      'A Oceania é composta por várias ilhas no Pacífico, com destaque para a Austrália, Nova Zelândia e a diversidade marinha das ilhas do Pacífico.',
    icons: <Icons.earthOceania className="size-6" aria-hidden="true" />,
  },
}

export async function SectionContinents() {
  const groupedContinents = await fetchContinents()

  return Object.keys(groupedContinents || {}).map(continent => {
    const lengthPlaces = groupedContinents[continent].length
    return (
      <section
        key={continent}
        aria-labelledby="continents-heading"
        className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2
              id="continents-heading"
              className="inline-flex items-center gap-2 font-bold text-3xl tracking-tight sm:text-4xl"
            >
              {sectionContinent[continent].icons}
              {continent}
            </h2>
            {lengthPlaces > 2 && (
              <Button asChild>
                <Link href={`/continente/${continent}`}>
                  {' '}
                  Ver todos lugares em {continent}{' '}
                </Link>
              </Button>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground leading-8">
            {sectionContinent[continent].description}
          </p>
        </div>
        <BentoGrid>
          {groupedContinents[continent].slice(0, 4).map((place, index) => {
            const colSpan =
              index === 1 || index === 2 ? 'lg:col-span-2' : 'lg:col-span-4'
            return (
              <BentoCard key={place.id} className={colSpan}>
                <PlaceCard place={place} />
              </BentoCard>
            )
          })}
        </BentoGrid>
      </section>
    )
  })
}