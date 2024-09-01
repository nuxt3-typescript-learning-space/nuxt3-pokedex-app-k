import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Spinner from '@/components/layout/Spinner.vue';

describe('src/components/layout/Spinner.vue', () => {
  it('スピナーが表示され、適切な属性を持っていること', async () => {
    const wrapper = await mountSuspended(Spinner);

    // SVG要素が存在することを確認
    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.attributes('aria-hidden')).toBe('true');

    // スパン要素が存在し、正しいテキストが含まれていることを確認
    const span = wrapper.find('span');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe('Loading...');
  });
});
