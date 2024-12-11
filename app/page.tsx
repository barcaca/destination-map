import { HeroCarrousel } from '@/components/hero-carrousel'
import { Recommendations } from '@/components/recommendations'

export default function Home() {
  return (
    <>
      <HeroCarrousel />
      <div className="bg-background text-foreground">
        <Recommendations />
      </div>
    </>
  )
}
