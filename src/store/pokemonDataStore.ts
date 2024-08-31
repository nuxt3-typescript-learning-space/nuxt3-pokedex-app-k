import { fetchPokemonData } from '@/features/pokedex/services/pokedexService';
import type { Pokemon } from '@/types/pokemon';

type State = {
  pokemonData: Pokemon;
  loading: boolean;
  errorMessage: string | null;
};

export const usePokemonDataStore = defineStore('pokemonDataStore', {
  state: (): State => ({
    pokemonData: {} as Pokemon,
    loading: false,
    errorMessage: null,
  }),
  getters: {
    getEnglishPokemonNames({ pokemonData }): string[] {
      return pokemonData.allPokemonData.map((pokemon) => pokemon.name);
    },
    getJapanesePokemonNames({ pokemonData }): string[] {
      return pokemonData.allPokemonData
        .map(({ speciesData }) => speciesData.names.find(({ language }) => language.name === 'ja')?.name || '')
        .filter((name) => name !== '');
    },
    getPokemonImageUrls({ pokemonData }): string[] {
      return pokemonData.allPokemonData.map(
        ({ detailData }) =>
          detailData.sprites.other['official-artwork'].front_default || detailData.sprites.front_default,
      );
    },
    getPokemonAllCount({ pokemonData }): number {
      return pokemonData.count;
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setErrorMessage(message: string | null) {
      this.errorMessage = message;
    },
    async updateAllPokemonData(offset: number, limit: number) {
      this.setLoading(true);
      this.setErrorMessage(null);

      try {
        const response = await fetchPokemonData(offset, limit);
        if (!response) {
          throw new Error('Failed to fetch Pokémon data');
        }
        this.pokemonData = response;
      } catch (error) {
        this.setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        this.setLoading(false);
      }
    },
  },
});
