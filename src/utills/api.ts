import axios from 'axios';
import { Product } from './types';

const API_URL = 'https://mocki.io/v1/c53fb45e-5085-487a-afac-0295f62fb86e';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};