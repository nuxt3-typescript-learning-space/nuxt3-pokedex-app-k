import type { PokemonDetailData, PokemonSpeciesData } from '@/types/pokemon';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { nameId } = getQuery(event);

  try {
    const detailData = await fetchData<PokemonDetailData>(`${config.POKE_API}/${nameId}`);
    const speciesData = await fetchData<PokemonSpeciesData>(detailData.species.url);

    return {
      detailData: detailData,
      speciesData: speciesData,
    };
  } catch (error) {
    handleError('Failed to fetch Pokémon data:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch Pokémon data' });
  }
});

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    handleError('Error fetching data:', error);
    throw error;
  }
};
