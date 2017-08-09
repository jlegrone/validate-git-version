import validateGitVersion from './index'

test('returns false for invalid git version', async () => {
  expect(await validateGitVersion('<0')).toBe(false);
});

test('returns true for valid git version', async () => {
  expect(await validateGitVersion('>=0')).toBe(true);
});
