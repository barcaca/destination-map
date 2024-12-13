import { HeroCarrousel } from '@/components/hero-carrousel'
import { Recommendations } from '@/components/recommendations'
import { SectionContinents } from '@/components/section-continents'

export default function Home() {
  return (
    <>
      <HeroCarrousel />
      <div className="bg-background text-foreground">
        <div className="space-y-16 py-16">
          <Recommendations />
          <SectionContinents />
        </div>
      </div>
    </>
  )
}
