export const assertNever = (_: never) => {
  throw new Error('Not possible');
};
