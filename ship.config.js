module.exports = {
  buildCommand: () => null,
  publishCommand: ({ tag }) =>
    `echo "Releasing ${tag} version of Restaurants frontend webapp"`,
};
