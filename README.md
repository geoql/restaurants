# 🇮🇳 Restaurants :: GeoQL 

[![Netlify Status](https://api.netlify.com/api/v1/badges/1466d682-7a44-480e-990f-1af959f28ba5/deploy-status)](https://app.netlify.com/sites/nuxt-hasura-mapbox/deploys)

## About
Draw an Area of your interest & find the restaurants nearby

## Stacktrace 
Development stack:
- [Nuxt](https://typescript.nuxtjs.org/)
- [TailwindCSS](https://v1.tailwindcss.com/)
- [v-mapbox](https://github.com/geospoc/v-mapbox)

CI/CD stack:
- [GitHub actions](./.github/workflows/ci.yml)

Release stack:
- [Ship.js](https://github.com/algolia/shipjs)

Deployment stack:
- [Netlify](./netlify.toml)

## Environment Setup
### Development 
```sh
$ git clone git@github.com:geoql/restaurants.git
$ cd restaurants
$ npm install
$ npm run dev
```

### Production 
Pre-release steps:
```sh
$ git clone git@github.com:geoql/restaurants.git
$ cd restaurants
$ npm install
$ npm run release # this will generate a new PR & bump up the pkg version
```

## Contributing 
_Note_: Commits & PRs should now be allowed only if they follow a particular commit format, read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/geoql/restaurants/compare)
