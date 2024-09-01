import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import PokemonImage from '@/components/layout/PokemonImage.vue';

describe('src/components/layout/PokemonImage.vue', () => {
  it('`src` と `alt` が提供されている場合、指定された画像と代替テキストが表示されること', async () => {
    const wrapper = await mountSuspended(PokemonImage, {
      props: {
        src: '/path/to/image.png',
        alt: 'テスト画像',
      },
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('/path/to/image.png');
    expect(img.attributes('alt')).toBe('テスト画像');
  });

  it('`src` が提供されていない場合、デフォルトの画像と「画像なし」の代替テキストが表示されること', async () => {
    const wrapper = await mountSuspended(PokemonImage, {
      props: {},
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('/assets/image/no-image.png');
    expect(img.attributes('alt')).toBe('画像なし');
  });
});
