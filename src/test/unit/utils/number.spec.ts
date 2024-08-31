import { describe, expect, it } from 'vitest';
import { divideByTen } from '@/utils/number';

describe('src/utils/number.ts', () => {
  it('数値を10で割るべき', () => {
    expect(divideByTen(100)).toBe(10);
    expect(divideByTen(50)).toBe(5);
  });

  it('ゼロを正しく処理すべき', () => {
    expect(divideByTen(0)).toBe(0);
  });

  it('負の数を正しく処理すべき', () => {
    expect(divideByTen(-50)).toBe(-5);
  });
});
