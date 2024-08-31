import { fetchSpecificPokemonData } from '@/features/pokedex/name/services/pokedexNameService';
import type { SpecificPokemonData } from '@/types/pokemon';

type State = {
  pokemon: SpecificPokemonData;
  loading: boolean;
  errorMessage: string | null;
};

export const usePokemonSpecificDataStore = defineStore('pokemonSpecificDataStore', {
  state: (): State => ({
    pokemon: {} as SpecificPokemonData,
    loading: false,
    errorMessage: null,
  }),

  getters: {
    getHeight: ({ pokemon }) => divideByTen(pokemon.detailData.height),
    getWeight: ({ pokemon }) => divideByTen(pokemon.detailData.weight),
    getImage: ({ pokemon }) =>
      pokemon.detailData.sprites.other['official-artwork'].front_default || pokemon.detailData.sprites.front_default,
    getPokemonName: ({ pokemon }) =>
      pokemon.speciesData.names.find(({ language }) => language.name === 'ja')?.name || '?',
    getGenera: ({ pokemon }) => pokemon.speciesData.genera.find(({ language }) => language.name === 'ja')?.genus,
    getFlavorText: ({ pokemon }) =>
      pokemon.speciesData.flavor_text_entries.find(({ language }) => language.name === 'ja')?.flavor_text,
    getCries: ({ pokemon }) => pokemon.detailData.cries.latest || pokemon.detailData.cries.legacy,
  },

  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
    setErrorMessage(message: string | null) {
      this.errorMessage = message;
    },
    async updateSpecificPokemonData(nameId: string) {
      this.setLoading(true);
      this.setErrorMessage(null);

      try {
        const response = await fetchSpecificPokemonData<string>(nameId);
        if (!response) {
          throw new Error('Failed to fetch Pokémon data');
        }
        this.pokemon = response;
      } catch (error) {
        this.setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        this.setLoading(false);
      }
    },
  },
});
