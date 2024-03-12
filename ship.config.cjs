module.exports = {
  installCommand: () => 'npm i --prefer-offline --no-audit',
  buildCommand: () => null,
  publishCommand: ({ tag }) =>
    `echo "Releasing ${tag} version of frontend webapp"`,
};
