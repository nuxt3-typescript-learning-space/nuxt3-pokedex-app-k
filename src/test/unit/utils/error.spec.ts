import { describe, it, expect, vi } from 'vitest';
import { handleError } from '@/utils/error';

describe('handleError 関数のテスト', () => {
  it('Error インスタンスを処理できるべき', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'エラーが発生しました:';
    const error = new Error('サンプルエラーメッセージ');

    handleError(message, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(`${message} ${error.message}`);
    consoleErrorSpy.mockRestore();
  });

  it('非 Error インスタンスも文字列として処理できるべき', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'エラーが発生しました:';
    const error = 'これはエラーメッセージです';

    handleError(message, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(`${message} ${String(error)}`);
    consoleErrorSpy.mockRestore();
  });

  it('不明なエラーオブジェクトも文字列として処理できるべき', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'エラーが発生しました:';
    const error = { code: 500 };

    handleError(message, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(`${message} ${String(error)}`);
    consoleErrorSpy.mockRestore();
  });
});
