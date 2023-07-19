import axios from 'axios';
import queryString from 'query-string';
import { RestaurantInterface, RestaurantGetQueryInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from '../../interfaces';

export const getRestaurants = async (query?: RestaurantGetQueryInterface) => {
  const response = await axios.get(`/api/restaurants${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRestaurant = async (restaurant: RestaurantInterface) => {
  const response = await axios.post('/api/restaurants', restaurant);
  return response.data;
};

export const updateRestaurantById = async (id: string, restaurant: RestaurantInterface) => {
  const response = await axios.put(`/api/restaurants/${id}`, restaurant);
  return response.data;
};

export const getRestaurantById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/restaurants/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRestaurantById = async (id: string) => {
  const response = await axios.delete(`/api/restaurants/${id}`);
  return response.data;
};
