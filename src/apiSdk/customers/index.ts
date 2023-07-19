import axios from 'axios';
import queryString from 'query-string';
import { CustomerInterface, CustomerGetQueryInterface } from 'interfaces/customer';
import { GetQueryInterface } from '../../interfaces';

export const getCustomers = async (query?: CustomerGetQueryInterface) => {
  const response = await axios.get(`/api/customers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomer = async (customer: CustomerInterface) => {
  const response = await axios.post('/api/customers', customer);
  return response.data;
};

export const updateCustomerById = async (id: string, customer: CustomerInterface) => {
  const response = await axios.put(`/api/customers/${id}`, customer);
  return response.data;
};

export const getCustomerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerById = async (id: string) => {
  const response = await axios.delete(`/api/customers/${id}`);
  return response.data;
};
