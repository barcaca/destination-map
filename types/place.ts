export type Favorites = {
  id: number
  user_id: string
  place_id: number[]
}

export type User = {
  id: string
  email: string
  favorites_id: number
}

export type Location = {
  continent: {
    id: number
    name: string
  }
  country: {
    id: number
    name: string
  }
  state: {
    id: number
    name: string
  }
}

export type Place = {
  id: number
  title: string
  description: string
  location: Location
  images: {
    url: string
  }[]
  user_id: string
  favorite: boolean
}

export type FavoritePlaces = {
  placesId: string[]
}

export type Region = {
  id: number
  name: string
}

export type Country = {
  id: number
  name: string
  region: string
  region_id: number
  translations: {
    'pt-BR': string
  }
}

export type State = {
  id: number
  name: string
  country_id: number
}
