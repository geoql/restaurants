export type IRestaurantRequest = {
  bound: number;
  lat: number;
  long: number;
};

export type IRestaurant = {
  name?: string;
  lat: number;
  long: number;
  __typename: string;
};
export type IRestaurantResponse = {
  getrestaurants: IRestaurant[];
};
