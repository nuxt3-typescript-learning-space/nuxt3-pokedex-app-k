export interface PokemonData {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}

export interface PokemonDetailData {
  cries: Cries;
  height: number;
  species: Species;
  sprites: Sprites;
  weight: number;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonSpeciesData {
  flavor_text_entries: FlavorTextEntry[];
  genera: Genera[];
  names: Names[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
}

export interface Genera {
  genus: string;
  language: Language;
}

export interface Names {
  name: string;
  language: Language;
}

export interface Language {
  name: string;
  url: string;
}

export interface AllPokemonData extends PokemonResults {
  detailData: PokemonDetailData;
  speciesData: PokemonSpeciesData;
}

export type SpecificPokemonData = Omit<AllPokemonData, keyof PokemonResults>;

export interface Pokemon {
  count: number;
  next?: string;
  previous?: string;
  allPokemonData: AllPokemonData[];
}
