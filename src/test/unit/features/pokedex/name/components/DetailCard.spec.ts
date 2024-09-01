import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DetailCard from '@/features/pokedex/name/components/DetailCard.vue';
import pokemonMockData from '@/server/api/mock/json/pokemon.json';
import type { VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';

describe('src/features/pokedex/name/components/DetailCard.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let testPokemonData: typeof pokemonMockData;
  let playMock: ReturnType<typeof vi.fn>;

  const mountComponent = (data = testPokemonData) => {
    const pinia = createTestingPinia({
      initialState: {
        pokemonSpecificDataStore: {
          pokemon: data,
        },
      },
    });

    return mount(DetailCard, {
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    testPokemonData = JSON.parse(JSON.stringify(pokemonMockData));
    playMock = vi.fn();
    vi.spyOn(window, 'Audio').mockImplementation(() => {
      return {
        play: playMock,
      } as unknown as HTMLAudioElement;
    });
    wrapper = mountComponent();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('コンポーネントが正常にレンダリングされる', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('ポケモンの名前が正しく表示される', () => {
    const cardTitle = wrapper.find('[data-testid="card-title"]');
    expect(cardTitle.text()).toBe(`${testPokemonData.speciesData.names[0].name}`);
  });

  it('高さが正しく表示される', () => {
    const heightElement = wrapper.find('[data-testid="height"]');
    expect(heightElement.text()).toBe(`高さ: ${divideByTen(testPokemonData.detailData.height)} m`);
  });

  it('重さが正しく表示される', () => {
    const weightElement = wrapper.find('[data-testid="weight"]');
    expect(weightElement.text()).toBe(`重さ: ${divideByTen(testPokemonData.detailData.weight)} kg`);
  });

  it('generaが正しく表示される', () => {
    const generaElement = wrapper.find('[data-testid="genera"]');
    expect(generaElement.text()).toBe(`${testPokemonData.speciesData.genera[0].genus}`);
  });

  it('flavor-textが正しく表示される', () => {
    const flavorTextElement = wrapper.find('[data-testid="flavor-text"]');
    expect(flavorTextElement.text()).toBe(`${testPokemonData.speciesData.flavor_text_entries[0].flavor_text}`);
  });

  it('ポケモンの画像が正しく表示される', () => {
    const imageElement = wrapper.find('[data-testid="image"]');
    expect(imageElement.exists()).toBe(true);
    expect(imageElement.attributes('src')).toBe(
      `${testPokemonData.detailData.sprites.other['official-artwork'].front_default}`,
    );
  });

  it('generaが空の場合、[data-testid="genera"]がレンダリングされない', () => {
    testPokemonData.speciesData.genera[0].genus = '';
    wrapper = mountComponent(testPokemonData);

    const generaElement = wrapper.find('[data-testid="genera"]');
    expect(generaElement.exists()).toBe(false);
  });

  it('flavor-textが空の場合、[data-testid="flavor-text"]がレンダリングされない', () => {
    testPokemonData.speciesData.flavor_text_entries[0].flavor_text = '';
    wrapper = mountComponent(testPokemonData);

    const flavorTextElement = wrapper.find('[data-testid="flavor-text"]');
    expect(flavorTextElement.exists()).toBe(false);
  });

  it('鳴き声再生ボタンがクリックされた時にAudio.playが呼び出される', async () => {
    const button = wrapper.find('[data-testid="audio-button"]');
    await button.trigger('click');

    expect(playMock).toHaveBeenCalled();
  });
});
