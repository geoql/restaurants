import { gql } from 'graphql-tag';

export const fetchNearbyRestaurantsQuery = gql`
  query fetchNearbyRestaurants($bound: Int!, $lat: float8!, $long: float8!) {
    getrestaurants(args: { bound: $bound, lat: $lat, long: $long }) {
      name
      lat
      long
    }
  }
`;
