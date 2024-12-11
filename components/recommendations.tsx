import { PlaceCard } from '@/components/place-card'
import recommendationsData from '@/data/data.json'

export function Recommendations() {
  return (
    <section
      aria-labelledby="recommendations-heading"
      className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="recommendations-heading"
          className="font-bold text-3xl tracking-tight sm:text-4xl"
        >
          Recomendados
        </h2>
        <p className="mt-2 text-lg text-muted-foreground leading-8">
          Destinos recomendados para você e sua família para aproveitar
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-2 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommendationsData.recommendations.map(place => (
          <div
            key={place.id}
            className="relative flex w-full flex-none flex-col"
          >
            <PlaceCard place={place} />
          </div>
        ))}
      </div>
    </section>
  )
}
