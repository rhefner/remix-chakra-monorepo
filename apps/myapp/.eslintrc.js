module.exports = {
  extends: [
    '@myorg/eslint-config/react',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    //TODO: Fix 'Expect takes at most 1 argument.eslintjest/valid-expect' before re-including this:
    //TODO: '@remix-run/eslint-config/jest-testing-library',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  settings: {
    jest: {
      version: 27,
    },
  },
}
