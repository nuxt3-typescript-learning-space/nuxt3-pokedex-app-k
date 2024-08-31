export const handleError = (message: string, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  // eslint-disable-next-line no-console
  console.error(`${message} ${errorMessage}`);
};
