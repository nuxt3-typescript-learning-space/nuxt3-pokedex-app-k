import type { Pokemon } from '@/types/pokemon';

export const fetchPokemonData = async (offset: number, limit: number): Promise<Pokemon> => {
  try {
    // $fetchを使用してAPIからデータを取得
    const data = await $fetch<Pokemon>('/api/all-pokemon', {
      query: { offset, limit },
    });
    return data;
  } catch (error) {
    // エラー時にはデフォルト値を返す
    return { count: 0, allPokemonData: [] };
  }
};
