import axios from 'axios';
import queryString from 'query-string';
import { UserInterface, UserGetQueryInterface } from 'interfaces/user';

export const getUsers = async (query?: UserGetQueryInterface): Promise<UserInterface[]> => {
  const response = await axios.get(`/api/users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const getUserById = async (id: string, query?: UserGetQueryInterface): Promise<UserInterface> => {
  const response = await axios.get(`/api/users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};
